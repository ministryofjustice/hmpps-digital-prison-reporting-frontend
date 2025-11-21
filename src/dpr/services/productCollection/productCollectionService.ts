import { components } from '../../types/api'
import { ServiceFeatureConfig } from '../../types/DprConfig'
import { ProductCollectionClient } from '../../data/productCollectionClient'
import logger from '../../utils/logger'

export class ProductCollectionService {
  enabled: boolean

  constructor(
    private readonly productCollectionClient: ProductCollectionClient,
    serviceFeatureConfig: ServiceFeatureConfig,
  ) {
    this.productCollectionClient = productCollectionClient
    this.enabled = Boolean(serviceFeatureConfig.collections)
    if (!this.enabled) logger.info(`Product collections: disabled `)
  }

  async getProductCollections(token: string): Promise<components['schemas']['ProductCollectionSummary'][]> {
    if (!this.enabled) return []
    return this.productCollectionClient.getProductCollections(token)
  }

  async getProductCollection(
    token: string,
    id: string,
  ): Promise<components['schemas']['ProductCollectionDTO'] | undefined> {
    if (!this.enabled) return undefined
    return this.productCollectionClient.getProductCollection(token, id)
  }
}
