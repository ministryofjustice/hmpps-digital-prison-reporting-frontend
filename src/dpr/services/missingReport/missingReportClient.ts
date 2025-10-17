import RestClient from '../../data/restClient'
import { ApiConfig } from '../../data/types'
import { components } from '../../types/api'

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
        data: reason,
      },
      token,
    )
  }
}

export { MissingReportClient }
export default MissingReportClient
