import logger from '../../../../utils/logger'
import type { DownloadPermissionConfig } from '../../../../types/Download'
import ReportStoreService from '../../../../services/reportStoreService'
import UserDataStore from '../../../../data/reportDataStore'

export default class DownloadPermissionService extends ReportStoreService {
  constructor(userDataStore: UserDataStore) {
    super(userDataStore)
    logger.info('Service created: DownloadPermissionService')
  }

  async saveDownloadPermissionData(userId: string, reportId: string, id: string) {
    const userConfig = await this.getState(userId)

    // Init downloads if not present
    if (!userConfig.downloadPermissions) {
      userConfig.downloadPermissions = []
    }
    const permissionExists = await this.downloadEnabled(userId, reportId, id)
    if (!permissionExists) {
      userConfig.downloadPermissions.push({ reportId, id })
      logger.info(`Download permission granted for ${userId}: ${reportId} - ${id}`)
      await this.saveState(userId, userConfig)
    }
  }

  async removeDownloadPermissionData(userId: string, reportId: string, id: string) {
    const userConfig = await this.getState(userId)
    const index = userConfig.downloadPermissions.findIndex((downloadConfig) => {
      return downloadConfig.id === id
    })
    if (index >= 0) {
      userConfig.downloadPermissions.splice(index, 1)
    }
    await this.saveState(userId, userConfig)
  }

  async downloadEnabled(userId: string, reportId: string, id: string) {
    const userConfig = await this.getState(userId)

    if (!userConfig.downloadPermissions) return false

    const config = userConfig.downloadPermissions.find((downloadConfig: DownloadPermissionConfig) => {
      return downloadConfig.id === id && downloadConfig.reportId === reportId
    })
    return !!config
  }

  async getAllDownloadPermissions(userId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.downloadPermissions
  }
}
