// @ts-nocheck
const { establishmentIdFilter, granularDateRangeFilter } = require('../../../filter-definitions')
const { charts, lists } = require('../visualisations')

const dataQualityHistoric = {
  id: 'chart-examples-data-quality-historic',
  name: 'Chart Examples - Data Quality - Historic',
  description: 'chart examples',
  sections: [
    {
      id: 'section-1',
      display: 'Time series line charts',
      description: '',
      visualisations: [
        charts.dataQualityMetricOneHistoricLine,
        // charts.dataQualityMetricTwoHistoricLine,
        // charts.dataQualityMetricThreeHistoricLine,
      ],
    },
    // {
    //   id: 'section-2',
    //   display: 'Time series bar charts',
    //   description: '',
    //   visualisations: [
    //     charts.dataQualityMetricOneHistoricBar,
    //     charts.dataQualityMetricTwoHistoricBar,
    //     charts.dataQualityMetricThreeHistoricBar,
    //   ],
    // },
    {
      id: 'totals-breakdown',
      display: 'Totals breakdown',
      visualisations: [lists.fullDatasetOverTime],
    },
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}

module.exports = {
  dataQualityHistoric,
}
