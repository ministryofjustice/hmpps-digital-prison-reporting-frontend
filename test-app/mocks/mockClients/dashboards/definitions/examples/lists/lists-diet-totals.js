// @ts-nocheck
const { establishmentIdFilter, wingFilterCompass } = require('../../../filter-definitions')
const { lists } = require('../visualisations')

const dietTotals = {
  id: 'list-examples-diet-totals',
  name: 'List Examples - Diet Totals',
  description: 'List examples',
  sections: [
    {
      id: 'section-1',
      display: 'Diet Totals',
      description: '',
      visualisations: [
        {
          id: 'total-prisoners',
          type: 'list',
          display: 'Prisoner totals by wing',
          columns: {
            keys: [
              {
                id: 'establishment_id',
                display: 'Establishment ID',
              },
              {
                id: 'wing',
                display: 'Wing',
              },
            ],
            measures: [
              {
                id: 'count',
                display: 'Total prisoners',
              },
            ],
            expectNulls: true,
          },
        },
        lists.dietTotals,
        lists.dietTotalsWithFilters,
        lists.dietTotalsWithFiltersSingleColumn,
        lists.dietTotalsByEstablishment,
        lists.dietTotalsByEstablishmentByWing,
      ],
    },
    {
      id: 'section-2',
      display: 'Diet Totals with optional keys',
      description: '',
      visualisations: [lists.dietTotalsByEstablishmentOptional, lists.dietTotalsByEstablishmentByWingOptional],
    },
    {
      id: 'section-3',
      display: 'Diet Totals by cell',
      description: '',
      visualisations: [lists.dietTotalsByEstablishmentByWingByCell],
    },
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter, wingFilterCompass],
}

module.exports = {
  dietTotals,
}
