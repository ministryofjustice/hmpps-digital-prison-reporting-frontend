import Dict = NodeJS.Dict
import { components } from '../../types/api'
import ReportQuery from '../../types/ReportQuery'
import { Cell, DataTable, Header } from './types'
import createUrlForParameters from '../urlHelper'
import type { Template } from '../../types/Template'

export class DataTableBuilder {

  private specification: components['schemas']['Specification']
  private template: Template
  private columns: Array<string> = []

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

  private mapCells(rowData: NodeJS.Dict<string>): Cell[] {
    return this.specification.fields
      .filter((f) => this.columns.includes(f.name))
      .map((f) => {
        const text: string = this.mapCellValue(f, rowData[f.name])
        let fieldFormat = 'string'

        if (f.type === 'double' || f.type === 'long') {
          fieldFormat = 'numeric'
        }

        const isHtml = f.type === 'HTML'
        const cell: Cell = {
          ...(isHtml ? { html: text } : { text }),
          format: fieldFormat,
          classes: f.wordWrap ? `data-table-cell-wrap-${f.wordWrap.toLowerCase()}` : null,
        }

        return cell
      })
  }

  private mapCellValue(field: components['schemas']['FieldDefinition'], cellData: string) {
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
      .map(s => {
        const sectionField = this.specification.fields.find(f => f.name === s)
        return `${sectionField.display}: ${this.mapCellValue(sectionField, rowData[s])}`
      })
      .join(', ')
  }

  private mapHeader(disableSort: boolean = false): Cell[] {
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
      } else {
        return {
          text: f.display,
        }
      }
    })
  }

  private mapData(
    data: Array<Dict<string>>,
  ): Cell[][] {
    return data.map((rowData) => this.mapCells(rowData))
  }

  private mapSectionedData(
    data: Array<Dict<string>>,
    header: Cell[],
  ): Cell[][] {
    const { sections } = this.specification
    const sectionedData: Dict<Cell[][]> = {}
    const headerRow = header.map(h => ({
      ...h,
      classes: 'govuk-table__header'
    }))

    data.forEach((rowData) => {
      const sectionDescription: string = this.getSectionDescription(sections, rowData)

      if (!sectionedData[sectionDescription]) {
        sectionedData[sectionDescription] = []
      }

      sectionedData[sectionDescription].push(this.mapCells(rowData))
    })

    return Object.keys(sectionedData)
      .sort()
      .flatMap(sectionDescription => [
        [{
          colspan: this.columns.length,
          html: `<h2>${sectionDescription}</h2>`
        }],
        headerRow,
        ...sectionedData[sectionDescription],
      ])
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
      colCount: this.columns.length
    }

    switch (this.template) {
      case 'list-section':
        return {
          head: null,
          rows: this.mapSectionedData(data, this.mapHeader(true)),
          ...counts
        }

      default:
        return {
          head: this.mapHeader(),
          rows: this.mapData(data),
          ...counts
        }
    }
  }
}
