import ReportQuery from '../../../types/ReportQuery'
import logger from '../../../utils/logger'
import RestClient from './restClient'
import Dict = NodeJS.Dict
import { components, operations } from '../../../types/api'
import { ApiConfig } from './types'

export interface Count {
  count: number
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
    logger.info(`Reporting client: Get ${resourceName} list`)

    return this.restClient
      .get({
        path: `/${resourceName}`,
        query: listRequest.toRecordWithFilterPrefix(),
        token,
      })
      .then((response) => <Array<Dict<string>>>response)
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
}
