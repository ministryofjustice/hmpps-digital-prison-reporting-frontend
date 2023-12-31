import Dict = NodeJS.Dict
import type { Cell, Header } from './types'
import ReportQuery from '../../types/ReportQuery'
import { components } from '../../types/api'

const mapDate = (isoDate: string) => {
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
    createUrlForParameters: (currentQueryParams: Dict<string>, updateQueryParams: Dict<string>) => string,
  ) => {
    const currentQueryParams = reportQuery.toRecordWithFilterPrefix()

    return format.map((f) => {
      let header: Header

      if (f.sortable) {
        let ariaSort = 'none'
        let url = createUrlForParameters(currentQueryParams, {
          sortColumn: f.name,
          sortedAsc: 'true',
        })

        if (f.name === reportQuery.sortColumn) {
          ariaSort = reportQuery.sortedAsc ? 'ascending' : 'descending'

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
            `aria-sort="${ariaSort}" ` +
            `class="data-table-header-button data-table-header-button-sort-${ariaSort}" ` +
            `href="${url}"` +
            `>${f.display}</a>`,
        }
      } else {
        header = {
          html: `<a data-column="${f.name}" class="data-table-header-button">${f.display}</a>`,
        }
      }

      return header
    })
  },

  mapData: (data: Array<Dict<string>>, format: Array<components['schemas']['FieldDefinition']>) =>
    data.map((d) =>
      format.map((f) => {
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

        const cell: Cell = {
          text,
          format: fieldFormat,
          classes: f.wordWrap ? `data-table-cell-wrap-${f.wordWrap.toLowerCase()}` : null,
        }

        return cell
      }),
    ),
}
