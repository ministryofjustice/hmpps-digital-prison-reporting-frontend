import { reportIdRegex, setupSimpleFailedMock, setupSimpleMock } from '@networkMocks/generateNetworkMock'

import { RequestStatus } from 'src/dpr/types/UserReports'
import { definition as definitionFeatureFlag } from './definition-feature-flag'
import { definition as definitionWithLinks } from './definition-links'
import {
  childDashboardOneDefinition,
  childDashboardTwoDefinition,
  parentChildDashboardDefinition,
} from './definition-parent-child'
import { definition as syncDefinition } from './definition-sync'
import { completeDataSet } from '../../data/complete-data/data'

const productId = 'feature-testing'

export const syncDashboardMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${syncDefinition.id}`,
  syncDefinition,
)

export const featureFlagDashboardMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${definitionFeatureFlag.id}`,
  definitionFeatureFlag,
)

export const dashboardWithLinksMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${definitionWithLinks.id}`,
  definitionWithLinks,
)

// PARENT CHILD DASHBOARDS

export const dashboardWithParentChildMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${parentChildDashboardDefinition.id}`,
  parentChildDashboardDefinition,
)

export const dashboardWithChildOneMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${childDashboardOneDefinition.id}`,
  childDashboardOneDefinition,
)

export const dashboardWithChildTwoMock = setupSimpleMock(
  `/definitions/${productId}/dashboards/${childDashboardTwoDefinition.id}`,
  childDashboardTwoDefinition,
)

// status
export const parentChildStatusParentFinishedMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-parent-dashboard/statements/exId_${reportIdRegex}/status`,
  {
    status: RequestStatus.FINISHED,
  },
)

export const parentChildStatusParentFailedMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-parent-dashboard/statements/exId_${reportIdRegex}/status`,
  {
    status: RequestStatus.FAILED,
  },
)

export const parentChildStatusChild1FinishedMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-1/statements/exId_${reportIdRegex}/status`,
  {
    status: RequestStatus.FINISHED,
  },
)

export const parentChildStatusChild1FailedMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-1/statements/exId_${reportIdRegex}/status`,
  {
    status: RequestStatus.FAILED,
  },
)

export const parentChildStatusChild2FinishedMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-2/statements/exId_${reportIdRegex}/status`,
  {
    status: RequestStatus.FINISHED,
  },
)

export const parentChildStatusChild2FailedMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-2/statements/exId_${reportIdRegex}/status`,
  {
    status: RequestStatus.FAILED,
  },
)

// results
export const getAsyncReportResultMockParentChildParentMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-parent-dashboard/tables/tblId_${reportIdRegex}/result`,
  completeDataSet,
)

export const getAsyncReportResultMockParentChildParentNoDataMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-parent-dashboard/tables/tblId_${reportIdRegex}/result`,
  [],
)

export const getAsyncReportResultMockParentChildParent404Mock = setupSimpleFailedMock(
  `/reports/feature-testing/dashboards/test-parent-dashboard/tables/tblId_${reportIdRegex}/result`,
  404,
  {
    userMessage: 'The stored report or dashboard was not found.',
    developerMessage: 'PreparedStatementCallback; uncategorized SQLException for SQL XYZ Entity Not Found',
  },
)

export const getAsyncReportResultMockParentChildChild1Mock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-1/tables/tblId_${reportIdRegex}/result`,
  completeDataSet,
)

export const getAsyncReportResultMockParentChildChild1NoDataMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-1/tables/tblId_${reportIdRegex}/result`,
  [],
)

export const getAsyncReportResultMockParentChildChild1404Mock = setupSimpleFailedMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-1/tables/tblId_${reportIdRegex}/result`,
  404,
  {
    userMessage: 'The stored report or dashboard was not found.',
    developerMessage: 'PreparedStatementCallback; uncategorized SQLException for SQL XYZ Entity Not Found',
  },
)

export const getAsyncReportResultMockParentChildChild2Mock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-2/tables/tblId_${reportIdRegex}/result`,
  completeDataSet,
)

export const getAsyncReportResultMockParentChildChild2NoDataMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-2/tables/tblId_${reportIdRegex}/result`,
  [],
)

export const getAsyncReportResultMockParentChildChild2404Mock = setupSimpleFailedMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-2/tables/tblId_${reportIdRegex}/result`,
  404,
  {
    userMessage: 'The stored report or dashboard was not found.',
    developerMessage: 'PreparedStatementCallback; uncategorized SQLException for SQL XYZ Entity Not Found',
  },
)

export const mocks = [
  syncDashboardMock,
  featureFlagDashboardMock,
  dashboardWithLinksMock,
  dashboardWithParentChildMock,
  dashboardWithChildOneMock,
  dashboardWithChildTwoMock,
]
