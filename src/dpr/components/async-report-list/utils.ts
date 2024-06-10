/* eslint-disable no-underscore-dangle */
import { Request, Response } from 'express'
import DataTableUtils from '../data-table/utils'
import ColumnUtils from '../async-columns/utils'
import PaginationUtils from '../pagination/utils'
import ReportActionsUtils from '../icon-button-list/utils'

import { GetReportParams } from './types'
import AsyncReportStoreService from '../../services/requestedReportsService'
import { AsyncReportData } from '../../types/AsyncReport'

const initDataSources = (req: Request, res: Response, dataSources: any, asyncReportsStore: AsyncReportStoreService) => {
  const { token } = res.locals.user || 'token'
  const { reportId, reportVariantId, tableId } = req.params
  const { selectedPage, pageSize, dataProductDefinitionsPath } = req.query
  const reportDefinitionPromise = dataSources.getDefinition(token, reportId, reportVariantId)
  const reportDataPromise = dataSources.getAsyncReport(token, reportId, reportVariantId, tableId, {
    selectedPage: +selectedPage,
    pageSize: +pageSize,
    dataProductDefinitionsPath,
  })
  const reportDataCountPromise = dataSources.getAsyncCount(token, tableId)
  const stateData = asyncReportsStore.getReportByTableId(tableId)

  return [reportDefinitionPromise, reportDataPromise, reportDataCountPromise, stateData]
}

export default {
  renderReport: async ({ req, res, url, asyncReportsStore, dataSources }: GetReportParams) => {
    const { columns: reqColumns } = req.query
    const dataPromises = initDataSources(req, res, dataSources, asyncReportsStore)

    let renderData = {}
    await Promise.all(dataPromises).then((resolvedData) => {
      const definition = resolvedData[0]
      const reportData = resolvedData[1]
      const count = resolvedData[2]
      const reportStateData: AsyncReportData = resolvedData[3]

      const fieldDefinition = definition.variant.specification.fields
      const { classification } = definition.variant

      const columns = ColumnUtils.getColumns(fieldDefinition, <string[]>reqColumns)
      const pagination = PaginationUtils.getPaginationData(url, count)
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

    return { renderData }
  },
}
