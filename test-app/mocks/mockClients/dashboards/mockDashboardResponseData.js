const dayjs = require('dayjs')

const createTimeSeriesData = (start, end, granularity) => {
  const timeseriesArr = createTimestamps(start, end, granularity)
  return timeseriesArr.map((item) => {
    return item.map((entry) => {
      const hasEthnicity = generateRawValue()
      const ethnicityIsMissing = generateRawValue()

      return {
        ...entry,
        establishment_id: {
          raw: 'MDI',
        },
        has_ethnicity: {
          raw: hasEthnicity,
          rag: generateRag(hasEthnicity),
        },
        ethnicity_is_missing: {
          raw: ethnicityIsMissing,
          rag: generateRag(ethnicityIsMissing),
        },
      }
    })
  })
}

const createTimestamps = (start, end, granularity) => {
  const g = mapGranularityValue(granularity)
  const startDate = dayjs(start)
  const endDate = end || dayjs(start).subtract(1, g)
  const diff = Math.abs(startDate.diff(endDate, g, true))
  const roundedCount = Math.ceil(diff)
  const dateFormat = setFormat(g)

  console.log(
    JSON.stringify(
      {
        g,
        start,
        end,
        endDate,
        startDate,
        diff,
        roundedCount,
        dateFormat,
      },
      null,
      2,
    ),
  )

  const timestamps = []
  for (let i = 0; i < roundedCount; i += 1) {
    const date = startDate.add(i, g).format(dateFormat)
    timestamps.push([
      {
        timestamp: date,
      },
    ])
  }

  return timestamps
}

const mapGranularityValue = (granularity) => {
  let mappedValue = 'days'
  switch (granularity) {
    case 'daily':
      mappedValue = 'day'
      break
    case 'monthly':
      mappedValue = 'month'
      break
    case 'annually':
      mappedValue = 'year'
      break
    default:
      break
  }

  return mappedValue
}

const setFormat = (granularity) => {
  switch (granularity) {
    case 'day':
      return 'YYYY/MM/DD'
    case 'month':
      return 'MMM YY'
    case 'year':
      return 'YYYY'
    default:
      return 'YYYY/MM/DD'
  }
}

const generateRawValue = () => {
  return Math.round(Math.random() * (500 - 50) + 50)
}

const generateRag = (value) => {
  let ragValue

  if (value < 500) ragValue = 2
  if (value < 250) ragValue = 1
  if (value < 100) ragValue = 0

  return ragValue
}

module.exports = {
  createTimeSeriesData,
}
