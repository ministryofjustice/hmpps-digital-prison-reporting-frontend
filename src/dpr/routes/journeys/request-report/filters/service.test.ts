import MockUserStoreService from '../../../../../../test-app/mocks/mockClients/store/mockRedisStore'
import ReportDataStore from '../../../../data/reportDataStore'
import { ReportStoreConfig } from '../../../../types/ReportStore'
import DefaultFilterService from './service'
import { defaultFilterConfig } from './types'

describe('DefaultFilterService', () => {
  const mockUserStore: ReportDataStore = new MockUserStoreService() as unknown as ReportDataStore
  const defaultFilterService: DefaultFilterService = new DefaultFilterService(mockUserStore)

  let saveStateSpy: jest.SpyInstance<Promise<void>, [userId: string, userConfig: ReportStoreConfig], any>

  let defaults1: defaultFilterConfig
  let defaults1b: defaultFilterConfig
  let defaults1c: defaultFilterConfig
  let defaults2: defaultFilterConfig

  beforeEach(() => {
    defaults1 = {
      reportId: 'reportId1',
      id: 'id1',
      values: [
        { id: 'name1.1', value: 'value1.1' },
        { id: 'name1.2', value: 'value1.2' },
        { id: 'name1.3', value: 'value1.3' },
      ],
    }

    defaults1b = {
      reportId: 'reportId1',
      id: 'id1',
      values: [
        { id: 'name1.1', value: 'value1.1' },
        { id: 'name1.2', value: 'value1.5' },
        { id: 'name1.3', value: 'value1.7' },
      ],
    }

    defaults2 = {
      reportId: 'reportId2',
      id: 'id2',
      values: [
        { id: 'name2.1', value: 'value2.1' },
        { id: 'name2.2', value: 'value2.2' },
        { id: 'name2.3', value: 'value2.3' },
      ],
    }

    defaults1c = {
      reportId: 'reportId1',
      id: 'id1',
      values: [],
    }

    jest.spyOn(defaultFilterService, 'getState').mockResolvedValue({
      defaultFilters: [defaults1],
    } as unknown as ReportStoreConfig)

    saveStateSpy = jest.spyOn(defaultFilterService, 'saveState')
  })

  describe('save', () => {
    it('should save the defaults', async () => {
      await defaultFilterService.save('userId', defaults2.reportId, defaults2.id, defaults2.values)

      const userConfig = {
        defaultFilters: [defaults1, defaults2],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })

    it('should update the defaults', async () => {
      await defaultFilterService.save('userId', defaults1.reportId, defaults1.id, defaults1b.values)

      const userConfig = {
        defaultFilters: [defaults1b],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })

    it('should delete the defaults', async () => {
      await defaultFilterService.save('userId', defaults1.reportId, defaults1.id, defaults1c.values)

      const userConfig = {
        defaultFilters: [],
      } as unknown as ReportStoreConfig

      expect(saveStateSpy).toHaveBeenCalledWith('userId', userConfig)
    })
  })

  describe('get', () => {
    it('should get the default values', async () => {
      const defaults = await defaultFilterService.get('userId', defaults1.id, defaults1.reportId)
      expect(defaults).toEqual(defaults1)
    })
  })
})
