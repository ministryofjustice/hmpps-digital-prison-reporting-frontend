import ReportQuery from '../types/ReportQuery'
import logger from '../utils/logger'
import RestClient from './restClient'
import Dict = NodeJS.Dict
import { components, operations } from '../types/api'
import { ApiConfig, Count, FieldValuesRequest, ListWithWarnings } from './types'
import type { ResultWithHeaders } from './restClient'

export default class ReportingClient {
  restClient: RestClient

  constructor(config: ApiConfig) {
    this.restClient = new RestClient('Reporting API Client', config)
  }

  getCount(resourceName: string, token: string, countRequest: ReportQuery): Promise<number> {
    logger.info(`Reporting client: Get ${resourceName} count`)

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
    logger.info(`Reporting client: Get ${resourceName} list`)

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

  getDefinitions(
    token: string,
    definitionsPath?: string,
  ): Promise<Array<components['schemas']['ReportDefinitionSummary']>> {
    logger.info(`Reporting client: Get definitions`)

    const params: operations['definitions_1']['parameters'] = {
      query: {
        renderMethod: 'HTML',
        dataProductDefinitionsPath: definitionsPath,
      },
    }

    return this.restClient
      .get({
        path: '/definitions',
        query: params.query,
        token,
      })
      .then((response) => <Array<components['schemas']['ReportDefinitionSummary']>>response)
  }

  getDefinition(
    token: string,
    reportId: string,
    variantId: string,
    definitionsPath?: string,
  ): Promise<components['schemas']['SingleVariantReportDefinition']> {
    logger.info(`Reporting client: Get single variant definition`)

    const query = {
      dataProductDefinitionsPath: definitionsPath,
    }
    return this.restClient
      .get({
        path: `/definitions/${reportId}/${variantId}`,
        query,
        token,
      })
      .then((response) => <components['schemas']['SingleVariantReportDefinition']>response)
  }

  getFieldValues({
    token,
    definitionName,
    variantName,
    fieldName,
    prefix,
    definitionsPath,
  }: FieldValuesRequest): Promise<Array<string>> {
    const query = {
      dataProductDefinitionsPath: definitionsPath,
      prefix,
    }
    return this.restClient
      .get({
        path: `/reports/${definitionName}/${variantName}/${fieldName}`,
        token,
        query,
      })
      .then((response) => <Array<string>>response)
  }

  requestAsyncReport(
    token: string,
    reportId: string,
    variantId: string,
    query: Record<string, string | boolean | number>,
  ): Promise<Dict<string>> {
    logger.info(`Reporting client: request ${reportId}:${variantId}`)

    return this.restClient
      .get({
        path: `/async/reports/${reportId}/${variantId}`,
        token,
        query,
      })
      .then((response) => <Dict<string>>response)
  }

  getAsyncReport(
    token: string,
    reportId: string,
    variantId: string,
    tableId: string,
    query: Dict<string | number>,
  ): Promise<Array<Dict<string>>> {
    logger.info(`Reporting client: Get variantId:${variantId} data`)

    return this.restClient
      .get({
        path: `/reports/${reportId}/${variantId}/tables/${tableId}/result`,
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
  ): Promise<Dict<string>> {
    logger.info(`Reporting client: Get statementId:${executionId} status`)

    return this.restClient
      .get({
        path: `/reports/${reportId}/${variantId}/statements/${executionId}/status`,
        token,
        query: {
          dataProductDefinitionsPath,
        },
      })
      .then((response) => <Dict<string>>response)
  }

  getAsyncCount(token: string, tableId: string, dataProductDefinitionsPath?: string): Promise<number> {
    logger.info(`Reporting client: Get tableId:${tableId} count`)

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
}
