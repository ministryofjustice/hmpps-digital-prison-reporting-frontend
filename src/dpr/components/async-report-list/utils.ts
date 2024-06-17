/* eslint-disable no-underscore-dangle */
import parseUrl from 'parseurl'
import DataTableUtils from '../data-table/utils'
import ColumnUtils from '../async-columns/utils'
import PaginationUtils from '../pagination/utils'
import ReportActionsUtils from '../icon-button-list/utils'
import { components } from '../../types/api'
import Dict = NodeJS.Dict

import { AsyncReportUtilsParams } from '../../types/AsyncReportUtils'
import { AsyncReportData } from '../../types/AsyncReport'

const initDataSources = ({ req, res, next, asyncReportsStore, dataSources }: AsyncReportUtilsParams) => {
  try {
    const { token } = res.locals.user || 'token'
    const { reportId, reportVariantId, tableId } = req.params
    const { selectedPage = 1, pageSize = 10, dataProductDefinitionsPath } = req.query
    const reportDefinitionPromise = dataSources.getDefinition(
      token,
      reportId,
      reportVariantId,
      <string>dataProductDefinitionsPath,
    )
    const reportDataPromise = dataSources.getAsyncReport(token, reportId, reportVariantId, tableId, {
      selectedPage: +selectedPage,
      pageSize: +pageSize,
      dataProductDefinitionsPath: <string>dataProductDefinitionsPath,
    })
    const reportDataCountPromise = dataSources.getAsyncCount(token, tableId)
    const stateData = asyncReportsStore.getReportByTableId(tableId)

    return [reportDefinitionPromise, reportDataPromise, reportDataCountPromise, stateData]
  } catch (error) {
    next(error)
    return false
  }
}

export default {
  renderReport: async ({ req, res, next, asyncReportsStore, dataSources }: AsyncReportUtilsParams) => {
    const { columns: reqColumns } = req.query
    const dataPromises = initDataSources({ req, res, next, dataSources, asyncReportsStore })

    let renderData = {}
    if (dataPromises) {
      await Promise.all(dataPromises)
        .then((resolvedData) => {
          const definition = resolvedData[0] as unknown as components['schemas']['SingleVariantReportDefinition']
          const reportData = <Array<Dict<string>>>resolvedData[1]
          const count = <number>resolvedData[2]
          const reportStateData: AsyncReportData = <AsyncReportData>resolvedData[3]
          const fieldDefinition = definition.variant.specification.fields
          const { classification } = definition.variant

          const columns = ColumnUtils.getColumns(fieldDefinition, <string[]>reqColumns)
          const url = parseUrl(req)
          const pagination = PaginationUtils.getPaginationData(url, count)
          console.log(JSON.stringify(reportStateData, null, 2))
          const actions = ReportActionsUtils.initReportActions(definition.variant, reportStateData)
          const rows = DataTableUtils.mapData(reportData, fieldDefinition, columns.value)
          const head = DataTableUtils.mapAsyncHeader(fieldDefinition, columns.value)
          const { reportName, name: variantName, query, description } = reportStateData

          renderData = {
            variantName,
            reportName,
            description,
            rows,
            head,
            columns,
            pagination,
            actions,
            appliedFilters: query.summary,
            classification,
          }
        })
        .catch((err) => next(err))
    }
    return { renderData }
  },
}
