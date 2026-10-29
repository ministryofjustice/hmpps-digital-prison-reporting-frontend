import { components } from '../../../src/dpr/types/api'
import { featureTestingDefinitions } from './feature-testing'
import { allVisualisationDefinitions } from './visualisations'
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

export const requestExamples: components['schemas']['DashboardDefinition'][] = [
  successfulExecution,
  failedExecution,
  serverError,
  expiredDashboard,
  requestTimeout,
  failedRequest,
]

// Feature testing examples
export const features: components['schemas']['DashboardDefinition'][] = featureTestingDefinitions

export default [...visualisations, ...features, ...requestExamples]
