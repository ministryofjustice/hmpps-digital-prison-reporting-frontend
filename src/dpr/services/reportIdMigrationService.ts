import { createClient } from 'redis'
import { Services } from '../types/Services'
import logger from '../utils/logger'

type RedisClient = ReturnType<typeof createClient>

export class DprReportIdMigrationService {
  private static readonly migrationKey = 'migration:dpr-report-ids:v1'

  // private static readonly USER_CONFIG_PREFIX = 'dprReportStoreUser:'

  constructor(
    private readonly redisClient: RedisClient,
    private readonly services: Services,
  ) {
    this.redisClient.on('error', error => {
      logger.error(error, 'Redis error')
    })
  }

  public async migrate(): Promise<void> {
    const completed = await this.redisClient.get(DprReportIdMigrationService.migrationKey)

    if (completed) {
      return
    }

    const definitions = await this.services.reportingService.getDefinitions('')

    const validIds = new Set(definitions.map(d => d.id))

    const containsDprIds = [...validIds].some(id => id.startsWith('dpr_'))

    if (!containsDprIds) {
      return
    }

    // await this.migrateAllUsers(validIds)

    await this.redisClient.set(DprReportIdMigrationService.migrationKey, 'true')
  }
}
