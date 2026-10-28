import { mergedDataSet } from './data'

export const mergedDataSetNoTs = mergedDataSet.map(data => {
  return {
    ...data.establishment_id,
    ...data.wing,
    ...data.cell,
    ...data.diet,
    ...data.count,
  }
})
