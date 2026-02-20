// @ts-nocheck
const { establishmentIdFilter, wingFilterCompass, granularDateRangeFilter } = require('../../../filter-definitions')
const { lists } = require('../visualisations')

const historicDietTotals = {
  id: 'list-examples-diet-totals-historic',
  name: 'List Examples - Diet Totals - Historic',
  description: 'List examples',
  sections: [
    {
      id: 'section-1',
      display: 'Historic Totals',
      description: '',
      visualisations: [
        lists.dietTotalsOverTime,
        lists.dietTotalsByEstablishmentOverTime,
        lists.dietTotalsByEstablishmentByWingOverTime,
      ],
    },
    {
      id: 'section-3',
      display: 'Historic Diet Totals - optional keys',
      description: '',
      visualisations: [lists.dietTotalsByEstablishmentByWingOverTimeOptional],
    },
    {
      id: 'section-4',
      display: 'Historic Diet Totals',
      description: '',
      visualisations: [
        lists.dietTotalsDietOneOvertime,
        lists.dietTotalsDietThreeOvertime,
        lists.dietTotalsAllDietOvertime,
      ],
    },
    {
      id: 'section-5',
      display: 'Historic Diet By Key Totals',
      description: '',
      visualisations: [
        lists.dietTotalsDietOneOvertimeByEst,
        lists.dietTotalsDietOneOvertimeByEstByWing,
        lists.dietTotalsDietOneOvertimeByEstByWingOptional,
        lists.dietTotalsAllDietOvertimeByEst,
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
  historicDietTotals,
}
