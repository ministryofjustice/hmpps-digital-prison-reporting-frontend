import { Template } from '../../types/Templates'
import { components } from '../../types/api'

class ReportTemplateBuilder {
  variant: components['schemas']['VariantDefinition']

  specification: components['schemas']['Specification'] | undefined

  template: Template

  sections!: Array<string>

  data!: Array<Record<string, string>>

  fields!: Array<components['schemas']['FieldDefinition']>

  constructor(variant: components['schemas']['VariantDefinition']) {
    const { specification } = variant
    const { template, fields, sections } = <components['schemas']['Specification']>specification

    this.variant = variant
    this.specification = specification
    this.template = template
    this.fields = fields
    this.sections = sections
  }

  withSections() {
    //
  }

  withData(data: Array<Record<string, string>>) {
    this.data = data
    return this
  }

  withFields(fields: components['schemas']['FieldDefinition'][]) {
    this.fields = fields
  }
}

export { ReportTemplateBuilder }
export default ReportTemplateBuilder
