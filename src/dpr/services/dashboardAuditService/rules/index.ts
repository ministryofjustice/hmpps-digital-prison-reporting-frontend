import { firstVisualRule } from './visual/first-rule.rule'
import { firstDashboardRule } from './dashboard/first-generic.rule'
import { firstDatasetRule } from './dataset/first-dataset.rule'

// Rules specific to visualisations
const visualisationRules = [firstVisualRule]

// Rules for dashboard as a whole
const dashboardRules = [firstDashboardRule]

// Rules for dataset
const datasetRules = [firstDatasetRule]

export default {
  visual: visualisationRules,
  dashboard: dashboardRules,
  dataset: datasetRules,
}
