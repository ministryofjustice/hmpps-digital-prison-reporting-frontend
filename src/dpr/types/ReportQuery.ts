import type { ParsedQs } from 'qs'
import { FilteredListRequest } from './index'
import Dict = NodeJS.Dict
import { components } from './api'
import { clearFilterValue } from '../utils/urlHelper'
import ColumnUtils from '../components/columns/utils'

export default class ReportQuery implements FilteredListRequest {
  selectedPage: number

  pageSize: number

  sortColumn?: string

  columns: Array<string>

  sortedAsc: boolean

  filters: Dict<string>

  filtersPrefix: string

  dataProductDefinitionsPath?: string

  constructor(
    fields: Array<components['schemas']['FieldDefinition']>,
    queryParams: ParsedQs,
    defaultSortColumn: string,
    filtersPrefix: string,
  ) {
    this.selectedPage = queryParams.selectedPage ? Number(queryParams.selectedPage) : 1
    this.pageSize = queryParams.pageSize ? Number(queryParams.pageSize) : 20
    this.sortColumn = queryParams.sortColumn ? queryParams.sortColumn.toString() : defaultSortColumn
    this.sortedAsc = queryParams.sortedAsc !== 'false'
    this.dataProductDefinitionsPath = queryParams.dataProductDefinitionsPath
      ? queryParams.dataProductDefinitionsPath.toString()
      : null
    this.filtersPrefix = filtersPrefix

    if (queryParams.columns) {
      const columns = typeof queryParams.columns === 'string' ? queryParams.columns.split(',') : (queryParams.columns as string[])
      this.columns = ColumnUtils.getSelectedColumns(fields, columns)
    } else {
      this.columns = fields.map((f) => f.name)
    }

    this.filters = {}

    Object.keys(queryParams)
      .filter((key) => key.startsWith(filtersPrefix))
      .filter((key) => queryParams[key])
      .forEach((key) => {
        this.filters[key.replace(filtersPrefix, '')] = queryParams[key].toString()
      })
  }

  toRecordWithFilterPrefix(removeClearedFilters = false): Record<string, string | Array<string>> {
    const record: Record<string, string | Array<string>> = {
      selectedPage: this.selectedPage.toString(),
      pageSize: this.pageSize.toString(),
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
}
