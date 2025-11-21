import { ServiceFeatureConfig } from '../../types/DprConfig'
import ReportDataStore from '../../data/reportDataStore'
import ReportStoreService from '../reportStoreService'

export class ProductCollectionStoreService extends ReportStoreService {
  enabled: boolean

  constructor(reportDataStore: ReportDataStore, serviceFeatureConfig: ServiceFeatureConfig) {
    super(reportDataStore)
    this.enabled = Boolean(serviceFeatureConfig.collections)
  }

  async getSelectedProductCollectionId(userId: string): Promise<string | undefined> {
    if (!this.enabled) return undefined

    const userConfig = await this.getState(userId)
    return userConfig.productCollectionInfo?.selectedProductCollection
  }

  async setSelectedProductCollectionId(userId: string, id: string): Promise<void> {
    if (!this.enabled) return undefined

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
