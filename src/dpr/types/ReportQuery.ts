import type { ParsedQs } from 'qs'
import { FilteredListRequest } from './index'
import Dict = NodeJS.Dict
import { components } from './api'
import { clearFilterValue } from '../utils/urlHelper'
import ColumnUtils from '../components/_reports/report-heading/report-columns/report-columns-form/utils'
import { Template } from './Templates'
import { ReportType } from './UserReports'
import logger from '../utils/logger'

export const DEFAULT_FILTERS_PREFIX = 'filters.'

class ReportQuery implements FilteredListRequest {
  selectedPage: number

  pageSize: number

  sortColumn?: string | undefined

  columns: Array<string>

  sortedAsc: boolean

  filters: Dict<string>

  filtersPrefix: string

  dataProductDefinitionsPath?: string | undefined

  constructor({
    fields,
    template,
    queryParams,
    definitionsPath,
    filtersPrefix = DEFAULT_FILTERS_PREFIX,
    reportType,
  }: {
    fields: components['schemas']['FieldDefinition'][]
    template?: Template
    queryParams: ParsedQs
    definitionsPath?: string
    filtersPrefix?: string
    reportType?: ReportType
  }) {
    this.selectedPage = queryParams['selectedPage'] ? Number(queryParams['selectedPage']) : 1
    this.pageSize = this.getPageSize(queryParams, template, reportType)

    this.sortColumn = queryParams['sortColumn']
      ? queryParams['sortColumn'].toString()
      : this.getDefaultSortColumn(fields)

    this.sortedAsc =
      queryParams['sortedAsc'] !== undefined
        ? queryParams['sortedAsc'] !== 'false'
        : this.getDefaultSortDirection(fields)

    this.dataProductDefinitionsPath =
      definitionsPath ??
      (queryParams['dataProductDefinitionsPath'] ? queryParams['dataProductDefinitionsPath'].toString() : undefined)

    this.filtersPrefix = filtersPrefix

    this.columns = this.setColumns(queryParams, fields)

    this.filters = {}

    this.setAndTrimFiltersFromQuery(queryParams, fields)

    this.handleUnsetDateTypeDefaultsAndBounds(fields)
  }

  /**
   * Set the filers from the query params
   * - trims the start/end dates to min/max
   * - removes no-filter options
   *
   * @private
   * @param {ParsedQs} queryParams
   * @param {string} [min]
   * @param {string} [max]
   * @memberof ReportQuery
   */
  private setAndTrimFiltersFromQuery(queryParams: ParsedQs, fields: components['schemas']['FieldDefinition'][]) {
    Object.keys(queryParams)
      .filter((key) => key.startsWith(this.filtersPrefix))
      .filter((key) => queryParams[key])
      .forEach((key) => {
        const filterName = key.replace(this.filtersPrefix, '')
        const p = queryParams[key]
        let value = p ? p.toString() : ''

        // Extract base field name
        const baseFieldName = filterName.split('.')[0]

        const field = fields.find((f) => f.name === baseFieldName)

        if (!field?.filter) return

        const { type, staticOptions } = field.filter

        // Drop relative-duration for daterange types
        if ((type === 'daterange' || type === 'granulardaterange') && filterName.endsWith('relative-duration')) {
          return
        }

        // Select / radio / multiselect validation
        if (type.toLowerCase() === 'radio' || type.toLowerCase() === 'select' || type === 'multiselect') {
          const validated = this.validateSelectFilterValue(p, type, staticOptions)
          if (!validated) return

          value = validated
        }

        // Date handling
        if (field.type === 'date') {
          const { min, max } = field.filter

          if (type === 'daterange' || type === 'granulardaterange') {
            if (min && filterName.endsWith('.start')) {
              if (new Date(value) < new Date(min)) value = min
            }

            if (max && filterName.endsWith('.end')) {
              if (new Date(value) > new Date(max)) value = max
            }
          }

          if (type === 'date') {
            if (min && new Date(value) < new Date(min)) {
              value = min
            }

            if (max && new Date(value) > new Date(max)) {
              value = max
            }
          }
        }

        if (value !== 'no-filter') {
          this.filters[filterName] = value
        }
      })
  }

  /**
   * Validates that all staticOption values are correct
   *
   * - checks/validates value against the staticOptions in the filter definition
   * - if not present then it is dropped from the query,
   * - and logged
   *
   * @private
   * @param {unknown} rawValue
   * @param {string} type
   * @param {components['schemas']['FilterDefinition']['staticOptions']} [staticOptions]
   * @param {string} [fieldName]
   * @return {*}  {(string | undefined)}
   * @memberof ReportQuery
   */
  private validateSelectFilterValue(
    rawValue: unknown,
    type: string,
    staticOptions?: components['schemas']['FilterDefinition']['staticOptions'],
    fieldName?: string,
  ): string | undefined {
    if (!staticOptions || !rawValue) return undefined

    const validValues = staticOptions.map((o) => o.name.toLowerCase())

    // Normalize input - array of strings
    const values = Array.isArray(rawValue)
      ? rawValue.map((v) => v.toString().toLowerCase())
      : rawValue
          .toString()
          .split(',')
          .map((v) => v.trim().toLowerCase())

    if (type === 'multiselect') {
      const invalidValues = values.filter((v) => !validValues.includes(v))
      const filtered = [...new Set(values.filter((v) => validValues.includes(v)))]

      if (invalidValues.length > 0) {
        logger.warn(`Invalid filter values removed for multiselect: ${fieldName}: [${invalidValues.join(', ')}]`)
      }

      if (filtered.length === 0) return undefined

      return filtered.join(',')
    }

    // radio / select (single value)
    const value = values[0]

    if (!validValues.includes(value)) {
      logger.warn(`Invalid filter value: ${fieldName}: ${value}`)
      return undefined
    }

    return value
  }

  /**
   * Handles the setting of default values for date type filters
   * when no user input value has been applied
   *
   * - if min/max bounds in definition we ensure the date in within bounds
   * before being sent to the API
   *
   * @private
   * @param {components['schemas']['FieldDefinition'][]} fields
   * @memberof ReportQuery
   */
  private handleUnsetDateTypeDefaultsAndBounds(fields: components['schemas']['FieldDefinition'][]) {
    const dateFields: components['schemas']['FieldDefinition'][] | undefined = fields.filter((f) => {
      return (
        (f.type === 'date' && f.filter && f.filter.type === 'daterange') ||
        (f.type === 'date' && f.filter && f.filter.type === 'date') ||
        (f.type === 'date' && f.filter && f.filter.type === 'granulardaterange')
      )
    })

    dateFields.forEach((df) => {
      if (df.filter) {
        const min = df.filter.min ?? undefined
        const max = df.filter.max ?? undefined

        this.setDefaultBoundsOnUnsetDatefields(df, df.filter, min, max)
      }
    })
  }

  /**
   * Set the default value for date filters where min/max is provided
   *
   * - If min / max exist and the user hasn’t already provided date bounds in the request,
   * - the code injects them as defaults so the filtering stays within those bounds.
   *
   * @private
   * @memberof ReportQuery
   */
  private setDefaultBoundsOnUnsetDatefields(
    dateField: components['schemas']['FieldDefinition'],
    dateFieldFilter: components['schemas']['FilterDefinition'],
    min?: string,
    max?: string,
  ) {
    const existingKeys = Object.keys(this.filters)

    const baseKey = dateField.name
    const startKey = `${baseKey}.start`
    const endKey = `${baseKey}.end`

    if (dateFieldFilter.type === 'daterange' || dateFieldFilter.type === 'granulardaterange') {
      const hasStart = existingKeys.some((key) => key === startKey)
      const hasEnd = existingKeys.some((key) => key === endKey)

      if (min && !hasStart) {
        this.filters[startKey] = min
      }

      if (max && !hasEnd) {
        this.filters[endKey] = max
      }
    }

    if (dateFieldFilter.type === 'date') {
      // Any value for this field counts (base or dotted)
      const hasAnyValueForField = existingKeys.some((key) => key === baseKey || key.startsWith(`${baseKey}.`))

      if (!hasAnyValueForField) {
        const value = min ?? max
        if (value) {
          this.filters[baseKey] = value
        }
      }
    }
  }

  private setColumns(queryParams: ParsedQs, fields: components['schemas']['FieldDefinition'][]) {
    if (queryParams['columns']) {
      const columns =
        typeof queryParams['columns'] === 'string'
          ? queryParams['columns'].split(',')
          : (queryParams['columns'] as string[])

      return ColumnUtils.ensureMandatoryColumns(fields, columns)
    }

    return fields.filter((f) => f.visible).map((f) => f.name)
  }

  /**
   * Sets the default sort column
   *
   * @private
   * @param {components['schemas']['FieldDefinition'][]} fields
   * @return {*}
   * @memberof ReportQuery
   */
  private getDefaultSortColumn(fields: components['schemas']['FieldDefinition'][]): string | undefined {
    const defaultSortColumn = fields.find((f) => f.defaultsort)
    return defaultSortColumn ? defaultSortColumn.name : fields.find((f) => f.sortable)?.name
  }

  /**
   * Gets the default sort direction
   * - Default if not set in DPD: ASC
   *
   * @private
   * @param {components['schemas']['FieldDefinition'][]} fields
   * @return {*}
   * @memberof ReportQuery
   */
  private getDefaultSortDirection(fields: components['schemas']['FieldDefinition'][]) {
    const field = fields.find((f) => f.defaultsort)
    if (field) {
      return field.sortDirection ? field.sortDirection === 'asc' : true
    }
    return true
  }

  /**
   * Get the pagesize for the request
   * - from query, otherwise set meaningful default
   *
   * @param {ParsedQs} queryParams
   * @param {Template} [template]
   * @param {ReportType} [reportType]
   * @return {*}  {number}
   * @memberof ReportQuery
   */
  getPageSize(queryParams: ParsedQs, template?: Template, reportType?: ReportType): number {
    let pageSize = 5000000
    if (!reportType || reportType === ReportType.REPORT) {
      if (queryParams['pageSize']) {
        pageSize = Number(queryParams['pageSize'])
      } else if (template) {
        pageSize = this.getDefaultPageSize(template)
      }
    }
    return pageSize
  }

  toRecordWithFilterPrefix(removeClearedFilters = false): Record<string, string | Array<string>> {
    const record: Record<string, string | Array<string>> = {
      selectedPage: this.selectedPage.toString(),
      ...(this.pageSize && { pageSize: this.pageSize.toString() }),
      ...(this.sortColumn && { sortColumn: this.sortColumn }),
      sortedAsc: this.sortedAsc.toString(),
      columns: this.columns,
    }

    if (this.dataProductDefinitionsPath) {
      record['dataProductDefinitionsPath'] = this.dataProductDefinitionsPath
    }

    Object.keys(this.filters).forEach((filterName) => {
      const value = this.filters[filterName]
      if ((value && !removeClearedFilters) || value !== clearFilterValue) {
        record[`${this.filtersPrefix}${filterName}`] = <string>value
      }
    })

    return record
  }

  /**
   * Gets a meaningful default pagesize for a request
   *
   * @private
   * @param {Template} template
   * @return {*}
   * @memberof ReportQuery
   */
  private getDefaultPageSize(template: Template) {
    const maxResultsSize = 500000 // catch all rows
    const standardPage = 20 // smallest pagesize

    switch (template) {
      // These templates do no include pagination so return all rows
      case 'list-section':
      case 'summary-section':
      case 'row-section-child':
      case 'parent-child':
      case 'parent-child-section':
        return maxResultsSize

      default:
        return standardPage
    }
  }
}

export { ReportQuery }
export default ReportQuery
