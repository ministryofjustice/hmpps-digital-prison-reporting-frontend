import RestClient from 'src/dpr/data/restClient'
import { ApiConfig } from 'src/dpr/data/types'
import { components } from 'src/dpr/types/api'

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
