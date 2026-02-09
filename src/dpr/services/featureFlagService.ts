import { FliptClient, type ClientOptions, type EvaluationRequest } from '@flipt-io/flipt-client-js/node'
import { Application } from 'express'
import { FeatureFlagConfig } from '../data/types'
import {
  FEATURE_FLAG_NAMESPACE,
  getFeatureFlagFallbackState,
  type FeatureFlagEvaluationSubject,
  type FeatureFlagKey,
} from '../utils/featureFlagsHelper'

export class FeatureFlagService {
  private readonly clientConfig: ClientOptions | undefined

  private clientPromise: Promise<FliptClient> | undefined

  constructor(config: FeatureFlagConfig | Record<string, unknown> = {}) {
    const { token, url } = config && (config as FeatureFlagConfig)
    if (!token || !url) {
      return
    }

    this.clientConfig = {
      url,
      namespace: FEATURE_FLAG_NAMESPACE,
      authentication: {
        clientToken: token,
      },
    }
  }

  private async getClient(): Promise<FliptClient | undefined> {
    if (!this.clientConfig) {
      return undefined
    }

    if (!this.clientPromise) {
      this.clientPromise = FliptClient.init(this.clientConfig).catch((error) => {
        this.clientPromise = undefined
        throw error
      })
    }

    return this.clientPromise
  }

  async evaluateBooleanFlag(flagKey: FeatureFlagKey, subject: FeatureFlagEvaluationSubject): Promise<boolean> {
    const evaluation = await this.evaluateBooleanFlags([flagKey], subject)
    return evaluation[flagKey]
  }

  async evaluateBooleanFlags<TFlag extends FeatureFlagKey>(
    flagKeys: readonly TFlag[],
    subject: FeatureFlagEvaluationSubject,
  ): Promise<Record<TFlag, boolean>> {
    const results = Object.fromEntries(
      flagKeys.map((flagKey) => [flagKey, getFeatureFlagFallbackState(flagKey)]),
    ) as Record<TFlag, boolean>

    if (flagKeys.length === 0) {
      return results
    }

    const client = await this.getClient().catch(() => undefined)
    if (!client) {
      return results
    }

    const requests: EvaluationRequest[] = flagKeys.map((flagKey) => ({
      flagKey,
      entityId: subject.entityId,
      context: subject.context,
    }))

    try {
      const batchResponse = client.evaluateBatch(requests)

      batchResponse.responses
        .filter((response) => response.type === 'BOOLEAN_EVALUATION_RESPONSE_TYPE')
        .forEach((response) => {
          const flagKey = response.booleanEvaluationResponse?.flagKey as TFlag | undefined
          const enabled = response.booleanEvaluationResponse?.enabled

          if (flagKey && enabled !== undefined && flagKey in results) {
            results[flagKey] = enabled
          }
        })
    } catch (_error) {
      return results
    }

    return results
  }
}

const resolveFlag = (app: Application, flagName: string) => {
  return app.locals.featureFlags?.flags?.[flagName]
}

export const isBooleanFlagEnabledOrMissing = (flagName: string, app: Application): boolean => {
  const flag = resolveFlag(app, flagName)
  return flag !== false
}

export const isBooleanFlagExplicitlyEnabled = (flagName: string, app: Application): boolean => {
  return resolveFlag(app, flagName) === true
}
