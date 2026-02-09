import { expect, jest } from '@jest/globals'
import type { FeatureFlagEvaluationSubject } from '../utils/featureFlagsHelper'
import { FEATURE_FLAG_KEYS, FEATURE_FLAG_NAMESPACE } from '../utils/featureFlagsHelper'

import { FeatureFlagService } from './featureFlagService'

type MockBatchResponse = {
  requestDurationMillis: number
  responses: unknown[]
}

type MockClient = {
  evaluateBatch: (requests: unknown[]) => MockBatchResponse
}

const initMock = jest.fn<(options?: unknown) => Promise<MockClient>>()
const evaluateBatchMock = jest.fn<(requests: unknown[]) => MockBatchResponse>()

jest.mock('@flipt-io/flipt-client-js/node', () => ({
  FliptClient: {
    init: (options?: unknown) => initMock(options),
  },
}))

const subject: FeatureFlagEvaluationSubject = {
  entityId: 'user-1',
  context: {},
}

describe('FeatureFlagService', () => {
  beforeEach(() => {
    initMock.mockReset()
    evaluateBatchMock.mockReset()
    initMock.mockResolvedValue({
      evaluateBatch: evaluateBatchMock,
    })
  })

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
    expect(initMock).not.toHaveBeenCalled()
  })

  it('evaluates flags using batch evaluation responses', async () => {
    const featureFlagService = new FeatureFlagService({
      token: 'token',
      url: 'http://localhost:9091',
    })

    evaluateBatchMock.mockReturnValue({
      requestDurationMillis: 1,
      responses: [
        {
          type: 'BOOLEAN_EVALUATION_RESPONSE_TYPE',
          booleanEvaluationResponse: {
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
          booleanEvaluationResponse: {
            enabled: true,
            flagKey: FEATURE_FLAG_KEYS.BAR_CHARTS,
            reason: 'MATCH_EVALUATION_REASON',
            requestDurationMillis: 0,
            timestamp: '',
            segmentKeys: [],
          },
        },
      ],
    })

    const response = await featureFlagService.evaluateBooleanFlags(
      [FEATURE_FLAG_KEYS.SAVE_DEFAULTS, FEATURE_FLAG_KEYS.BAR_CHARTS],
      subject,
    )

    expect(initMock).toHaveBeenCalledTimes(1)
    expect(initMock).toHaveBeenCalledWith({
      url: 'http://localhost:9091',
      namespace: FEATURE_FLAG_NAMESPACE,
      authentication: {
        clientToken: 'token',
      },
    })
    expect(evaluateBatchMock).toHaveBeenCalledWith([
      {
        flagKey: FEATURE_FLAG_KEYS.SAVE_DEFAULTS,
        entityId: subject.entityId,
        context: subject.context,
      },
      {
        flagKey: FEATURE_FLAG_KEYS.BAR_CHARTS,
        entityId: subject.entityId,
        context: subject.context,
      },
    ])
    expect(response).toEqual({
      [FEATURE_FLAG_KEYS.SAVE_DEFAULTS]: false,
      [FEATURE_FLAG_KEYS.BAR_CHARTS]: true,
    })
  })

  it('uses fallback value for missing or error evaluation responses', async () => {
    const featureFlagService = new FeatureFlagService({
      token: 'token',
      url: 'http://localhost:9091',
    })

    evaluateBatchMock.mockReturnValue({
      requestDurationMillis: 1,
      responses: [
        {
          type: 'ERROR_EVALUATION_RESPONSE_TYPE',
          errorEvaluationResponse: {
            flagKey: FEATURE_FLAG_KEYS.SAVE_DEFAULTS,
            namespaceKey: FEATURE_FLAG_NAMESPACE,
            reason: 'NOT_FOUND_ERROR_EVALUATION_REASON',
          },
        },
      ],
    })

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

    evaluateBatchMock.mockImplementation(() => {
      throw new Error('evaluation failed')
    })

    const response = await featureFlagService.evaluateBooleanFlags([FEATURE_FLAG_KEYS.BAR_CHARTS], subject)

    expect(response).toEqual({
      [FEATURE_FLAG_KEYS.BAR_CHARTS]: false,
    })
  })

  it('returns the single evaluated boolean for evaluateBooleanFlag', async () => {
    const featureFlagService = new FeatureFlagService({
      token: 'token',
      url: 'http://localhost:9091',
    })

    evaluateBatchMock.mockReturnValue({
      requestDurationMillis: 1,
      responses: [
        {
          type: 'BOOLEAN_EVALUATION_RESPONSE_TYPE',
          booleanEvaluationResponse: {
            enabled: true,
            flagKey: FEATURE_FLAG_KEYS.STREAMING_DOWNLOAD,
            reason: 'MATCH_EVALUATION_REASON',
            requestDurationMillis: 0,
            timestamp: '',
            segmentKeys: [],
          },
        },
      ],
    })

    const enabled = await featureFlagService.evaluateBooleanFlag(FEATURE_FLAG_KEYS.STREAMING_DOWNLOAD, subject)

    expect(enabled).toBe(true)
  })

  it('retries client initialisation after initial failure', async () => {
    const featureFlagService = new FeatureFlagService({
      token: 'token',
      url: 'http://localhost:9091',
    })

    initMock.mockRejectedValueOnce(new Error('failed init')).mockResolvedValueOnce({
      evaluateBatch: evaluateBatchMock,
    })

    evaluateBatchMock.mockReturnValue({
      requestDurationMillis: 1,
      responses: [],
    })

    const firstResponse = await featureFlagService.evaluateBooleanFlags([FEATURE_FLAG_KEYS.BAR_CHARTS], subject)
    const secondResponse = await featureFlagService.evaluateBooleanFlags([FEATURE_FLAG_KEYS.BAR_CHARTS], subject)

    expect(firstResponse).toEqual({
      [FEATURE_FLAG_KEYS.BAR_CHARTS]: false,
    })
    expect(secondResponse).toEqual({
      [FEATURE_FLAG_KEYS.BAR_CHARTS]: false,
    })
    expect(initMock).toHaveBeenCalledTimes(2)
  })
})
