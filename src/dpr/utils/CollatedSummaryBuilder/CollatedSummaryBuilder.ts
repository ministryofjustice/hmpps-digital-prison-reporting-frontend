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

  sectionSummaryTemplates: Array<SummaryTemplate> = ['section-footer', 'section-header', 'table-footer', 'table-header']

  collateAndMapToDataTable(avoidSummaryTemplates: Array<SummaryTemplate> = []): Dict<Array<DataTable>> {
    const collatedSummaries = this.collate(avoidSummaryTemplates)

    return this.mapToDataTables(collatedSummaries)
  }

  collateSectionedAndMapToDataTable(): Dict<Array<DataTable>> {
    const collatedSummaries: Dict<Array<AsyncSummary>> = this.collate(this.sectionSummaryTemplates)

    if (this.summaries) {
      const builder = new DataTableBuilder(this.specification)

      this.summaries.forEach((summary: AsyncSummary) => {
        if (this.sectionSummaryTemplates.includes(summary.template)) {
          summary.data.forEach((row) => {
            const sectionDescription = builder.mapSectionDescription(row)

            if (!collatedSummaries[sectionDescription]) {
              collatedSummaries[sectionDescription] = []
            }

            const matchedBySummaryId = collatedSummaries[sectionDescription].find((s) => s.id === summary.id)

            if (matchedBySummaryId) {
              matchedBySummaryId.data.push(row)
            } else {
              collatedSummaries[sectionDescription].push({
                ...summary,
                data: [row],
              })
            }
          })
        }
      })
    }

    return this.mapToDataTables(collatedSummaries)
  }

  collate(avoidSummaryTemplates: Array<SummaryTemplate> = []): Dict<Array<AsyncSummary>> {
    const collatedSummaries: Dict<Array<AsyncSummary>> = {}

    if (this.summaries) {
      this.summaries.forEach((summary: AsyncSummary) => {
        if (!avoidSummaryTemplates.includes(summary.template)) {
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
        const builder = this.getDataTableBuilderForSummary(summary)
        return builder.buildTable(summary.data)
      })
    })

    return dataTables
  }

  private getDataTableBuilderForSummary(summary: AsyncSummary): DataTableBuilder {
    const fields = summary.fields.map((field) => ({
      ...field,
      calculated: false,
      sortable: false,
      defaultsort: false,
      mandatory: true,
      visible: true,
    }))
    const columns = summary.fields
      .filter((field) => !this.specification.sections || !this.specification.sections.includes(field.name))
      .map((field) => field.name)

    return new DataTableBuilder({
      template: 'list',
      fields,
      sections: [],
    }).withNoHeaderOptions(columns)
  }
}
