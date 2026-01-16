import { DataTable } from '../../../utils/DataTableBuilder/types'
import { Pagination } from '../report-pagination/types'

export interface DataTableOptions {
  dataTable: DataTable
  classification: string
  printable?: boolean
  pagination: Pagination
  totals: string
  count?: number
}
