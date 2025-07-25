const variant1 = require('./mockVariants/variant1')
const variant2 = require('./mockVariants/variant2')
const variant3 = require('./mockVariants/variant3')
const variant4 = require('./mockVariants/variant4')
const variant5 = require('./mockVariants/variant5')
const variant6 = require('./mockVariants/variant6')
const variant7 = require('./mockVariants/variant7')
const variant8 = require('./mockVariants/variant8')
const variant9 = require('./mockVariants/variant9')
const variant10 = require('./mockVariants/variant10')
const variant11 = require('./mockVariants/variant11')
const variant12 = require('./mockVariants/variant12')
const variant13 = require('./mockVariants/variant13')
const variant14 = require('./mockVariants/variant14')
const variant15 = require('./mockVariants/variant15')
const variant16 = require('./mockVariants/variant16')
const variant17 = require('./mockVariants/variant17')
const variant18 = require('./mockVariants/variant18')
const variant19 = require('./mockVariants/variant19')
const variant20 = require('./mockVariants/variant20')
const variant21 = require('./mockVariants/variant21')
const variant22 = require('./mockVariants/variant22')
const variant23 = require('./mockVariants/variant23-interactive')
const variant24 = require('./mockVariants/variant24-sync')
const variant25 = require('./mockVariants/variant25-granularDateRange')
const variant26 = require('./mockVariants/variant26-parent-child')
const variant27 = require('./mockVariants/variant27-parent-child-section')
const variant28 = require('./mockVariants/variant28-summary')
const variant29 = require('./mockVariants/variant29-summary-section')
const variant30 = require('./mockVariants/variant30-row-section')
const variant31 = require('./mockVariants/variant31-row-section-child')
const variant32 = require('./mockVariants/variant32-row-section_multiple-rows')
const variant33 = require('./mockVariants/variant33-row-section-child-multiple')
const variant34 = require('./mockVariants/variant34_incident_report')
const variant35 = require('./mockVariants/variant35-interactive-async')
const variant36 = require('./mockVariants/variant36-selected-filter-testing')
const variant37a = require('./mockVariants/variant37-missing')
const variant37b = require('./mockVariants/variant37-missing2')
const variant37c = require('./mockVariants/variant37-missing3')
const variant38 = require('./mockVariants/variant38')
const dashboardDefinition = require('../dashboards/dashboard-definitions')

module.exports = {
  report: {
    id: 'test-report-1',
    name: 'Test Report',
    description: 'Fallback description',
    variants: [
      variant1,
      variant2,
      variant3,
      variant4,
      variant5,
      variant6,
      variant7,
      variant8,
      variant9,
      variant10,
      variant11,
      variant12,
      variant13,
      variant14,
      variant15,
      variant16,
      variant17,
      variant18,
      variant19,
      variant20,
      variant21,
      variant22,
      variant23,
      variant24,
      variant25,
      variant26,
      variant27,
      variant28,
      variant29,
      variant30,
      variant31,
      variant32,
      variant33,
      variant34,
      variant35,
      variant36,
      variant37a,
      variant37b,
      variant37c,
      variant38,
    ],
    dashboards: dashboardDefinition,
  },
  reports: [
    {
      id: 'test-report-3',
      name: 'C Test Report',
      variants: [
        variant1,
        variant2,
        variant3,
        variant4,
        variant24,
        variant28,
        variant29,
        variant30,
        variant31,
        variant32,
        variant33,
        variant34,
        variant35,
        variant37a,
        variant37b,
        variant37c,
        variant38,
      ],
      dashboards: [dashboardDefinition[0]],
    },
    {
      id: 'test-report-4',
      name: 'D Test Report',
      variants: [variant5, variant6, variant7, variant27],
      dashboards: [dashboardDefinition[1]],
    },
    {
      id: 'test-report-2',
      name: 'B Test Report',
      description: 'Fallback Description',
      variants: [variant8, variant9, variant10, variant11, variant17, variant18, variant19, variant22],
      dashboards: [dashboardDefinition[2]],
    },
    {
      id: 'test-report-1',
      name: 'A Test Report',
      variants: [variant12, variant13, variant14, variant15, variant16, variant25, variant26, variant36],
      dashboards: dashboardDefinition,
    },
    {
      id: 'test-report-5',
      name: 'Query Validation',
      variants: [variant21],
      dashboards: dashboardDefinition,
    },
    {
      id: 'test-report-20',
      name: 'ORS Prisoner and Visitors Details Report',
      variants: [variant20],
      dashboards: [],
    },
    {
      id: 'test-report-6',
      name: 'Interactive reports',
      variants: [variant23],
      dashboards: [],
    },
    {
      id: 'test-report-7',
      name: 'Unauthorised reports',
      variants: [variant2, variant3, variant4],
      dashboards: [],
      authorised: false,
    },
  ],

  // ORS Prisoner and Visitors Details Report
}
