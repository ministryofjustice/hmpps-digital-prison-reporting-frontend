import ReportDataStore from '../data/reportDataStore'
import { UserReportData } from '../types/UserReports'
import { ReportStoreConfig } from '../types/ReportStore'

class ReportStoreService {
  reportStore: ReportDataStore

  constructor(readonly reportDataStore: ReportDataStore) {
    this.reportStore = reportDataStore
  }

  async getState(userId: string) {
    return this.reportStore.getUserConfig(userId)
  }

  async saveState(userId: string, userConfig: ReportStoreConfig) {
    await this.reportStore.setUserConfig(userId, userConfig)
  }

  findIndexByExecutionId(executionId: string, array: UserReportData[]) {
    return array.findIndex((report) => report.executionId === executionId)
  }

  findIndexByTableId(tableId: string, array: UserReportData[]) {
    return array.findIndex((report) => report.tableId === tableId)
  }

  findIndexByReportId(id: string, array: UserReportData[]) {
    return array.findIndex((report) => report.id === id)
  }

  findIndexByReportAndVariantId(id: string, reportId: string, array: UserReportData[]) {
    return array.findIndex((report) => report.id === id && report.reportId === reportId)
  }
}

export { ReportStoreService }
export default ReportStoreService
