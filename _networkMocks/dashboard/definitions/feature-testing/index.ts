import { definition as definitionSync } from './definition-sync'
import { definition as definitionFeatureFlag } from './definition-feature-flag'
import { definition as definitionWithLinks } from './definition-links'

export const featureTestingDefinitions = [definitionSync, definitionFeatureFlag, definitionWithLinks]
export const featureTestingIds = featureTestingDefinitions.map((vis) => vis.id)
