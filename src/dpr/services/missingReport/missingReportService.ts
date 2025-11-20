import MissingReportClient from '../../data/missingReportClient'
import { components } from '../../types/api'
import { ServiceFeatureConfig } from '../../types/DprConfig'

class MissingReportService {
  enabled: boolean

  constructor(private readonly missingReportClient: MissingReportClient, serviceFeatureConfig: ServiceFeatureConfig) {
    this.enabled = Boolean(serviceFeatureConfig.collections)
  }

  submitMissingReportEntry(
    token: string,
    reportId: string,
    variantId: string,
    reason?: string,
  ): Promise<components['schemas']['MissingReportSubmission']> | undefined {
    if (!this.enabled) return undefined
    return this.missingReportClient.submitMissingReportEntry(token, reportId, variantId, reason)
  }
}

export { MissingReportService }
export default MissingReportService
