import { AsyncSummary } from '../../types/UserReports'
import { SummaryTemplate, Template } from '../../types/Templates'
import { components } from '../../types/api'
import CollatedSummaryBuilder from '../CollatedSummaryBuilder/CollatedSummaryBuilder'
import DataTableBuilder from '../DataTableBuilder/DataTableBuilder'
import SectionedDataBuilder from '../SectionedDataBuilder/SectionedDataBuilder'
import { ReportTemplateData, SectionData } from '../SectionedDataBuilder/types'
import { DataTable } from '../DataTableBuilder/types'

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

  buildMainTable(section: SectionData) {
    const collatedSummaryBuilder = new CollatedSummaryBuilder(this.specification!, section.summaries)
    const tableSummaries = collatedSummaryBuilder.collateDataTableSummaries()
    this.dataTableBuilder = new DataTableBuilder(this.fields)
    return this.dataTableBuilder
      .withSummaries(tableSummaries)
      .withNoHeaderOptions(this.columns)
      .buildTable(section.data)
  }

  buildSummariesTables(section: SectionData): {
    template: SummaryTemplate
    data: DataTable
  }[] {
    const { summaries } = section
    return summaries.map((summaryData) => {
      const fields = <components['schemas']['FieldDefinition'][]>summaryData.fields
      const { data, template } = summaryData
      const summaryTableData = new DataTableBuilder(fields)
        .withNoHeaderOptions(fields.map((f) => f.name))
        .buildTable(data)

      return {
        template,
        data: summaryTableData,
      }
    })
  }

  groupSummaryTables(
    summaryTables: {
      template: SummaryTemplate
      data: DataTable
    }[],
  ) {
    return summaryTables.reduce<Record<string, DataTable[]>>((acc, item) => {
      if (!acc[item.template]) {
        acc[item.template] = []
      }
      acc[item.template].push(item.data)
      return acc
    }, {})
  }

  build(): ReportTemplateData {
    // Create the sections
    const sectionData = this.sectionBuilder.build()
    const mappedSections = sectionData.sections.map((section: SectionData) => {
      const tableData = this.buildMainTable(section)
      const summaryTables = this.buildSummariesTables(section)
      const groupedSummaryTables = this.groupSummaryTables(summaryTables)

      return {
        ...section,
        summaries: groupedSummaryTables,
        data: tableData,
      }
    })

    const sections = mappedSections.filter((sec) => sec.key !== 'mainSection')
    const summaries = mappedSections.filter((sec) => sec.key === 'mainSection').map((section) => section.summaries)

    return {
      rowCount: this.data.length,
      summaries,
      sections,
    }
  }
}

export { ListSectionDataBuilder }
export default ListSectionDataBuilder
