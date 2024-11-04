import Dict = NodeJS.Dict
import ReportQuery from '../../types/ReportQuery'
import { Cell, DataTable, FieldDefinition, Header } from './types'
import createUrlForParameters from '../urlHelper'
import type { SummaryTemplate } from '../../types/Templates'
import { AsyncSummary } from '../../types/UserReports'
import DateMapper from '../DateMapper/DateMapper'

export default class DataTableBuilder {
  protected fields: Array<FieldDefinition>

  protected columns: Array<string> = []

  protected reportSummaries: Dict<Array<AsyncSummary>> = {}

  // Sortable headers only
  private reportQuery: ReportQuery = null

  private currentQueryParams: Record<string, string | Array<string>> = null

  protected dateMapper = new DateMapper()

  constructor(fields: Array<FieldDefinition>) {
    this.fields = fields
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
    return this.fields
      .filter((f) => this.columns.includes(f.name))
      .map((f) => {
        const overrideField = overrideFields.find((o) => o.name === f.name)
        const field = overrideField ?? f
        return this.mapCell(field, rowData, extraClasses)
      })
  }

  private mapCell(field: FieldDefinition, rowData: NodeJS.Dict<string>, extraClasses = '') {
    const text: string = this.mapCellValue(field, rowData[field.name])
    let fieldFormat = 'string'

    let classes = extraClasses

    if (field.wordWrap) {
      classes += ` data-table-cell-wrap-${field.wordWrap.toLowerCase()}`
    }

    if (field.header) {
      classes += ' govuk-table__header'
    }

    if (field.type === 'double' || field.type === 'long') {
      fieldFormat = 'numeric'
    }

    const isHtml = field.type === 'HTML'
    const cell: Cell = {
      fieldName: field.name,
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
    return this.fields
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
    const mappedTableData = this.mergeCells(data.map((rowData) => this.mapRow(rowData)))
    const mappedFooterSummary = this.mapSummary('table-footer')

    return mappedHeaderSummary.concat(mappedTableData).concat(mappedFooterSummary)
  }

  private mergeCells(rows: Cell[][]): Cell[][] {
    const mergeFieldNames = this.fields.filter(f => f.mergeRows).map(f => f.name)

    if (mergeFieldNames.length === 0) {
      return rows
    }

    const occurrences: Dict<Dict<number>> = {}
    mergeFieldNames.forEach(f => {
      occurrences[f] = rows.reduce((accumulator: Dict<number>, currentRow) => {
        const currentCell = this.getCellByFieldName(currentRow, f)
        const cellValue = currentCell.text ?? currentCell.html

        return {
          ...accumulator,
          [cellValue]: (accumulator[cellValue] ?? 0) + 1
        }
      }, {})
    })

    return rows.map((row) => {
      let mergedRow = [
        ...row
      ]

      mergeFieldNames.forEach(mergeFieldName => {
        const currentRowCell = this.getCellByFieldName(row, mergeFieldName)
        const cellValue = currentRowCell.text ?? currentRowCell.html
        const occurrencesOfValue = occurrences[mergeFieldName][cellValue]

        switch (occurrencesOfValue) {
          case -1:
            mergedRow = mergedRow.filter(c => c.fieldName !== mergeFieldName)
            break;

          case 1:
            break;

          default:
            currentRowCell.rowspan = occurrencesOfValue
            occurrences[mergeFieldName][cellValue] = -1
        }
      })

      return mergedRow
    })
  }

  private getCellByFieldName(row: Cell[], fieldName: string) {
    return row.find(c => c.fieldName === fieldName)
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

  protected sort(data: Dict<string>[]) {
    return this.appendSortKeyToData(data).sort(this.sortKeyComparison())
  }

  protected sortKeyComparison() {
    return (a: Dict<string>, b: Dict<string>) => {
      const aValue = a.sortKey
      const bValue = b.sortKey

      if (aValue === bValue) {
        return 0
      }

      if (aValue < bValue) {
        return -1
      }

      return 1
    }
  }

  private appendSortKeyToData(data: Dict<string>[], fields: FieldDefinition[] = null): Dict<string>[] {
    const sortFields = fields || this.fields

    return data.map((rowData) => {
      const sortKey = this.getSortKey(rowData, sortFields)

      return {
        ...rowData,
        sortKey,
      }
    })
  }

  protected getSortKey(rowData: NodeJS.Dict<string>, sortFields: FieldDefinition[]) {
    return sortFields
      .map((f) => {
        const value = rowData[f.name]

        if (value === null) {
          return 'zzzzzzzz'
        }

        if (this.dateMapper.isDate(value)) {
          return this.dateMapper.toDateString(value, 'iso')
        }

        return this.mapCellValue(f, value)
      })
      .join('-')
      .toLowerCase()
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
    return {
      head: this.mapHeader(),
      rows: this.mapData(data),
      rowCount: data.length,
      colCount: this.columns.length,
    }
  }

  withSummaries(reportSummaries: Dict<Array<AsyncSummary>>) {
    this.reportSummaries = reportSummaries
    return this
  }
}
