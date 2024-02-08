import type { ParsedQs } from 'qs'
import { FilteredListRequest } from './index'
import Dict = NodeJS.Dict
import { components } from './api'
import { clearFilterValue } from '../utils/urlHelper'

export default class ReportQuery implements FilteredListRequest {
  selectedPage: number

  pageSize: number

  sortColumn?: string

  columns: Array<string>

  sortedAsc: boolean

  filters: Dict<string>

  filtersPrefix: string

  columnsPrefix: string

  dataProductDefinitionsPath?: string

  constructor(
    fields: Array<components['schemas']['FieldDefinition']>,
    queryParams: ParsedQs,
    defaultSortColumn: string,
    filtersPrefix: string,
    columnsPrefix: string,
  ) {
    this.selectedPage = queryParams.selectedPage ? Number(queryParams.selectedPage) : 1
    this.pageSize = queryParams.pageSize ? Number(queryParams.pageSize) : 20
    this.sortColumn = queryParams.sortColumn ? queryParams.sortColumn.toString() : defaultSortColumn
    this.sortedAsc = queryParams.sortedAsc !== 'false'
    this.dataProductDefinitionsPath = queryParams.dataProductDefinitionsPath
      ? queryParams.dataProductDefinitionsPath.toString()
      : null
    this.filtersPrefix = filtersPrefix
    this.columnsPrefix = columnsPrefix

    if (queryParams.columns) {
      this.columns = typeof queryParams.columns === 'string' ? [queryParams.columns] : (queryParams.columns as string[])
    } else {
      this.columns = fields.map((f) => f.name)
    }

    console.log(this.columns)

    this.filters = {}
    Object.keys(queryParams)
      .filter((key) => key.startsWith(filtersPrefix))
      .filter((key) => queryParams[key])
      .forEach((key) => {
        this.filters[key.replace(filtersPrefix, '')] = queryParams[key].toString()
      })
  }

  toRecordWithFilterPrefix(removeClearedFilters = false): Record<string, string> {
    const record: Record<string, string> = {
      selectedPage: this.selectedPage.toString(),
      pageSize: this.pageSize.toString(),
      sortColumn: this.sortColumn,
      sortedAsc: this.sortedAsc.toString(),
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
