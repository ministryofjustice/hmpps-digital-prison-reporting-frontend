export interface DashboardDataResponse {
  [key: string]: {
    raw?: number | string | null | undefined
    rag?: number
  }
}

export interface DashboardDataResponseWithRag {
  [key: string]: {
    raw: number | string
    rag: number
  }
}
