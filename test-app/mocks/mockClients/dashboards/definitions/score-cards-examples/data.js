const dayjs = require('dayjs')
const { createTimestamps } = require('./timeseriesDataHelper')

const createCellTotals = (data) => {
  return data.flatMap((d) => {
    const total = +d.total_prisoners.raw
    const totals = splitIntoRandomValues(total, 3)
    const cellData = []
    for (let index = 0; index < 3; index++) {
      cellData.push({
        ...d,
        cell: { raw: `${d.wing.raw}-${index}` },
        total_prisoners: { raw: `${totals[index]}` },
      })
    }
    return cellData
  })
}

const createDietTotals = (data) => {
  return data.flatMap((d) => {
    const total = +d.total_prisoners.raw
    const totals = splitIntoRandomValues(total, 4)
    return [
      {
        ...d,
        diet: { raw: 'Vegetarian' },
        total_prisoners: { raw: `${totals[0]}` },
      },
      {
        ...d,
        diet: { raw: 'Pescatarian' },
        total_prisoners: { raw: `${totals[1]}` },
      },
      {
        ...d,
        diet: { raw: 'Vegan' },
        total_prisoners: { raw: `${totals[2]}` },
      },
      {
        ...d,
        diet: { raw: 'Omnivore' },
        total_prisoners: { raw: `${totals[3]}` },
      },
    ]
  })
}

const createWingTotals = (data, wing) => {
  return data
    .flatMap((d) => {
      const total = +d.total_prisoners.raw
      const totals = splitIntoRandomValues(total, 4)
      return [
        {
          ...d,
          wing: { raw: 'east' },
          total_prisoners: { raw: `${totals[0]}` },
        },
        {
          ...d,
          wing: { raw: 'west' },
          total_prisoners: { raw: `${totals[1]}` },
        },
        {
          ...d,
          wing: { raw: 'north' },
          total_prisoners: { raw: `${totals[2]}` },
        },
        {
          ...d,
          wing: { raw: 'south' },
          total_prisoners: { raw: `${totals[3]}` },
        },
      ]
    })
    .filter((d) => {
      return !wing || (wing && d.wing.raw === wing)
    })
}

const splitIntoRandomValues = (total, parts) => {
  let arr = new Array(parts)
  let sum = 0
  do {
    for (let i = 0; i < parts; i++) {
      arr[i] = Math.random()
    }
    sum = arr.reduce((acc, val) => acc + val, 0)
    const scale = (total - parts) / sum
    arr = arr.map((val) => Math.min(total, Math.round(val * scale) + 1))
    sum = arr.reduce((acc, val) => acc + val, 0)
  } while (sum - total)

  return arr
}

const initEstablishmentTotals = (establishmentId, timestamp) => {
  let establishmentData = []
  const ts = timestamp ? { raw: timestamp } : { raw: 'Feb 25' }

  const totalsByEstablishmentMDI = {
    ts,
    establishment_id: { raw: 'MDI' },
    wing: { raw: '' },
    cell: { raw: '' },
    diet: { raw: '' },
    total_prisoners: { raw: '300' },
  }

  const totalsByEstablishmentSLI = {
    ts,
    establishment_id: { raw: 'SLI' },
    wing: { raw: '' },
    cell: { raw: '' },
    diet: { raw: '' },
    total_prisoners: { raw: '400' },
  }
  const totalsByEstablishmentDAI = {
    ts,
    establishment_id: { raw: 'DAI' },
    wing: { raw: '' },
    cell: { raw: '' },
    diet: { raw: '' },
    total_prisoners: { raw: '500' },
  }

  switch (establishmentId) {
    case 'MDI':
      establishmentData.push(totalsByEstablishmentMDI)
      break
    case 'SLI':
      establishmentData.push(totalsByEstablishmentSLI)
      break
    case 'DAI':
      establishmentData.push(totalsByEstablishmentDAI)
      break
    default:
      establishmentData = [totalsByEstablishmentMDI, totalsByEstablishmentSLI, totalsByEstablishmentDAI]
      break
  }
  return establishmentData
}

const generateData = (query) => {
  const start = query['filters.date.start'] || dayjs().format('YYYY-MM-DD')
  const end = query['filters.date.end'] || dayjs().format('YYYY-MM-DD')
  const granularity = query['filters.date.granularity'] || 'daily'
  const establishmentId = query['filters.establishment_id']
  const wing = query['filters.wing']

  const timestamps = createTimestamps(start, end, granularity)

  const data = timestamps.map((ts) => {
    const allTotalsByEstablishment = initEstablishmentTotals(establishmentId, ts)
    const allTotalsByEstablishmentByWing = createWingTotals(allTotalsByEstablishment, wing)
    const allTotalsByEstablishmentByWingByCell = createCellTotals(allTotalsByEstablishmentByWing)
    const allDietTotalsByEstablishment = createDietTotals(allTotalsByEstablishment)
    const allDietTotalsByEstablishmentByWing = createDietTotals(allTotalsByEstablishmentByWing)
    const allDietTotalsByEstablishmentByWingByCell = createDietTotals(allTotalsByEstablishmentByWingByCell)

    return [
      ...allTotalsByEstablishment,
      ...allTotalsByEstablishmentByWing,
      ...allTotalsByEstablishmentByWingByCell,
      ...allDietTotalsByEstablishment,
      ...allDietTotalsByEstablishmentByWing,
      ...allDietTotalsByEstablishmentByWingByCell,
    ]
  })

  return data
}

module.exports = {
  generateData,
}
