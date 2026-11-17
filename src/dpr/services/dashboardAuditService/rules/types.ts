import { DashboardRule } from './dashboard/types'
import { DatasetRule } from './dataset/types'
import { SectionRule } from './section/types'
import { VisualRule } from './visual/types'

export interface AuditRules {
  visual: VisualRule[]
  dashboard: DashboardRule[]
  section: SectionRule[]
  dataset: DatasetRule[]
}
