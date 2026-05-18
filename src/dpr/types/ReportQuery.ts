import type { ParsedQs } from 'qs'
import { FilteredListRequest } from './index'
import Dict = NodeJS.Dict
import { components } from './api'
import { clearFilterValue } from '../utils/urlHelper'
import ColumnUtils from '../components/_reports/report-heading/report-columns/report-columns-form/utils'
import { Template } from './Templates'
import { ReportType } from './UserReports'
import { FilterType } from '../components/_filters/filter-input/enum'

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

    if (queryParams['columns']) {
      const columns =
        typeof queryParams['columns'] === 'string'
          ? queryParams['columns'].split(',')
          : (queryParams['columns'] as string[])

      this.columns = ColumnUtils.ensureMandatoryColumns(fields, columns)
    } else {
      this.columns = fields.filter((f) => f.visible).map((f) => f.name)
    }

    const dateField: components['schemas']['FieldDefinition'] | undefined = fields.find((f) => {
      return (
        (f.type === 'date' && f.filter && f.filter.type === 'daterange') ||
        (f.type === 'date' && f.filter && f.filter.type === 'date') ||
        (f.type === 'date' && f.filter && f.filter.type === 'granulardaterange')
      )
    })

    let min: string | undefined
    let max: string | undefined
    if (dateField && dateField.filter) {
      min = dateField.filter.min || undefined
      max = dateField.filter.max || undefined
    }

    this.filters = {}
    this.setAndTrimFiltersFromQuery(queryParams, min, max)

    if (dateField && dateField.filter) {
      this.setDefaultBoundsOnUnsetDatefields(dateField, dateField.filter, queryParams, min, max)
    }
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
  private setAndTrimFiltersFromQuery(queryParams: ParsedQs, min?: string, max?: string) {
    Object.keys(queryParams)
      .filter((key) => key.startsWith(this.filtersPrefix))
      .filter((key) => queryParams[key])
      .forEach((key) => {
        const filter = key.replace(this.filtersPrefix, '')
        const p = queryParams[key]
        let value = p ? p.toString() : ''

        // set start to min if less than lower range
        if (filter.includes('.start') && min) {
          if (new Date(value) < new Date(min)) value = min
        }

        // Set end to max if higher of upper range
        if (filter.includes('.end') && max) {
          if (new Date(value) > new Date(max)) value = max
        }

        // filter out no-filter values
        if (value !== 'no-filter') {
          this.filters[filter] = value
        }
      })
  }

  /**
   * Set the default value for date filters where min/max is provided
   *
   * - If min / max exist and the user hasn’t already provided date bounds in the query params,
   * - the code injects them as defaults so the filtering stays within those bounds.
   *
   * @private
   * @memberof ReportQuery
   */
  private setDefaultBoundsOnUnsetDatefields(
    dateField: components['schemas']['FieldDefinition'],
    dateFieldFilter: components['schemas']['FilterDefinition'],
    queryParams: ParsedQs,
    min?: string,
    max?: string,
  ) {
    if (dateFieldFilter.type === 'daterange') {
      // Set the start value to min if min is set, but no start value set
      if (
        min &&
        Object.keys(queryParams).some((key) => key.includes(this.filtersPrefix)) &&
        Object.keys(queryParams).every((key) => !key.includes('.start'))
      ) {
        this.filters[`${dateField.name}.start`] = min
      }

      // Set the end value to max if max is set, but no end value set
      if (
        max &&
        Object.keys(queryParams).some((key) => key.includes(this.filtersPrefix)) &&
        Object.keys(queryParams).every((key) => !key.includes('.end'))
      ) {
        this.filters[`${dateField.name}.end`] = max
      }
    }

    if (dateFieldFilter.type === 'date') {
      // Set the start value to min if min is set, but no start value set
      if (
        min &&
        Object.keys(queryParams).some((key) => key.includes(this.filtersPrefix)) &&
        Object.keys(queryParams).every((key) => !key.includes(dateField.name))
      ) {
        this.filters[`${dateField.name}.start`] = min
      }
    }
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
