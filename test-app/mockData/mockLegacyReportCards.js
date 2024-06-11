const mockLegacyReportCards = [
  {
    id: 'variantId-1',
    href: './async-reports/reportId-1/variantId-1/request',
    text: 'Test Variant 1',
    description: 'Test Variant 1 description',
  },
  {
    id: 'variantId-2',
    href: './async-reports/reportId-1/variantId-2/request',
    text: 'Test Variant 2',
    description: 'Test Variant 2 description',
  },
  {
    id: 'variantId-3',
    href: './async-reports/reportId-1/variantId-3/request',
    text: 'Test Variant  3',
    description: 'Test Variant 3 description',
  },
]

const getMockCardData = (req) => {
  const { dataProductDefinitionsPath } = req.query
  let cards = mockLegacyReportCards
  if (dataProductDefinitionsPath) {
    cards = mockLegacyReportCards.map((card) => {
      return {
        ...card,
        href: `${card.href}?dataProductDefinitionsPath=${dataProductDefinitionsPath}`,
      }
    })
  }

  return cards
}

module.exports = getMockCardData
