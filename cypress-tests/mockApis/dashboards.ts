import { testingDashboard8 } from './dashboards/definitions/test-dashboard/dashboard-definiton-1'
import { createBasicHttpStub, createHttpStub } from './wiremock'
import { mockTimeSeriesDataLastSixMonths } from './dashboards/data/data-quality-metrics/data'
import { dataQualityFullDataset } from './dashboards/definitions/examples/lists'

const stubs = {
  stubDashboardSuccessResult20: () =>
    createHttpStub(
      `GET`,
      `/reports/mock-dashboards/dashboards/test-dashboard-8/tables/tblId_[a-zA-Z0-9]+/result`,
      {
        pageSize: {
          matches: '20',
        },
      },
      undefined,
      200,
      mockTimeSeriesDataLastSixMonths,
    ),
  stubTestDashboard8: () =>
    createBasicHttpStub(`GET`, `/definitions/mock-dashboards/dashboards/test-dashboard-8`, 200, testingDashboard8),
  stubListExampleDashboard: () =>
    createBasicHttpStub(
      `GET`,
      `/definitions/dashboard-visualisations/dashboards/list-examples-data-quality-dataset`,
      200,
      dataQualityFullDataset,
    ),
  stubMockDashboardsStatus: () =>
    createBasicHttpStub(
      `GET`,
      `/reports/mock-dashboards/dashboards/Mock%20dashboards/statements/[a-zA-Z0-9_]+/status`,
      200,
      {
        status: 'FINISHED',
      },
    ),
  stubTestDashboard8Status: () =>
    createBasicHttpStub(
      `GET`,
      `/reports/mock-dashboards/dashboards/test-dashboard-8/statements/[a-zA-Z0-9_]+/status`,
      200,
      {
        status: 'FINISHED',
      },
    ),
  stubViewAsyncResults: () =>
    createBasicHttpStub(`GET`, `/async/dashboards/mock-dashboards/test-dashboard-8`, 200, {
      executionId: 'exId_238947923',
      tableId: 'tblId_1729765628165',
    }),
}

export default stubs
