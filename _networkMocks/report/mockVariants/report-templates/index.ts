import { components } from '../../../../src/dpr/types/api'
import { LoadType } from '../../../../src/dpr/types/UserReports'

// List
import list from './list/list'
import listWithSummaries from './list/list_with-summaries'

// List-section
import listSection from './list-section/list-section'
import listSectionWithSummaries from './list-section/list-section_with-summaries'

// parent-child
import parentChild from './parent-child/parent-child'
import parentChildSection from './parent-child/parent-child-section'

// summary-section
import summarySection from './summary-section/summary-section'

// summary
import summary from './summary/summary'
import summaryComplex from './summary/summary_complex'

export const reportTemplates: (components['schemas']['VariantDefinition'] & { loadType?: LoadType })[] = [
  list,
  listWithSummaries,
  listSection,
  listSectionWithSummaries,
  parentChild,
  parentChildSection,
  summarySection,
  summaryComplex,
  summary,
]
