import Dict = NodeJS.Dict
import { components } from '../../types/api'
import ReportQuery from '../../types/ReportQuery'
import { Cell, DataTable, FieldDefinition, Header } from './types'
import createUrlForParameters from '../urlHelper'
import type { SummaryTemplate, Template } from '../../types/Templates'
import { AsyncSummary } from '../../types/AsyncReport'
import DateMapper from '../DateMapper/DateMapper'

export default class DataTableBuilder {
  protected specification: components['schemas']['Specification']

  private template: Template

  protected columns: Array<string> = []

  protected reportSummaries: Dict<Array<AsyncSummary>> = {}

  // Sortable headers only
  private reportQuery: ReportQuery = null

  private currentQueryParams: Record<string, string | Array<string>> = null

  private applySorting = false

  private dateMapper = new DateMapper()

  constructor(specification: components['schemas']['Specification']) {
    this.specification = specification
    this.template = specification.template as Template
  }

  private mapDate(isoDate: string) {
    if (!isoDate) return ''

    return this.dateMapper.toDateString(isoDate, 'local-datetime-short-year')
  }

  private mapBoolean(value: string) {
    if (!value) return ''
    return value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase()
  }

  protected mapRow(
    rowData: NodeJS.Dict<string>,
    extraClasses = '',
    overrideFields: Array<FieldDefinition> = [],
  ): Cell[] {
    return this.specification.fields
      .filter((f) => this.columns.includes(f.name))
      .map((f) => {
        const overrideField = overrideFields.find((o) => o.name === f.name)
        const field = overrideField ?? f
        return this.mapCell(field, rowData, extraClasses)
      })
  }

  private mapCell(field: FieldDefinition, rowData: NodeJS.Dict<string>, extraClasses = '') {
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
    }

    return cell
  }

  protected mapCellValue(field: FieldDefinition, cellData: string) {
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

  protected mapHeader(disableSort = false): Cell[] {
    return this.specification.fields
      .filter((field) => this.columns.includes(field.name))
      .map((f) => {
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
            }
          } else {
            header = {
              text: f.display,
            }
          }

          return header
        }
        return {
          text: f.display,
        }
      })
  }

  protected mapData(data: Array<Dict<string>>): Cell[][] {
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

  private sort(data: Dict<string>[]) {
    return data.sort((a, b) => {
      const sortValues = this.specification.fields
        .map((field) => {
          const aValue = a[field.name]
          const bValue = b[field.name]

          if (aValue === bValue) {
            return 0
          }

          if (aValue === null) {
            return 1
          }
          if (bValue === null) {
            return -1
          }

          if (aValue < bValue) {
            return -1
          }

          return 1
        })
        .filter((c) => c !== 0)

      return sortValues.length > 0 ? sortValues[0] : 0
    })
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
    const sortedData = this.applySorting ? this.sort(data) : data
    return {
      head: this.mapHeader(),
      rows: this.mapData(sortedData),
      rowCount: sortedData.length,
      colCount: this.columns.length,
    }
  }

  withSummaries(reportSummaries: Dict<Array<AsyncSummary>>) {
    this.reportSummaries = reportSummaries
    return this
  }

  withApplySorting(apply: boolean) {
    this.applySorting = apply
    return this
  }

  static getForSummary(summary: AsyncSummary, sections: Array<string>): DataTableBuilder {
    const fields = summary.fields.map((field) => ({
      ...field,
      calculated: false,
      sortable: false,
      defaultsort: false,
      mandatory: true,
      visible: true,
    }))
    const columns = summary.fields
      .filter((field) => !sections || !sections.includes(field.name))
      .map((field) => field.name)

    return new DataTableBuilder({
      template: 'list',
      fields,
      sections: [],
    })
      .withNoHeaderOptions(columns)
      .withApplySorting(true)
  }
}
