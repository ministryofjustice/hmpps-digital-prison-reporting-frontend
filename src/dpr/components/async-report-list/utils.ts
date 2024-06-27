import parseUrl from 'parseurl'
import { Request } from 'express'
import DataTableUtils from '../data-table/utils'
import ColumnUtils from '../async-columns/utils'
import PaginationUtils from '../pagination/utils'
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
    const { fields } = definition.variant.specification

    const columns = ColumnUtils.getColumns(fields, <string[]>reqColumns)
    const url = parseUrl(req)
    const pagination = PaginationUtils.getPaginationData(url, count)
    const rows = DataTableUtils.mapData(reportData, fields, columns.value)
    const head = DataTableUtils.mapAsyncHeader(fields, columns.value)
    const { query } = reportStateData

    return {
      rows,
      head,
      columns,
      pagination,
      appliedFilters: query.summary,
    }
  },
}
