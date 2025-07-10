// eslint-disable-next-line import/no-extraneous-dependencies
import { createClient } from 'redis'
import logger from '../utils/logger'
import { ReportStoreConfig } from '../types/ReportStore'

export type RedisClient = ReturnType<typeof createClient>

export default class ReportDataStore {
  prefix: string

  constructor(private readonly redisClient: RedisClient, prefix = 'dprReportStoreUser:') {
    redisClient.on('error', (error) => {
      logger.error(error, `Redis error`)
    })
    this.prefix = prefix
  }

  private async ensureConnected() {
    if (!this.redisClient.isOpen) {
      await this.redisClient.connect()
    }
  }

  public async setUserConfig(userId: string, config: ReportStoreConfig): Promise<void> {
    await this.ensureConnected()
    await this.redisClient.set(`${this.prefix}${userId}`, JSON.stringify(config))
  }

  public async getUserConfig(userId: string): Promise<ReportStoreConfig> {
    await this.ensureConnected()
    const userConfig = await this.redisClient.get(`${this.prefix}${userId}`)
    return userConfig ? JSON.parse(userConfig) : this.setBaseplate(userId)
  }

  private async setBaseplate(userId: string) {
    logger.info(`Initialising new DPR user config in store. prefix: ${this.prefix}`)
    const userConfig = { ...baseplateStore }
    await this.setUserConfig(userId, userConfig)
    return { ...baseplateStore }
  }
}

const baseplateStore: ReportStoreConfig = {
  requestedReports: [],
  recentlyViewedReports: [],
  bookmarks: [],
  downloadPermissions: [],
  defaultFilters: [],
}
