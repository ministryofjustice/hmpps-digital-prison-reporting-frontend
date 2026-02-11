import { components } from 'src/dpr/types/api'
import { definition as listCompleteDataset } from './visualisations/complete-dataset/list/definition'
import { definition as listCompleteDatasetHistoric } from './visualisations/complete-dataset/list/definition-historic'
import { definition as listPartialDataset } from './visualisations/partial-dataset/list/definition'
import { definition as listPartialDatasetHistoric } from './visualisations/partial-dataset/list/definition-historic'
import { definition as scorecardsCompleteDataset } from './visualisations/complete-dataset/scorecard/definition'
import { definition as scorecardsBucketsCompleteDataset } from './visualisations/complete-dataset/scorecard/definition-buckets'
import { definition as scorecardGroupCompleteDataset } from './visualisations/complete-dataset/scorecardGroup/definition'
import { definition as matrixCompleteData } from './visualisations/complete-dataset/matrix/definition'

import { definition as syncDefinition } from './feature-testing/definition-sync'
import { definition as featureFlags } from './feature-testing/definition-feature-flag'

import {
  successfulExecution,
  failedExecution,
  serverError,
  expiredDashboard,
  requestTimeout,
  failedRequest,
} from './request-examples/definitions'

// Visualisations
const lists = [listCompleteDataset, listCompleteDatasetHistoric, listPartialDataset, listPartialDatasetHistoric]
const scorecards = [scorecardsCompleteDataset, scorecardsBucketsCompleteDataset]
const scorecardGroups = [scorecardGroupCompleteDataset]
const matrix = [matrixCompleteData]

export const visualisations = [...lists, ...scorecards, ...scorecardGroups, ...matrix]

// Feature testing examples
export const features: components['schemas']['DashboardDefinition'][] = [syncDefinition, featureFlags]

// Request examples
export const requestExamples = [
  successfulExecution,
  failedExecution,
  serverError,
  expiredDashboard,
  requestTimeout,
  failedRequest,
]

export default [...visualisations, ...features, ...requestExamples]
