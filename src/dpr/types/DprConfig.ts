export interface DprConfig {
  routePrefix?: string
  dataProductDefinitionsPath?: string
}

export interface ServiceFeatureConfig {
  /** Enable/disable bookmarking
   *  - Bookmark links/buttons will be hidden
   *  - Bookmark service will be disabled
   */
  bookmarking?: boolean

  /** Enable/disable download
   *  - Download links/buttons will be hidden
   */
  download?: boolean

  /** Enable/disable feedbackOnDownload
   *  - If disabled, the download functionality will be available immediately
   *  - If enabled, users are required to fill out feedback to gain access to download
   */
  feedbackOnDownload?: boolean

  /** Enable/disable collections
   *  - collections dropdown will be hidden
   *  - collections service will be disabled
   */
  collections?: boolean

  /** Enable/disable Missing reports
   *  - Missing reports will be hidden in the report catalogue
   *  - Bookmark service will be disabled
   */
  missingReports?: boolean

  /** Enable/disable Save defaults
   *  - Save defaults button will be hidden in report filters
   *  - Save defaults service will be disabled
   */
  saveDefaults?: boolean
}
