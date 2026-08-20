import type ReportingClient from '../data/reportingClient'
import { ServiceFeatureConfig } from '../types/DprConfig'
import { GetSubscriptionResponse } from '../types/Subscriptions'
import logger from '../utils/logger'

export default class SubscriptionService {
  enabled: boolean

  constructor(
    private readonly reportingClient: ReportingClient,
    serviceFeatureConfig: ServiceFeatureConfig,
  ) {
    this.reportingClient = reportingClient

    this.enabled = Boolean(serviceFeatureConfig.subscriptions)
    if (!this.enabled) logger.info(`Subscriptions Service: disabled`)
  }

  async subscribe(token: string, reportId: string, id: string): Promise<{ tableId: string } | undefined> {
    if (!this.enabled) return undefined

    return this.reportingClient.subscribe(token, reportId, id)
  }

  async unsubscribe(token: string, reportId: string, id: string) {
    if (!this.enabled) return undefined

    return this.reportingClient.unsubscribe(token, reportId, id)
  }

  async getSubscription(token: string, reportId: string, id: string): Promise<GetSubscriptionResponse | undefined> {
    if (!this.enabled) return undefined

    return this.reportingClient.getSubscription(token, reportId, id)
  }

  async getSubscriptions(token: string): Promise<GetSubscriptionResponse[]> {
    if (!this.enabled) return []

    return this.reportingClient.getSubscriptions(token)
  }
}
