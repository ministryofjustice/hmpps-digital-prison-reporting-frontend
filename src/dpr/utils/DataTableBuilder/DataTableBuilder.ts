import Dict = NodeJS.Dict
import { components } from '../../types/api'
import ReportQuery from '../../types/ReportQuery'
import { Cell, DataTable, FieldDefinition, Header } from './types'
import createUrlForParameters from '../urlHelper'
import type { SummaryTemplate, Template } from '../../types/Templates'
import { AsyncSummary } from '../../types/AsyncReport'

export default class DataTableBuilder {
  private specification: components['schemas']['Specification']

  private template: Template

  private columns: Array<string> = []

  private reportSummaries: Dict<Array<AsyncSummary>> = {}

  // Sortable headers only
  private reportQuery: ReportQuery = null

  private currentQueryParams: Record<string, string | Array<string>> = null

  constructor(specification: components['schemas']['Specification']) {
    this.specification = specification
    this.template = specification.template as Template
  }

  private mapDate(isoDate: string) {
    if (!isoDate) return ''
    const date = new Date(isoDate)
    const add0 = (t: number) => {
      return t < 10 ? `0${t}` : t
    }
    const year = date.getFullYear().toString().slice(2)
    const month = add0(date.getMonth() + 1) // 0 indexed
    const day = add0(date.getDate())
    const hours = add0(date.getHours())
    const minutes = add0(date.getMinutes())

    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  private mapBoolean(value: string) {
    if (!value) return ''
    return value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase()
  }

  private mapRow(rowData: NodeJS.Dict<string>, extraClasses = '', overrideFields: Array<FieldDefinition> = []): Cell[] {
    return this.specification.fields
      .filter((f) => this.columns.includes(f.name))
      .map((f) => {
        const attributes = {
          headers: `header_${f.name}_id table-classification-row-id`,
        }

        const overrideField = overrideFields.find((o) => o.name === f.name)
        const field = overrideField ?? f
        const text: string = this.mapCellValue(field, rowData[field.name])
        const classes = extraClasses + (field.wordWrap ? ` data-table-cell-wrap-${field.wordWrap.toLowerCase()}` : '')
        let fieldFormat = 'string'

        if (field.type === 'double' || field.type === 'long') {
          fieldFormat = 'numeric'
        }

        const isHtml = field.type === 'HTML'
        const cell: Cell = {
          ...(isHtml ? { html: text } : { text }),
          format: fieldFormat,
          classes: classes.trim(),
          attributes,
        }

        return cell
      })
  }

  private mapCellValue(field: FieldDefinition, cellData: string) {
    if (field.calculated) {
      return cellData
    }

    switch (field.type) {
      case 'boolean':
        return this.mapBoolean(cellData)

      case 'date':
      case 'time':
        return this.mapDate(cellData)

      default:
        return cellData
    }
  }

  private getSectionDescription(sections: string[], rowData: NodeJS.Dict<string>): string {
    return sections
      .map((s) => {
        const sectionField = this.specification.fields.find((f) => f.name === s)
        return `${sectionField.display}: ${this.mapCellValue(sectionField, rowData[s])}`
      })
      .join(', ')
  }

  private mapHeader(disableSort = false): Header[] {
    return this.specification.fields
      .filter((field) => this.columns.includes(field.name))
      .map((f) => {
        const attributes = {
          id: `header_${f.name}_id`,
          scope: 'col',
          // headers: `ht_${f.name}`,
        }

        if (this.reportQuery && !disableSort) {
          let header: Header

          if (f.sortable) {
            let sortDirection = 'none'
            let url = createUrlForParameters(this.currentQueryParams, {
              sortColumn: f.name,
              sortedAsc: 'true',
            })

            if (f.name === this.reportQuery.sortColumn) {
              sortDirection = this.reportQuery.sortedAsc ? 'ascending' : 'descending'

              if (this.reportQuery.sortedAsc) {
                url = createUrlForParameters(this.currentQueryParams, {
                  sortColumn: f.name,
                  sortedAsc: 'false',
                })
              }
            }

            header = {
              html:
                `<a ` +
                `data-column="${f.name}" ` +
                `class="data-table-header-button data-table-header-button-sort-${sortDirection}" ` +
                `href="${url}"` +
                `>${f.display}</a>`,

              attributes,
            }
          } else {
            header = {
              text: f.display,
              attributes,
            }
          }

          return header
        }
        return {
          text: f.display,
          attributes,
        }
      })
  }

  private mapData(data: Array<Dict<string>>): Cell[][] {
    const mappedHeaderSummary = this.mapSummary('table-header')
    const mappedTableData = data.map((rowData) => this.mapRow(rowData))
    const mappedFooterSummary = this.mapSummary('table-footer')

    return mappedHeaderSummary.concat(mappedTableData).concat(mappedFooterSummary)
  }

  private mapSummary(template: SummaryTemplate): Cell[][] {
    if (this.reportSummaries[template]) {
      return this.reportSummaries[template].flatMap((reportSummary) =>
        reportSummary.data.map((rowData) =>
          this.mapRow(rowData, `dpr-report-summary-cell dpr-report-summary-cell-${template}`, reportSummary.fields),
        ),
      )
    }
    return []
  }

  private mapSectionedData(data: Array<Dict<string>>, header: Cell[]): Cell[][] {
    const { sections } = this.specification
    const sectionedData: Dict<Cell[][]> = {}
    const headerRow = header.map((h) => ({
      ...h,
      classes: 'govuk-table__header',
    }))

    data.forEach((rowData) => {
      const sectionDescription: string = this.getSectionDescription(sections, rowData)

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
        const mappedHeaderSummary = this.mapSectionSummary('table-header', sectionDescription)
        const mappedTableData = sectionedData[sectionDescription]
        const mappedSectionSummary = this.mapSectionSummary('section-footer', sectionDescription)
        const mappedFooterSummary = this.mapSectionSummary('table-footer', sectionDescription)

        const tableContent = mappedHeaderSummary
          .concat(mappedTableData)
          .concat(mappedSectionSummary)
          .concat(mappedFooterSummary)

        return [
          [
            {
              colspan: this.columns.length,
              html: `<h2>${sectionDescription} <span class='govuk-caption-m'>${countDescription}</span></h2>`,
            },
          ],
          headerRow,
          ...tableContent,
        ]
      })
  }

  private mapSectionSummary(template: SummaryTemplate, sectionDescription: string): Cell[][] {
    const { sections } = this.specification

    if (this.reportSummaries[template]) {
      return this.reportSummaries[template].flatMap((reportSummary) =>
        reportSummary.data
          .filter((rowData) => this.getSectionDescription(sections, rowData) === sectionDescription)
          .map((rowData) =>
            this.mapRow(rowData, `dpr-report-summary-cell dpr-report-summary-cell-${template}`, reportSummary.fields),
          ),
      )
    }
    return []
  }

  withHeaderSortOptions(reportQuery: ReportQuery) {
    this.reportQuery = reportQuery
    this.columns = reportQuery.columns
    this.currentQueryParams = this.reportQuery.toRecordWithFilterPrefix()

    return this
  }

  withNoHeaderOptions(columns: string[]) {
    this.columns = columns

    return this
  }

  buildTable(data: Array<Dict<string>>): DataTable {
    const counts = {
      rowCount: data.length,
      colCount: this.columns.length,
    }

    switch (this.template) {
      case 'list-section':
        return {
          head: null,
          rows: this.mapSectionedData(data, this.mapHeader(true)),
          ...counts,
        }

      default:
        return {
          head: this.mapHeader(),
          rows: this.mapData(data),
          ...counts,
        }
    }
  }

  withSummaries(reportSummaries: Dict<Array<AsyncSummary>>) {
    this.reportSummaries = reportSummaries
    return this
  }
}
