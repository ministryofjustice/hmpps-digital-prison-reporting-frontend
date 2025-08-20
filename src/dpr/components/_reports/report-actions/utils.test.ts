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
          disabled: false,
          tooltipText: 'Refresh',
          ariaLabelText: 'refresh report',
          href: 'url',
        },
        {
          id: 'dpr-button-printable',
          disabled: false,
          tooltipText: 'Print screen',
          ariaLabelText: 'print report',
          href: '#',
        },
        {
          id: 'dpr-button-sharable',
          disabled: false,
          tooltipText: 'Email report link',
          ariaLabelText: 'share report request via email',
          href: 'mailto:?subject=reportName-name&body=url',
        },
        {
          id: 'dpr-button-copy',
          disabled: false,
          tooltipText: 'Copy report link',
          ariaLabelText: 'copy report request',
          href: 'url',
        },
        {
          id: 'dpr-button-downloadable',
          disabled: false,
          tooltipText: 'Enable download',
          ariaLabelText: 'Enable download',
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
          disabled: false,
          tooltipText: 'Print screen',
          ariaLabelText: 'print report',
          href: '#',
        },
        {
          id: 'dpr-button-sharable',
          disabled: false,
          tooltipText: 'Email report link',
          ariaLabelText: 'share report request via email',
          href: 'mailto:?subject=reportName-name&body=url',
        },
        {
          id: 'dpr-button-copy',
          disabled: false,
          tooltipText: 'Copy report link',
          ariaLabelText: 'copy report request',
          href: 'url',
        },
      ]

      expect(result).toEqual(expectedResult)
    })
  })
})
