import { FliptClient, ListFlagsResponse } from '@flipt-io/flipt'
import { FeatureFlagConfig } from '../data/types'

export class FeatureFlagService {
  restClient: FliptClient | undefined
  namespace: string | undefined

  constructor(config: FeatureFlagConfig | {} = {}) {
    const { namespace, token, url } = config && config as FeatureFlagConfig
    if (Object.keys(config).length !== 3 || !namespace || !token || !url) {
      return
    }
    this.restClient = new FliptClient({
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      url,
    })
    this.namespace = namespace
  }

  async getFlags(): Promise<ListFlagsResponse> {
    if (!this.restClient) {
      return {
        flags: [],
        nextPageToken: '',
        totalCount: 0,
      }
    }
    return this.restClient.flags.listFlags(this.namespace)
  }
}
