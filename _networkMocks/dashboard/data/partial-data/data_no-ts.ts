import { partialDataSet } from './data'

export const partialDataSetNoTs = partialDataSet.map((data) => {
  return {
    ...data.establishment_id,
    ...data.wing,
    ...data.cell,
    ...data.diet,
    ...data.count,
  }
})
