import { RedisClient } from '../data/reportDataStore'
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
export class DprReportIdMigrationService {
  private static readonly MIGRATION_KEY = 'migration:dpr-report-ids:v1'

  private static readonly USER_CONFIG_PREFIX = 'dprReportStoreUser:'

  private static readonly MAX_RETRIES = 3

  constructor(private readonly redisClient: RedisClient) {
    this.redisClient.on('error', error => {
      logger.error(error, 'Redis error')
    })
  }

  /**
   * Runs the migration if it has not already completed successfully.
   */
  public async migrate(): Promise<void> {
    const migrationComplete = await this.redisClient.get(DprReportIdMigrationService.MIGRATION_KEY)

    // Another startup or deployment has already completed the migration.
    if (migrationComplete) {
      logger.info('DPR report ID migration already completed')

      return
    }

    logger.info('Starting DPR report ID migration')

    const configs = await this.getAllConfigs()

    let updatedConfigs = 0

    const initialFailures = await Promise.all(
      configs.map(async config => {
        try {
          const updated = await this.migrateSingleConfig(config)

          if (updated) {
            updatedConfigs += 1
          }

          return null
        } catch (error) {
          logger.error(error, `Failed to migrate config for key ${config.key}`)

          return config
        }
      }),
    )

    const remainingFailures = await this.retryFailedConfigs(
      initialFailures.filter((config): config is ConfigToMigrate => config !== null),
    )

    if (remainingFailures.length > 0) {
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

    await this.redisClient.set(DprReportIdMigrationService.MIGRATION_KEY, 'true')

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
    if (failedConfigs.length === 0 || attempt > DprReportIdMigrationService.MAX_RETRIES) {
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
        MATCH: `${DprReportIdMigrationService.USER_CONFIG_PREFIX}*`,
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
}
