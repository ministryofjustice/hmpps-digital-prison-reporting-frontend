import { RequestHandler } from 'express'
import { ProductCollectionStoreService } from '../../../../services/productCollection/productCollectionStoreService'
import LocalsHelper from '../../../../utils/localsHelper'
import { Services } from '../../../../types/Services'

export class SelectedProductCollectionController {
  layoutPath: string

  productCollectionStoreService: ProductCollectionStoreService

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.productCollectionStoreService = services.productCollectionStoreService
  }

  POST: RequestHandler = async (req, res, _next) => {
    const { productCollection } = req.body
    const { dprUser } = LocalsHelper.getValues(res)
    const back = req.get('referer') || '/'

    await this.productCollectionStoreService
      .setSelectedProductCollectionId(dprUser.id, productCollection === 'RESET' ? undefined : productCollection)
      .then(() => {
        res.redirect(303, back)
      })
      .catch(() => {
        res.redirect(303, back)
      })
  }
}
