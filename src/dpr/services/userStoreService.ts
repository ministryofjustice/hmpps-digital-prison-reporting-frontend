import UserDataStore from '../data/userDataStore'
import { AsyncReportData } from '../types/AsyncReport'
import { UserStoreConfig } from '../types/UserStore'
import { RecentlyViewedReportData } from '../types/RecentlyViewed'

export default class UserStoreService {
  userConfig: UserStoreConfig

  userId: string

  userStore: UserDataStore

  constructor(private readonly userDataStore: UserDataStore) {
    this.userStore = userDataStore
  }

  async init(userId: string) {
    this.userId = userId
    await this.getState()
    if (Object.keys(this.userConfig).length === 0) {
      await this.userStore.initUser(this.userId)
    }
  }

  async getState() {
    this.userConfig = await this.userStore.getUserConfig(this.userId)
  }

  async saveState() {
    await this.userStore.setUserConfig(this.userId, this.userConfig)
  }

  findIndexByExecutionId(id: string, array: RecentlyViewedReportData[] | AsyncReportData[]) {
    return array.findIndex((report) => report.executionId === id)
  }
}
