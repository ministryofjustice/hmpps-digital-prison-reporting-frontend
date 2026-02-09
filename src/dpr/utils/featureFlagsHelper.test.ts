import { expect } from '@jest/globals'
import type { Response } from 'express'
import {
  createFeatureFlagEvaluationSubject,
  DEFAULT_FEATURE_FLAG_ENTITY_ID,
  DASHBOARD_VISUALISATION_FEATURE_FLAGS,
  FEATURE_FLAGS,
  FEATURE_FLAG_KEYS,
  getFeatureFlagEvaluationSubject,
  getFeatureFlagFallbackState,
} from './featureFlagsHelper'

describe('featureFlagsHelper', () => {
  describe('createFeatureFlagEvaluationSubject', () => {
    it('uses the provided user id as the evaluation entity id', () => {
      expect(createFeatureFlagEvaluationSubject('user-123')).toEqual({
        entityId: 'user-123',
        context: {},
      })
    })

    it('uses the default entity id when the user id is missing', () => {
      expect(createFeatureFlagEvaluationSubject(undefined)).toEqual({
        entityId: DEFAULT_FEATURE_FLAG_ENTITY_ID,
        context: {},
      })
    })

    it('uses the default entity id when the user id is blank', () => {
      expect(createFeatureFlagEvaluationSubject('   ')).toEqual({
        entityId: DEFAULT_FEATURE_FLAG_ENTITY_ID,
        context: {},
      })
    })
  })

  describe('getFeatureFlagEvaluationSubject', () => {
    it('uses dpr user id from response locals', () => {
      const res = {
        locals: {
          dprUser: {
            id: 'Uu1d',
            token: 'T0k3n',
          },
        },
      } as unknown as Response

      expect(getFeatureFlagEvaluationSubject(res)).toEqual({
        entityId: 'Uu1d',
        context: {},
      })
    })

    it('uses default entity id when dpr user id is not available', () => {
      const res = {
        locals: {
          dprUser: {
            token: 'T0k3n',
          },
        },
      } as unknown as Response

      expect(getFeatureFlagEvaluationSubject(res)).toEqual({
        entityId: DEFAULT_FEATURE_FLAG_ENTITY_ID,
        context: {},
      })
    })
  })

  describe('fallback policy', () => {
    it('fails open only for saveDefaultsEnabled', () => {
      expect(getFeatureFlagFallbackState(FEATURE_FLAG_KEYS.SAVE_DEFAULTS)).toBe(true)

      expect(getFeatureFlagFallbackState(FEATURE_FLAG_KEYS.STREAMING_DOWNLOAD)).toBe(false)
      expect(getFeatureFlagFallbackState(FEATURE_FLAG_KEYS.BAR_CHARTS)).toBe(false)
      expect(getFeatureFlagFallbackState(FEATURE_FLAG_KEYS.LINE_CHARTS)).toBe(false)
      expect(getFeatureFlagFallbackState(FEATURE_FLAG_KEYS.DONUT_CHARTS)).toBe(false)
      expect(getFeatureFlagFallbackState(FEATURE_FLAG_KEYS.SCORECARD_CHARTS)).toBe(false)
      expect(getFeatureFlagFallbackState(FEATURE_FLAG_KEYS.SCORECARD_GROUP_CHARTS)).toBe(false)
      expect(getFeatureFlagFallbackState(FEATURE_FLAG_KEYS.MATRIX_TIMESERIES_CHARTS)).toBe(false)
      expect(getFeatureFlagFallbackState(FEATURE_FLAG_KEYS.BAR_TIMESERIES_CHARTS)).toBe(false)
      expect(getFeatureFlagFallbackState(FEATURE_FLAG_KEYS.LINE_TIMESERIES_CHARTS)).toBe(false)
    })
  })

  describe('dashboard visualisation flags', () => {
    it('contains all dashboard-only feature flag keys', () => {
      expect(DASHBOARD_VISUALISATION_FEATURE_FLAGS).toEqual([
        FEATURE_FLAG_KEYS.BAR_CHARTS,
        FEATURE_FLAG_KEYS.LINE_CHARTS,
        FEATURE_FLAG_KEYS.DONUT_CHARTS,
        FEATURE_FLAG_KEYS.SCORECARD_CHARTS,
        FEATURE_FLAG_KEYS.SCORECARD_GROUP_CHARTS,
        FEATURE_FLAG_KEYS.MATRIX_TIMESERIES_CHARTS,
        FEATURE_FLAG_KEYS.BAR_TIMESERIES_CHARTS,
        FEATURE_FLAG_KEYS.LINE_TIMESERIES_CHARTS,
      ])
    })
  })

  describe('feature flags', () => {
    it('includes save defaults, streaming and dashboard flags', () => {
      expect(FEATURE_FLAGS).toEqual([
        FEATURE_FLAG_KEYS.SAVE_DEFAULTS,
        FEATURE_FLAG_KEYS.STREAMING_DOWNLOAD,
        FEATURE_FLAG_KEYS.BAR_CHARTS,
        FEATURE_FLAG_KEYS.LINE_CHARTS,
        FEATURE_FLAG_KEYS.DONUT_CHARTS,
        FEATURE_FLAG_KEYS.SCORECARD_CHARTS,
        FEATURE_FLAG_KEYS.SCORECARD_GROUP_CHARTS,
        FEATURE_FLAG_KEYS.MATRIX_TIMESERIES_CHARTS,
        FEATURE_FLAG_KEYS.BAR_TIMESERIES_CHARTS,
        FEATURE_FLAG_KEYS.LINE_TIMESERIES_CHARTS,
      ])
    })
  })
})
