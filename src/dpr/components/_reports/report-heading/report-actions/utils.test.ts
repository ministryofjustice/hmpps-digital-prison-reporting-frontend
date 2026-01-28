import { expect } from '@jest/globals'
import { LoadType } from '../../../../types/UserReports'
import {
  CopyActionParams,
  DownloadActionParams,
  PrintActionParams,
  RefreshActionParams,
  ShareActionParams,
} from './types'
import ReportActionsUtils from './utils'
import { Columns } from '../report-columns/report-columns-form/types'

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
        definitionPath: 'definitionPath',
        canDownload: false,
        loadType: LoadType.ASYNC,
        currentUrl: 'currentUrl',
        nestedBaseUrl: 'nestedBaseUrl',
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
          text: 'Refresh',
          ariaLabelText: 'Refresh report',
          href: 'url',
        },
        {
          id: 'dpr-button-printable',
          disabled: false,
          text: 'Print screen',
          ariaLabelText: 'Print screen',
          href: '#',
        },
        {
          id: 'dpr-button-sharable',
          disabled: true,
          text: 'Email report link',
          ariaLabelText: 'Email report link',
          href: 'mailto:?subject=reportName-name&body=url',
        },
        {
          id: 'dpr-button-copy',
          disabled: false,
          text: 'Copy report link',
          ariaLabelText: 'Copy report link',
          href: 'url',
        },
        {
          id: 'dpr-button-downloadable',
          disabled: false,
          text: 'Enable download',
          ariaLabelText: 'Enable download',
          attributes: {
            enabled: true,
            csrfToken: 'csrfToken',
            reportId: 'reportId',
            reportName: 'reportName',
            name: 'name',
            id: 'id',
            tableId: 'tableId',
            columns: <Columns[]>[],
            definitionPath: 'definitionPath',
            canDownload: false,
            loadType: 'async',
            currentUrl: 'currentUrl',
            nestedBaseUrl: 'nestedBaseUrl',
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
          text: 'Print screen',
          ariaLabelText: 'Print screen',
          href: '#',
        },
        {
          id: 'dpr-button-sharable',
          disabled: true,
          text: 'Email report link',
          ariaLabelText: 'Email report link',
          href: 'mailto:?subject=reportName-name&body=url',
        },
        {
          id: 'dpr-button-copy',
          disabled: false,
          text: 'Copy report link',
          ariaLabelText: 'Copy report link',
          href: 'url',
        },
      ]

      expect(result).toEqual(expectedResult)
    })
  })
})
