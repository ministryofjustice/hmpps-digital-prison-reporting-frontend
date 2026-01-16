import ReportQuery from '../types/ReportQuery'
import logger from '../utils/logger'
import RestClient from './restClient'
import Dict = NodeJS.Dict
import { components, operations } from '../types/api'
import { ApiConfig, Count, ListWithWarnings } from './types'
import type { ResultWithHeaders } from './restClient'

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
      .then((response) => (<Count>response).count)
  }

  getList(resourceName: string, token: string, listRequest: ReportQuery): Promise<Array<Dict<string>>> {
    return this.getListWithWarnings(resourceName, token, listRequest).then((response) => response.data)
  }

  getListWithWarnings(resourceName: string, token: string, listRequest: ReportQuery): Promise<ListWithWarnings> {
    logger.info(`Reporting client: Get list. { resourceName: ${resourceName} }`)

    return this.restClient
      .getWithHeaders<Array<Dict<string>>>({
        path: `/${resourceName}`,
        query: listRequest.toRecordWithFilterPrefix(true),
        token,
      })
      .then((response: ResultWithHeaders<Array<Dict<string>>>) => ({
        data: response.data,
        warnings: {
          noDataAvailable: response.headers['x-no-data-warning'],
        },
      }))
  }

  getDefinitionSummary(
    token: string,
    reportId: string,
    definitionsPath?: string,
  ): Promise<components['schemas']['ReportDefinitionSummary']> {
    this.logInfo('Get definition summary', { reportId })

    const queryParams: operations['definitionSummary']['parameters']['query'] = {
      ...(definitionsPath && { dataProductDefinitionsPath: definitionsPath }),
    }

    return this.restClient
      .get({
        path: `/definitions/${reportId}`,
        query: queryParams,
        token,
      })
      .then((response) => <components['schemas']['ReportDefinitionSummary']>response)
  }

  getDefinitions(
    token: string,
    definitionsPath?: string,
  ): Promise<Array<components['schemas']['ReportDefinitionSummary']>> {
    this.logInfo('Get definitions')

    const queryParams: operations['definitions_1']['parameters']['query'] = {
      renderMethod: 'HTML',
      ...(definitionsPath && { dataProductDefinitionsPath: definitionsPath }),
    }

    return this.restClient
      .get({
        path: '/definitions',
        query: queryParams,
        token,
      })
      .then((response) => <Array<components['schemas']['ReportDefinitionSummary']>>response)
  }

  getDefinition(
    token: string,
    reportId: string,
    variantId: string,
    definitionsPath?: string,
    queryData?: Dict<string | string[]>,
  ): Promise<components['schemas']['SingleVariantReportDefinition']> {
    const query = {
      ...queryData,
      dataProductDefinitionsPath: definitionsPath,
    }

    this.logInfo('Get definition', { reportId, variantId, ...query })

    return this.restClient
      .get({
        path: `/definitions/${reportId}/${variantId}`,
        query,
        token,
      })
      .then((response) => <components['schemas']['SingleVariantReportDefinition']>response)
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
      .then((response) => <Dict<string>>response)
  }

  cancelAsyncRequest(
    token: string,
    reportId: string,
    variantId: string,
    executionId: string,
    dataProductDefinitionsPath?: string,
  ): Promise<Dict<string>> {
    this.logInfo('Cancel Request', { reportId, variantId, executionId })

    return this.restClient
      .delete({
        path: `/reports/${reportId}/${variantId}/statements/${executionId}`,
        token,
        query: {
          dataProductDefinitionsPath,
        },
      })
      .then((response) => <Dict<string>>response)
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
      .then((response) => <Array<Record<string, string>>>response)
  }

  getAsyncSummaryReport(
    token: string,
    reportId: string,
    variantId: string,
    tableId: string,
    summaryId: string,
    query: Dict<string | number>,
  ): Promise<Array<Dict<string>>> {
    this.logInfo('Get summary data', { reportId, variantId, tableId, summaryId })

    return this.restClient
      .get({
        path: `/reports/${reportId}/${variantId}/tables/${tableId}/result/summary/${summaryId}`,
        token,
        query,
      })
      .then((response) => <Array<Dict<string>>>response)
  }

  getAsyncReportStatus(
    token: string,
    reportId: string,
    variantId: string,
    executionId: string,
    dataProductDefinitionsPath?: string,
    tableId?: string,
  ): Promise<components['schemas']['StatementExecutionStatus']> {
    this.logInfo('Get status', { reportId, variantId, tableId, executionId })

    return this.restClient
      .get({
        path: `/reports/${reportId}/${variantId}/statements/${executionId}/status`,
        token,
        query: {
          dataProductDefinitionsPath,
          tableId,
        },
      })
      .then((response) => <components['schemas']['StatementExecutionStatus']>response)
  }

  getAsyncCount(token: string, tableId: string, dataProductDefinitionsPath?: string): Promise<number> {
    this.logInfo('Get count', { tableId })

    return this.restClient
      .get({
        path: `/report/tables/${tableId}/count`,
        token,
        query: {
          dataProductDefinitionsPath,
        },
      })
      .then((response) => (<Count>response).count)
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
      .then((response) => (<Count>response).count)
  }

  logInfo(title: string, args?: Dict<string>) {
    logger.info(`Reporting Client: ${title}:`)
    if (args && Object.keys(args).length) logger.info(JSON.stringify(args, null, 2))
  }
}

export { ReportingClient }
export default ReportingClient
