import { definition as definitionFeatureFlag } from './definition-feature-flag'
import { definition as definitionWithLinks } from './definition-links'
import {
  childDashboardOneDefinition,
  childDashboardTwoDefinition,
  parentChildDashboardDefinition,
} from './definition-parent-child'
import { definition as definitionSync } from './definition-sync'
import { definition as definitionAudit } from './definition-audit'

export const featureTestingDefinitions = [
  definitionSync,
  definitionFeatureFlag,
  definitionWithLinks,
  parentChildDashboardDefinition,
  childDashboardOneDefinition,
  childDashboardTwoDefinition,
  definitionAudit,
]

export const featureTestingIds = featureTestingDefinitions.map(vis => vis.id)
