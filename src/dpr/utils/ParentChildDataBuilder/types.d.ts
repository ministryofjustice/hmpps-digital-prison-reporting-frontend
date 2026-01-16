import { Cell, SortKey } from '../DataTableBuilder/types'
import Dict = NodeJS.Dict

export interface ParentChildSortKey extends SortKey {
  childSortKeys: Dict<string>
}

export interface ChildData {
  id: string
  data: Array<Record<string, string>>
}

export interface ParentChildTemplateData {
  rowCount: number
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
    head: Cell[] | null
    rows: Cell[][]
  }
  children: {
    title: string
    head: Cell[] | null
    rows: Cell[][]
  }[]
}

export interface ParentChildDataset {
  parent: Record<string, string>
  children: {
    id: string
    data: Array<Record<string, string>>
  }[]
}
export interface GroupedParentChildDataset {
  parent: Array<Record<string, string>>
  children: {
    id: string
    data: Array<Record<string, string>>
  }[]
}
