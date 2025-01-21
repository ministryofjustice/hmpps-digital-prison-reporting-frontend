export interface MetricsDataResponse {
  [key: string]: {
    raw: number | string
    rag?: number
  }
}
