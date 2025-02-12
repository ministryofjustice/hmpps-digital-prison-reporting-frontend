const dayjs = require('dayjs')

const createTimestamps = (start, end, granularity) => {
  const g = mapGranularityValue(granularity)
  const startDate = dayjs(start)
  const endDate = dayjs(end)
  const endVal = end || endDate.add(1, g)
  const diff = Math.abs(startDate.diff(endVal, g, true))
  const roundedCount = g === 'day' ? Math.ceil(diff + 1) : Math.ceil(diff)
  const dateFormat = setFormat(g)
  const timestamps = []

  // Loop over timeperiods
  for (let i = 0; i < roundedCount; i += 1) {
    const date = endDate.subtract(i, g).format(dateFormat)
    timestamps.unshift(date)
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

module.exports = {
  createTimestamps,
}
