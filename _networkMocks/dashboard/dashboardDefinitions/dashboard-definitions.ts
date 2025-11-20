import { components } from 'src/dpr/types/api'
import { testingDashboard2 } from './dashboard-definition-2-summary'
import { testingDashboard8 } from './dashboard-definiton-1-nat-eth-relig'

import { ageBreakdownReport2 } from './dashboard-definition-2'
import { ageBreakdownReport1 } from './dashboard-definition-1'
import { ageBreakdownReport3 } from './dashboard-definition-3'
import { dataQualityDashboard1 } from './dashboard-definition'
import { dataQualityDashboardBase } from './dashboard-definition-base'

import listExamples from './lists'
import matrixExamples from './matrix'
import scorecardExamples from './scorecards'
import chartExamples from './charts'

const successfulExecution = {
  id: 'test-dashboard-1',
  name: 'Test Dashboard 1',
  description: 'Will Succeed',
  sections: <components['schemas']['DashboardSectionDefinition'][]>[],
  filterFields: <components['schemas']['FieldDefinition'][]>[],
}

const failedExecution = {
  id: 'test-dashboard-2',
  name: 'Test Dashboard 2',
  description: 'Will fail with FAILED status',
  sections: <components['schemas']['DashboardSectionDefinition'][]>[],
  filterFields: <components['schemas']['FieldDefinition'][]>[],
}

const serverError = {
  id: 'test-dashboard-3',
  name: 'Test Dashboard 3',
  description: 'Will fail with server error',
  sections: <components['schemas']['DashboardSectionDefinition'][]>[],
  filterFields: <components['schemas']['FieldDefinition'][]>[],
}

const expiredDashboard = {
  id: 'test-dashboard-4',
  name: 'Test Dashboard 4',
  description: 'Will Expire',
  sections: <components['schemas']['DashboardSectionDefinition'][]>[],
  filterFields: <components['schemas']['FieldDefinition'][]>[],
}

const requestTimeout = {
  id: 'test-dashboard-5',
  name: 'Test Dashboard 5',
  description: 'Request will timeout',
  sections: <components['schemas']['DashboardSectionDefinition'][]>[],
  filterFields: <components['schemas']['FieldDefinition'][]>[],
}

const failedRequest = {
  id: 'test-dashboard-6',
  name: 'Test Dashboard 6',
  description: 'Request will fail',
  sections: <components['schemas']['DashboardSectionDefinition'][]>[],
  filterFields: <components['schemas']['FieldDefinition'][]>[],
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
    scorecardExamples.scoreCardTest,
    scorecardExamples.scoreCardBucketTest,
    chartExamples.historicDietTotals,
    chartExamples.historicFlexibleDietTotals,
    chartExamples.dietTotals,
    chartExamples.flexibleDietTotals,
    chartExamples.dataQuality,
    chartExamples.dataQualityHistoric,
    matrixExamples.dataQualityHistoric,
  ],
}
