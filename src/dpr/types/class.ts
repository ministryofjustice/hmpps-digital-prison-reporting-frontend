import type { ParsedQs } from 'qs'
import { FilteredListRequest } from './index'
import Dict = NodeJS.Dict

export class ReportQuery implements FilteredListRequest {
  selectedPage: number
  pageSize: number
  sortColumn?: string
  sortedAsc: boolean
  filters: Dict<string>
  filtersPrefix: string

  constructor(queryParams: ParsedQs, defaultSortColumn: string, filtersPrefix: string) {
    this.selectedPage = queryParams.selectedPage ? Number(queryParams.selectedPage) : 1
    this.pageSize = queryParams.pageSize ? Number(queryParams.pageSize) : 20
    this.sortColumn = queryParams.sortColumn ? queryParams.sortColumn.toString() : defaultSortColumn
    this.sortedAsc = queryParams.sortedAsc !== 'false'
    this.filtersPrefix = filtersPrefix

    this.filters = {}
    Object.keys(queryParams)
      .filter((key) => key.startsWith(filtersPrefix))
      .filter((key) => queryParams[key])
      .forEach((key) => {
        this.filters[key.replace(filtersPrefix, '')] = queryParams[key].toString()
      })
  }

  toRecordWithFilterPrefix(): Record<string, string> {
    const record: Record<string, string> = {
      selectedPage: this.selectedPage.toString(),
      pageSize: this.pageSize.toString(),
      sortColumn: this.sortColumn,
      sortedAsc: this.sortedAsc.toString(),
    }

    Object.keys(this.filters).forEach(filterName => {
      record[`${this.filtersPrefix}${filterName}`] = this.filters[filterName]
    })

    return record
  }
}
