import ReportDataStore from '../data/reportDataStore'
import { UserReportData } from '../types/UserReports'
import { ReportStoreConfig } from '../types/ReportStore'

export default class ReportStoreService {
  reportStore: ReportDataStore

  initialised: boolean

  constructor(private readonly reportDataStore: ReportDataStore) {
    this.initialised = false
    this.reportStore = reportDataStore
  }

  async init(userId: string) {
    const userConfig = await this.getState(userId)
    if (Object.keys(userConfig).length === 0) {
      await this.reportStore.initUser(userId)
    }
    this.initialised = true
  }

  isInitialised() {
    return this.initialised
  }

  async getState(userId: string) {
    return this.reportStore.getUserConfig(userId)
  }

  async saveState(userId: string, userConfig: ReportStoreConfig) {
    await this.reportStore.setUserConfig(userId, userConfig)
  }

  findIndexByExecutionId(id: string, array: UserReportData[]) {
    return array.findIndex((report) => report.executionId === id)
  }

  findIndexByTableId(id: string, array: UserReportData[]) {
    return array.findIndex((report) => report.tableId === id)
  }
}
