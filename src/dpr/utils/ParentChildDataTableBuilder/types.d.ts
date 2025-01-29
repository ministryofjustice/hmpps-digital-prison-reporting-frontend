import { SortKey } from '../DataTableBuilder/types'

export interface ParentChildSortKey extends SortKey {
  childSortKeys: Dict<string>
}

export interface ChildData {
  id: string,
  data: Array<Dict<string>>
}