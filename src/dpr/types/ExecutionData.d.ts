export interface ExecutionData {
  executionId?: string | undefined
  tableId?: string | undefined
  dataProductDefinitionsPath?: string
}

export interface ChildReportExecutionData extends ExecutionData {
  variantId: string
}
