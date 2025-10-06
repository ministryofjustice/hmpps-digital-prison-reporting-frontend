import type { ParsedQs } from 'qs'
import { FilteredListRequest } from './index'
import Dict = NodeJS.Dict
import { components } from './api'
import { clearFilterValue } from '../utils/urlHelper'
import ColumnUtils from '../components/_reports/report-columns-form/utils'
import { Template } from './Templates'
import { ReportType } from './UserReports'

export const DEFAULT_FILTERS_PREFIX = 'filters.'

export default class ReportQuery implements FilteredListRequest {
  selectedPage: number

  pageSize: number | undefined

  sortColumn?: string

  columns: Array<string>

  sortedAsc: boolean

  filters: Dict<string>

  filtersPrefix: string

  dataProductDefinitionsPath?: string

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
    this.selectedPage = queryParams.selectedPage ? Number(queryParams.selectedPage) : 1
    this.pageSize = this.getPageSize(queryParams, template, reportType)
    this.sortColumn = queryParams.sortColumn ? queryParams.sortColumn.toString() : this.getDefaultSortColumn(fields)
    this.sortedAsc = queryParams.sortedAsc !== 'false'
    this.dataProductDefinitionsPath =
      definitionsPath ??
      (queryParams.dataProductDefinitionsPath ? queryParams.dataProductDefinitionsPath.toString() : null)
    this.filtersPrefix = filtersPrefix

    if (queryParams.columns) {
      const columns =
        typeof queryParams.columns === 'string' ? queryParams.columns.split(',') : (queryParams.columns as string[])
      this.columns = ColumnUtils.ensureMandatoryColumns(fields, columns)
    } else {
      this.columns = fields.filter((f) => f.visible).map((f) => f.name)
    }

    let min: string
    let max: string
    const dateField: components['schemas']['FieldDefinition'] = fields.find((f) => {
      return (
        (f.type === 'date' && f.filter && f.filter.type === 'daterange') ||
        (f.type === 'date' && f.filter && f.filter.type === 'date')
      )
    })
    if (dateField) ({ min, max } = dateField.filter)

    this.filters = {}

    Object.keys(queryParams)
      .filter((key) => key.startsWith(this.filtersPrefix))
      .filter((key) => queryParams[key])
      .forEach((key) => {
        const filter = key.replace(this.filtersPrefix, '')
        let value = queryParams[key].toString()
        if (filter.includes('.start') && min) {
          if (new Date(value) < new Date(min)) value = min
        }
        if (filter.includes('.end') && max) {
          if (new Date(value) > new Date(max)) value = max
        }
        if (value !== 'no-filter') {
          this.filters[filter] = value
        }
      })

    if (dateField && dateField.filter.type === 'daterange') {
      if (
        min &&
        Object.keys(queryParams).some((key) => key.includes(this.filtersPrefix)) &&
        Object.keys(queryParams).every((key) => !key.includes('.start'))
      ) {
        this.filters[`${dateField.name}.start`] = min
      }

      if (
        max &&
        Object.keys(queryParams).some((key) => key.includes(this.filtersPrefix)) &&
        Object.keys(queryParams).every((key) => !key.includes('.end'))
      ) {
        this.filters[`${dateField.name}.end`] = max
      }
    }

    if (dateField && dateField.filter.type === 'date') {
      if (
        min &&
        Object.keys(queryParams).some((key) => key.includes(this.filtersPrefix)) &&
        Object.keys(queryParams).every((key) => !key.includes(dateField.name))
      ) {
        this.filters[`${dateField.name}.start`] = min
      }
    }
  }

  private getDefaultSortColumn(fields: components['schemas']['FieldDefinition'][]) {
    const defaultSortColumn = fields.find((f) => f.defaultsort)
    return defaultSortColumn ? defaultSortColumn.name : fields.find((f) => f.sortable)?.name
  }

  getPageSize(queryParams: ParsedQs, template: Template, reportType?: ReportType): number | undefined {
    let pageSize
    if (!reportType || reportType === ReportType.REPORT) {
      pageSize = queryParams.pageSize && template ? Number(queryParams.pageSize) : this.getDefaultPageSize(template)
    }
    return pageSize
  }

  toRecordWithFilterPrefix(removeClearedFilters = false): Record<string, string | Array<string>> {
    const record: Record<string, string | Array<string>> = {
      selectedPage: this.selectedPage.toString(),
      ...(this.pageSize && { pageSize: this.pageSize.toString() }),
      sortColumn: this.sortColumn,
      sortedAsc: this.sortedAsc.toString(),
      columns: this.columns,
    }

    if (this.dataProductDefinitionsPath) {
      record.dataProductDefinitionsPath = this.dataProductDefinitionsPath
    }

    Object.keys(this.filters).forEach((filterName) => {
      const value = this.filters[filterName]
      if (!removeClearedFilters || value !== clearFilterValue) {
        record[`${this.filtersPrefix}${filterName}`] = value
      }
    })

    return record
  }

  private getDefaultPageSize(template: Template) {
    const maxResultsSize = 500000
    const standardPage = 20

    switch (template) {
      case 'list-section':
      case 'summary-section':
      case 'row-section-child':
      case 'parent-child':
        return maxResultsSize

      default:
        return standardPage
    }
  }
}
