import { expect, it, describe, beforeEach, jest } from '@jest/globals'
import type { Response } from 'express'
import ReportingClient from './reportingClient'
import type { ApiConfig } from './types'

describe('ReportingClient download paths', () => {
  const token = 'token'
  const query = { columns: ['col1'] }
  const res = {} as Response

  let client: ReportingClient
  let getStream: jest.SpiedFunction<ReportingClient['restClient']['getStream']>

  beforeEach(() => {
    client = new ReportingClient({ url: 'http://localhost' } as ApiConfig)
    getStream = jest.spyOn(client.restClient, 'getStream').mockResolvedValue(undefined)
  })

  const requestMade = () => getStream.mock.calls[0][0]

  describe('sync', () => {
    it('defaults to the csv endpoint when no format is given', async () => {
      await client.downloadSyncReport(token, 'reports/reportId/variantId', query, res)

      expect(requestMade().path).toEqual('/reports/reportId/variantId/download')
    })

    it('uses the xlsx endpoint when xlsx is requested', async () => {
      await client.downloadSyncReport(token, 'reports/reportId/variantId', query, res, 'xlsx')

      expect(requestMade().path).toEqual('/reports/reportId/variantId/download/xlsx')
    })
  })

  describe('async', () => {
    it('defaults to the csv endpoint when no format is given', async () => {
      await client.downloadAsyncReport(token, 'reportId', 'variantId', 'tblId_1', query, res)

      expect(requestMade().path).toEqual('/reports/reportId/variantId/tables/tblId_1/download')
    })

    it('uses the xlsx endpoint when xlsx is requested', async () => {
      await client.downloadAsyncReport(token, 'reportId', 'variantId', 'tblId_1', query, res, 'xlsx')

      expect(requestMade().path).toEqual('/reports/reportId/variantId/tables/tblId_1/download/xlsx')
    })
  })

  it('passes the report query through unchanged whichever format is asked for', async () => {
    await client.downloadSyncReport(token, 'reports/reportId/variantId', query, res, 'xlsx')

    expect(requestMade().query).toEqual(query)
    expect(requestMade().token).toEqual(token)
  })
})
