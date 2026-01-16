export interface DprConfig {
  routePrefix?: string
  dataProductDefinitionsPath?: string
}

export interface ServiceFeatureConfig {
  bookmarking?: boolean
  download?: boolean
  collections?: boolean
  missingReports?: boolean
  saveDefaults?: boolean
}
