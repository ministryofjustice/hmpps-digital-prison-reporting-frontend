// @ts-nocheck
const {
  extractQueryAndCreateTimestamps,
  initEstablishments,
  generateFieldValuesWithCountData,
  addColumnValuesToRows,
  initBaseData,
} = require('../timeseriesDataHelper')

const baseData = {
  ts: { raw: '' },
  establishment_id: { raw: '' },
  wing: { raw: '' },
  age_range_1: { raw: '' },
  age_range_2: { raw: '' },
  MetricThree_code: { raw: '' },
  MetricThree_description: { raw: '' },
  ethnic_code: { raw: '' },
  ethnic_description: { raw: '' },
  MetricTwo_code: { raw: '' },
  MetricTwo_description: { raw: '' },
  cell: { raw: '' },
  age_range_1_18_25: { raw: '' },
  age_range_1_26_34: { raw: '' },
  age_range_1_35_44: { raw: '' },
  age_range_1_45_54: { raw: '' },
  age_range_1_55_64: { raw: '' },
  count: { raw: '' },
}

const generateData = (query) => {
  const { establishmentId, wing: wingFilter, timestamps } = extractQueryAndCreateTimestamps(query)

  const ageRange1Values = ['18-25', '26-34', '35-44', '45-54', '56-54']
  const wings = ['I', 'J', 'K']
  const cells = [
    '1-001',
    '1-002',
    '1-005',
    '1-006',
    '1-007',
    '1-008',
    '1-0010',
    '1-015',
    '1-016',
    '1-017',
    '1-018',
    '2-001',
    '2-002',
    '2-003',
    '2-004',
    '2-005',
    '2-007',
  ]
  const ageRange2Values = ['18-21', '22-29', '30-39', '40-49', '50-59']
  const MetricThreeCodes = ['ATHE', 'BUDD', 'CHRST', 'COFE', 'MOS', 'NIL', 'RC']
  const MetricThreeDescription = [
    'Atheist',
    'Buddhist',
    'Christian',
    'Church of England (Anglican)',
    'Muslim',
    'No MetricThree',
    'Roman Catholic',
  ]
  const MetricOneCodes = ['A2', 'W2']
  const MetricOneDescription = ['A2-Asian/Asian British: Pakistani', 'W1-White: Eng./Welsh/Scot./N.Irish/British']
  const MetricTwoCodes = ['BRIT']
  const MetricTwoDescription = ['British']

  const data = timestamps.map((ts) => {
    const baseTotals = initBaseData(baseData, ts)

    const allTotalsByEstablishment = initEstablishments(baseTotals[0], establishmentId, ts)

    const allTotalsByEstablishmentByWing = wingFilter
      ? generateFieldValuesWithCountData(allTotalsByEstablishment, ['wing'], [wings], wingFilter)
      : []

    const baseTotalsByEstablishmentByAgeRange1 = generateFieldValuesWithCountData(
      baseTotals,
      ['age_range_1'],
      [ageRange1Values],
    )

    const allTotalsByEstablishmentByAgeRange1 = generateFieldValuesWithCountData(
      allTotalsByEstablishment,
      ['age_range_1'],
      [ageRange1Values],
    )

    const allTotalsByEstablishmentByAgeRange2 = generateFieldValuesWithCountData(
      allTotalsByEstablishment,
      ['age_range_2'],
      [ageRange2Values],
    )

    const baseTotalsByEstablishmentByAgeRange2 = generateFieldValuesWithCountData(
      baseTotals,
      ['age_range_2'],
      [ageRange2Values],
    )

    const allTotalsByEstablishmentByAgeRange1ByWing = generateFieldValuesWithCountData(
      allTotalsByEstablishmentByWing,
      ['age_range_1'],
      [ageRange1Values],
    )

    const allTotalsByEstablishmentByAgeRange2ByWing = generateFieldValuesWithCountData(
      allTotalsByEstablishmentByWing,
      ['age_range_2'],
      [ageRange2Values],
    )

    const baseTotalsByEstablishmentByMetricThree = generateFieldValuesWithCountData(
      baseTotals,
      ['MetricThree_code', 'MetricThree_description'],
      [MetricThreeCodes, MetricThreeDescription],
    )

    const allTotalsByEstablishmentByMetricThree = generateFieldValuesWithCountData(
      allTotalsByEstablishment,
      ['MetricThree_code', 'MetricThree_description'],
      [MetricThreeCodes, MetricThreeDescription],
    )

    const allTotalsByEstablishmentByWingByMetricThree = generateFieldValuesWithCountData(
      allTotalsByEstablishmentByWing,
      ['MetricThree_code', 'MetricThree_description'],
      [MetricThreeCodes, MetricThreeDescription],
    )

    let baseTotalsByEstablishmentByMetricOne = generateFieldValuesWithCountData(
      baseTotals,
      ['ethnic_code', 'ethnic_description'],
      [MetricOneCodes, MetricOneDescription],
    )

    baseTotalsByEstablishmentByMetricOne = addColumnValuesToRows(baseTotalsByEstablishmentByMetricOne, [
      'age_range_1_18_25',
      'age_range_1_26_34',
      'age_range_1_35_44',
      'age_range_1_45_54',
      'age_range_1_55_64',
    ])

    let allTotalsByEstablishmentByMetricOne = generateFieldValuesWithCountData(
      allTotalsByEstablishment,
      ['ethnic_code', 'ethnic_description'],
      [MetricOneCodes, MetricOneDescription],
    )

    allTotalsByEstablishmentByMetricOne = addColumnValuesToRows(allTotalsByEstablishmentByMetricOne, [
      'age_range_1_18_25',
      'age_range_1_26_34',
      'age_range_1_35_44',
      'age_range_1_45_54',
      'age_range_1_55_64',
    ])

    let allTotalsByEstablishmentByWingByMetricOne = generateFieldValuesWithCountData(
      allTotalsByEstablishmentByWing,
      ['ethnic_code', 'ethnic_description'],
      [MetricOneCodes, MetricOneDescription],
    )

    allTotalsByEstablishmentByWingByMetricOne = addColumnValuesToRows(allTotalsByEstablishmentByWingByMetricOne, [
      'age_range_1_18_25',
      'age_range_1_26_34',
      'age_range_1_35_44',
      'age_range_1_45_54',
      'age_range_1_55_64',
    ])

    const allTotalsByEstablishmentByWingByCell = generateFieldValuesWithCountData(
      allTotalsByEstablishmentByWing,
      ['cell'],
      [cells],
    )

    const allTotalsByEstablishmentByMetricTwo = generateFieldValuesWithCountData(
      allTotalsByEstablishment,
      ['MetricTwo_code', 'MetricTwo_description'],
      [MetricTwoCodes, MetricTwoDescription],
    )

    const allTotalsByEstablishmentByWingByMetricTwo = generateFieldValuesWithCountData(
      allTotalsByEstablishmentByWing,
      ['MetricTwo_code', 'MetricTwo_description'],
      [MetricTwoCodes, MetricTwoDescription],
    )

    return [
      ...baseTotals,
      ...baseTotalsByEstablishmentByAgeRange1,
      ...baseTotalsByEstablishmentByAgeRange2,
      ...allTotalsByEstablishment,
      ...allTotalsByEstablishmentByWing,
      ...allTotalsByEstablishmentByAgeRange1,
      ...allTotalsByEstablishmentByAgeRange2,
      ...allTotalsByEstablishmentByAgeRange1ByWing,
      ...allTotalsByEstablishmentByAgeRange2ByWing,
      ...baseTotalsByEstablishmentByMetricThree,
      ...allTotalsByEstablishmentByMetricThree,
      ...allTotalsByEstablishmentByWingByMetricThree,
      ...allTotalsByEstablishmentByMetricOne,
      ...baseTotalsByEstablishmentByMetricOne,
      ...allTotalsByEstablishmentByWingByMetricOne,
      ...allTotalsByEstablishmentByWingByCell,
      ...allTotalsByEstablishmentByMetricTwo,
      ...allTotalsByEstablishmentByWingByMetricTwo,
    ]
  })

  return data.flat()
}

module.exports = {
  generateData,
}
