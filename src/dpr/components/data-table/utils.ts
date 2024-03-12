import Dict = NodeJS.Dict
import type { Cell, Header } from './types'
import ReportQuery from '../../types/ReportQuery'
import { components } from '../../types/api'

const mapDate = (isoDate: string) => {
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

export default {
  mapHeader: (
    format: Array<components['schemas']['FieldDefinition']>,
    reportQuery: ReportQuery,
    createUrlForParameters: (
      currentQueryParams: Dict<string | Array<string>>,
      updateQueryParams: Dict<string>,
    ) => string,
  ) => {
    const currentQueryParams = reportQuery.toRecordWithFilterPrefix()

    return format
      .filter((f) => {
        return reportQuery.columns.includes(f.name)
      })
      .map((f) => {
        let header: Header

        if (f.sortable) {
          let sortDirection = 'none'
          let url = createUrlForParameters(currentQueryParams, {
            sortColumn: f.name,
            sortedAsc: 'true',
          })

          if (f.name === reportQuery.sortColumn) {
            sortDirection = reportQuery.sortedAsc ? 'ascending' : 'descending'

            if (reportQuery.sortedAsc) {
              url = createUrlForParameters(currentQueryParams, {
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
      })
  },

  mapData: (
    data: Array<Dict<string>>,
    format: Array<components['schemas']['FieldDefinition']>,
    selectedColumns: Array<string>,
  ) => {
    return data.map((d) =>
      format
        .filter((f) => {
          return selectedColumns.includes(f.name)
        })
        .map((f) => {
          let text: string = d[f.name]
          let fieldFormat: string

          switch (f.type) {
            case 'date':
              fieldFormat = 'numeric'
              text = mapDate(d[f.name])
              break

            case 'long':
              fieldFormat = 'numeric'
              break

            default:
              fieldFormat = 'string'
          }
          const isHtml = f.type === 'HTML'
          const cell: Cell = {
            ...(isHtml ? { html: text } : { text }),
            format: fieldFormat,
            classes: f.wordWrap ? `data-table-cell-wrap-${f.wordWrap.toLowerCase()}` : null,
          }

          return cell
        }),
    )
  },
}
