import { components } from '../../../../../src/dpr/types/api'
import { LoadType } from '../../../../../src/dpr/types/UserReports'
import reportTemplateExampleListSection from './list-section'

const reportTemplateExampleListSectionWithDates: components['schemas']['VariantDefinition'] & { loadType: LoadType } = {
  ...reportTemplateExampleListSection,
  id: 'report-template-example-list-section-with-dates',
  name: 'List-section - with dates',
}

export default reportTemplateExampleListSectionWithDates
