import { components } from '../../../src/dpr/types/api'
import { allVisualisationDefinitions } from './visualisations'
import { allFeatureTestingDefinitions } from './feature-testing'
import {
  expiredDashboard,
  failedExecution,
  failedRequest,
  requestTimeout,
  serverError,
  successfulExecution,
} from './request-examples/definitions'

// Visualisations
export const visualisations: components['schemas']['DashboardDefinition'][] = [
  ...Object.values(allVisualisationDefinitions),
]

// Features
export const features: components['schemas']['DashboardDefinition'][] = [...Object.values(allFeatureTestingDefinitions)]

// Requests
export const requestExamples: components['schemas']['DashboardDefinition'][] = [
  successfulExecution,
  failedExecution,
  serverError,
  expiredDashboard,
  requestTimeout,
  failedRequest,
]

export default [...visualisations, ...features, ...requestExamples]
