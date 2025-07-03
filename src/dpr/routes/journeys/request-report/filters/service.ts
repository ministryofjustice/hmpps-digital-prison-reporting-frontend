import ReportStoreService from '../../../../services/reportStoreService'
import ReportDataStore from '../../../../data/reportDataStore'
import { defaultFilterValue } from './types'
import { ReportStoreConfig } from '../../../../types/ReportStore'

export default class DefaultFilterValuesService extends ReportStoreService {
  constructor(reportDataStore: ReportDataStore) {
    super(reportDataStore)
  }

  async save(userId: string, reportId: string, id: string, values: defaultFilterValue[]) {
    const userConfig = await this.getState(userId)

    if (!values.length) {
      await this.delete(userConfig, userId, id, reportId)
      return
    }

    const defaults = {
      reportId,
      id,
      values,
    }

    const defaultValuesIndex = await this.getIndex(userId, id, reportId)

    if (defaultValuesIndex === -1) {
      userConfig.defaultFilters.push(defaults)
    } else {
      userConfig.defaultFilters[defaultValuesIndex] = defaults
    }

    await this.saveState(userId, userConfig)
  }

  async get(userId: string, id: string, reportId: string) {
    const userConfig = await this.getState(userId)
    const defaultConfig = userConfig.defaultFilters.find((defaultFilter) => {
      return defaultFilter.id === id && defaultFilter.reportId === reportId
    })
    return defaultConfig ? defaultConfig.values : undefined
  }

  async getIndex(userId: string, id: string, reportId: string) {
    const userConfig = await this.getState(userId)
    return userConfig.defaultFilters.findIndex((defaultFilter) => {
      return defaultFilter.id === id && defaultFilter.reportId === reportId
    })
  }

  async delete(userConfig: ReportStoreConfig, userId: string, id: string, reportId: string) {
    const index = await this.getIndex(userId, id, reportId)
    userConfig.defaultFilters.splice(index, 1)
    await this.saveState(userId, userConfig)
  }
}
