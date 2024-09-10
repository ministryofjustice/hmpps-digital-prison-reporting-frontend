import Dict = NodeJS.Dict
import { components } from '../../types/api'
import { Cell, DataTable } from '../DataTableBuilder/types'
import type { SummaryTemplate } from '../../types/Templates'
import DataTableBuilder from '../DataTableBuilder/DataTableBuilder'

export default class SectionedDataTableBuilder extends DataTableBuilder {
  constructor(specification: components['schemas']['Specification']) {
    super(specification)
  }

  private mapSectionedData(data: Array<Dict<string>>, header: Cell[]): Cell[][] {
    const sectionedData: Dict<Cell[][]> = {}
    const headerRow = header.map((h) => ({
      ...h,
      classes: 'govuk-table__header',
    }))

    data.forEach((rowData) => {
      const sectionDescription: string = this.mapSectionDescription(rowData)

      if (!sectionedData[sectionDescription]) {
        sectionedData[sectionDescription] = []
      }

      sectionedData[sectionDescription].push(this.mapRow(rowData))
    })

    return Object.keys(sectionedData)
      .sort()
      .flatMap((sectionDescription) => {
        const count = sectionedData[sectionDescription].length
        const countDescription = `${count} result${count === 1 ? '' : 's'}`
        const mappedSectionHeaderSummary = this.mapSectionSummaryTables(
          sectionDescription,
          'section-header',
          this.columns.length,
        )
        const mappedHeaderSummary = this.mapSectionSummaryRows('table-header', sectionDescription)
        const mappedTableData = sectionedData[sectionDescription]
        const mappedFooterSummary = this.mapSectionSummaryRows('table-footer', sectionDescription)
        const mappedSectionFooterSummary = this.mapSectionSummaryTables(
          sectionDescription,
          'section-footer',
          this.columns.length,
        )

        const tableContent = mappedSectionHeaderSummary
          .concat([headerRow])
          .concat(mappedHeaderSummary)
          .concat(mappedTableData)
          .concat(mappedFooterSummary)
          .concat(mappedSectionFooterSummary)

        return [
          [
            {
              colspan: this.columns.length,
              html: `<h2>${sectionDescription} <span class='govuk-caption-m'>${countDescription}</span></h2>`,
            },
          ],
          ...tableContent,
        ]
      })
  }

  private mapSectionSummaryRows(template: SummaryTemplate, sectionDescription: string): Cell[][] {
    if (this.reportSummaries[template]) {
      return this.reportSummaries[template].flatMap((reportSummary) =>
        reportSummary.data
          .filter((rowData) => this.mapSectionDescription(rowData) === sectionDescription)
          .map((rowData) =>
            this.mapRow(rowData, `dpr-report-summary-cell dpr-report-summary-cell-${template}`, reportSummary.fields),
          ),
      )
    }
    return []
  }

  private mapSectionSummaryTables(
    sectionDescription: string,
    summaryTemplate: SummaryTemplate,
    columnsLength: number,
  ): Cell[][] {
    const summaries = this.reportSummaries[summaryTemplate]

    if (summaries) {
      const htmlTables = summaries.map((summary) => {
        const data = summary.data.filter((row) => this.mapSectionDescription(row) === sectionDescription)

        if (data.length > 0) {
          const dataTable = DataTableBuilder
            .getForSummary(summary, this.specification.sections)
            .buildTable(data)

          const headers = dataTable.head.map(
            (h) => `<th scope='col' class='govuk-table__header'>${h.html ?? h.text}</th>`,
          )
          const rows = dataTable.rows.map(
            (r) =>
              `<tr class='govuk-table__row'>${r.map(
                (c) =>
                  `<td class='govuk-table__cell govuk-table__cell--${c.format} ${c.classes}'>${c.html ?? c.text}</td>`
              ).join('')}</tr>`,
          )

          return `<div class='dpr-summary-container'><table class='govuk-table'>
                  <thead class='govuk-table__head'>${headers.join('')}</thead>
                  <tbody class='govuk-table__body'>${rows.join('')}</tbody>
                </table></div>`
        } else {
          return ''
        }
      })

      const summaryContent = htmlTables.join('')
      if (summaryContent.length > 0) {
        return [
          [
            {
              colspan: columnsLength,
              html: `<div class='dpr-summary-container-group dpr-summary-container-group-${summaryTemplate}'>${summaryContent}</div>`,
            },
          ]
        ]
      }
    }
    return []
  }

  private mapSectionDescription(rowData: NodeJS.Dict<string>): string {
    const { sections } = this.specification

    return sections
      .map((s) => {
        const sectionField = this.specification.fields.find((f) => f.name === s)
        return `${sectionField.display}: ${this.mapCellValue(sectionField, rowData[s])}`
      })
      .join(', ')
  }

  buildTable(data: Array<Dict<string>>): DataTable {
    return {
      head: null,
      rows: this.mapSectionedData(data, this.mapHeader(true)),
      rowCount: data.length,
      colCount: this.columns.length,
    }
  }
}
