import { components } from '../../../../src/dpr/types/api'
import { LoadType } from '../../../../src/dpr/types/UserReports'
import listSection from './list-section'
import listSectionWithSummaries from './list-section-wtih-summaries'
import listWithSummaries from './list-with-summaries'
import parentChild from './parent-child'
import parentChildSection from './parent-child-section'
import sectionedSummaries from './sectioned-summaries-mock'
import summariesComplex from './summaries-complex'
import summariesMock from './summaries-mock'
import summary from './summary'
import summarySection from './summary-section'
import tableSummaries from './table-summaries'

export const reportTemplates: (components['schemas']['VariantDefinition'] & { loadType?: LoadType })[] = [
  listSection,
  listSectionWithSummaries,
  listWithSummaries,
  parentChild,
  parentChildSection,
  sectionedSummaries,
  summariesComplex,
  summariesMock,
  summary,
  summarySection,
  tableSummaries,
]
