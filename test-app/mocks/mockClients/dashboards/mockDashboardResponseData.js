const dayjs = require('dayjs')

const establishmentIds = ['MDI', 'SLI', 'DAI', 'LTI']

const createTimeSeriesData = (start, end, granularity, sets) => {
  const timeseriesArr = createTimestamps(start, end, granularity, sets)
  return timeseriesArr.map((item) => {
    return item.map((entry) => {
      const hasEthnicity = generateRawValue()
      const ethnicityIsMissing = generateRawValue()
      const hasNationality = generateRawValue()
      const nationalityIsMissing = generateRawValue()
      const hasReligion = generateRawValue()
      const religionIsMissing = generateRawValue()

      return {
        ...entry,
        has_ethnicity: {
          raw: hasEthnicity,
          rag: generateRag(hasEthnicity),
        },
        ethnicity_is_missing: {
          raw: ethnicityIsMissing,
          rag: generateRag(ethnicityIsMissing),
        },
        has_nationality: {
          raw: hasNationality,
          rag: generateRag(hasNationality),
        },
        nationality_is_missing: {
          raw: nationalityIsMissing,
          rag: generateRag(nationalityIsMissing),
        },
        has_religion: {
          raw: hasReligion,
          rag: generateRag(hasReligion),
        },
        religion_is_missing: {
          raw: religionIsMissing,
          rag: generateRag(religionIsMissing),
        },
      }
    })
  })
}

const createTimestamps = (start, end, granularity, sets) => {
  const g = mapGranularityValue(granularity)
  const startDate = dayjs(start)
  const endDate = dayjs(end)
  const endVal = end || endDate.add(1, g)
  const diff = Math.abs(startDate.diff(endVal, g, true))
  const roundedCount = g === 'day' ? Math.ceil(diff + 1) : Math.ceil(diff)
  const dateFormat = setFormat(g)

  // console.log(
  //   JSON.stringify(
  //     {
  //       g,
  //       start,
  //       end,
  //       endDate,
  //       startDate,
  //       diff,
  //       roundedCount,
  //       dateFormat,
  //     },
  //     null,
  //     2,
  //   ),
  // )

  const timestamps = []
  for (let i = 0; i < roundedCount; i += 1) {
    const date = endDate.subtract(i, g).format(dateFormat)
    const ts = []
    for (let index = 0; index < sets; index += 1) {
      ts.push({
        timestamp: date,
        establishment_id: {
          raw: establishmentIds[index],
        },
      })
    }
    timestamps.unshift(ts)
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
  return Math.round(Math.random() * (800 - 400) + 400)
}

const generateRag = (value) => {
  let ragValue

  if (value < 800) ragValue = 2
  if (value < 600) ragValue = 1
  if (value < 500) ragValue = 0

  return ragValue
}

module.exports = {
  createTimeSeriesData,
}
