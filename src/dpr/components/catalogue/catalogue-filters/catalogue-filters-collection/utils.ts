import { Response, Request } from 'express'
import { Services } from '../../../../types/Services'
import LocalsHelper from '../../../../utils/localsHelper'

export const initProductCollections = async (req: Request, res: Response, services: Services) => {
  const { token, dprUser, csrfToken } = LocalsHelper.getValues(res)
  const currentUrl = req?.originalUrl || '/'

  const productCollections = (await services.productCollectionService.getProductCollections(token))?.map(
    collection => ({
      value: collection.id,
      text: collection.name,
    }),
  )

  if (productCollections && productCollections.length > 0) {
    productCollections.unshift({ value: 'RESET', text: 'Full catalogue' })
  }

  const collectionId = req
    ? req.session['currentCollectionId']
    : await services.productCollectionStoreService.getSelectedProductCollectionId(dprUser.id)

  const selectedProductCollection = req
    ? req.session['currentCollection']
    : collectionId && (await services.productCollectionService.getProductCollection(token, collectionId))

  const { productCollectionEndpoint } = LocalsHelper.getRouteLocals(res)

  return {
    csrfToken,
    currentUrl,
    productCollections,
    formAction: productCollectionEndpoint,
    ...(selectedProductCollection && { selectedProductCollection }),
  }
}
