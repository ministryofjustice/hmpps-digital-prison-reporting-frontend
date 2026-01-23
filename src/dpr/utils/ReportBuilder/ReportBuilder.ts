import { AsyncSummary } from '../../types/UserReports'
import { SummaryTemplate, Template } from '../../types/Templates'
import { components } from '../../types/api'
import CollatedSummaryBuilder from '../CollatedSummaryBuilder/CollatedSummaryBuilder'
import DataTableBuilder from '../DataTableBuilder/DataTableBuilder'
import SectionedDataBuilder from '../SectionedDataBuilder/SectionedDataBuilder'
import { ReportTemplateData, SectionData } from '../SectionedDataBuilder/types'
import { DataTable } from '../DataTableBuilder/types'
import ReportQuery from '../../types/ReportQuery'
import { validateVariant } from '../definitionUtils'

class ReportBuilder {
  variant: components['schemas']['VariantDefinition']

  specification: components['schemas']['Specification']

  columns: Array<string> = []

  sections: Array<string> = []

  data: Array<Record<string, string>>

  fields: components['schemas']['FieldDefinition'][]

  sectionFields: components['schemas']['FieldDefinition'][] = []

  template: Template

  dataTableBuilder!: DataTableBuilder

  sectionBuilder!: SectionedDataBuilder

  summariesBuilder!: CollatedSummaryBuilder

  reportQuery: ReportQuery

  interactive = false

  constructor(
    variant: components['schemas']['VariantDefinition'],
    data: Array<Record<string, string>>,
    summariesData: AsyncSummary[],
    reportQuery: ReportQuery,
  ) {
    const { specification } = validateVariant(variant)
    const { template, fields, sections } = specification

    this.variant = variant
    this.specification = specification
    this.template = template
    this.fields = fields
    this.data = data
    this.reportQuery = reportQuery
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
    const collatedSummaryBuilder = new CollatedSummaryBuilder(this.specification, section.summaries)
    const tableSummaries = collatedSummaryBuilder.collateDataTableSummaries()
    this.dataTableBuilder = new DataTableBuilder(this.fields)
    return this.dataTableBuilder
      .withSummaries(tableSummaries)
      .withHeaderOptions({
        columns: this.columns,
        reportQuery: this.reportQuery,
        interactive: Boolean(this.interactive),
      })
      .buildTable(section.data)
  }

  buildSummariesTables(section: SectionData) {
    const { summaries } = section
    const summaryTables: {
      template: SummaryTemplate
      data: DataTable
    }[] = summaries.map((summaryData) => {
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

    return this.groupSummaryTables(summaryTables)
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
    const sectionData = this.sectionBuilder.build()
    const mappedSections = sectionData.sections.map((section: SectionData) => {
      const tableData = this.buildMainTable(section)
      const summaryTables = this.buildSummariesTables(section)

      return {
        ...section,
        summaries: summaryTables,
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

export { ReportBuilder }
export default ReportBuilder
