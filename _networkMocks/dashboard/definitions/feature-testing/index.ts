import { definition as definitionFeatureFlag } from './definition-feature-flag'
import { definition as definitionWithLinks } from './definition-links'
import { definition as definitionWithParentChild } from './definition-parent-child'
import { definition as definitionSync } from './definition-sync'

export const featureTestingDefinitions = [
  definitionSync,
  definitionFeatureFlag,
  definitionWithLinks,
  definitionWithParentChild,
]
export const featureTestingIds = featureTestingDefinitions.map(vis => vis.id)
