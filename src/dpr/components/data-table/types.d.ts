import { DataTable } from '../../utils/DataTableBuilder/types'
import { Pagination } from '../pagination/types'

export interface DataTableOptions extends DataTable {
  classification: string
  printable?: boolean
  pagination: Pagination
  totals: string
}
