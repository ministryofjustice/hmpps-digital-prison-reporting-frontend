export interface ExecutionData {
  executionId: string
  tableId: string
}

export interface ChildReportExecutionData extends ExecutionData {
  variantId: string
}
