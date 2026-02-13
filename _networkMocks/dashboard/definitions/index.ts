import { components } from '../../../src/dpr/types/api'

import { featureTestingDefinitions } from './feature-testing'

import { visualisations as completeDataVisualisations } from './visualisations/complete-dataset'
import { visualisations as partialDataVisualisations } from './visualisations/partial-dataset'

import {
  successfulExecution,
  failedExecution,
  serverError,
  expiredDashboard,
  requestTimeout,
  failedRequest,
} from './request-examples/definitions'

// Visualisations
export const visualisations: components['schemas']['DashboardDefinition'][] = [
  ...completeDataVisualisations,
  ...partialDataVisualisations,
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
