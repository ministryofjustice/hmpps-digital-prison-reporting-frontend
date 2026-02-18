// @ts-nocheck
const {
  extractQueryAndCreateTimestamps,
  generateRawValue,
  generateRag,
  initEstablishments,
  initBaseData,
} = require('../timeseriesDataHelper')

const baseData = {
  ts: { raw: '' },
  establishment_id: { raw: '' },
  has_metric_one: { raw: '' },
  metric_one_is_missing: { raw: '' },
  has_metric_two: { raw: '' },
  metric_two_is_missing: { raw: '' },
  has_metric_three: { raw: '' },
  metric_three_is_missing: { raw: '' },
  count: { raw: '' },
}

const generateData = (query) => {
  const { establishmentId, timestamps } = extractQueryAndCreateTimestamps(query)
  const estId = establishmentId || 'ALL'

  const data = timestamps.map((ts) => {
    const allTotals = initBaseData(baseData, ts)
    const allEstablishments = initEstablishments(allTotals[0], estId, ts)

    return allEstablishments.map((estData) => {
      const hasMetricOne = generateRawValue(100, 1)
      const MetricOneIsMissing = generateRawValue(100, 1)
      const hasMetricTwo = generateRawValue(100, 1)
      const MetricTwoIsMissing = generateRawValue(100, 1)
      const hasReligion = generateRawValue(100, 1)
      const religionIsMissing = generateRawValue(100, 1)

      return {
        ...estData,
        has_metric_one: {
          raw: hasMetricOne,
          rag: generateRag(hasMetricOne),
        },
        metric_one_is_missing: {
          raw: MetricOneIsMissing,
          rag: generateRag(MetricOneIsMissing),
        },
        has_metric_two: {
          raw: hasMetricTwo,
          rag: generateRag(hasMetricTwo),
        },
        metric_two_is_missing: {
          raw: MetricTwoIsMissing,
          rag: generateRag(MetricTwoIsMissing),
        },
        has_metric_three: {
          raw: hasReligion,
          rag: generateRag(hasReligion),
        },
        metric_three_is_missing: {
          raw: religionIsMissing,
          rag: generateRag(religionIsMissing),
        },
      }
    })
  })

  return data.flat()
}

module.exports = {
  generateData,
}
