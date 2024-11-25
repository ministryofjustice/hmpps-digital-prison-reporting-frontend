/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express'
import SyncRouteUtils from './syncRouteUtils'
import * as SyncRouteHelper from './syncRouteUtils'
import * as DownloadRoutes from '../routes/download'
import { Services } from '../types/Services'
import logger from './logger'

import MockUserStoreService from '../../../test-app/mocks/mockClients/store/mockRedisStore'
import DownloadPermissionService from '../services/downloadPermissionService'
import UserDataStore, { RedisClient } from '../data/userDataStore'
import { SyncReportFeatures, SyncReportFeaturesList } from '../types/SyncReportUtils'

const mockDownloadPermissionService = {
  init: () => true,
} as unknown as DownloadPermissionService
jest.mock('../services/downloadPermissionService', () => {
  return jest.fn().mockImplementation(() => {
    return mockDownloadPermissionService
  })
})

describe('SyncRouteUtils', () => {
  let router: Router
  let services: Services
  let redisClient: RedisClient
  let mockUserDataStore: UserDataStore

  let loggerSpy: jest.SpyInstance<void, [format: any, ...params: any[]], any>

  beforeEach(() => {
    router = {} as unknown as Router
    services = {} as unknown as Services
    redisClient = {} as unknown as RedisClient
    mockUserDataStore = new MockUserStoreService() as unknown as UserDataStore
    loggerSpy = jest.spyOn(logger, 'info')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('initUserDataStore', () => {
    it('should initialise the store given a redis client ', async () => {
      const features: SyncReportFeatures = {
        config: {
          redisClient,
        },
        list: [SyncReportFeaturesList.download],
      }

      try {
        await SyncRouteHelper.initUserDataStore(features, services)
      } catch (error) {
        //
      }

      expect(loggerSpy).toHaveBeenLastCalledWith('Sync Reports: Redis Client found. Initialising User Data store.')
    })

    it('should use a provided user data store', async () => {
      const features: SyncReportFeatures = {
        config: {
          userDataStore: mockUserDataStore,
        },
        list: [SyncReportFeaturesList.download],
      }

      try {
        await SyncRouteHelper.initUserDataStore(features, services)
      } catch (error) {
        //
      }

      expect(loggerSpy).toHaveBeenLastCalledWith(
        'Sync Reports: User data store found. Using the provided user data store',
      )
    })

    it('should throw error cant create UserData store no initialised service is provided', async () => {
      const features: SyncReportFeatures = {
        config: {},
        list: [SyncReportFeaturesList.download],
      }

      let errorMessage
      try {
        await SyncRouteHelper.initUserDataStore(features, services)
      } catch (error) {
        errorMessage = error.message
      }

      expect(loggerSpy).toHaveBeenLastCalledWith(
        'No user data store config provided. Assuming pre-initialisation of feature services',
      )
      expect(errorMessage).toEqual('Missing downloadPermissionService in services config: Cant enable download feature')
    })
  })

  describe('initFeatures', () => {
    let addDownloadRoutesSpy: jest.SpyInstance<
      void,
      [{ router: Router; layoutPath: string; services: Services; templatePath?: string }],
      any
    >

    beforeEach(() => {
      jest.spyOn(SyncRouteHelper, 'initUserDataStore').mockReturnValue(mockUserDataStore)
      addDownloadRoutesSpy = jest.spyOn(DownloadRoutes, 'default').mockImplementation(() => {
        // do nothing
      })
    })

    it('should initialise the download feature', async () => {
      const params = {
        router,
        config: {
          templatePath: 'templatePath',
          layoutPath: 'layoutPath',
        },
        services,
        features: {
          config: {
            redisClient,
            userId: 'userId',
          },
          list: [SyncReportFeaturesList.download],
        },
      }

      const res = await SyncRouteUtils.initFeatures(params)

      expect(loggerSpy).toHaveBeenNthCalledWith(4, 'Download Feature: Service initialised and added to services config')

      expect(addDownloadRoutesSpy).toHaveBeenCalledWith({
        router,
        services: {
          downloadPermissionService: mockDownloadPermissionService,
        },
        templatePath: params.config.templatePath,
        layoutPath: params.config.layoutPath,
      })

      expect(res.initialisedFeatures).toEqual({
        download: true,
      })
    })

    it('should not initialise the download feature if pre-initialised', async () => {
      const params = {
        router,
        config: {
          templatePath: 'templatePath',
          layoutPath: 'layoutPath',
        },
        services: {
          downloadPermissionService: mockDownloadPermissionService,
        } as unknown as Services,
        features: {
          config: {
            userDataStore: mockUserDataStore,
          },
          list: [SyncReportFeaturesList.download],
        },
      }

      const res = SyncRouteUtils.initFeatures(params)

      expect(addDownloadRoutesSpy).toHaveBeenCalledWith({
        router,
        services: {
          downloadPermissionService: mockDownloadPermissionService,
        },
        templatePath: params.config.templatePath,
        layoutPath: params.config.layoutPath,
      })

      expect(res.initialisedFeatures).toEqual({
        download: true,
      })

      expect(loggerSpy).toHaveBeenNthCalledWith(3, 'Download Feature: DownloadPermissionService found')
    })

    it('should provide info about unavailable services', async () => {
      const params = {
        router,
        config: {
          templatePath: 'templatePath',
          layoutPath: 'layoutPath',
        },
        services: {} as unknown as Services,
        features: {
          config: {
            userDataStore: mockUserDataStore,
          },
          list: [SyncReportFeaturesList.recentlyViewed, SyncReportFeaturesList.bookmark],
        },
      }

      SyncRouteUtils.initFeatures(params)

      expect(addDownloadRoutesSpy).not.toHaveBeenCalled()

      expect(loggerSpy).toHaveBeenNthCalledWith(2, 'Recently Viewed Feature: Not Available')
      expect(loggerSpy).toHaveBeenNthCalledWith(3, 'Bookmark Feature: Not Available')
    })
  })
})
