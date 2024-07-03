const getMockCardData = (req, definitions) => {
  const { dataProductDefinitionsPath } = req.query
  return definitions.report.variants.map((variant) => {
    const { id, name, description } = variant
    const path = `./async-reports/test-report-1/${id}/request`
    const href = dataProductDefinitionsPath ? `${path}?dataProductDefinitionsPath=${dataProductDefinitionsPath}` : path
    return {
      id,
      text: name,
      description,
      href,
    }
  })
}

module.exports = getMockCardData
