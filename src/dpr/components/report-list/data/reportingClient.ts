import ReportQuery from '../../../types/ReportQuery'
import logger from '../../../utils/logger'
import RestClient from './restClient'
import Dict = NodeJS.Dict
import { components, operations } from '../../../types/api'
import { ApiConfig } from './types'
import type { ResultWithHeaders } from './restClient'

export interface Count {
  count: number
}

export interface ListWithWarnings {
  data: Array<Dict<string>>
  warnings : Warnings
}

export interface Warnings {
  noDataAvailable?: string
}

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
        query: countRequest.toRecordWithFilterPrefix(),
        token,
      })
      .then((response) => (<Count>response).count)
  }

  getList(resourceName: string, token: string, listRequest: ReportQuery): Promise<Array<Dict<string>>> {
    return this.getListWithWarnings(resourceName, token, listRequest)
      .then((response) => response.data)
  }

  getListWithWarnings(resourceName: string, token: string, listRequest: ReportQuery): Promise<ListWithWarnings> {
    logger.info(`Reporting client: Get ${resourceName} list`)

    return this.restClient
        .getWithHeaders<Array<Dict<string>>>({
          path: `/${resourceName}`,
          query: listRequest.toRecordWithFilterPrefix(),
          token,
        })
        .then((response: ResultWithHeaders<Array<Dict<string>>>) => ({
            data: response.data,
            warnings: {
              noDataAvailable: response.headers['x-no-data-warning']
            }
        }))
  }

  getDefinitions(token: string): Promise<Array<components['schemas']['ReportDefinition']>> {
    logger.info(`Reporting client: Get definitions`)

    const params: operations['definitions']['parameters'] = {
      query: {
        renderMethod: 'HTML',
      },
    }

    return this.restClient
      .get({
        path: '/definitions',
        query: params.query,
        token,
      })
      .then((response) => <Array<components['schemas']['ReportDefinition']>>response)
  }

  getDefinition(
    token: string,
    reportId: string,
    variantId: string,
  ): Promise<components['schemas']['SingleVariantReportDefinition']> {
    logger.info(`Reporting client: Get single variant definition`)

    return this.restClient
      .get({
        path: `/definitions/${reportId}/${variantId}`,
        token,
      })
      .then((response) => <components['schemas']['SingleVariantReportDefinition']>response)
  }
}
