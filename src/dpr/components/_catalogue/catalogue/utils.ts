import { Response } from 'express'
import CatalogueListUtils from '../catalogue-list/utils'
import { Services } from '../../../types/Services'
import LocalsHelper from '../../../utils/localsHelper'
import { CatalogueFeatures } from './types'

const init = async ({
  features,
  res,
  services,
}: {
  features?: CatalogueFeatures
  res: Response
  services: Services
}) => {
  const data = await CatalogueListUtils.getReportsList(res, services, features)

  return {
    data,
    features: setFeatures(res, features),
  }
}

const setFeatures = (res: Response, features?: CatalogueFeatures) => {
  const { bookmarkingEnabled } = LocalsHelper.getValues(res)

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
