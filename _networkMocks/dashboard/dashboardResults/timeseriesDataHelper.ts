import dayjs from 'dayjs'

export const splitIntoRandomValues = (total: number, parts: number): number[] => {
  let randomValues
  let sum = 0
  do {
    randomValues = Array.from({ length: parts }, Math.random)

    const currentSum = randomValues.reduce((acc, val) => acc + val, 0)
    const scale = (total - parts) / currentSum
    const scaledValues = randomValues.map((val) => Math.min(total, Math.round(val * scale) + 1))

    sum = scaledValues.reduce((acc, val) => acc + val, 0)
    randomValues = scaledValues
  } while (sum - total)

  return randomValues
}

export const extractQueryAndCreateTimestamps = (query) => {
  const start = query['filters.date.start'] || dayjs().format('YYYY-MM-DD')
  const end = query['filters.date.end'] || dayjs().format('YYYY-MM-DD')
  const granularity = query['filters.date.granularity'] || 'daily'
  const establishmentId = query['filters.establishment_id']
  const wing = query['filters.wing']
  const timestamps = createTimestamps(start, end, granularity)

  return {
    establishmentId,
    wing,
    timestamps,
  }
}

export const createTimestamps = (start, end, granularity) => {
  const g = mapGranularityValue(granularity)
  const startDate = dayjs(start)
  const endDate = dayjs(end)
  const endVal = end || endDate.add(1, g)
  const diff = Math.abs(startDate.diff(endVal, g, true))
  const roundedCount = g === 'day' ? Math.ceil(diff + 1) : Math.ceil(diff)
  const dateFormat = setFormat(g)
  const timestamps: string[] = []

  for (let i = 0; i < roundedCount; i += 1) {
    const date = endDate.subtract(i, g).format(dateFormat)
    timestamps.unshift(date)
  }

  return timestamps
}

export const mapGranularityValue = (granularity) => {
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

export const setFormat = (granularity) => {
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

export const generateRawValue = (maxOverride, minOverride) => {
  const max = maxOverride || 800
  const min = minOverride || 400
  return Math.round(Math.random() * (max - min) + min)
}

export const generateRag = (value) => {
  let ragValue

  if (value < 800) ragValue = 2
  if (value < 600) ragValue = 1
  if (value < 500) ragValue = 0

  return ragValue
}

export const initBaseData = (baseData, ts) => {
  return [
    {
      ...baseData,
      ts: { raw: ts },
      count: { raw: 5000 },
    },
  ]
}

export const initEstablishments = (baseData, establishmentId, timestamp) => {
  let establishmentData = []
  const total = +baseData.count.raw
  const totals = splitIntoRandomValues(total, 4)
  const ts = timestamp ? { raw: timestamp } : { raw: 'Feb 25' }

  const base = {
    ...baseData,
    ts,
  }

  const mdiData = {
    ...base,
    establishment_id: { raw: 'MDI' },
    count: { raw: totals[0] },
  }

  const sliData = {
    ...base,
    establishment_id: { raw: 'SLI' },
    count: { raw: totals[1] },
  }

  const daiData = {
    ...base,
    establishment_id: { raw: 'DAI' },
    count: { raw: totals[2] },
  }

  const ltiData = {
    ...base,
    establishment_id: { raw: 'LTI' },
    count: { raw: totals[2] },
  }

  switch (establishmentId) {
    case 'MDI':
      establishmentData.push(mdiData)
      break
    case 'SLI':
      establishmentData.push(sliData)
      break
    case 'DAI':
      establishmentData.push(daiData)
      break
    case 'LTI':
      establishmentData.push(daiData)
      break
    case 'ALL':
      establishmentData = [mdiData, sliData, daiData, ltiData]
      break
    default:
      establishmentData = []
      break
  }
  return establishmentData
}

/**
 * @param {*} reportData
 * @param {*} fields: string[]
 * @param {*} values: string[][]
 * @param {*} filter
 * @return {*}
 */
export const generateFieldValuesWithCountData = (reportData, fields, values, filter) => {
  return reportData.flatMap((d) => {
    const total = +d.count.raw
    const totals = splitIntoRandomValues(total, values[0].length)

    const fieldData = []
    fields.forEach((field, fieldIndex) => {
      return values[fieldIndex].forEach((value, index) => {
        fieldData[index] = {
          ...fieldData[index],
          [field]: { raw: value },
        }
      })
    })

    return fieldData
      .map((data, index) => {
        return {
          ...d,
          ...data,
          count: { raw: `${totals[index]}` },
        }
      })
      .filter((data) => {
        return !filter || (filter && data[fields].raw === filter)
      })
  })
}

export const addColumnValuesToRows = (rows, columns) => {
  return rows.map((row) => {
    const total = +row.count.raw
    const totals = splitIntoRandomValues(total, columns.length)
    const colValues = columns.reduce((acc, col, index) => {
      acc[col] = { raw: totals[index] }
      return acc
    }, {})

    return {
      ...row,
      ...colValues,
    }
  })
}
