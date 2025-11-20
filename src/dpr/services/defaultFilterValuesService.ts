/* eslint-disable no-param-reassign */
import ReportStoreService from './reportStoreService'
import ReportDataStore from '../data/reportDataStore'
import { ReportStoreConfig } from '../types/ReportStore'
import { defaultFilterValue } from '../utils/Personalisation/types'
import { FiltersType } from '../components/_filters/filtersTypeEnum'

class DefaultFilterValuesService extends ReportStoreService {
  constructor(reportDataStore: ReportDataStore) {
    super(reportDataStore)
  }

  async init(userConfig: ReportStoreConfig, userId: string) {
    if (!userConfig.defaultFilters) {
      userConfig.defaultFilters = []
      await this.saveState(userId, userConfig)
    }
  }

  async save(userId: string, reportId: string, id: string, values: defaultFilterValue[]) {
    const userConfig = await this.getState(userId)
    await this.init(userConfig, userId)

    const defaults = {
      reportId,
      id,
      values,
    }

    const defaultValuesIndex = await this.getIndex(userId, reportId, id)
    if (userConfig.defaultFilters !== undefined) {
      if (defaultValuesIndex === -1) {
        userConfig.defaultFilters.push(defaults)
      } else if (typeof defaultValuesIndex === 'number') {
        userConfig.defaultFilters[defaultValuesIndex] = defaults
      }
      await this.saveState(userId, userConfig)
    }
  }

  async get(userId: string, reportId: string, id: string, filtersType: FiltersType) {
    const userConfig = await this.getState(userId)
    const defaultConfig = userConfig.defaultFilters?.find((defaultFilter) => {
      return defaultFilter.id === id && defaultFilter.reportId === reportId
    })
    if (!defaultConfig) {
      return undefined
    }
    return defaultConfig.values.filter((v) => {
      const type = !v.type ? FiltersType.REQUEST : v.type
      return filtersType === type
    })
  }

  async getIndex(userId: string, reportId: string, id: string) {
    const userConfig = await this.getState(userId)
    return userConfig.defaultFilters?.findIndex((defaultFilter) => {
      return defaultFilter.id === id && defaultFilter.reportId === reportId
    })
  }

  async delete(userId: string, reportId: string, id: string, type: FiltersType) {
    const userConfig = await this.getState(userId)
    const index = await this.getIndex(userId, reportId, id)
    if (index !== undefined && index !== -1 && userConfig.defaultFilters) {
      const defaults = userConfig.defaultFilters[index]
      if (defaults.values.length > 0) {
        const updatedValues = defaults.values.filter((value) => {
          const filtersType = !value.type ? FiltersType.REQUEST : value.type
          return filtersType !== type
        })
        userConfig.defaultFilters[index].values = updatedValues
      } else {
        userConfig.defaultFilters.splice(index, 1)
      }
      await this.saveState(userId, userConfig)
    }
  }
}

export { DefaultFilterValuesService }
export default DefaultFilterValuesService
