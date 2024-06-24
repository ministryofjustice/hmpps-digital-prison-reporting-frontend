import Dict = NodeJS.Dict

export interface RenderTableListResponse {
  head: {
    title: string
    icon: string
    id: string
    href?: string
  }
  cardData: CardData[]
  tableData: {
    rows: Dict<string>[][]
    head: Dict<string>[]
  }
  total: {
    amount: number
    shown: number
    max: number
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
