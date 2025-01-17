import UserDataStore from '../data/userDataStore'
import { UserReportData } from '../types/UserReports'
import { UserStoreConfig } from '../types/UserStore'

export default class UserStoreService {
  userStore: UserDataStore

  constructor(private readonly userDataStore: UserDataStore) {
    this.userStore = userDataStore
  }

  async init(userId: string) {
    const userConfig = await this.getState(userId)
    if (Object.keys(userConfig).length === 0) {
      await this.userStore.initUser(userId)
    }
  }

  async getState(userId: string) {
    return this.userStore.getUserConfig(userId)
  }

  async saveState(userId: string, userConfig: UserStoreConfig) {
    await this.userStore.setUserConfig(userId, userConfig)
  }

  findIndexByExecutionId(id: string, array: UserReportData[]) {
    return array.findIndex((report) => report.executionId === id)
  }

  findIndexByTableId(id: string, array: UserReportData[]) {
    return array.findIndex((report) => report.tableId === id)
  }
}
