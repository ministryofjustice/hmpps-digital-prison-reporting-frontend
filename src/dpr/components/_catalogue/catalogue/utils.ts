import { Response } from 'express'
import CatalogueListUtils from '../catalogue-list/utils'
import { Services } from '../../../types/Services'
import LocalsHelper from '../../../utils/localsHelper'

interface CatalogueFeatures {
  filteringEnabled?: boolean
  unauthorisedToggleEnabled?: boolean
  howToUseEnabled?: boolean
}

const init = async ({
  title,
  features,
  res,
  services,
}: {
  title: string
  features?: CatalogueFeatures
  res: Response
  services: Services
}) => {
  const data = await CatalogueListUtils.getReportsList(res, services)

  return {
    title,
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
    bookmarkingEnabled,
  }
}

export default {
  init,
}
