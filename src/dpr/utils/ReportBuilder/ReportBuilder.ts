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

  data!: Array<Record<string, string>>

  fields: components['schemas']['FieldDefinition'][]

  sectionFields: components['schemas']['FieldDefinition'][] = []

  template: Template

  dataTableBuilder!: DataTableBuilder

  sectionBuilder!: SectionedDataBuilder

  summariesBuilder!: CollatedSummaryBuilder

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

  buildSummaryTables(summaries: AsyncSummary[]) {
    const summaryTables = summaries.map((summaryData) => {
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

  buildSectionedData() {
    const sectionData = new SectionedDataBuilder()
      .withData(this.data)
      .withSections(this.sections)
      .withSummaries(this.summaries)
      .withFields(this.fields)
      .withReportQuery(this.reportQuery)
      .build()

    return sectionData.sections.map((section: SectionData) => {
      const tableData = this.buildMainTable(section)
      const sectionSummaryTables = this.buildSummaryTables(section.summaries)
      return {
        ...section,
        summaries: sectionSummaryTables,
        data: tableData,
      }
    })
  }

  build(): ReportTemplateData {
    const pageSummaryTables = this.buildSummaryTables(this.pageSummaries)
    const sections = this.buildSectionedData()

    return {
      rowCount: this.data.length,
      summaries: pageSummaryTables,
      sections,
    }
  }
}

export { ReportBuilder }
export default ReportBuilder
