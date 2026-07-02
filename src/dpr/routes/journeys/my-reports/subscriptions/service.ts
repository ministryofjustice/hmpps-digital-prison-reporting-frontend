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

  async getAllReports(userId: string): Promise<SubscribedReport[]> {
    const userConfig = await this.getState(userId)
    return userConfig.subscriptions
  }

  async getReportByExecutionId(id: string, userId: string) {
    const userConfig = await this.getState(userId)

    return userConfig.subscriptions.find(report => report.executionId === id)
  }

  async getReportByTableId(id: string, userId: string) {
    const userConfig = await this.getState(userId)

    return userConfig.subscriptions.find(report => report.tableId === id)
  }

  async addReport(userId: string, reportStateData: SubscribedReport) {
    const userConfig = await this.getState(userId)

    userConfig.subscriptions.unshift(reportStateData)

    await this.saveState(userId, userConfig)
  }

  async removeReport(userId: string, reportId: string, id: string) {
    const userConfig = await this.getState(userId)
    const { subscriptions } = userConfig

    const index = this.findIndexByReportAndVariantId(id, reportId, subscriptions)

    if (index >= 0) {
      userConfig.subscriptions.splice(index, 1)

      await this.saveState(userId, userConfig)
    }
  }

  async isSubscribed(reportId: string, id: string, userId: string) {
    if (!this.enabled) return false

    const userConfig = await this.getState(userId)

    return userConfig.subscriptions.some(report => report.id === id && report.reportId === reportId)
  }

  async getSubscription(reportId: string, id: string, userId: string) {
    if (!this.enabled) return undefined

    const userConfig = await this.getState(userId)
    const { subscriptions } = userConfig

    const index = this.findIndexByReportAndVariantId(id, reportId, subscriptions)

    return index > -1 ? userConfig.subscriptions[index] : undefined
  }

  async updateTimestamps(tsDataArray: { tableId: string; createdAt: string; addedAt: string }[], userId: string) {
    const userConfig = await this.getState(userId)

    const subscriptions = tsDataArray.reduce(
      (updatedSubscriptions, tsData) => this.updateRefreshedTimestamp(tsData, updatedSubscriptions),
      userConfig.subscriptions,
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
