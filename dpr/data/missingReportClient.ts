import RestClient from './restClient'
import { ApiConfig } from './types'
import { components } from '../types/api'

class MissingReportClient {
  restClient: RestClient

  constructor(config: ApiConfig) {
    this.restClient = new RestClient('Missing report API Client', config)
  }

  submitMissingReportEntry(
    token: string,
    reportId: string,
    variantId: string,
    reason?: string,
  ): Promise<components['schemas']['MissingReportSubmission']> {
    return this.restClient.post(
      {
        path: `/missingRequest/${reportId}/${variantId}`,
        ...(reason && { data: reason }),
      },
      token,
    )
  }
}

export { MissingReportClient }
export default MissingReportClient
