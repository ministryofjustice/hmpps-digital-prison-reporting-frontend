import { defaultMockRequest, generateNetworkMock, setupSimpleMock } from '@networkMocks/generateNetworkMock'
import { generateData } from './age-breakdown/dataGenerator'
import { generateData as generateDataQualityData } from './data-quality-metrics/dataGenerator'
import { generateData as generateDietData } from './diet-data/dataGenerator'
import { generateAgeBreakdownData } from './age-breakdown/data'
import { mockTimeSeriesDataLastSixMonths } from './data-quality-metrics/data'

const dataQualityDashboards = [
  'list-examples-data-quality',
  'list-examples-data-quality-historic',
  'list-examples-data-quality-flexible',
  'list-examples-data-quality-dataset',
  'chart-examples-data-quality',
  'chart-examples-data-quality-historic',
  'scorecard-examples-data-quality',
  'data-quality-dashboard-base',
]

const dietDashboards = [
  'list-examples-diet-totals',
  'list-examples-fallback-keys',
  'list-examples-diet-totals-historic',
  'list-examples-diet-totals-full-set',
  'chart-examples-diet-totals',
  'chart-examples-diet-totals-flexible',
  'chart-examples-diet-totals-historic',
  'chart-examples-diet-totals-historic-flexible',
  'scorecard-examples-diet-totals',
]

export const listsExampleDashboardResultMock = setupSimpleMock(
  `/reports/[a-zA-Z0-9-_]+/dashboards/(lists-example-dashboard)/tables/tblId_[a-zA-Z0-9]+/result`,
  generateData({}),
)
export const ageBreakdownDashboard3ResultMock = setupSimpleMock(
  `/reports/[a-zA-Z0-9-_]+/dashboards/(age-breakdown-dashboard-3)/tables/tblId_[a-zA-Z0-9]+/result`,
  generateData({}),
)
export const ageBreakdownDashboard1And2ResultMock = setupSimpleMock(
  `/reports/[a-zA-Z0-9-_]+/dashboards/age-breakdown-dashboard-[1-2]/tables/tblId_[a-zA-Z0-9]+/result`,
  generateAgeBreakdownData('MDI', 'I'),
)
export const dataQualityDashboardsResultMock = setupSimpleMock(
  `/reports/dashboard-visualisations/dashboards/(${dataQualityDashboards.join('|')})/tables/tblId_[0-9]+/result`,
  generateDataQualityData({}),
)
export const dietDashboardsResultMock = setupSimpleMock(
  `/reports/dashboard-visualisations/dashboards/(${dietDashboards.join('|')})/tables/tblId_[0-9]+/result`,
  generateDietData({}),
)
export const testDashboardResultMock = generateNetworkMock({
  ...defaultMockRequest,
  request: {
    ...defaultMockRequest.request,
    urlPathPattern: `/reports/mock-dashboards/dashboards/test-dashboard-8/tables/tblId_[a-zA-Z0-9]+/result`,
    queryParameters: {
      pageSize: {
        matches: '20',
      },
    },
  },
  response: {
    ...defaultMockRequest.response,
    jsonBody: mockTimeSeriesDataLastSixMonths,
  },
})

export const catchallDashboardsResultMock = setupSimpleMock(
  `/reports/dashboard-visualisations/dashboards/[a-zA-Z0-9-_]+/tables/tblId_[0-9]+/result`,
  generateDataQualityData({}),
  100,
)

export const mocks = [
  listsExampleDashboardResultMock,
  ageBreakdownDashboard3ResultMock,
  ageBreakdownDashboard1And2ResultMock,
  dataQualityDashboardsResultMock,
  dietDashboardsResultMock,
  catchallDashboardsResultMock,
]
