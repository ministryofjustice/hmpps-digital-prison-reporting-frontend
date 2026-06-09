import type { Response } from 'express'
import { SetQueryFromFiltersResult } from 'src/dpr/components/_async/async-filters-form/types'
import { ChildReportExecutionData, ExecutionData } from 'src/dpr/types/ExecutionData'
import { AsyncReportUrlData, ReportType, RequestFormData } from 'src/dpr/types/UserReports'

export interface ReportData {
  type: ReportType
  reportId: string
  reportName: string
  description: string
  id: string
  name: string
}

class StoreItemBuilder {
  executionData!: ExecutionData

  childExecutionData!: ChildReportExecutionData[]

  syncUrl: AsyncReportUrlData | undefined

  queryData!: SetQueryFromFiltersResult | undefined

  reportType!: ReportType

  constructor(readonly res: Response) {
    //
  }

  withExecutionData = (executionData: ExecutionData) => {
    this.executionData = executionData

    return this
  }

  withChildExecutionData = (childExecutionData: ChildReportExecutionData[] = []) => {
    this.childExecutionData = childExecutionData

    return this
  }

  withSyncUrls = (url?: AsyncReportUrlData) => {
    this.syncUrl = url

    return this
  }

  withQueryData = (queryData: SetQueryFromFiltersResult | undefined) => {
    this.queryData = queryData

    return this
  }

  // Builders
  buildReportMetaData = (reportData: ReportData | RequestFormData) => {
    this.reportType = reportData.type as ReportType

    return {
      type: this.reportType,
      reportId: reportData.reportId,
      reportName: reportData.reportName,
      description: reportData.description,
      id: reportData.id,
      name: reportData.name,
    }
  }

  buidDefinitionsPath = () => {
    const { definitionsPath, dpdPathFromQuery } = this.res.locals

    if (!definitionsPath) return undefined

    return {
      dataProductDefinitionsPath: definitionsPath,
      dpdPathFromQuery,
    }
  }
}

export { StoreItemBuilder }
export default StoreItemBuilder
