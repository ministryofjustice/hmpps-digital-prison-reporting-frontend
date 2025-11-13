import { ApiConfig } from '../../data/types'
import { components } from '../../types/api'
import RestClient from '../../data/restClient'

export class ProductCollectionService {
  restClient: RestClient

  constructor(config: ApiConfig) {
    this.restClient = new RestClient('ProductCollection API', config)
  }

  async getProductCollections(token: string): Promise<components['schemas']['ProductCollectionSummary'][]> {
    return this.restClient.get({
      path: `/productCollections`,
      token,
    })
  }

  async getProductCollection(token: string, id: string): Promise<components['schemas']['ProductCollectionDTO']> {
    return this.restClient.get({
      path: `/productCollections/${id}`,
      token,
    })
  }
}
