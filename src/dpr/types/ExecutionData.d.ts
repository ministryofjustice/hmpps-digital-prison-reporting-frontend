export interface ExecutionData {
  executionId?: string | undefined
  tableId?: string | undefined
}

export interface ChildReportExecutionData extends ExecutionData {
  variantId: string
  status?: RequestStatus
}
