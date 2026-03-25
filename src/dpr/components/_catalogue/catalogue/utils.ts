import { Response, Request } from 'express'
import CatalogueListUtils from '../catalogue-list/utils'
import { Services } from '../../../types/Services'
import LocalsHelper from '../../../utils/localsHelper'

export const initCatalogue = async ({ res, services, req }: { res: Response; services: Services; req?: Request }) => {
  const data = await CatalogueListUtils.getReportsList(res, services)
  const currentUrl = req?.originalUrl || '/'
  const { token, bookmarkingEnabled, dprUser, csrfToken } = LocalsHelper.getValues(res)
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
        formAction: res.app.locals['productCollectionEndpoint'],
        ...(selectedProductCollection && { selectedProductCollection }),
      },
      csrfToken,
      currentUrl,
      features: { bookmarkingEnabled },
    },
  }
}

export default {
  initCatalogue,
}
