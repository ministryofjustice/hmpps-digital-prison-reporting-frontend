import { testingDashboard2 } from "@networkMocks/dashboard/dashboardDefinitions/dashboard-definition-2-summary"
import { testingDashboard8 } from "@networkMocks/dashboard/dashboardDefinitions/dashboard-definiton-1-nat-eth-relig"

const { ageBreakdownReport2 } = require('../../../_networkMocks/dashboard/dashboardDefinitions/dashboard-definition-2')
const { ageBreakdownReport1 } = require('../../../_networkMocks/dashboard/dashboardDefinitions/dashboard-definition-1')
const { ageBreakdownReport3 } = require('../../../_networkMocks/dashboard/dashboardDefinitions/dashboard-definition-3')
const { dataQualityDashboard1 } = require('../../../_networkMocks/dashboard/dashboardDefinitions/dashboard-definition')
const { dataQualityDashboardBase } = require('../../../_networkMocks/dashboard/dashboardDefinitions/dashboard-definition-base')
const listExamples = require('../../../_networkMocks/dashboard/dashboardDefinitions/lists')
const scorecardExamples = require('../../../_networkMocks/dashboard/dashboardDefinitions/scorecards')
const chartExamples = require('../../../_networkMocks/dashboard/dashboardDefinitions/charts')

const successfulExecution = {
  id: 'test-dashboard-1',
  name: 'Test Dashboard 1',
  description: 'Will Succeed',
  sections: [],
  filterFields: [],
}

const failedExecution = {
  id: 'test-dashboard-2',
  name: 'Test Dashboard 2',
  description: 'Will fail with FAILED status',
  sections: [],
  filterFields: [],
}

const serverError = {
  id: 'test-dashboard-3',
  name: 'Test Dashboard 3',
  description: 'Will fail with server error',
  sections: [],
  filterFields: [],
}

const expiredDashboard = {
  id: 'test-dashboard-4',
  name: 'Test Dashboard 4',
  description: 'Will Expire',
  sections: [],
  filterFields: [],
}

const requestTimeout = {
  id: 'test-dashboard-5',
  name: 'Test Dashboard 5',
  description: 'Request will timeout',
  sections: [],
  filterFields: [],
}

const failedRequest = {
  id: 'test-dashboard-6',
  name: 'Test Dashboard 6',
  description: 'Request will fail',
  sections: [],
  filterFields: [],
}

export default {
  requestExamples: [successfulExecution, failedExecution, serverError, expiredDashboard, requestTimeout, failedRequest],
  mockDashboards: [
    testingDashboard2,
    testingDashboard8,
    dataQualityDashboardBase,
    dataQualityDashboard1,
    ageBreakdownReport1,
    ageBreakdownReport2,
    ageBreakdownReport3,
  ],
  visualisationExamples: [
    listExamples.fallBackKeysDashboard,
    listExamples.dietTotals,
    listExamples.historicDietTotals,
    listExamples.dataQuality,
    listExamples.dataQualityHistoric,
    listExamples.dietTotalsFullDataset,
    listExamples.dataQualityFullDataset,
    scorecardExamples.dietTotalsScoreCards,
    scorecardExamples.dataQualityScoreCards,
    chartExamples.historicDietTotals,
    chartExamples.historicFlexibleDietTotals,
    chartExamples.dietTotals,
    chartExamples.flexibleDietTotals,
    chartExamples.dataQuality,
    chartExamples.dataQualityHistoric,
  ],
}
