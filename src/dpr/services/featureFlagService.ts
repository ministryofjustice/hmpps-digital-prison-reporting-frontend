import { FliptClient } from '@flipt-io/flipt'
import { Application } from 'express'
import { FeatureFlagConfig } from '../data/types'
import {
  FEATURE_FLAG_NAMESPACE,
  getFeatureFlagFallbackState,
  type FeatureFlagEvaluationSubject,
  type FeatureFlagKey,
} from '../utils/featureFlagsHelper'

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
    this.namespace = FEATURE_FLAG_NAMESPACE
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

    if (!this.restClient || !this.namespace || flagKeys.length === 0) {
      return results
    }

    const namespaceKey = this.namespace

    try {
      const batchResponse = await this.restClient.evaluation.batch({
        requests: flagKeys.map((flagKey) => ({
          namespaceKey,
          flagKey,
          entityId: subject.entityId,
          context: subject.context,
        })),
      })

      batchResponse.responses
        .filter((response) => response.type === 'BOOLEAN_EVALUATION_RESPONSE_TYPE')
        .forEach((response) => {
          const flagKey = response.booleanResponse?.flagKey as TFlag | undefined
          const enabled = response.booleanResponse?.enabled

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
