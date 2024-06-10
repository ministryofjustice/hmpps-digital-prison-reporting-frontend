// eslint-disable-next-line import/no-extraneous-dependencies
import { createClient } from 'redis'
import UserDataStore, { UserStoreConfig } from './userDataStore'

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
      redisClient.get.mockResolvedValue('token-1')

      await expect(userDataStore.getUserConfig('user-1')).resolves.toBe('token-1')

      expect(redisClient.get).toHaveBeenCalledWith('user-1')
    })

    it('Connects when no connection calling getToken', async () => {
      ;(redisClient as unknown as Record<string, boolean>).isOpen = false

      await userDataStore.getUserConfig('user-1')

      expect(redisClient.connect).toHaveBeenCalledWith()
    })
  })

  describe('set token', () => {
    it('Can set token', async () => {
      const mockStoreData: UserStoreConfig = {
        requestedReports: [],
        recentlyViewedReports: [],
        bookmarks: [],
      }
      await userDataStore.setUserConfig('user-1', mockStoreData)

      expect(redisClient.set).toHaveBeenCalledWith('userConfig:user-1', JSON.stringify(mockStoreData))
    })

    it('Connects when no connection calling set token', async () => {
      const mockStoreData: UserStoreConfig = {
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
