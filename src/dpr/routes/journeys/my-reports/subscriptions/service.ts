import { ReportStoreConfig } from 'src/dpr/types/ReportStore'
import { GetSubscriptionResponse } from 'src/dpr/types/Subscriptions'
import ReportStoreService from '../../../../services/reportStoreService'
import UserDataStore from '../../../../data/reportDataStore'
import { RequestStatus, StoredReportData, SubscribedReport } from '../../../../types/UserReports'
import logger from '../../../../utils/logger'
import { ServiceFeatureConfig } from '../../../../types/DprConfig'

export default class SubscriptionStoreService extends ReportStoreService {
  enabled: boolean

  constructor(userDataStore: UserDataStore, serviceFeatureConfig: ServiceFeatureConfig) {
    super(userDataStore)

    this.enabled = Boolean(serviceFeatureConfig.subscriptions)
    if (!this.enabled) logger.info(`Subsriptions Store Service: disabled `)
  }

  private getSubscriptionsState(userConfig: ReportStoreConfig) {
    if (!this.enabled) return []

    return userConfig.subscriptions ?? []
  }

  async getAllReports(userId: string): Promise<SubscribedReport[]> {
    if (!this.enabled) return []

    const userConfig = await this.getState(userId)
    return this.getSubscriptionsState(userConfig)
  }

  async getReportByExecutionId(id: string, userId: string) {
    if (!this.enabled) return undefined

    const userConfig = await this.getState(userId)

    const subscriptions = this.getSubscriptionsState(userConfig)

    return subscriptions.find(report => report.executionId === id)
  }

  async getReportByTableId(id: string, userId: string) {
    if (!this.enabled) return undefined

    const userConfig = await this.getState(userId)

    const subscriptions = this.getSubscriptionsState(userConfig)

    return subscriptions.find(report => report.tableId === id)
  }

  async addReport(userId: string, reportStateData: SubscribedReport) {
    if (!this.enabled) return

    const userConfig = await this.getState(userId)

    const subscriptions = this.getSubscriptionsState(userConfig)

    const sub = subscriptions.find(subscription => subscription.tableId === reportStateData.tableId)

    if (!sub) {
      subscriptions.unshift(reportStateData)

      await this.saveState(userId, userConfig)
    }
  }

  async removeReport(userId: string, reportId: string, id: string) {
    if (!this.enabled) return

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

  async updateSubscriptions(subsStatus: GetSubscriptionResponse[], userId: string) {
    if (!this.enabled) return []

    const userConfig = await this.getState(userId)

    const subscriptions = subsStatus.reduce((updatedSubscriptions, subStatusData) => {
      const withUpdatedTimestamp = this.updateRefreshedTimestamp(subStatusData, updatedSubscriptions)

      return this.updateStatus(subStatusData, withUpdatedTimestamp)
    }, this.getSubscriptionsState(userConfig))

    userConfig.subscriptions = subscriptions

    await this.saveState(userId, userConfig)

    return subscriptions
  }

  /**
   * Only update the stored refresh timestamp when it has actually changed.
   * If both timestamps are undefined, keep the existing subscription.
   * If the existing refresh timestamp matches the API timestamp, no update is needed.
   * Otherwise update the stored refresh value, including when:
   *   - refresh is undefined and the API provides a timestamp
   *   - refresh differs from the API timestamp
   *   - refresh exists but the API timestamp is now undefined
   *
   * @param {GetSubscriptionResponse} subStatusData
   * @param {StoredReportData[]} subscriptions
   * @return {*}  {StoredReportData[]}
   * @memberof SubscriptionStoreService
   */
  updateRefreshedTimestamp(
    subStatusData: GetSubscriptionResponse,
    subscriptions: StoredReportData[],
  ): StoredReportData[] {
    if (!this.enabled) return []

    const { tableId, reportUpdatedTime } = subStatusData
    const createdAtDate = reportUpdatedTime ? new Date(reportUpdatedTime) : undefined

    return subscriptions.map(subscription => {
      if (subscription.tableId !== tableId) {
        return subscription
      }

      const { refresh } = subscription.timestamp

      // No change required
      if (!refresh && !createdAtDate) {
        return subscription
      }

      // No change required
      if (refresh && createdAtDate && +refresh === +createdAtDate) {
        return subscription
      }

      // Update when:
      // - refresh is undefined and createdAtDate is defined
      // - refresh differs from createdAtDate
      // - refresh is defined and createdAtDate is undefined
      return {
        ...subscription,
        timestamp: {
          ...subscription.timestamp,
          refresh: createdAtDate,
        },
      }
    })
  }

  /**
   * Update the stored status when it differs from the API status.
   *
   * @param {GetSubscriptionResponse} subStatusData
   * @param {StoredReportData[]} subscriptions
   * @return {*} {StoredReportData[]}
   * @memberof SubscriptionStoreService
   */
  updateStatus(subStatusData: GetSubscriptionResponse, subscriptions: StoredReportData[]): StoredReportData[] {
    if (!this.enabled) return []

    const { reportId, reportVariantId, reportStatus } = subStatusData

    return subscriptions.map(subscription => {
      if (subscription.reportId !== reportId || subscription.id !== reportVariantId) {
        return subscription
      }

      if (!reportStatus || subscription.status === reportStatus) {
        return subscription
      }

      return {
        ...subscription,
        status: reportStatus as RequestStatus,
      }
    })
  }
}
