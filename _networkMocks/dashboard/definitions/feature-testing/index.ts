import { definition as definitionFeatureFlag } from './definition-feature-flag'
import { definition as definitionWithLinks } from './definition-links'
import {
  childDashboardOneDefinition,
  childDashboardTwoDefinition,
  parentChildDashboardDefinition,
} from './definition-parent-child'
import { definition as definitionSync } from './definition-sync'
import { definition as definitionAudit } from './definition-audit'
import { definition as definitionAuditBar } from './definition-audit-bar'
import { definition as definitionAuditDoughnut } from './definition-audit-doughnut'
import { definition as definitionAuditLine } from './definition-audit-line'
import { definition as definitionAuditLineTimeseries } from './definition-audit-line-timeseries'

export const featureTestingDefinitions = [
  definitionSync,
  definitionFeatureFlag,
  definitionWithLinks,
  parentChildDashboardDefinition,
  childDashboardOneDefinition,
  childDashboardTwoDefinition,
  definitionAudit,
  definitionAuditBar,
  definitionAuditDoughnut,
  definitionAuditLine,
  definitionAuditLineTimeseries,
]

export const featureTestingIds = featureTestingDefinitions.map(vis => vis.id)
