import { AsyncSummary } from '../../types/UserReports'
import { Template } from '../../types/Templates'
import { components } from '../../types/api'
import CollatedSummaryBuilder from '../CollatedSummaryBuilder/CollatedSummaryBuilder'
import DataTableBuilder from '../DataTableBuilder/DataTableBuilder'
import SectionedDataBuilder from '../SectionedDataBuilder/SectionedDataBuilder'
import { ReportTemplateData, SectionData } from '../SectionedDataBuilder/types'

class ListSectionDataBuilder {
  variant: components['schemas']['VariantDefinition']

  specification: components['schemas']['Specification'] | undefined

  columns: Array<string> = []

  sections: Array<string> = []

  data: Array<Record<string, string>>

  fields: components['schemas']['FieldDefinition'][]

  sectionFields: components['schemas']['FieldDefinition'][] = []

  template: Template

  dataTableBuilder!: DataTableBuilder

  sectionBuilder!: SectionedDataBuilder

  summariesBuilder!: CollatedSummaryBuilder

  constructor(
    variant: components['schemas']['VariantDefinition'],
    data: Array<Record<string, string>>,
    summariesData: AsyncSummary[],
  ) {
    const { specification } = variant
    const { template, fields, sections } = <components['schemas']['Specification']>specification

    this.variant = variant
    this.specification = specification
    this.template = template
    this.fields = fields
    this.data = data
    this.sectionBuilder = new SectionedDataBuilder()
      .withData(data)
      .withSections(sections)
      .withSummaries(summariesData)
      .withFields(fields)
  }

  withColumns(columns: string[]) {
    this.columns = columns
    return this
  }

  build(): ReportTemplateData {
    // Create the sections
    const sectionData = this.sectionBuilder.build()
    const { sections } = sectionData
    const mappedSections = sections.map((section: SectionData) => {
      const collatedSummaryBuilder = new CollatedSummaryBuilder(this.specification!, section.summaries)
      const tableSummaries = collatedSummaryBuilder.collateDataTableSummaries()
      this.dataTableBuilder = new DataTableBuilder(this.fields)
      const tableData = this.dataTableBuilder
        .withSummaries(tableSummaries)
        .withNoHeaderOptions(this.columns)
        .buildTable(section.data)

      return {
        ...section,
        data: tableData,
      }
    })

    return {
      rowCount: this.data.length,
      sections: mappedSections,
    }
  }
}

export { ListSectionDataBuilder }
export default ListSectionDataBuilder
