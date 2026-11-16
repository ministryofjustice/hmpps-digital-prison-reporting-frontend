import { missingDashboardMetaRule } from './dashboard/missing-meta.rule'
import { missingDashboardSectionMetaRule } from './section/missing-section-meta.rule'

import { missingVisualMetaRule } from './visual/missing-visual-meta.rule'
import { noVisualDatasetRule } from './dataset/no-data.rule'

// Rules specific to visualisations
const visualisationRules = [missingVisualMetaRule]

// Rules for dashboard as a whole
const dashboardRules = [missingDashboardMetaRule]

// Rules for dashboard as a whole
const sectionRules = [missingDashboardSectionMetaRule]

// Rules for dataset
const datasetRules = [noVisualDatasetRule]

export default {
  visual: visualisationRules,
  dashboard: dashboardRules,
  dataset: datasetRules,
  section: sectionRules,
}
