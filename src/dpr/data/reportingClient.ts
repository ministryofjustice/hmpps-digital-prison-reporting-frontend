import { Response } from 'express'
import ReportQuery from '../types/ReportQuery'
import logger from '../utils/logger'
import RestClient from './restClient'
import Dict = NodeJS.Dict
import { components, operations } from '../types/api'
import { ApiConfig, Count, ListWithWarnings } from './types'
import type { ResultWithHeaders } from './restClient'
import { DEFAULT_DOWNLOAD_FORMAT, DownloadFormat, downloadPathSuffix } from '../types/Download'
import { GetSubscriptionResponse } from '../types/Subscriptions'

class ReportingClient {
  restClient: RestClient

  constructor(config: ApiConfig) {
    this.restClient = new RestClient('Reporting API Client', config)
  }

  getCount(resourceName: string, token: string, countRequest: ReportQuery): Promise<number> {
    logger.info(`Reporting client: Get count. { resourceName: ${resourceName} }`)

    return this.restClient
      .get({
        path: `/${resourceName}/count`,
        query: countRequest.toRecordWithFilterPrefix(true),
        token,
      })
      .then(response => (<Count>response).count)
  }

  getList(resourceName: string, token: string, listRequest: ReportQuery): Promise<Array<Dict<string>>> {
    return this.getListWithWarnings(resourceName, token, listRequest).then(
      response => response.data as Array<Dict<string>>,
    )
  }

  getListWithWarnings(resourceName: string, token: string, listRequest: ReportQuery): Promise<ListWithWarnings> {
    logger.info(`Reporting client: Get list. { resourceName: ${resourceName} }`)

    return this.restClient
      .getWithHeaders<Array<Record<string, string>>>({
        path: `/${resourceName}`,
        query: listRequest.toRecordWithFilterPrefix(true),
        token,
      })
      .then((response: ResultWithHeaders<Array<Record<string, string>>>) => ({
        data: response.data,
        warnings: {
          noDataAvailable: response.headers['x-no-data-warning'],
        },
      }))
  }

  getDefinitionSummary(token: string, reportId: string): Promise<components['schemas']['ReportDefinitionSummary']> {
    this.logInfo('Get definition summary', { reportId })

    return this.restClient
      .get({
        path: `/definitions/${reportId}`,
        token,
      })
      .then(response => <components['schemas']['ReportDefinitionSummary']>response)
  }

  getDefinitions(token: string): Promise<Array<components['schemas']['ReportDefinitionSummary']>> {
    this.logInfo('Get definitions')

    const queryParams: operations['definitions']['parameters']['query'] = {
      renderMethod: 'HTML',
    }

    return this.restClient
      .get({
        path: '/definitions',
        query: queryParams,
        token,
      })
      .then(response => <Array<components['schemas']['ReportDefinitionSummary']>>response)
  }

  getDefinition(
    token: string,
    reportId: string,
    variantId: string,
    queryData?: Dict<string | string[]>,
  ): Promise<components['schemas']['SingleVariantReportDefinition']> {
    const query = {
      ...queryData,
    }

    this.logInfo('Get definition', { reportId, variantId, ...query })

    return this.restClient
      .get({
        path: `/definitions/${reportId}/${variantId}`,
        query,
        token,
      })
      .then(response => <components['schemas']['SingleVariantReportDefinition']>response)
  }

  requestAsyncReport(
    token: string,
    reportId: string,
    variantId: string,
    query: Record<string, string | boolean | number>,
  ): Promise<Dict<string>> {
    this.logInfo('Request report', { reportId, variantId })

    return this.restClient
      .get({
        path: `/async/reports/${reportId}/${variantId}`,
        token,
        query,
      })
      .then(response => <Dict<string>>response)
  }

  cancelAsyncRequest(token: string, reportId: string, variantId: string, executionId: string): Promise<Dict<string>> {
    this.logInfo('Cancel Request', { reportId, variantId, executionId })

    return this.restClient
      .delete({
        path: `/reports/${reportId}/${variantId}/statements/${executionId}`,
        token,
      })
      .then(response => <Dict<string>>response)
  }

  downloadAsyncReport(
    token: string,
    reportId: string,
    variantId: string,
    tableId: string,
    query: Record<string, string | string[]>,
    res: Response,
    format: DownloadFormat = DEFAULT_DOWNLOAD_FORMAT,
  ): Promise<void> {
    this.logInfo('Streaming download data', { reportId, variantId, tableId, format })
    return this.restClient.getStream(
      {
        path: `/reports/${reportId}/${variantId}/tables/${tableId}/download${downloadPathSuffix(format)}`,
        query,
        token,
      },
      res,
    )
  }

  downloadSyncReport(
    token: string,
    resourceName: string,
    query: Record<string, string | string[]>,
    res: Response,
    format: DownloadFormat = DEFAULT_DOWNLOAD_FORMAT,
  ): Promise<void> {
    this.logInfo('Streaming download data', { resourceName, format })

    return this.restClient.getStream(
      {
        path: `/${resourceName}/download${downloadPathSuffix(format)}`,
        query,
        token,
      },
      res,
    )
  }

  getAsyncReport(
    token: string,
    reportId: string,
    variantId: string,
    tableId: string,
    query: Record<string, string | string[]>,
  ): Promise<Array<Record<string, string>>> {
    this.logInfo('Get Data', { reportId, variantId, tableId })

    return this.restClient
      .get({
        path: `/reports/${reportId}/${variantId}/tables/${tableId}/result`,
        token,
        query,
      })
      .then(response => <Array<Record<string, string>>>response)
  }

  getAsyncSummaryReport(
    token: string,
    reportId: string,
    variantId: string,
    tableId: string,
    summaryId: string,
    query: Dict<string | number>,
  ): Promise<Array<Record<string, string>>> {
    this.logInfo('Get summary data', { reportId, variantId, tableId, summaryId })

    return this.restClient
      .get({
        path: `/reports/${reportId}/${variantId}/tables/${tableId}/result/summary/${summaryId}`,
        token,
        query,
      })
      .then(response => <Array<Record<string, string>>>response)
  }

  getAsyncReportStatus(
    token: string,
    reportId: string,
    variantId: string,
    executionId: string,
    tableId?: string,
  ): Promise<components['schemas']['StatementExecutionStatus']> {
    this.logInfo('Get status', { reportId, variantId, tableId, executionId })

    return this.restClient
      .get({
        path: `/reports/${reportId}/${variantId}/statements/${executionId}/status`,
        token,
        query: {
          tableId,
        },
      })
      .then(response => <components['schemas']['StatementExecutionStatus']>response)
  }

  getAsyncCount(token: string, tableId: string): Promise<number> {
    this.logInfo('Get count', { tableId })

    return this.restClient
      .get({
        path: `/report/tables/${tableId}/count`,
        token,
      })
      .then(response => (<Count>response).count)
  }

  getAsyncInteractiveCount(
    token: string,
    tableId: string,
    reportId: string,
    id: string,
    filters: ReportQuery,
  ): Promise<number> {
    this.logInfo('Get interactive count', { tableId, reportId, id })

    return this.restClient
      .get({
        path: `/reports/${reportId}/${id}/tables/${tableId}/count`,
        token,
        query: filters.toRecordWithFilterPrefix(true),
      })
      .then(response => (<Count>response).count)
  }

  /**
   * Gets the expiry state for tables
   *
   * @param {string} token
   * @param {string[]} tableIds
   * @return {*}
   * @memberof ReportingClient
   */
  getTableExpiryState(token: string, tableIds: string[]): Promise<components['schemas']['ResultTableExpiryState'][]> {
    return this.restClient
      .post(
        {
          path: `/reports/tableExpiryState`,
          data: { tableIds },
        },
        token,
      )
      .then(response => <components['schemas']['ResultTableExpiryState'][]>response)
  }

  /**
   * Subscribe to a scheduled report
   *
   * @param {string} token
   * @param {string} reportId
   * @param {string} id
   * @return {*}  {Promise<{ tableId: string }>}
   * @memberof ReportingClient
   */
  subscribe(token: string, reportId: string, id: string): Promise<{ tableId: string }> {
    return this.restClient
      .post(
        {
          path: `/user/subscribe`,
          data: { reportId, id },
        },
        token,
      )
      .then(response => <{ tableId: string }>response)
  }

  /**
   * Unsubscribe from a scheduled report
   *
   * @param {string} token
   * @param {string} reportId
   * @param {string} id
   * @return {*}  {Promise<{ success: boolean }>}
   * @memberof ReportingClient
   */
  unsubscribe(token: string, reportId: string, id: string): Promise<{ success: boolean }> {
    return this.restClient
      .post(
        {
          path: `/user/unsubscribe`,
          data: { reportId, id },
        },
        token,
      )
      .then(response => <{ success: boolean }>response)
  }

  /**
   * Get a single subscription data
   *
   * @param {string} token
   * @param {string} reportId
   * @param {string} id
   * @return {*}  {Promise<GetSubscriptionResponse>}
   * @memberof ReportingClient
   */
  getSubscription(token: string, reportId: string, id: string): Promise<GetSubscriptionResponse> {
    return this.restClient
      .get({
        path: `/user/subscription/${reportId}/${id}`,
        token,
      })
      .then(response => <GetSubscriptionResponse>response)
  }

  /**
   * Get all a user subscriptions data
   *
   * @param {string} token
   * @return {*}  {Promise<GetSubscriptionResponse[]>}
   * @memberof ReportingClient
   */
  getSubscriptions(token: string): Promise<GetSubscriptionResponse[]> {
    return this.restClient
      .get({
        path: `/user/subscriptions`,
        token,
      })
      .then(response => <GetSubscriptionResponse[]>response)
  }

  logInfo(title: string, args?: Dict<string>) {
    const query = args && Object.keys(args).length ? JSON.stringify(args) : ''
    const message = `Reporting Client: ${title}: ${query}`

    logger.info(message)
  }
}

export { ReportingClient }
export default ReportingClient
