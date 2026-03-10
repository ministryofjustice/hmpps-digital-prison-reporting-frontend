import { Response } from 'express'
import { setNestedPath } from '../../../utils/urlHelper'
import CatalogueListUtils from '../catalogue-list/utils'
import { Services } from '../../../types/Services'
import LocalsHelper from '../../../utils/localsHelper'
import { CatalogueFeatures } from './types'

export const initCatalogue = async ({
  features,
  res,
  services,
}: {
  features?: CatalogueFeatures
  res: Response
  services: Services
}) => {
  const data = await CatalogueListUtils.getReportsList(res, services)
  const { token, bookmarkingEnabled, dprUser, csrfToken, nestedBaseUrl } = LocalsHelper.getValues(res)
  const productCollections = (await services.productCollectionService.getProductCollections(token))?.map(
    (collection) => ({
      value: collection.id,
      text: collection.name,
    }),
  )
  if (productCollections && productCollections.length > 0) {
    productCollections.unshift({ value: 'RESET', text: 'Full catalogue' })
  }
  const selectedProductCollectionId = await services.productCollectionStoreService.getSelectedProductCollectionId(
    dprUser.id,
  )
  const selectedProductCollection =
    selectedProductCollectionId &&
    (await services.productCollectionService.getProductCollection(token, selectedProductCollectionId))

  return {
    id: data.id,
    list: {
      head: data.head,
      rows: data.rows,
    },
    filters: {
      productCollectionInfo: {
        productCollections,
        formAction: setNestedPath('/dpr/product-collection/selected', nestedBaseUrl),
        ...(selectedProductCollection && { selectedProductCollection }),
      },
      nestedBaseUrl,
      csrfToken,
      features: setFeatures(bookmarkingEnabled, features),
    },
  }
}

const setFeatures = (bookmarkingEnabled: boolean, features?: CatalogueFeatures) => {
  return {
    bookmarkingEnabled,
    unauthorisedToggleEnabled: features?.unauthorisedToggleEnabled === undefined || features.unauthorisedToggleEnabled,
  }
}

export default {
  initCatalogue,
}
