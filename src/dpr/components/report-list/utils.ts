import type { FieldDefinition } from '../../types'
import ReportQuery from '../../types/ReportQuery'
import createUrlForParameters from '../../utils/urlHelper'
import { DataTableOptions } from '../data-table/types'
import DataTableUtils from '../data-table/utils'
import FilterUtils from '../filters/utils'
import { RenderListInput } from './types'

const filtersQueryParameterPrefix = 'filters.'

function getDefaultSortColumn(fields: FieldDefinition[]) {
  const defaultSortColumn = fields.find((f) => f.defaultSortColumn)
  return defaultSortColumn ? defaultSortColumn.name : fields.find((f) => f.sortable).name
}

export default {
  filtersQueryParameterPrefix,

  renderList: ({
    title,
    fields,
    request,
    response,
    next,
    getListDataSources,
    otherOptions,
    layoutTemplate,
  }: RenderListInput) => {
    const reportQuery = new ReportQuery(
      fields,
      request.query,
      getDefaultSortColumn(fields),
      filtersQueryParameterPrefix,
    )
    const today = FilterUtils.getTodayIsoDate()

    const listData = getListDataSources(reportQuery)

    Promise.all([listData.data, listData.count])
      .then((resolvedData) => {
        const dataTableOptions: DataTableOptions = {
          listRequest: reportQuery,
          head: DataTableUtils.mapHeader(fields, reportQuery, createUrlForParameters),
          rows: DataTableUtils.mapData(resolvedData[0], fields),
          count: resolvedData[1],
          currentQueryParams: reportQuery.toRecordWithFilterPrefix(),
        }

        const filterOptions = {
          filters: FilterUtils.getFilters(fields, reportQuery.filters),
          selectedFilters: FilterUtils.getSelectedFilters(fields, reportQuery, createUrlForParameters),
          today,
        }

        response.render('dpr/components/report-list/list', {
          title,
          dataTableOptions,
          filterOptions,
          layoutTemplate,
          ...otherOptions,
        })
      })
      .catch((err) => next(err))
  },
}
