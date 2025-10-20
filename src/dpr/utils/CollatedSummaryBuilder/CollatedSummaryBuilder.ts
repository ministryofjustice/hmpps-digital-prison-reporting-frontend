import Dict = NodeJS.Dict
import { AsyncSummary } from '../../types/UserReports'
import { SummaryTemplate } from '../../types/Templates'
import { components } from '../../types/api'
import { DataTable } from '../DataTableBuilder/types'
import SummaryDataTableBuilder from '../SummaryDataTableBuilder/SummaryDataTableBuilder'

class CollatedSummaryBuilder {
  private summaries: Array<AsyncSummary>

  private specification: components['schemas']['Specification']

  constructor(specification: components['schemas']['Specification'], summaries: Array<AsyncSummary>) {
    this.specification = specification
    this.summaries = summaries
  }

  pageSummaryTemplates: Array<SummaryTemplate> = ['page-header', 'page-footer']

  dataTableSummaryTemplates: Array<SummaryTemplate> = [
    'section-footer',
    'section-header',
    'table-footer',
    'table-header',
  ]

  collatePageSummaries(): Dict<Array<DataTable>> {
    return this.collateAndMapToDataTable(this.pageSummaryTemplates)
  }

  collateDataTableSummaries(): Dict<Array<AsyncSummary>> {
    return this.collate(this.dataTableSummaryTemplates)
  }

  collateAndMapToDataTable(summaryTemplates: Array<SummaryTemplate> = []): Dict<Array<DataTable>> {
    const collatedSummaries = this.collate(summaryTemplates)

    return this.mapToDataTables(collatedSummaries)
  }

  collate(summaryTemplates: Array<SummaryTemplate> = this.pageSummaryTemplates): Dict<Array<AsyncSummary>> {
    const collatedSummaries: Dict<Array<AsyncSummary>> = {}
    if (this.summaries) {
      this.summaries.forEach((summary: AsyncSummary) => {
        const { template } = summary
        if (summaryTemplates.includes(template)) {
          if (!collatedSummaries[template]) {
            collatedSummaries[template] = []
          }
          collatedSummaries[template].push(summary)
        }
      })
    }

    return collatedSummaries
  }

  private mapToDataTables(summaries: Dict<Array<AsyncSummary>>): Dict<Array<DataTable>> {
    const dataTables: Dict<Array<DataTable>> = {}

    Object.keys(summaries).forEach((summaryType) => {
      if (summaries[summaryType]) {
        dataTables[summaryType] = summaries[summaryType].map((summary) => {
          return new SummaryDataTableBuilder(summary, this.specification.sections).buildSummaryTable()
        })
      }
    })

    return dataTables
  }
}

export { CollatedSummaryBuilder }
export default CollatedSummaryBuilder
