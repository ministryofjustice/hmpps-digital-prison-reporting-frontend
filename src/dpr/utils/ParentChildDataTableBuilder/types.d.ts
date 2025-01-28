import { SortKey } from '../DataTableBuilder/types'

export interface ParentChildSortKey extends SortKey {
  childSortKeys: Dict<string>
}