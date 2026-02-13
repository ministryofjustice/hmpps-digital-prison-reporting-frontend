import type { Response } from 'express'
import localsHelper from './localsHelper'

export const FEATURE_FLAG_NAMESPACE = 'hmpps-digital-prison-reporting'

export const FEATURE_FLAG_KEYS = {
  SAVE_DEFAULTS: 'saveDefaultsEnabled',
  STREAMING_DOWNLOAD: 'streamingDownloadEnabled',
  BAR_CHARTS: 'barChartsEnabled',
  LINE_CHARTS: 'lineChartsEnabled',
  DONUT_CHARTS: 'donutChartsEnabled',
  SCORECARD_CHARTS: 'scorecardChartsEnabled',
  SCORECARD_GROUP_CHARTS: 'scorecardgroupChartsEnabled',
  MATRIX_TIMESERIES_CHARTS: 'matrixtimeseriesChartsEnabled',
  BAR_TIMESERIES_CHARTS: 'bartimeseriesChartsEnabled',
  LINE_TIMESERIES_CHARTS: 'linetimeseriesChartsEnabled',
} as const

export type FeatureFlagKey = (typeof FEATURE_FLAG_KEYS)[keyof typeof FEATURE_FLAG_KEYS]

export const DASHBOARD_VISUALISATION_FEATURE_FLAGS: readonly FeatureFlagKey[] = [
  FEATURE_FLAG_KEYS.BAR_CHARTS,
  FEATURE_FLAG_KEYS.LINE_CHARTS,
  FEATURE_FLAG_KEYS.DONUT_CHARTS,
  FEATURE_FLAG_KEYS.SCORECARD_CHARTS,
  FEATURE_FLAG_KEYS.SCORECARD_GROUP_CHARTS,
  FEATURE_FLAG_KEYS.MATRIX_TIMESERIES_CHARTS,
  FEATURE_FLAG_KEYS.BAR_TIMESERIES_CHARTS,
  FEATURE_FLAG_KEYS.LINE_TIMESERIES_CHARTS,
]

export const FEATURE_FLAGS: readonly FeatureFlagKey[] = [
  FEATURE_FLAG_KEYS.SAVE_DEFAULTS,
  FEATURE_FLAG_KEYS.STREAMING_DOWNLOAD,
  ...DASHBOARD_VISUALISATION_FEATURE_FLAGS,
]

export const DEFAULT_FEATURE_FLAG_ENTITY_ID = 'anonymous'

export interface FeatureFlagEvaluationSubject {
  entityId: string
  context: Record<string, string>
}

const FEATURE_FLAG_FALLBACK_STATES: Record<FeatureFlagKey, boolean> = {
  [FEATURE_FLAG_KEYS.SAVE_DEFAULTS]: true,
  [FEATURE_FLAG_KEYS.STREAMING_DOWNLOAD]: false,
  [FEATURE_FLAG_KEYS.BAR_CHARTS]: false,
  [FEATURE_FLAG_KEYS.LINE_CHARTS]: false,
  [FEATURE_FLAG_KEYS.DONUT_CHARTS]: false,
  [FEATURE_FLAG_KEYS.SCORECARD_CHARTS]: false,
  [FEATURE_FLAG_KEYS.SCORECARD_GROUP_CHARTS]: false,
  [FEATURE_FLAG_KEYS.MATRIX_TIMESERIES_CHARTS]: false,
  [FEATURE_FLAG_KEYS.BAR_TIMESERIES_CHARTS]: false,
  [FEATURE_FLAG_KEYS.LINE_TIMESERIES_CHARTS]: false,
}

const toFeatureFlagEntityId = (entityId?: string) => {
  if (!entityId || entityId.trim().length === 0) {
    return DEFAULT_FEATURE_FLAG_ENTITY_ID
  }
  return entityId
}

export const createFeatureFlagEvaluationSubject = (entityId?: string): FeatureFlagEvaluationSubject => {
  return {
    entityId: toFeatureFlagEntityId(entityId),
    context: {},
  }
}

export const getFeatureFlagEvaluationSubject = (res: Response): FeatureFlagEvaluationSubject => {
  const { dprUser } = localsHelper.getValues(res)
  return createFeatureFlagEvaluationSubject(dprUser.id)
}

export const getFeatureFlagFallbackState = (flagKey: FeatureFlagKey): boolean => {
  return FEATURE_FLAG_FALLBACK_STATES[flagKey]
}

export const isFeatureFlagFailOpen = (flagKey: FeatureFlagKey): boolean => {
  return getFeatureFlagFallbackState(flagKey)
}
