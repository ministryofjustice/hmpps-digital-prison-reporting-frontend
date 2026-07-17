import { RedisClient } from '../data/reportDataStore'
import { MigrationServiceConfig } from '../data/types'
import { ReportStoreConfig } from '../types/ReportStore'
import logger from '../utils/logger'

interface ConfigToMigrate {
  key: string
  config: ReportStoreConfig
}

/**
 * One-off migration that updates report IDs stored in Redis
 * from: abc123
 * to: dpr_abc123
 *
 * The migration is idempotent and will only be marked as complete once
 * all user configs have been successfully processed.
 */
export class ReportIdMigrationService {
  enabled: boolean

  private static readonly MIGRATION_KEY = 'migration:dpr-report-ids:v1'

  private static readonly USER_CONFIG_PREFIX = 'dprReportStoreUser:'

  private static readonly MAX_RETRIES = 3

  constructor(
    private readonly redisClient: RedisClient,
    migrationServiceConfig?: MigrationServiceConfig | undefined,
  ) {
    this.enabled = migrationServiceConfig ? Boolean(migrationServiceConfig.enabled) : false
    if (!this.enabled) logger.info(`Migration service: disabled `)

    this.redisClient.on('error', error => {
      logger.error(error, 'Redis error')
    })
  }

  /**
   * Runs the migration.
   */
  public async migrate(): Promise<void> {
    if (!this.enabled) {
      logger.info('DPR report ID migration service is disabled')

      return
    }

    await this.ensureConnected()

    // TEMPORARILY DISABLE DURING TESTING
    // const migrationComplete = await this.redisClient.get(ReportIdMigrationService.MIGRATION_KEY)
    // if (migrationComplete) {
    //   logger.info('DPR report ID migration already completed')
    //   return
    // }

    logger.info('Starting DPR report ID migration')

    await this.debugLogs()

    // 1. get all the user configs from redis
    const configs: ConfigToMigrate[] = await this.getAllConfigs()

    let updatedConfigs = 0

    const initialFailures = await Promise.all(
      // 2. Loop over user configs
      configs.map(async config => {
        try {
          // 3. Migrate IDs for all a users sub configs
          const updated = await this.migrateSingleConfig(config)

          if (updated) {
            updatedConfigs += 1
          }

          return null
        } catch (error) {
          logger.error(error, `Failed to migrate config for key ${config.key}`)
          // 4. return failed configs so can be retried
          return config
        }
      }),
    )

    // 6. Retry any failed configs - max retries = 3
    const remainingFailures = await this.retryFailedConfigs(
      initialFailures.filter((config): config is ConfigToMigrate => config !== null),
    )

    if (remainingFailures.length > 0) {
      // Dont mark as complete if there are any remaining failures
      logger.error(
        {
          failureCount: remainingFailures.length,
          failedKeys: remainingFailures.map(config => config.key),
        },
        'DPR report ID migration failed. Migration flag will not be set.',
      )

      // Leaving the flag unset allows the migration to retry on the next startup.
      return
    }

    // 7. DONE Successfully - Set the completed flag globally
    await this.redisClient.set(ReportIdMigrationService.MIGRATION_KEY, 'true')

    logger.info(
      {
        totalConfigs: configs.length,
        updatedConfigs,
      },
      'DPR report ID migration completed successfully',
    )
  }

  /**
   * Retries failed migrations up to the configured maximum number
   * of attempts.
   */
  private async retryFailedConfigs(failedConfigs: ConfigToMigrate[], attempt = 1): Promise<ConfigToMigrate[]> {
    if (failedConfigs.length === 0 || attempt > ReportIdMigrationService.MAX_RETRIES) {
      return failedConfigs
    }

    logger.warn(
      {
        attempt,
        remainingFailures: failedConfigs.length,
      },
      'Retrying failed DPR report migrations',
    )

    const retryResults = await Promise.all(
      failedConfigs.map(async config => {
        try {
          await this.migrateSingleConfig(config)

          return null
        } catch (error) {
          logger.error(error, `Retry failed for key ${config.key}`)

          return config
        }
      }),
    )

    const remainingFailures = retryResults.filter((config): config is ConfigToMigrate => config !== null)

    return this.retryFailedConfigs(remainingFailures, attempt + 1)
  }

  /**
   * Migrates a single user config and persists it if any report IDs
   * were updated.
   */
  private async migrateSingleConfig(configToMigrate: ConfigToMigrate): Promise<boolean> {
    const { key, config } = configToMigrate

    const { updatedConfig, updated } = this.migrateConfig(config)

    if (!updated) {
      return false
    }

    await this.redisClient.set(key, JSON.stringify(updatedConfig))

    return true
  }

  /**
   * Retrieves every stored report config from Redis together with its
   * associated Redis key.
   */
  private async getAllConfigs(): Promise<ConfigToMigrate[]> {
    const keys = await this.getUserConfigKeys()

    if (keys.length === 0) {
      return []
    }

    // Fetch all user configs in a single Redis call.
    const values = await this.redisClient.mGet(keys)

    return keys.flatMap((key, index) => {
      const value = values[index]

      if (!value) {
        return []
      }

      try {
        return [
          {
            key,
            config: JSON.parse(value) as ReportStoreConfig,
          },
        ]
      } catch (error) {
        logger.error(error, `Failed to parse config for key ${key}`)

        return []
      }
    })
  }

  /**
   * Retrieves all Redis keys containing user report store data.
   */
  private async getUserConfigKeys(): Promise<string[]> {
    const scan = async (cursor = '0', keys: string[] = []): Promise<string[]> => {
      const result = await this.redisClient.scan(cursor, {
        MATCH: `${ReportIdMigrationService.USER_CONFIG_PREFIX}*`,
      })

      const nextKeys = [...keys, ...result.keys]

      return result.cursor === '0' ? nextKeys : scan(result.cursor, nextKeys)
    }

    return scan()
  }

  /**
   * Updates all report IDs in a user config and returns the updated
   * config along with whether any changes were made.
   */
  private migrateConfig(config: ReportStoreConfig): {
    updatedConfig: ReportStoreConfig
    updated: boolean
  } {
    const requestedReports = this.updateReportIds(config.requestedReports)

    const recentlyViewedReports = this.updateReportIds(config.recentlyViewedReports)

    const bookmarks = this.updateReportIds(config.bookmarks)

    const downloadPermissions = this.updateReportIds(config.downloadPermissions ?? [])

    const defaultFilters = this.updateReportIds(config.defaultFilters ?? [])

    const updated = [requestedReports, recentlyViewedReports, bookmarks, downloadPermissions, defaultFilters].some(
      result => result.updated,
    )

    return {
      updated,
      updatedConfig: {
        ...config,
        requestedReports: requestedReports.items,
        recentlyViewedReports: recentlyViewedReports.items,
        bookmarks: bookmarks.items,
        downloadPermissions: downloadPermissions.items,
        defaultFilters: defaultFilters.items,
      },
    }
  }

  /**
   * Updates report IDs in a collection and returns the updated
   * collection together with whether any items changed.
   */
  private updateReportIds<T extends { reportId: string }>(
    items: T[],
  ): {
    items: T[]
    updated: boolean
  } {
    let updated = false

    const updatedItems = items.map(item => {
      const newId = this.getMigratedReportId(item.reportId)

      if (newId === item.reportId) {
        return item
      }

      updated = true

      return {
        ...item,
        reportId: newId,
      }
    })

    return {
      items: updatedItems,
      updated,
    }
  }

  /**
   * Converts a legacy report ID into the new DPR-prefixed format.
   *
   * The method is intentionally idempotent so that rerunning the
   * migration will never double-prefix IDs.
   */
  private getMigratedReportId(reportId: string): string {
    // Already migrated IDs are returned unchanged.
    return reportId.startsWith('dpr_') ? reportId : `dpr_${reportId}`
  }

  private async ensureConnected(): Promise<void> {
    if (!this.redisClient.isOpen) {
      await this.redisClient.connect()
    }
  }

  private async debugLogs() {
    const matchAllResults = await this.redisClient.scan('0', {
      MATCH: '*',
      COUNT: 100,
    })

    logger.info(
      'MIGRATION_DEBUG: matchAllResults',
      JSON.stringify({
        cursor: matchAllResults.cursor,
        keyCount: matchAllResults.keys.length,
        keys: matchAllResults.keys.slice(0, 20),
      }),
    )

    const matchPrefixResults = await this.redisClient.scan('0', {
      MATCH: 'dprReportStoreUser:*',
      COUNT: 100,
    })

    logger.info('MIGRATION_DEBUG: matchPrefixResults', JSON.stringify({ matchPrefixResults }))

    const userKeysResults = await this.getUserConfigKeys()

    logger.info(
      'MIGRATION_DEBUG: userKeysResults',
      JSON.stringify({
        keyCount: userKeysResults.length,
        sampleKeys: userKeysResults.slice(0, 10),
      }),
    )
  }
}
