import UserDataStore from '../data/userDataStore'
import { DownloadPermissionConfig } from '../types/Download'
import UserStoreService from './userStoreService'

export default class DownloadPermissionService extends UserStoreService {
  constructor(userDataStore: UserDataStore) {
    super(userDataStore)
  }

  async saveDownloadPermissionData(userId: string, reportId: string, id: string) {
    const userConfig = await this.getState(userId)
    if (!userConfig.downloadPermissions) {
      userConfig.downloadPermissions = []
    }
    userConfig.downloadPermissions.push({ reportId, id })
    await this.saveState(userId, userConfig)
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

  async canDownloadReport(userId: string, reportId: string, id: string) {
    const userConfig = await this.getState(userId)
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
