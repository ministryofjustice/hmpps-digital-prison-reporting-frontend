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
  schedule?: string
}

export class StoreItemBuilder {
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
    const { reportId, id, reportName, name, description, schedule, type } = reportData
    this.reportType = type as ReportType

    return {
      type: this.reportType,
      reportId,
      reportName,
      description,
      id,
      name,
      ...(schedule && { schedule }),
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
