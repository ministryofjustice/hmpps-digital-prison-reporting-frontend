// eslint-disable-next-line import/no-extraneous-dependencies
import { createClient } from 'redis'
import logger from '../utils/logger'
import { UserStoreConfig } from '../types/UserStore'

export type RedisClient = ReturnType<typeof createClient>

export default class UserDataStore {
  private readonly prefix = 'userConfig:'

  constructor(private readonly redisClient: RedisClient) {
    redisClient.on('error', (error) => {
      logger.error(error, `Redis error`)
    })
  }

  private async ensureConnected() {
    if (!this.redisClient.isOpen) {
      await this.redisClient.connect()
    }
  }

  public async initUser(userId: string) {
    const config = this.getUserConfig(userId)
    if (!config || Object.keys(config).length === 0) {
      await this.setUserConfig(userId, { ...baseplateStore })
    }
  }

  public async setUserConfig(userId: string, config: UserStoreConfig): Promise<void> {
    await this.ensureConnected()
    await this.redisClient.set(`${this.prefix}${userId}`, JSON.stringify(config))
  }

  public async getUserConfig(userId: string): Promise<UserStoreConfig> {
    await this.ensureConnected()
    const userConfig = await this.redisClient.get(`${this.prefix}${userId}`)
    return userConfig ? JSON.parse(userConfig) : {}
  }
}

const baseplateStore: UserStoreConfig = {
  requestedReports: [],
  recentlyViewedReports: [],
  bookmarks: [],
}
