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
    definitionsPath?: string
  ) {
    this.selectedPage = queryParams.selectedPage ? Number(queryParams.selectedPage) : 1
    this.pageSize = queryParams.pageSize ? Number(queryParams.pageSize) : 20
    this.sortColumn = queryParams.sortColumn ? queryParams.sortColumn.toString() : defaultSortColumn
    this.sortedAsc = queryParams.sortedAsc !== 'false'
    this.dataProductDefinitionsPath = definitionsPath ?? queryParams.dataProductDefinitionsPath
      ? queryParams.dataProductDefinitionsPath.toString()
      : null
    this.filtersPrefix = filtersPrefix

    if (queryParams.columns) {
      const columns =
        typeof queryParams.columns === 'string' ? queryParams.columns.split(',') : (queryParams.columns as string[])
      this.columns = ColumnUtils.getSelectedColumns(fields, columns)
    } else {
      this.columns = fields.filter((f) => f.visible).map((f) => f.name)
    }

    let min: string
    let max: string
    const dateField: components['schemas']['FieldDefinition'] = fields.find(
      (f) => f.type === 'date' && f.filter && f.filter.type === 'daterange',
    )
    if (dateField) ({ min, max } = dateField.filter)

    this.filters = {}

    Object.keys(queryParams)
      .filter((key) => key.startsWith(filtersPrefix))
      .filter((key) => queryParams[key])
      .forEach((key) => {
        const filter = key.replace(filtersPrefix, '')
        let value = queryParams[key].toString()
        if (filter.includes('.start') && min) {
          if (new Date(value) < new Date(min)) value = min
        }
        if (filter.includes('.end') && max) {
          if (new Date(value) > new Date(max)) value = max
        }
        this.filters[filter] = value
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
