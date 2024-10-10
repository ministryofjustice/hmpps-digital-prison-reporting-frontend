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
  meta?: meta[]
  csrfToken?: string
  maxRows: number
}

interface meta {
  reportId: string
  variantId: string
  executionId: string
  status?: string
  requestedAt?: Date
  dataProductDefinitionsPath?: string
}

export interface CardData {
  id: string
  href: string
  text: string
  reportName: string
  description: string
  timestamp?: string
  tag?: string
  status?: string
  summary?: { name: string; value: string }[]
  meta?: meta
}
