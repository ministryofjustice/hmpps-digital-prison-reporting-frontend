const mockLegacyReportCards = [
  {
    id: 'variantId-1',
    href: './async-reports/reportId-1/variantId-1/request',
    text: 'Test Variant 1',
    description: 'Test Variant 1 description - this will succeed',
  },
  {
    id: 'variantId-2',
    href: './async-reports/reportId-1/variantId-2/request',
    text: 'Test Variant 2',
    description: 'Test Variant 2 description - this will fail with returned Status: FAILED',
  },
  {
    id: 'variantId-3',
    href: './async-reports/reportId-1/variantId-3/request',
    text: 'Test Variant  3',
    description: 'Test Variant 3 description - this will fail with status code error',
  },
  {
    id: 'variantId-4',
    href: './async-reports/reportId-1/variantId-4/request',
    text: 'Test Variant 4',
    description: 'Test Variant 4 description - this will Expire',
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
