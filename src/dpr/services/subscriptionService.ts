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

  async subscribe(token: string, reportId: string, id: string): Promise<{ tableId: string } | undefined> {
    if (!this.enabled) return undefined

    return this.reportingClient.subscribe(token, reportId, id)
  }

  async unsubscribe(token: string, reportId: string, id: string) {
    if (!this.enabled) return undefined

    return this.reportingClient.unsubscribe(token, reportId, id)
  }

  async getSubscriptions(
    token: string,
  ): Promise<{ reportId: string; id: string; tableId: string; createdAt: string; addedAt: string }[]> {
    if (!this.enabled) return []

    return this.reportingClient.getSubscriptions(token)
  }
}
