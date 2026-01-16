import Dict = NodeJS.Dict

export interface ListRequest {
  selectedPage: number
  pageSize: number
  sortColumn?: string | undefined
  sortedAsc: boolean
}

export interface FilteredListRequest extends ListRequest {
  filters: Dict<string>
}
