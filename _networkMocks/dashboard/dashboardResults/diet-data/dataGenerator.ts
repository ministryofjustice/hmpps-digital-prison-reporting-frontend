import {
  extractQueryAndCreateTimestamps,
  initEstablishments,
  generateFieldValuesWithCountData,
  initBaseData,
} from '../timeseriesDataHelper'

const baseData = {
  ts: { raw: '' },
  establishment_id: { raw: '' },
  wing: { raw: '' },
  cell: { raw: '' },
  diet: { raw: '' },
  count: { raw: '' },
}

export const generateData = (query: Record<string, string>) => {
  const { establishmentId, wing: wingFilter, timestamps } = extractQueryAndCreateTimestamps(query)
  const wings = ['north', 'south', 'east', 'west']
  const dietValues = ['Vegetarian', 'Pescatarian', 'Vegan', 'Omnivore']
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

    const allDietTotals = generateFieldValuesWithCountData(allTotals, ['diet'], [dietValues])

    const allDietTotalsByEstablishment = generateFieldValuesWithCountData(
      allTotalsByEstablishment,
      ['diet'],
      [dietValues],
    )

    const allDietTotalsByEstablishmentByWing = generateFieldValuesWithCountData(
      allTotalsByEstablishmentByWing,
      ['diet'],
      [dietValues],
    )

    const allDietTotalsByEstablishmentByWingByCell = generateFieldValuesWithCountData(
      allTotalsByEstablishmentByWingByCell,
      ['diet'],
      [dietValues],
    )

    return [
      ...allTotals,
      ...allTotalsByEstablishment,
      ...allTotalsByEstablishmentByWing,
      ...allTotalsByEstablishmentByWingByCell,
      ...allDietTotals,
      ...allDietTotalsByEstablishment,
      ...allDietTotalsByEstablishmentByWing,
      ...allDietTotalsByEstablishmentByWingByCell,
    ]
  })

  return data.flat()
}

export default {
  generateData,
}
