import { missingDashboardMetaRule } from './dashboard/missing-meta.rule'
import { missingDashboardSectionMetaRule } from './section/missing-section-meta.rule'
import { duplicateDashboardSectionMetaRule } from './section/duplicate-section-meta.rule'
import { missingVisualMetaRule } from './visual/missing-visual-meta.rule'
import { maxRingsAndSegmentsRule } from './visual/max-rings-and-segments.rule'
import { maxBarsRule } from './visual/max-bars.rule'
import { maxStackedBarsRule } from './visual/max-stacked.rule copy'
import { noVisualDatasetRule } from './dataset/no-data.rule'
import { missingColumnIdsRule } from './dataset/missing-column-id.rule'
import { incorrectDateFormatRule } from './dataset/incorrect-date-format.rule'
import { maxLinesRule } from './visual/max-lines.rule'
import { maxPointsRule } from './visual/max-points.rule'

// Rules specific to visualisations
const visualisationRules = [
  missingVisualMetaRule,
  // Doughnuts
  maxRingsAndSegmentsRule,

  // Bars
  maxBarsRule,
  maxStackedBarsRule,

  // Lines
  maxLinesRule,
  maxPointsRule,
]

// Rules for dashboard as a whole
const dashboardRules = [missingDashboardMetaRule]

// Rules for sections
const sectionRules = [missingDashboardSectionMetaRule, duplicateDashboardSectionMetaRule]

// Rules for dataset
const datasetRules = [noVisualDatasetRule, missingColumnIdsRule, incorrectDateFormatRule]

export default {
  visual: visualisationRules,
  dashboard: dashboardRules,
  dataset: datasetRules,
  section: sectionRules,
}
