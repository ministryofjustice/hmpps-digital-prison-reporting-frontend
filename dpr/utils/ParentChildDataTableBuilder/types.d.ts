import { SortKey } from '../DataTableBuilder/types'
import Dict = NodeJS.Dict

export interface ParentChildSortKey extends SortKey {
  childSortKeys: Dict<string>
}

export interface ChildData {
  id: string
  data: Array<Dict<string>>
}
