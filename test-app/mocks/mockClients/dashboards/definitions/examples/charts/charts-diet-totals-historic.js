// @ts-nocheck
const { establishmentIdFilter, wingFilterCompass, granularDateRangeFilter } = require('../../../filter-definitions')
const { lists, charts } = require('../visualisations')

const historicDietTotals = {
  id: 'chart-examples-diet-totals-historic',
  name: 'Charts Examples - Diet Totals - Historic',
  description: 'List examples',
  sections: [
    {
      id: 'section-1',
      display: 'Historic Totals',
      description: '',
      visualisations: [
        lists.dietTotalsOverTime,
        charts.dietTotalsOverTime,
        lists.dietTotalsByEstablishmentOverTime,
        charts.dietTotalsByEstablishmentOverTime,
        lists.dietTotalsByEstablishmentByWingOverTime,
        charts.dietTotalsByEstablishmentByWingOverTime,
      ],
    },
    {
      id: 'section-2',
      display: 'Historic Diet Totals',
      description: '',
      visualisations: [
        lists.dietTotalsDietOneOvertime,
        charts.dietTotalsDietOneOvertime,
        lists.dietTotalsDietThreeOvertime,
        charts.dietTotalsDietThreeOvertime,
      ],
    },
    {
      id: 'section-3',
      display: 'Historic Diet By Key Totals',
      description: '',
      visualisations: [
        lists.dietTotalsDietOneOvertimeByEst,
        charts.dietTotalsDietOneOvertimeByEstLine,
        lists.dietTotalsDietOneOvertimeByEstByWing,
        charts.dietTotalsDietOneOvertimeByEstByWingLine,
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
