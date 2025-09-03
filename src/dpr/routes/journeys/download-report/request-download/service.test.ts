/* eslint-disable @typescript-eslint/no-explicit-any */
import { MockUserStoreService } from '../../../../../../test-app/mocks/mockClients/store/mockRedisStore'
import ReportDataStore from '../../../../data/reportDataStore'
import type { ReportStoreConfig } from '../../../../types/ReportStore'
import DownloadPermissionService from './service'

describe('DownloadPermissionService', () => {
  const mockUserStore: ReportDataStore = new MockUserStoreService() as unknown as ReportDataStore
  const downloadPermissionService: DownloadPermissionService = new DownloadPermissionService(mockUserStore)

  let saveStateSpy: jest.SpyInstance<Promise<void>, [userId: string, userConfig: ReportStoreConfig], any>
  let getStateSpy: jest.SpyInstance<Promise<ReportStoreConfig>, [userId: string], any>
  beforeEach(() => {
    jest.clearAllMocks()

    getStateSpy = jest.spyOn(downloadPermissionService, 'getState').mockResolvedValue({
      downloadPermissions: [],
    } as unknown as ReportStoreConfig)

    saveStateSpy = jest.spyOn(downloadPermissionService, 'saveState')
  })

  describe('saveDownloadPermissionData', () => {
    it('should save the download data', async () => {
      getStateSpy.mockResolvedValue({
        downloadPermissions: [],
      } as unknown as ReportStoreConfig)

      await downloadPermissionService.saveDownloadPermissionData('userId', 'reportId-1', '12345')

      expect(saveStateSpy).toHaveBeenCalledWith('userId', {
        downloadPermissions: [
          {
            reportId: 'reportId-1',
            id: '12345',
          },
        ],
      })
    })

    it('should not save the download data if already present', async () => {
      getStateSpy.mockResolvedValue({
        downloadPermissions: [
          {
            reportId: 'reportId-1',
            id: '12345',
          },
        ],
      } as unknown as ReportStoreConfig)

      await downloadPermissionService.saveDownloadPermissionData('userId', 'reportId-1', '12345')

      expect(saveStateSpy).not.toHaveBeenCalled()
    })

    it('should in the config if no current download permissions', async () => {
      getStateSpy.mockResolvedValue({} as unknown as ReportStoreConfig)
      await downloadPermissionService.saveDownloadPermissionData('userId', 'reportId-1', '12345')

      expect(saveStateSpy).toHaveBeenCalledWith('userId', {
        downloadPermissions: [
          {
            reportId: 'reportId-1',
            id: '12345',
          },
        ],
      })
    })
  })

  describe('removeDownloadPermissionData', () => {
    it('should remove the data from the permissions config', async () => {
      getStateSpy.mockResolvedValue({
        downloadPermissions: [
          {
            reportId: 'reportId-1',
            id: '12345',
          },
          {
            reportId: 'reportId-2',
            id: '67890',
          },
        ],
      } as unknown as ReportStoreConfig)
      await downloadPermissionService.removeDownloadPermissionData('userId', 'reportId-1', '12345')

      expect(saveStateSpy).toHaveBeenCalledWith('userId', {
        downloadPermissions: [
          {
            reportId: 'reportId-2',
            id: '67890',
          },
        ],
      })
    })
  })

  describe('canDownloadReport', () => {
    it('should return true', async () => {
      getStateSpy.mockResolvedValue({
        downloadPermissions: [
          {
            reportId: 'reportId-1',
            id: '12345',
          },
          {
            reportId: 'reportId-2',
            id: '67890',
          },
        ],
      } as unknown as ReportStoreConfig)
      const res = await downloadPermissionService.downloadEnabled('userId', 'reportId-1', '12345')

      expect(res).toBeTruthy()
    })

    it('should return false', async () => {
      getStateSpy.mockResolvedValue({
        downloadPermissions: [
          {
            reportId: 'reportId-1',
            id: '12345',
          },
          {
            reportId: 'reportId-2',
            id: '67890',
          },
        ],
      } as unknown as ReportStoreConfig)
      const res = await downloadPermissionService.downloadEnabled('userId', 'reportId-3', '458723')

      expect(res).toBeFalsy()
    })

    it('should return false if no download permissions config exists', async () => {
      getStateSpy.mockResolvedValue({} as unknown as ReportStoreConfig)
      const res = await downloadPermissionService.downloadEnabled('userId', 'reportId-3', '458723')

      expect(res).toBeFalsy()
    })
  })

  describe('getAllDownloadPermissions', () => {
    it('should return all download permissions', async () => {
      const permissions = [
        {
          reportId: 'reportId-1',
          id: '12345',
        },
        {
          reportId: 'reportId-2',
          id: '67890',
        },
      ]
      getStateSpy.mockResolvedValue({
        downloadPermissions: permissions,
      } as unknown as ReportStoreConfig)

      const res = await downloadPermissionService.getAllDownloadPermissions('userId')

      expect(res).toEqual(permissions)
    })
  })
})
