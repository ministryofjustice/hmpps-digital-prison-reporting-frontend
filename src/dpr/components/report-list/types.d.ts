import { ListWithWarnings } from '../../data/types'

export interface ListDataSources {
  data: Promise<Record<string, string>[]> | Promise<ListWithWarnings>
  count: Promise<number>
}

