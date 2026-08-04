export type CatalogueVariantRowActions = {
  request?: CatalogueVariantRowActionRequestLoad | undefined
  bookmark?: CatalogueVariantRowActionBookmark | undefined
  missing?: CatalogueVariantRowActionRequestLoad | undefined
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
