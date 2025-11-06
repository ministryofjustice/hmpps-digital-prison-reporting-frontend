import { RequestHandler } from 'express'
import { ProductCollectionStoreService } from 'src/dpr/services/productCollection/productCollectionStoreService'
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
    const { dprUser, nestedBaseUrl } = LocalsHelper.getValues(res)

    await this.productCollectionStoreService
      .setSelectedProductCollectionId(dprUser.id, productCollection === 'RESET' ? undefined : productCollection)
      .then(() => {
        res.redirect(`${nestedBaseUrl}/`)
      })
      .catch(() => {
        res.redirect(`${nestedBaseUrl}/`)
      })
  }
}
