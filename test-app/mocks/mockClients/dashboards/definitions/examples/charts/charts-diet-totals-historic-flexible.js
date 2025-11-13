// @ts-nocheck
const { establishmentIdFilter, wingFilterCompass, granularDateRangeFilter } = require('../../../filter-definitions')
const { lists, charts } = require('../visualisations')

const historicFlexibleDietTotals = {
  id: 'chart-examples-diet-totals-historic-flexible',
  name: 'Charts Examples - Diet Totals - Historic Flexible',
  description: 'List examples',
  sections: [
    {
      id: 'section-1',
      display: 'Historic Diet Totals',
      description: '',
      visualisations: [
        lists.dietTotalsByEstablishmentByWingOverTimeOptional,
        charts.dietTotalsByEstablishmentByWingOverTimeOptionalLine,
      ],
    },
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [lists.fullDatasetOverTime],
    },
  ],
  filterFields: [establishmentIdFilter, wingFilterCompass, granularDateRangeFilter],
}

module.exports = {
  historicFlexibleDietTotals,
}
