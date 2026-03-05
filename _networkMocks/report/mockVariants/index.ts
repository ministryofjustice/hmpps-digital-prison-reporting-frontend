import { filterInputExamplesVariants } from './filter-input-examples'
import { featureTestingVariants } from './feature-testing'
import { reportTemplates } from './report-templates'
import { requestExampleVariants } from './request-examples'
import { mockReportVariants } from './mock-report'

export default [
  ...filterInputExamplesVariants,
  ...featureTestingVariants,
  ...reportTemplates,
  ...requestExampleVariants,
  ...mockReportVariants,
]
