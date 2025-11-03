const {
  extractQueryAndCreateTimestamps,
  initEstablishments,
  generateFieldValuesWithCountData,
  initBaseData,
} = require('../timeseriesDataHelper')

const baseData = {
  ts: { raw: '' },
  establishment_id: { raw: '' },
  wing: { raw: '' },
  cell: { raw: '' },
  diet: { raw: '' },
  finds: { raw: '', rag: '' },
  count: { raw: '' },
}

const generateData = (query, type) => {
  console.log('generating data')
  const { establishmentId, wing: wingFilter, timestamps } = extractQueryAndCreateTimestamps(query)

  console.log({ establishmentId, wing: wingFilter, timestamps })
  const wings = ['north', 'south', 'east', 'west']

  let values = ['Vegetarian', 'Pescatarian', 'Vegan', 'Omnivore']
  let valuesLabel = 'diet'
  if (type && type === 'finds') {
    values = ['Drugs', 'Phones', 'Weapons', 'Alcohol']
    valuesLabel = 'finds'
    delete baseData.diet
  } else {
    delete baseData.finds
  }

  const cells = ['cell-1', 'cell-2', 'cell-3', 'cell-4', 'cell-5']

  const data = timestamps.map((ts) => {
    const allTotals = initBaseData(baseData, ts)
    const allTotalsByEstablishment = initEstablishments(allTotals[0], establishmentId, ts)

    const allTotalsByEstablishmentByWing = wingFilter
      ? generateFieldValuesWithCountData(allTotalsByEstablishment, ['wing'], [wings], wingFilter)
      : []

    const allTotalsByEstablishmentByWingByCell = generateFieldValuesWithCountData(
      allTotalsByEstablishmentByWing,
      ['cell'],
      [cells],
    )

    const allValueTotals = generateFieldValuesWithCountData(allTotals, [valuesLabel], [values])

    const allValueTotalsByEstablishment = generateFieldValuesWithCountData(
      allTotalsByEstablishment,
      [valuesLabel],
      [values],
    )

    const allValueTotalsByEstablishmentByWing = generateFieldValuesWithCountData(
      allTotalsByEstablishmentByWing,
      [valuesLabel],
      [values],
    )
    const allValueTotalsByEstablishmentByWingByCell = generateFieldValuesWithCountData(
      allTotalsByEstablishmentByWingByCell,
      [valuesLabel],
      [values],
    )

    return [
      ...allTotals,
      ...allTotalsByEstablishment,
      ...allTotalsByEstablishmentByWing,
      ...allTotalsByEstablishmentByWingByCell,
      ...allValueTotals,
      ...allValueTotalsByEstablishment,
      ...allValueTotalsByEstablishmentByWing,
      ...allValueTotalsByEstablishmentByWingByCell,
    ]
  })

  return data.flat()
}

module.exports = {
  generateData,
}
