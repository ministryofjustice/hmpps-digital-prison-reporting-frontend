import UserDataStore from '../data/userDataStore'
import { AsyncReportData } from '../types/AsyncReport'
import { UserStoreConfig } from '../types/UserStore'
import { RecentlyViewedReportData } from '../types/RecentlyViewed'

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

  findIndexByExecutionId(id: string, array: RecentlyViewedReportData[] | AsyncReportData[]) {
    return array.findIndex((report) => report.executionId === id)
  }
}
