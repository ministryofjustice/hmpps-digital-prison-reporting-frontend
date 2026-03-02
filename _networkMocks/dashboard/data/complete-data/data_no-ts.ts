import { completeDataSet } from './data'

export const completeDataSetNoTs = completeDataSet[0].map((data) => {
  return {
    ...data.establishment_id,
    ...data.has_metric_one,
    ...data.has_metric_two,
    ...data.has_metric_three,
    ...data.metric_one_is_missing,
    ...data.metric_two_is_missing,
    ...data.metric_three_is_missing,
  }
})
