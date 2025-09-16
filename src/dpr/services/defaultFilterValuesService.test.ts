import { MockUserStoreService } from '../../../test-app/mocks/mockClients/store/mockRedisStore'
import { FiltersType } from '../components/_filters/filtersTypeEnum'
import ReportDataStore from '../data/reportDataStore'
import { ReportStoreConfig } from '../types/ReportStore'
import { defaultFilterConfig } from '../utils/Personalisation/types'
import DefaultFilterValuesService from './defaultFilterValuesService'

describe('DefaultFilterValuesService', () => {
  const mockUserStore: ReportDataStore = new MockUserStoreService() as unknown as ReportDataStore
  const defaultFilterValuesService: DefaultFilterValuesService = new DefaultFilterValuesService(mockUserStore)

  let saveStateSpy: jest.SpyInstance<Promise<void>, [userId: string, userConfig: ReportStoreConfig], unknown>

  let defaults1: defaultFilterConfig
  let defaults1b: defaultFilterConfig
  let defaults2: defaultFilterConfig

  beforeEach(() => {
    defaults1 = {
      reportId: 'reportId1',
      id: 'id1',
      values: [
        { name: 'name1.1', value: 'value1.1' },
        { name: 'name1.2', value: 'value1.2' },
        { name: 'name1.3', value: 'value1.3', type: FiltersType.REQUEST },
        { name: 'name1.4', value: 'value1.4', type: FiltersType.INTERACTIVE },
        { name: 'name1.5', value: 'value1.5', type: FiltersType.INTERACTIVE },
      ],
    }

    defaults1b = {
      reportId: 'reportId1',
      id: 'id1',
      values: [
        { name: 'name1.1', value: 'value1.1' },
        { name: 'name1.2', value: 'value1.5' },
        { name: 'name1.3', value: 'value1.7' },
      ],
    }

    defaults2 = {
      reportId: 'reportId2',
      id: 'id2',
      values: [
        { name: 'name2.1', value: 'value2.1' },
        { name: 'name2.2', value: 'value2.2' },
        { name: 'name2.3', value: 'value2.3', type: FiltersType.REQUEST },
        { name: 'name2.4', value: 'value2.4', type: FiltersType.INTERACTIVE },
        { name: 'name2.5', value: 'value2.5', type: FiltersType.INTERACTIVE },
      ],
    }

    jest.spyOn(defaultFilterValuesService, 'getState').mockResolvedValue({
      defaultFilters: [defaults1],
    } as unknown as ReportStoreConfig)

    saveStateSpy = jest.spyOn(defaultFilterValuesService, 'saveState')
  })

  describe('save', () => {
    it('should save the defaults', async () => {
      await defaultFilterValuesService.save('userId', defaults2.reportId, defaults2.id, defaults2.values)

      const userConfig = {
        defaultFilters: [defaults1, defaults2],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })

    it('should update the defaults', async () => {
      await defaultFilterValuesService.save('userId', defaults1.reportId, defaults1.id, defaults1b.values)

      const userConfig = {
        defaultFilters: [defaults1b],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })
  })

  describe('get', () => {
    it('should get the default values for a request filters', async () => {
      const defaults = await defaultFilterValuesService.get(
        'userId',
        defaults1.reportId,
        defaults1.id,
        FiltersType.REQUEST,
      )
      expect(defaults).toEqual([
        { name: 'name1.1', value: 'value1.1' },
        { name: 'name1.2', value: 'value1.2' },
        { name: 'name1.3', value: 'value1.3', type: FiltersType.REQUEST },
      ])
    })

    it('should get the default values for a request filters', async () => {
      const defaults = await defaultFilterValuesService.get(
        'userId',
        defaults1.reportId,
        defaults1.id,
        FiltersType.INTERACTIVE,
      )
      expect(defaults).toEqual([
        { name: 'name1.4', value: 'value1.4', type: FiltersType.INTERACTIVE },
        { name: 'name1.5', value: 'value1.5', type: FiltersType.INTERACTIVE },
      ])
    })
  })
})
