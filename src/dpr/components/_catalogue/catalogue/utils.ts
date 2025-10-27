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
  const catalogueCollections = await services.reportingService.getCatalogueCollections(token)
  const selectedCatalogueCollection = await services.catalogueCollectionService.getSelectedCatalogueCollection(dprUser.id)
  return {
    data,
    catalogueCollectionInfo: {
      selectedCatalogueCollection,
      catalogueCollections,
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
