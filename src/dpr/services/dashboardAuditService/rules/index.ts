import { missingDashboardMetaRule } from './dashboard/missing-meta.rule'
import { missingDashboardSectionMetaRule } from './section/missing-section-meta.rule'
import { duplicateDashboardSectionMetaRule } from './section/duplicate-section-meta.rule'
import { missingVisualMetaRule } from './visual/missing-visual-meta.rule'
import { maxRingsAndSegmentsRule } from './visual/doughnut-chart-max-rings-and-segments.rule'
import { maxBarsRule } from './visual/bar-chart-max-bars.rule'
import { maxStackedBarsRule } from './visual/bar-chart-max-stacked.rule copy'
import { noVisualDatasetRule } from './dataset/no-data.rule'

// Rules specific to visualisations
const visualisationRules = [missingVisualMetaRule, maxRingsAndSegmentsRule, maxBarsRule, maxStackedBarsRule]

// Rules for dashboard as a whole
const dashboardRules = [missingDashboardMetaRule]

// Rules for sections
const sectionRules = [missingDashboardSectionMetaRule, duplicateDashboardSectionMetaRule]

// Rules for dataset
const datasetRules = [noVisualDatasetRule]

export default {
  visual: visualisationRules,
  dashboard: dashboardRules,
  dataset: datasetRules,
  section: sectionRules,
}
