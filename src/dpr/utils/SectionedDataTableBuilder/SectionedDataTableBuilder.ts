import Dict = NodeJS.Dict
import { components } from '../../types/api'
import { Cell, DataTable } from '../DataTableBuilder/types'
import type { SummaryTemplate, Template } from '../../types/Templates'
import DataTableBuilder from '../DataTableBuilder/DataTableBuilder'
import { distinct } from '../arrayUtils'
import SummaryDataTableBuilder from '../SummaryDataTableBuilder/SummaryDataTableBuilder'

export default class SectionedDataTableBuilder extends DataTableBuilder {

  private sections: Array<string>
  private template: Template

  constructor(specification: components['schemas']['Specification']) {
    const { fields, sections, template } = specification
    super(fields)
    this.sections = sections
    this.template = template
  }

  private mapSectionedData(data: Array<Dict<string>>, header: Cell[]): Cell[][] {
    let sectionedData: Dict<Cell[][]> = {}
    const headerRow = header.map((h) => ({
      ...h,
      classes: 'govuk-table__header',
    }))

    const sectionFields = this.sections.map((s) => this.fields.find((f) => f.name === s))

    const sectionDescriptions = data
      .map((rowData) => ({
        description: this.mapSectionDescription(rowData),
        sortKey: this.getSortKey(rowData, sectionFields),
      }))
      .sort(this.sortKeyComparison())
      .map((s) => s.description)
      .reduce(distinct, [])

    sectionDescriptions.forEach((sectionDescription) => {
      sectionedData[sectionDescription] = []
    })

    if (this.template !== 'summary-section') {
      sectionedData = data.reduce((previousValue, rowData) => {
        const sectionDescription: string = this.mapSectionDescription(rowData)
        const mappedData = this.mapRow(rowData)

        return {
          ...previousValue,
          [sectionDescription]: previousValue[sectionDescription].concat([mappedData]),
        }
      }, sectionedData)
    }

    return sectionDescriptions.flatMap((sectionDescription) => {
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
        .concat(mappedTableData.length > 0 ? [headerRow] : [])
        .concat(mappedHeaderSummary)
        .concat(mappedTableData)
        .concat(mappedFooterSummary)
        .concat(mappedSectionFooterSummary)

      return [
        [
          {
            colspan: this.columns.length,
            html: `<h2>${sectionDescription}${
              count > 0 ? ` <span class='govuk-caption-m'>${countDescription}</span>` : ''
            }</h2>`,
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
          const dataTable = new SummaryDataTableBuilder(summary, this.sections).buildTable(data)

          const headers = dataTable.head.map(
            (h) => `<th scope='col' class='govuk-table__header'>${h.html ?? h.text}</th>`,
          )
          const rows = dataTable.rows.map(
            (r) =>
              `<tr class='govuk-table__row'>${r
                .map(
                  (c) =>
                    `<td class='govuk-table__cell govuk-table__cell--${c.format} ${c.classes}'>${
                      c.html ?? c.text
                    }</td>`,
                )
                .join('')}</tr>`,
          )

          return `<div class='dpr-summary-container'><table class='govuk-table'>
                  <thead class='govuk-table__head'>${headers.join('')}</thead>
                  <tbody class='govuk-table__body'>${rows.join('')}</tbody>
                </table></div>`
        }
        return ''
      })

      const summaryContent = htmlTables.join('')
      if (summaryContent.length > 0) {
        return [
          [
            {
              colspan: columnsLength,
              html: `<div class='dpr-summary-container-group dpr-summary-container-group-${summaryTemplate}'>${summaryContent}</div>`,
            },
          ],
        ]
      }
    }
    return []
  }

  private mapSectionDescription(rowData: NodeJS.Dict<string>): string {
    const { sections } = this

    return sections
      .map((s) => {
        const sectionField = this.fields.find((f) => f.name === s)
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
