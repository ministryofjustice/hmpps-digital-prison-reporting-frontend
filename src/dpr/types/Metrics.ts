export interface DashboardDataResponse {
  [key: string]: {
    raw: number | string
    rag?: number
  }
}
