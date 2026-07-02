import { ReportStoreConfig } from 'src/dpr/types/ReportStore'
import ReportStoreService from '../../../../services/reportStoreService'
import UserDataStore from '../../../../data/reportDataStore'
import { StoredReportData, SubscribedReport } from '../../../../types/UserReports'
import logger from '../../../../utils/logger'
import { ServiceFeatureConfig } from '../../../../types/DprConfig'

class SubscriptionService extends ReportStoreService {
  enabled: boolean

  constructor(userDataStore: UserDataStore, serviceFeatureConfig: ServiceFeatureConfig) {
    super(userDataStore)

    this.enabled = Boolean(serviceFeatureConfig.subscriptions)
    if (!this.enabled) logger.info(`Subsriptions: disabled `)
  }

  private getSubscriptionsState(userConfig: ReportStoreConfig) {
    return userConfig.subscriptions ?? []
  }

  async getAllReports(userId: string): Promise<SubscribedReport[]> {
    const userConfig = await this.getState(userId)
    return this.getSubscriptionsState(userConfig)
  }

  async getReportByExecutionId(id: string, userId: string) {
    const userConfig = await this.getState(userId)

    const subscriptions = this.getSubscriptionsState(userConfig)

    return subscriptions.find(report => report.executionId === id)
  }

  async getReportByTableId(id: string, userId: string) {
    const userConfig = await this.getState(userId)

    const subscriptions = this.getSubscriptionsState(userConfig)

    return subscriptions.find(report => report.tableId === id)
  }

  async addReport(userId: string, reportStateData: SubscribedReport) {
    const userConfig = await this.getState(userId)

    const subscriptions = this.getSubscriptionsState(userConfig)

    subscriptions.unshift(reportStateData)

    await this.saveState(userId, userConfig)
  }

  async removeReport(userId: string, reportId: string, id: string) {
    const userConfig = await this.getState(userId)

    const subscriptions = this.getSubscriptionsState(userConfig)

    const index = this.findIndexByReportAndVariantId(id, reportId, subscriptions)

    if (index >= 0) {
      userConfig.subscriptions.splice(index, 1)

      await this.saveState(userId, userConfig)
    }
  }

  async isSubscribed(reportId: string, id: string, userId: string) {
    if (!this.enabled) return false

    const userConfig = await this.getState(userId)

    const subscriptions = this.getSubscriptionsState(userConfig)

    return subscriptions.some(report => report.id === id && report.reportId === reportId)
  }

  async getSubscription(reportId: string, id: string, userId: string) {
    if (!this.enabled) return undefined

    const userConfig = await this.getState(userId)

    const subscriptions = this.getSubscriptionsState(userConfig)

    const index = this.findIndexByReportAndVariantId(id, reportId, subscriptions)

    return index > -1 ? userConfig.subscriptions[index] : undefined
  }

  async updateTimestamps(tsDataArray: { tableId: string; createdAt: string; addedAt: string }[], userId: string) {
    const userConfig = await this.getState(userId)

    const subscriptions = tsDataArray.reduce(
      (updatedSubscriptions, tsData) => this.updateRefreshedTimestamp(tsData, updatedSubscriptions),
      this.getSubscriptionsState(userConfig),
    )

    userConfig.subscriptions = subscriptions

    await this.saveState(userId, userConfig)

    return subscriptions
  }

  updateRefreshedTimestamp(
    tsData: { tableId: string; createdAt: string; addedAt: string },
    subscriptions: StoredReportData[],
  ): StoredReportData[] {
    const { tableId, createdAt } = tsData
    const createdAtDate = new Date(createdAt)

    return subscriptions.map(subscription => {
      if (subscription.tableId !== tableId) {
        return subscription
      }

      const { refresh } = subscription.timestamp

      if (refresh && +refresh === +createdAtDate) {
        return subscription
      }

      return {
        ...subscription,
        timestamp: {
          ...subscription.timestamp,
          refresh: createdAtDate,
        },
      }
    })
  }
}

export { SubscriptionService }
export default SubscriptionService
