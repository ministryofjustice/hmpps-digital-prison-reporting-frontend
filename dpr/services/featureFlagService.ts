import { FliptClient, ListFlagsResponse } from '@flipt-io/flipt'
import { Application } from 'express'
import { FeatureFlagConfig } from '../data/types'

export class FeatureFlagService {
  restClient: FliptClient | undefined

  namespace: string | undefined

  constructor(config: FeatureFlagConfig | Record<string, unknown> = {}) {
    const { namespace, token, url } = config && (config as FeatureFlagConfig)
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
    if (!this.restClient || !this.namespace) {
      return {
        flags: [],
        nextPageToken: '',
        totalCount: 0,
      }
    }
    return this.restClient.flags.listFlags(this.namespace)
  }
}

export const isBooleanFlagEnabled = (flagName: string, app: Application): boolean => {
  const flag = app.locals.featureFlags?.flags?.[flagName]
  if (flag && flag.type !== 'BOOLEAN_FLAG_TYPE') {
    throw Error('Tried to validate whether a non-boolean flag was enabled')
  }
  return !flag || flag.enabled
}
