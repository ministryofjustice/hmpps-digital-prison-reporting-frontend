export interface DashboardDataResponse {
  [key: string]: {
    raw?: number | string | null
    rag?: number
  }
}

export interface DashboardDataResponseWithRag {
  [key: string]: {
    raw: number | string
    rag: number
  }
}
