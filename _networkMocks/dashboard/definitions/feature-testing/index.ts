import { definition as definitionSync } from './definition-sync'
import { definition as definitionFeatureFlag } from './definition-feature-flag'

export const featureTestingDefinitions = [definitionSync, definitionFeatureFlag]
export const featureTestingIds = featureTestingDefinitions.map((vis) => vis.id)
