const {
  extractQueryAndCreateTimestamps,
  generateRawValue,
  generateRag,
  initEstablishments,
} = require('../timeseriesDataHelper')

const baseData = {
  establishment_id: { raw: '' },
  has_ethnicity: { raw: '' },
  ethnicity_is_missing: { raw: '' },
  has_nationality: { raw: '' },
  nationality_is_missing: { raw: '' },
  has_religion: { raw: '' },
  religion_is_missing: { raw: '' },
  count: { raw: '' },
}

const generateData = (query) => {
  const { establishmentId, timestamps } = extractQueryAndCreateTimestamps(query)

  const data = timestamps.map((ts) => {
    const allEstablishments = initEstablishments(baseData, establishmentId, ts)

    return allEstablishments.map((estData) => {
      const hasEthnicity = generateRawValue()
      const ethnicityIsMissing = generateRawValue()
      const hasNationality = generateRawValue()
      const nationalityIsMissing = generateRawValue()
      const hasReligion = generateRawValue()
      const religionIsMissing = generateRawValue()

      return {
        ...estData,
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

  return data.flat()
}

module.exports = {
  generateData,
}
