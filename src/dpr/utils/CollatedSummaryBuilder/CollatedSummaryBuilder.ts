import Dict = NodeJS.Dict
import { AsyncSummary } from '../../types/AsyncReport'
import { SummaryTemplate } from '../../types/Templates'
import { components } from '../../types/api'
import DataTableBuilder from '../DataTableBuilder/DataTableBuilder'
import { DataTable } from '../DataTableBuilder/types'

export default class CollatedSummaryBuilder {
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
        if (summaryTemplates.includes(summary.template)) {
          if (!collatedSummaries[summary.template]) {
            collatedSummaries[summary.template] = []
          }

          collatedSummaries[summary.template].push(summary)
        }
      })
    }

    return collatedSummaries
  }

  private mapToDataTables(summaries: Dict<Array<AsyncSummary>>): Dict<Array<DataTable>> {
    const dataTables: Dict<Array<DataTable>> = {}

    Object.keys(summaries).forEach((summaryType) => {
      dataTables[summaryType] = summaries[summaryType].map((summary) => {
        const builder = DataTableBuilder.getForSummary(summary, this.specification.sections)
        const sortedData = summary.data.sort((a, b) => {
          const sortValues = summary.fields
            .map(field => {
              const aValue = a[field.name]
              const bValue = b[field.name]

              if (aValue === bValue) {
                return 0
              }

              if (aValue === null) {
                  return 1
              } else if (bValue === null) {
                return -1
              }

              if (aValue < bValue) {
                return -1
              }

              return 1
            })
            .filter(c => c !== 0)

          return sortValues.length > 0 ? sortValues[0] : 0
        })
        return builder.buildTable(sortedData)
      })
    })

    return dataTables
  }
}
