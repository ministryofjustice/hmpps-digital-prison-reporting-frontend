import { AsyncSummary } from '../../../types/UserReports'
import { SummaryTemplate } from '../../../types/Templates'
import { components } from '../../../types/api'
import SummaryDataHelper from '../SummaryDataHelper/SummaryDataHelper'
import DataTableBuilder from '../../DataTableBuilder/DataTableBuilder'
import SectionedDataHelper from '../SectionedDataHelper/SectionedDataHelper'
import { ReportTemplateData, SectionData } from '../SectionedDataHelper/types'
import { DataTable } from '../../DataTableBuilder/types'
import TemplateBuilder from '../TemplateBuilder'

class ReportBuilder extends TemplateBuilder {
  dataTableBuilder!: DataTableBuilder

  sectionBuilder!: SectionedDataHelper

  constructor(variant: components['schemas']['VariantDefinition']) {
    super(variant)
  }

  buildMainTable(section: SectionData) {
    const collatedSummaryBuilder = new SummaryDataHelper(this.specification, section.summaries)
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
    const sectionData = new SectionedDataHelper()
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
