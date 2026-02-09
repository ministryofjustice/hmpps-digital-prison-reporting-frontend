import { FliptClient, ListFlagsResponse } from '@flipt-io/flipt'
import { Application } from 'express'
import { FeatureFlagConfig } from '../data/types'

// Override this until types are fixed - metadata is returned, but not in the types
declare module '@flipt-io/flipt' {
  interface Flag {
    metadata: Record<string, string | boolean | number>
  }
}

export class FeatureFlagService {
  restClient: FliptClient | undefined

  namespace: string | undefined

  constructor(config: FeatureFlagConfig | Record<string, unknown> = {}) {
    const { token, url } = config && (config as FeatureFlagConfig)
    if (Object.keys(config).length !== 2 || !token || !url) {
      return
    }
    this.restClient = new FliptClient({
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      url,
    })
    this.namespace = 'hmpps-digital-prison-reporting'
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

const resolveFlag = (app: Application, flagName: string) => {
  const flag = app.locals.featureFlags?.flags?.[flagName]
  if (flag && flag.type !== 'BOOLEAN_FLAG_TYPE') {
    throw Error('Tried to validate whether a non-boolean flag was enabled')
  }
  return flag
}

export const isBooleanFlagEnabledOrMissing = (flagName: string, app: Application): boolean => {
  const flag = resolveFlag(app, flagName)
  return !flag || flag.enabled
}

export const isBooleanFlagExplicitlyEnabled = (flagName: string, app: Application): boolean => {
  return resolveFlag(app, flagName)?.enabled === true
}
