import { definition as definitionSync } from './definition-sync'
import { definition as definitionFeatureFlag } from './definition-feature-flag'

export const featureTestingIds = [definitionSync, definitionFeatureFlag].map((vis) => vis.id)
