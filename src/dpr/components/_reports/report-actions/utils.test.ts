import { LoadType, ReportType } from '../../../types/UserReports'
import {
  CopyActionParams,
  DownloadActionParams,
  PrintActionParams,
  RefreshActionParams,
  ShareActionParams,
} from './types'
import ReportActionsUtils from './utils'

describe('ReportActionsUtils', () => {
  describe('getActions', () => {
    let refresh: RefreshActionParams
    let print: PrintActionParams
    let share: ShareActionParams
    let copy: CopyActionParams
    let download: DownloadActionParams

    beforeEach(() => {
      refresh = {
        url: 'url',
        executionId: 'executionId',
      }

      print = {
        enabled: true,
      }

      share = {
        reportName: 'reportName',
        name: 'name',
        url: 'url',
      }

      copy = {
        url: 'url',
      }

      download = {
        enabled: true,
        csrfToken: 'csrfToken',
        reportId: 'reportId',
        reportName: 'reportName',
        name: 'name',
        id: 'id',
        tableId: 'tableId',
        columns: [],
        type: ReportType.REPORT,
        definitionPath: 'definitionPath',
        canDownload: false,
        loadType: LoadType.ASYNC,
      }
    })

    it('should set the actions config - full list', () => {
      const result = ReportActionsUtils.getActions({
        refresh,
        print,
        share,
        copy,
        download,
      })

      const expectedResult = [
        {
          id: 'dpr-button-refresh',
          icon: 'refresh',
          disabled: false,
          tooltipText: 'Refresh',
          ariaLabelText: 'refresh report',
          href: 'url',
        },
        {
          id: 'dpr-button-printable',
          icon: 'print',
          disabled: false,
          tooltipText: 'Print',
          ariaLabelText: 'print report',
          href: '#',
        },
        {
          id: 'dpr-button-sharable',
          icon: 'share',
          disabled: false,
          tooltipText: 'Share',
          ariaLabelText: 'share report request via email',
          href: 'mailto:?subject=reportName-name&body=url',
        },
        {
          id: 'dpr-button-copy',
          icon: 'copy',
          disabled: false,
          tooltipText: 'Copy',
          ariaLabelText: 'report request',
          href: 'url',
        },
        {
          id: 'dpr-button-downloadable',
          icon: 'download',
          disabled: false,
          tooltipText: 'Enable download',
          ariaLabelText: 'download report',
          attributes: {
            enabled: true,
            csrfToken: 'csrfToken',
            reportId: 'reportId',
            reportName: 'reportName',
            name: 'name',
            id: 'id',
            tableId: 'tableId',
            columns: [],
            type: 'report',
            definitionPath: 'definitionPath',
            canDownload: false,
            loadType: 'async',
          },
        },
      ]

      expect(result).toEqual(expectedResult)
    })

    it('should set the actions config - partial list', () => {
      const result = ReportActionsUtils.getActions({
        print,
        share,
        copy,
      })

      const expectedResult = [
        {
          id: 'dpr-button-printable',
          icon: 'print',
          disabled: false,
          tooltipText: 'Print',
          ariaLabelText: 'print report',
          href: '#',
        },
        {
          id: 'dpr-button-sharable',
          icon: 'share',
          disabled: false,
          tooltipText: 'Share',
          ariaLabelText: 'share report request via email',
          href: 'mailto:?subject=reportName-name&body=url',
        },
        {
          id: 'dpr-button-copy',
          icon: 'copy',
          disabled: false,
          tooltipText: 'Copy',
          ariaLabelText: 'report request',
          href: 'url',
        },
      ]

      expect(result).toEqual(expectedResult)
    })
  })
})
