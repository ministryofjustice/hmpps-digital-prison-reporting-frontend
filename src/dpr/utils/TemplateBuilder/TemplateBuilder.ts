import { AsyncSummary } from '../../types/UserReports'
import { Template } from '../../types/Templates'
import { components } from '../../types/api'
import ReportQuery from '../../types/ReportQuery'
import { validateVariant } from '../definitionUtils'

export class TemplateBuilder {
  variant: components['schemas']['VariantDefinition']

  specification: components['schemas']['Specification']

  columns: Array<string> = []

  sections: Array<string> = []

  data!: Array<Record<string, string>>

  fields: components['schemas']['FieldDefinition'][]

  sectionFields: components['schemas']['FieldDefinition'][] = []

  template: Template

  reportQuery!: ReportQuery

  interactive = false

  pageSummaries!: AsyncSummary[]

  summaries!: AsyncSummary[]

  constructor(variant: components['schemas']['VariantDefinition']) {
    const { specification } = validateVariant(variant)
    const { template, fields, sections } = specification

    this.variant = variant
    this.interactive = Boolean(variant.interactive)
    this.specification = specification
    this.template = template
    this.fields = fields
    this.sections = sections
  }

  withColumns(columns: string[]) {
    this.columns = columns
    return this
  }

  withData(data: Array<Record<string, string>>) {
    this.data = data
    return this
  }

  withQuery(reportQuery: ReportQuery) {
    this.reportQuery = reportQuery
    return this
  }

  withSummaries(summariesData: AsyncSummary[]) {
    this.pageSummaries = summariesData.filter((summary) => {
      return summary.template.includes('page')
    })
    this.summaries = summariesData.filter((summary) => {
      return summary.template.includes('section') || summary.template.includes('table')
    })
    return this
  }
}
