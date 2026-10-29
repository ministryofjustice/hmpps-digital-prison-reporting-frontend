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
import { defaultDataSet } from '../../data/default-data/data'

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
export const parentChildDashboardStatusParentFinishedMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-parent-dashboard/statements/exId_${reportIdRegex}/status`,
  {
    status: RequestStatus.FINISHED,
  },
)

export const parentChildDashboardStatusParentFailedMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-parent-dashboard/statements/exId_${reportIdRegex}/status`,
  {
    status: RequestStatus.FAILED,
  },
)

export const parentChildDashboardStatusChild1FinishedMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-1/statements/exId_${reportIdRegex}/status`,
  {
    status: RequestStatus.FINISHED,
  },
)

export const parentChildDashboardStatusChild1FailedMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-1/statements/exId_${reportIdRegex}/status`,
  {
    status: RequestStatus.FAILED,
  },
)

export const parentChildDashboardStatusChild2FinishedMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-2/statements/exId_${reportIdRegex}/status`,
  {
    status: RequestStatus.FINISHED,
  },
)

export const parentChildDashboardStatusChild2FailedMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-2/statements/exId_${reportIdRegex}/status`,
  {
    status: RequestStatus.FAILED,
  },
)

// results
export const dashboardResultParenChildParentMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-parent-dashboard/tables/tblId_${reportIdRegex}/result`,
  defaultDataSet,
)

export const dashboardResultParenChildParentNoDataMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-parent-dashboard/tables/tblId_${reportIdRegex}/result`,
  [],
)

export const dashboardResultParenChildParent404Mock = setupSimpleFailedMock(
  `/reports/feature-testing/dashboards/test-parent-dashboard/tables/tblId_${reportIdRegex}/result`,
  404,
  {
    userMessage: 'The stored report or dashboard was not found.',
    developerMessage: 'PreparedStatementCallback; uncategorized SQLException for SQL XYZ Entity Not Found',
  },
)

export const dashboardResultParenChildChild1Mock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-1/tables/tblId_${reportIdRegex}/result`,
  defaultDataSet,
)

export const dashboardResultParenChildChild1NoDataMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-1/tables/tblId_${reportIdRegex}/result`,
  [],
)

export const dashboardResultParenChildChild1404Mock = setupSimpleFailedMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-1/tables/tblId_${reportIdRegex}/result`,
  404,
  {
    userMessage: 'The stored report or dashboard was not found.',
    developerMessage: 'PreparedStatementCallback; uncategorized SQLException for SQL XYZ Entity Not Found',
  },
)

export const dashboardResultParenChildChild2Mock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-2/tables/tblId_${reportIdRegex}/result`,
  defaultDataSet,
)

export const dashboardResultParenChildChild2NoDataMock = setupSimpleMock(
  `/reports/feature-testing/dashboards/test-child-dashboard-2/tables/tblId_${reportIdRegex}/result`,
  [],
)

export const dashboardResultParenChildChild2404Mock = setupSimpleFailedMock(
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
