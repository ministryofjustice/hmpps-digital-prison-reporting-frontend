const dayjs = require('dayjs')

const establishmentIds = ['MDI', 'SLI', 'DAI', 'LTI']
const wingIds = [
  ['I', 'J', 'K'],
  ['L', 'M', 'N'],
  ['O', 'P', 'Q'],
  ['R', 'S', 'T'],
]

const createTimeSeriesData = (start, end, granularity, data, establishmentCount, includeWings) => {
  const timeseriesArr = createTimestamps(start, end, granularity, establishmentCount, includeWings)
  return timeseriesArr.map((item) => {
    return item.map((entry) => {
      Object.keys(data).forEach((key) => {
        const raw = data[key] === 'number' ? `${generateRawValue()}` : ''
        let rag
        if (raw.length) rag = generateRag(raw)

        // eslint-disable-next-line no-param-reassign
        entry[key] = {
          raw,
          rag,
        }
      })

      return entry
    })
  })
}

const createTimestamps = (start, end, granularity, establishmentCount, includeWings) => {
  const g = mapGranularityValue(granularity)
  const startDate = dayjs(start)
  const endDate = dayjs(end)
  const endVal = end || endDate.add(1, g)
  const diff = Math.abs(startDate.diff(endVal, g, true))
  const roundedCount = g === 'day' ? Math.ceil(diff + 1) : Math.ceil(diff)
  const dateFormat = setFormat(g)

  const timestamps = []
  for (let i = 0; i < roundedCount; i += 1) {
    const date = endDate.subtract(i, g).format(dateFormat)
    const ts = []
    for (let index = 0; index < establishmentCount; index += 1) {
      if (includeWings) {
        wingIds[index].forEach((wingId) => {
          ts.push({
            ts: { raw: date },
            establishment_id: {
              raw: establishmentIds[index],
            },
            wing: {
              raw: wingId,
            },
          })
        })
      } else {
        ts.push({
          ts: { raw: date },
          establishment_id: {
            raw: establishmentIds[index],
          },
        })
      }
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
