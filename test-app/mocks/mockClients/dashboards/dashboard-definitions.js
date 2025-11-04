const { ageBreakdownReport2 } = require('./definitions/age-breakdown/dashboard-definition-2')
const { ageBreakdownReport1 } = require('./definitions/age-breakdown/dashboard-definition-1')
const { ageBreakdownReport3 } = require('./definitions/age-breakdown/dashboard-definition-3')
const { dataQualityDashboard1 } = require('./definitions/data-quality/dashboard-definition')
const { dataQualityDashboardBase } = require('./definitions/data-quality/dashboard-definition-base')
const listExamples = require('./definitions/examples/lists')
const matrixExamples = require('./definitions/examples/matrix/definition')
const scorecardExamples = require('./definitions/examples/scorecards')
const chartExamples = require('./definitions/examples/charts')
const testingDashboards = require('./definitions/test-dashboard')

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

module.exports = {
  requestExamples: [successfulExecution, failedExecution, serverError, expiredDashboard, requestTimeout, failedRequest],
  mockDashboards: [
    ...testingDashboards,
    dataQualityDashboardBase,
    dataQualityDashboard1,
    ageBreakdownReport1,
    ageBreakdownReport2,
    ageBreakdownReport3,
  ],
  visualisationExamples: [
    matrixExamples.dataQualityHistoric,
    listExamples.fallBackKeysDashboard,
    listExamples.dietTotals,
    listExamples.historicDietTotals,
    listExamples.dataQuality,
    listExamples.dataQualityHistoric,
    listExamples.dietTotalsFullDataset,
    listExamples.dataQualityFullDataset,
    scorecardExamples.dietTotalsScoreCards,
    scorecardExamples.dataQualityScoreCards,
    scorecardExamples.docsScoreCard,
    chartExamples.historicDietTotals,
    chartExamples.historicFlexibleDietTotals,
    chartExamples.dietTotals,
    chartExamples.flexibleDietTotals,
    chartExamples.dataQuality,
    chartExamples.dataQualityHistoric,
  ],
}
