import { completeDataSet } from './data'

export const completeDataSetNoTs = completeDataSet[0].map(data => {
  return {
    establishment_id: {
      ...data.establishment_id,
    },
    has_metric_one: {
      ...data.has_metric_one,
    },
    has_metric_two: {
      ...data.has_metric_two,
    },
    has_metric_three: {
      ...data.has_metric_three,
    },
    metric_one_is_missing: {
      ...data.metric_one_is_missing,
    },
    metric_two_is_missing: {
      ...data.metric_two_is_missing,
    },
    metric_three_is_missing: {
      ...data.metric_three_is_missing,
    },
  }
})
