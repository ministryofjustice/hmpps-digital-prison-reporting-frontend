export interface ExecutionData {
  executionId?: string
  tableId?: string
  dataProductDefinitionsPath?: string
}

export interface ChildReportExecutionData extends ExecutionData {
  variantId: string
}
