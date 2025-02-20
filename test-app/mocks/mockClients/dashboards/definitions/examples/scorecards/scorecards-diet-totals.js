const { establishmentIdFilter, wingFilterCompass, granularDateRangeFilter } = require('../../../filter-definitions')
const { scorecards, lists } = require('../visualisations')

const dietTotalsScoreCards = {
  id: 'scorecard-examples-diet-totals',
  name: 'Scorecard Examples - Diet Totals',
  description: 'Scorecard examples',
  sections: [
    {
      id: 'section-1',
      display: 'Diet Totals with flexible keys',
      description: 'Filtered rows will fall back to present keys',
      visualisations: [scorecards.dietTotalsFlexible],
    },
    // {
    //   id: 'section-2',
    //   display: 'Diet Totals with explicit keys',
    //   description:
    //     'These visualisations depend on the presence of key values. Otherwise the visulisation will show no data',
    //   visualisations: [
    //     lists.dietTotals,
    //     scorecards.dietTotals,
    //     scorecards.dietTotalsByEstablishment,
    //     scorecards.dietTotalsByEstablishmentByWing,
    //   ],
    // },
    // {
    //   id: 'section-3',
    //   display: 'Diet Totals by cell',
    //   description: 'Example showing a list as a scorecard group using column filters',
    //   visualisations: [scorecards.dietTotalsByEstablishmentByWingByCell],
    // },
    // {
    //   id: 'section-4',
    //   display: 'Diet Totals by cell loop',
    //   description: 'Example showing a list as scorecards, with more than two columns',
    //   visualisations: [scorecards.dietTotalsByEstablishmentByWingByCellLoop],
    // },
    // {
    //   id: 'totals-breakdown',
    //   display: 'Totals breakdown',
    //   visualisations: [lists.fullDataset],
    // },
  ],
  filterFields: [establishmentIdFilter, wingFilterCompass, granularDateRangeFilter],
}

module.exports = {
  dietTotalsScoreCards,
}
