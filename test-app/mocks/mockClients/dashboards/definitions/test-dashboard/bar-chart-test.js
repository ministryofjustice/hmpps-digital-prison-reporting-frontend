// @ts-nocheck
const { lists } = require('../examples/visualisations')
const { establishmentIdFilter, granularDateRangeFilter } = require('../../filter-definitions')

const barcharttest = {
  id: 'bar-chart-test',
  name: 'bar-chart-test',
  description: 'Dashboard used for testing testing',
  sections: [
    {
      id: 'test-section-1',
      display: 'Section 1 - Ethnicity charts',
      description: 'Section 1 description - charts showing ethnicity data',
      visualisations: [
        {
          id: 'pc-description',
          type: 'bar',
          display: 'Average wait list duration by Activity bar',
          columns: {
            keys: [
              {
                id: 'pc',
                display: 'Prison Code',
              },
              {
                id: 'activity',
                display: 'Activity',
              },
            ],
            measures: [
              {
                id: 'avg_waittime',
                display: 'Average time (days)',
              },
            ],
            filters: [
              {
                id: 'status',
                equals: null,
              },
            ],
            expectNulls: false,
          },
        },
      ],
    },
    {
      id: 'all-data',
      display: 'All Data',
      description: '',
      visualisations: [lists.fullDataset],
    },
  ],
  filterFields: [establishmentIdFilter, granularDateRangeFilter],
}

module.exports = barcharttest
