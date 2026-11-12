import { missingVisualMetaRule } from './visual/missing-visual-meta.rule'
import { missingDashboardMetaRule } from './dashboard/missing-meta.rule'
import { noVisualDatasetRule } from './dataset/no-data.rule'

// Rules specific to visualisations
const visualisationRules = [missingVisualMetaRule]

// Rules for dashboard as a whole
const dashboardRules = [missingDashboardMetaRule]

// Rules for dataset
const datasetRules = [noVisualDatasetRule]

export default {
  visual: visualisationRules,
  dashboard: dashboardRules,
  dataset: datasetRules,
}
