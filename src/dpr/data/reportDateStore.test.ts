// eslint-disable-next-line import/no-extraneous-dependencies
import { createClient } from 'redis'
import UserDataStore from './reportDataStore'
import { ReportStoreConfig } from '../types/ReportStore'

type RedisClient = ReturnType<typeof createClient>

const redisClient = {
  get: jest.fn(),
  set: jest.fn(),
  on: jest.fn(),
  connect: jest.fn(),
  isOpen: true,
} as unknown as jest.Mocked<RedisClient>

describe('userDataStore', () => {
  let userDataStore: UserDataStore

  beforeEach(() => {
    userDataStore = new UserDataStore(redisClient as unknown as RedisClient)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('get user config', () => {
    it('Can retrieve user config', async () => {
      const mockStoreData: ReportStoreConfig = {
        requestedReports: [],
        recentlyViewedReports: [],
        bookmarks: [],
      }
      redisClient.get.mockResolvedValue(JSON.stringify(mockStoreData))

      await expect(userDataStore.getUserConfig('user-1')).resolves.toEqual(mockStoreData)

      expect(redisClient.get).toHaveBeenCalledWith('userConfig:user-1')
    })

    it('Connects when no connection calling getUserConfig', async () => {
      ;(redisClient as unknown as Record<string, boolean>).isOpen = false

      await userDataStore.getUserConfig('user-1')

      expect(redisClient.connect).toHaveBeenCalledWith()
    })
  })

  describe('set user config', () => {
    it('Can set user config', async () => {
      const mockStoreData: ReportStoreConfig = {
        requestedReports: [],
        recentlyViewedReports: [],
        bookmarks: [],
      }
      await userDataStore.setUserConfig('user-1', mockStoreData)

      expect(redisClient.set).toHaveBeenCalledWith('userConfig:user-1', JSON.stringify(mockStoreData))
    })

    it('Connects when no connection calling setUserConfig', async () => {
      const mockStoreData: ReportStoreConfig = {
        requestedReports: [],
        recentlyViewedReports: [],
        bookmarks: [],
      }
      ;(redisClient as unknown as Record<string, boolean>).isOpen = false

      await userDataStore.setUserConfig('user-1', mockStoreData)

      expect(redisClient.connect).toHaveBeenCalledWith()
    })
  })
})
