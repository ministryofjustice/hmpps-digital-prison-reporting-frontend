import ReportDataStore from '../../data/reportDataStore'
import logger from '../../utils/logger'
import ReportStoreService from '../reportStoreService'

export class ProductCollectionStoreService extends ReportStoreService {
  constructor(reportDataStore: ReportDataStore) {
    super(reportDataStore)
    logger.info('Service created: ProductCollectionStoreService')
  }

  async getSelectedProductCollectionId(userId: string): Promise<string | undefined> {
    const userConfig = await this.getState(userId)
    return userConfig.productCollectionInfo?.selectedProductCollection
  }

  async setSelectedProductCollectionId(userId: string, id: string): Promise<void> {
    const userConfig = await this.getState(userId)
    return this.saveState(userId, {
      ...userConfig,
      productCollectionInfo: {
        ...userConfig.productCollectionInfo,
        selectedProductCollection: id,
      },
    })
  }
}
