import UserDataStore, { UserStoreConfig } from '../data/userDataStore'
import { AsyncReportData } from '../types/AsyncReport'

export default class UserStoreService {
  userConfig: UserStoreConfig

  userId: string

  requestedReports: AsyncReportData[]

  userStore: UserDataStore

  constructor(private readonly userDataStore: UserDataStore) {
    this.userStore = userDataStore
  }

  async init(userId: string) {
    this.userId = userId
    await this.getState()
    if (Object.keys(this.userConfig).length === 0) {
      this.userStore.initUser(this.userId)
    }
  }

  async getState() {
    this.userConfig = await this.userStore.getUserConfig(this.userId)
  }

  async saveState() {
    await this.userStore.setUserConfig(this.userId, this.userConfig)
  }
}
