import { missingDashboardMetaRule } from './dashboard/missing-meta.rule'
import { missingDashboardSectionMetaRule } from './dashboard/missing-section-meta.rule'

import { missingVisualMetaRule } from './visual/missing-visual-meta.rule'
import { noVisualDatasetRule } from './dataset/no-data.rule'

// Rules specific to visualisations
const visualisationRules = [missingVisualMetaRule]

// Rules for dashboard as a whole
const dashboardRules = [missingDashboardMetaRule, missingDashboardSectionMetaRule]

// Rules for dataset
const datasetRules = [noVisualDatasetRule]

export default {
  visual: visualisationRules,
  dashboard: dashboardRules,
  dataset: datasetRules,
}
