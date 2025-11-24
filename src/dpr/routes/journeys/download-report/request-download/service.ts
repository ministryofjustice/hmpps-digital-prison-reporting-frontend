import logger from '../../../../utils/logger'
import type { DownloadPermissionConfig } from '../../../../types/Download'
import ReportStoreService from '../../../../services/reportStoreService'
import UserDataStore from '../../../../data/reportDataStore'
import { ServiceFeatureConfig } from '../../../../types/DprConfig'

class DownloadPermissionService extends ReportStoreService {
  enabled: boolean

  constructor(userDataStore: UserDataStore, serviceFeatureConfig: ServiceFeatureConfig) {
    super(userDataStore)
    this.enabled = Boolean(serviceFeatureConfig.download)
    if (!this.enabled) logger.info(`Download: disabled `)
  }

  async saveDownloadPermissionData(userId: string, reportId: string, id: string): Promise<void> {
    if (!this.enabled) return

    const userConfig = await this.getState(userId)

    // Init downloads if not present
    if (!userConfig.downloadPermissions) {
      userConfig.downloadPermissions = []
    }
    const permissionExists = await this.downloadEnabledForReport(userId, reportId, id)
    if (!permissionExists) {
      userConfig.downloadPermissions.push({ reportId, id })
      logger.info(`Download permission granted for ${userId}: ${reportId} - ${id}`)
      await this.saveState(userId, userConfig)
    }
  }

  async removeDownloadPermissionData(userId: string, id: string): Promise<void> {
    if (!this.enabled) return

    const userConfig = await this.getState(userId)
    const { downloadPermissions } = userConfig
    if (downloadPermissions) {
      const index = downloadPermissions.findIndex((downloadConfig) => {
        return downloadConfig.id === id
      })
      if (index >= 0) {
        downloadPermissions.splice(index, 1)
      }
      await this.saveState(userId, userConfig)
    }
  }

  async downloadEnabledForReport(userId: string, reportId: string, id: string): Promise<boolean> {
    if (!this.enabled) return false

    const userConfig = await this.getState(userId)

    if (!userConfig.downloadPermissions) return false

    const config = userConfig.downloadPermissions.find((downloadConfig: DownloadPermissionConfig) => {
      return downloadConfig.id === id && downloadConfig.reportId === reportId
    })
    return !!config
  }

  async getAllDownloadPermissions(userId: string): Promise<DownloadPermissionConfig[]> {
    if (!this.enabled) return []

    const userConfig = await this.getState(userId)
    return userConfig.downloadPermissions || []
  }
}

export { DownloadPermissionService }
export default DownloadPermissionService
