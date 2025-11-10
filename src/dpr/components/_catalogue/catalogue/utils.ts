import { Response } from 'express'
import CatalogueListUtils from '../catalogue-list/utils'
import { Services } from '../../../types/Services'
import LocalsHelper from '../../../utils/localsHelper'
import { CatalogueFeatures } from './types'

export const init = async ({
  features,
  res,
  services,
}: {
  features?: CatalogueFeatures
  res: Response
  services: Services
}) => {
  const data = await CatalogueListUtils.getReportsList(res, services, features)
  const { token, bookmarkingEnabled, dprUser } = LocalsHelper.getValues(res)
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
    (await services.productCollectionService.getProductCollection(dprUser.id, selectedProductCollectionId))
  return {
    data,
    productCollectionInfo: {
      productCollections,
      ...(selectedProductCollection && { selectedProductCollection }),
    },
    features: setFeatures(bookmarkingEnabled, features),
  }
}

const setFeatures = (bookmarkingEnabled: boolean, features?: CatalogueFeatures) => {
  return {
    filteringEnabled: features?.filteringEnabled === undefined || features.filteringEnabled,
    unauthorisedToggleEnabled: features?.unauthorisedToggleEnabled === undefined || features.unauthorisedToggleEnabled,
    howToUseEnabled: features?.howToUseEnabled === undefined || features.howToUseEnabled,
    bookmarkingEnabled: features?.bookmarkingEnabled !== undefined ? features.bookmarkingEnabled : bookmarkingEnabled,
  }
}

export default {
  init,
}
