import type ReportingClient from '../data/reportingClient'
import { ServiceFeatureConfig } from '../types/DprConfig'
import logger from '../utils/logger'

export default class SubscriptionService {
  enabled: boolean

  constructor(
    private readonly reportingClient: ReportingClient,
    serviceFeatureConfig: ServiceFeatureConfig,
  ) {
    this.reportingClient = reportingClient

    this.enabled = Boolean(serviceFeatureConfig.subscriptions)
    if (!this.enabled) logger.info(`Subsriptions Service: disabled `)
  }

  async subscribe(
    token: string,
    reportId: string,
    id: string,
    dataProductDefinitionsPath?: string | undefined,
  ): Promise<{ tableId: string } | undefined> {
    if (!this.enabled) return undefined

    return this.reportingClient.subscribe(token, reportId, id, dataProductDefinitionsPath)
  }

  async unsubscribe(token: string, reportId: string, id: string, dataProductDefinitionsPath?: string | undefined) {
    if (!this.enabled) return undefined

    return this.reportingClient.unsubscribe(token, reportId, id, dataProductDefinitionsPath)
  }

  async getSubscriptions(
    token: string,
    tableIds: string[],
  ): Promise<{ tableId: string; createdAt: string; addedAt: string }[]> {
    if (!this.enabled) return []

    return this.reportingClient.getSubscriptions(token, tableIds)
  }
}
