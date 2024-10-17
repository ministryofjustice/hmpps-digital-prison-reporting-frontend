import Dict = NodeJS.Dict
import type { meta } from '../../types/UserReports'

export interface RenderTableListResponse {
  head: {
    emptyMessage?: string
    href?: string
  }
  tableData: {
    rows: Dict<string>[][]
    head: Dict<string>[]
  }
  total: {
    amount: number
    shown: number
    max: number
  }
  meta?: meta[]
  csrfToken?: string
  maxRows: number
}
