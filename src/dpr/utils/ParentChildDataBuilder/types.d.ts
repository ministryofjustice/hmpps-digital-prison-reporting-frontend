import { Cell, SortKey } from '../DataTableBuilder/types'
import Dict = NodeJS.Dict

export interface ParentChildSortKey extends SortKey {
  childSortKeys: Dict<string>
}

export interface ChildData {
  id: string
  data: Array<Dict<string>>
}

export interface ParentChildTemplateData {
  parentHead: Cell[]
  childHead: Cell[]
  sections: [
    {
      title?: string
      count?: number
      data: ParentChildData[]
    },
  ]
}

export interface ParentChildData {
  parent: {
    rows: Cell[][]
  }
  child: {
    title: string
    rows: Cell[][]
  }
}
