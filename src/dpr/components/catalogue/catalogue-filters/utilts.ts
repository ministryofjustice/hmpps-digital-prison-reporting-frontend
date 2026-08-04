import { Response, Request } from 'express'
import { Services } from '../../../types/Services'
import { initProductCollections } from './catalogue-filters-collection/utils'

export const initCatalogueFilters = async (req: Request, res: Response, services: Services) => {
  const productCollectionConfig = await initProductCollections(req, res, services)

  return {
    productCollectionConfig,
  }
}
