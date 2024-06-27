import parseUrl from 'parseurl'
import { Request } from 'express'
import DataTableUtils from '../data-table/utils'
import ColumnUtils from '../async-columns/utils'
import PaginationUtils from '../pagination/utils'
import ReportActionsUtils from '../icon-button-list/utils'
import { components } from '../../types/api'
import Dict = NodeJS.Dict
import { AsyncReportData } from '../../types/AsyncReport'

export default {
  getRenderData: (
    req: Request,
    definition: components['schemas']['SingleVariantReportDefinition'],
    reportData: Array<Dict<string>>,
    count: number,
    reportStateData: AsyncReportData,
  ) => {
    const { columns: reqColumns } = req.query
    const { fields, template } = definition.variant.specification
    const { classification } = definition.variant

    const columns = ColumnUtils.getColumns(fields, <string[]>reqColumns)
    const url = parseUrl(req)
    const pagination = PaginationUtils.getPaginationData(url, count)
    const actions = ReportActionsUtils.initReportActions(definition.variant, reportStateData)
    const rows = DataTableUtils.mapData(reportData, fields, columns.value)
    const head = DataTableUtils.mapAsyncHeader(fields, columns.value)
    const { reportName, name: variantName, query, description } = reportStateData

    return {
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
      template,
    }
  },
}
