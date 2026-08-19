export type CatalogueVariantRowActions = {
  request?: CatalogueVariantRowActionRequestLoad | undefined
  bookmark?: CatalogueVariantRowActionBookmark | undefined
  missing?: CatalogueVariantRowActionRequestLoad | undefined
  subscription?: SubscriptionActionConfig | undefined
  authorised: boolean
}

export type CatalogueVariantRowActionRequestLoad = {
  href: string
  label: string
}

export type CatalogueVariantRowActionBookmark = {
  reportId: string
  id: string
  reportType: string
  csrfToken: string
  bookmarkActionEndpoint: string
  showBookmark: boolean
  linkType: string
  linkText: string
}

export type CatalogueVariantRowActionSubscription = {
  subscriptionConfig: SubscriptionActionConfig
  reportConfig: {
    reportId: string
    id: string
    name: string
    reportName: string
    description: string
    type: ReportType
  }
}
