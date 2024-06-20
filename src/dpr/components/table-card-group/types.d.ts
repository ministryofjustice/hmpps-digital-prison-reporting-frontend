import Dict = NodeJS.Dict

export interface RenderTableListResponse {
  head: {
    title: string
    icon: string
    id: string
    emptyMessage: string
  }
  cardData: CardData[]
  tableData: {
    rows: Dict<string>[][]
    head: Dict<string>[]
  }
}

export interface CardData {
  id: string
  href: string
  text: string
  description: string
  timestamp?: string
  tag?: string
  status?: string
  summary?: { name: string; value: string }[]
}
