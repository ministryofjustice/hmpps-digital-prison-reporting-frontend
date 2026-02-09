import { expect, jest } from '@jest/globals'
import type { BatchEvaluationResponse, FliptClient } from '@flipt-io/flipt'
import type { FeatureFlagEvaluationSubject } from '../utils/featureFlagsHelper'
import { FEATURE_FLAG_KEYS, FEATURE_FLAG_NAMESPACE } from '../utils/featureFlagsHelper'
import { FeatureFlagService } from './featureFlagService'

const subject: FeatureFlagEvaluationSubject = {
  entityId: 'user-1',
  context: {},
}

const createBatchEvaluationResponse = (responses: BatchEvaluationResponse['responses']): BatchEvaluationResponse => ({
  requestDurationMillis: 1,
  requestId: 'request-id',
  responses,
})

type BatchFn = (request: { requests: unknown[] }) => Promise<BatchEvaluationResponse>

describe('FeatureFlagService', () => {
  it('returns fallback values when not configured', async () => {
    const featureFlagService = new FeatureFlagService()

    const response = await featureFlagService.evaluateBooleanFlags(
      [FEATURE_FLAG_KEYS.SAVE_DEFAULTS, FEATURE_FLAG_KEYS.BAR_CHARTS],
      subject,
    )

    expect(response).toEqual({
      [FEATURE_FLAG_KEYS.SAVE_DEFAULTS]: true,
      [FEATURE_FLAG_KEYS.BAR_CHARTS]: false,
    })
  })

  it('evaluates flags using batch evaluation responses', async () => {
    const batchMock = jest.fn<BatchFn>().mockResolvedValue(
      createBatchEvaluationResponse([
        {
          type: 'BOOLEAN_EVALUATION_RESPONSE_TYPE',
          booleanResponse: {
            enabled: false,
            flagKey: FEATURE_FLAG_KEYS.SAVE_DEFAULTS,
            reason: 'MATCH_EVALUATION_REASON',
            requestDurationMillis: 0,
            timestamp: '',
            segmentKeys: [],
          },
        },
        {
          type: 'BOOLEAN_EVALUATION_RESPONSE_TYPE',
          booleanResponse: {
            enabled: true,
            flagKey: FEATURE_FLAG_KEYS.BAR_CHARTS,
            reason: 'MATCH_EVALUATION_REASON',
            requestDurationMillis: 0,
            timestamp: '',
            segmentKeys: [],
          },
        },
      ]),
    )

    const featureFlagService = new FeatureFlagService({
      token: 'token',
      url: 'http://localhost:9091',
    })

    featureFlagService.restClient = {
      evaluation: {
        batch: batchMock,
      },
    } as unknown as FliptClient

    const response = await featureFlagService.evaluateBooleanFlags(
      [FEATURE_FLAG_KEYS.SAVE_DEFAULTS, FEATURE_FLAG_KEYS.BAR_CHARTS],
      subject,
    )

    expect(batchMock).toHaveBeenCalledWith({
      requests: [
        {
          namespaceKey: FEATURE_FLAG_NAMESPACE,
          flagKey: FEATURE_FLAG_KEYS.SAVE_DEFAULTS,
          entityId: subject.entityId,
          context: subject.context,
        },
        {
          namespaceKey: FEATURE_FLAG_NAMESPACE,
          flagKey: FEATURE_FLAG_KEYS.BAR_CHARTS,
          entityId: subject.entityId,
          context: subject.context,
        },
      ],
    })
    expect(response).toEqual({
      [FEATURE_FLAG_KEYS.SAVE_DEFAULTS]: false,
      [FEATURE_FLAG_KEYS.BAR_CHARTS]: true,
    })
  })

  it('uses fallback values for missing or error evaluation responses', async () => {
    const featureFlagService = new FeatureFlagService({
      token: 'token',
      url: 'http://localhost:9091',
    })

    featureFlagService.restClient = {
      evaluation: {
        batch: jest.fn<BatchFn>().mockResolvedValue(
          createBatchEvaluationResponse([
            {
              type: 'ERROR_EVALUATION_RESPONSE_TYPE',
              errorResponse: {
                flagKey: FEATURE_FLAG_KEYS.SAVE_DEFAULTS,
                namespaceKey: FEATURE_FLAG_NAMESPACE,
                reason: 'NOT_FOUND_ERROR_EVALUATION_REASON',
              },
            },
          ]),
        ),
      },
    } as unknown as FliptClient

    const response = await featureFlagService.evaluateBooleanFlags([FEATURE_FLAG_KEYS.SAVE_DEFAULTS], subject)

    expect(response).toEqual({
      [FEATURE_FLAG_KEYS.SAVE_DEFAULTS]: true,
    })
  })

  it('falls back when batch evaluation throws', async () => {
    const featureFlagService = new FeatureFlagService({
      token: 'token',
      url: 'http://localhost:9091',
    })

    featureFlagService.restClient = {
      evaluation: {
        batch: jest.fn<BatchFn>().mockRejectedValue(new Error('evaluation failed')),
      },
    } as unknown as FliptClient

    const response = await featureFlagService.evaluateBooleanFlags([FEATURE_FLAG_KEYS.BAR_CHARTS], subject)

    expect(response).toEqual({
      [FEATURE_FLAG_KEYS.BAR_CHARTS]: false,
    })
  })

  it('returns a single boolean for evaluateBooleanFlag', async () => {
    const featureFlagService = new FeatureFlagService({
      token: 'token',
      url: 'http://localhost:9091',
    })

    featureFlagService.restClient = {
      evaluation: {
        batch: jest.fn<BatchFn>().mockResolvedValue(
          createBatchEvaluationResponse([
            {
              type: 'BOOLEAN_EVALUATION_RESPONSE_TYPE',
              booleanResponse: {
                enabled: true,
                flagKey: FEATURE_FLAG_KEYS.STREAMING_DOWNLOAD,
                reason: 'MATCH_EVALUATION_REASON',
                requestDurationMillis: 0,
                timestamp: '',
                segmentKeys: [],
              },
            },
          ]),
        ),
      },
    } as unknown as FliptClient

    const enabled = await featureFlagService.evaluateBooleanFlag(FEATURE_FLAG_KEYS.STREAMING_DOWNLOAD, subject)

    expect(enabled).toBe(true)
  })
})
