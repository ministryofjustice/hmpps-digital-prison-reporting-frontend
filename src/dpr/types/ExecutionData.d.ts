export interface ExecutionData {
  executionId?: string | undefined
  tableId?: string | undefined
  dataProductDefinitionsPath?: string
}

export interface ChildReportExecutionData extends ExecutionData {
  variantId?: string
  datasetId?: string
}

// {
//   reportId: 'REportID',
//   variantId: 'MultipleDatasetId'
//   tableId: 'abc'
//   childExecutionData: [
//     {
//       datasetId: 'D1',
//       tableID: 'def',
//     },
//     {
//       datasetId: 'D2',
//       tableID: 'def',
//     },
//     {
//       datasetId: 'D2',
//       tableID: 'fgh',
//     },
//   ]
// }

// {
//   dataset: 'D1'
// }
