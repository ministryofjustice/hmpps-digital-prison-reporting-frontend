import type { Response } from 'express'
import { QueryData, SetQueryFromFiltersResult } from 'src/dpr/components/_async/async-filters-form/types'
import { ChildReportExecutionData, ExecutionData } from 'src/dpr/types/ExecutionData'
import { AsyncReportQueryData, AsyncReportUrlData, ReportType } from 'src/dpr/types/UserReports'
import { normalizeQueryStringArray } from 'src/dpr/utils/queryMappers'

export interface ReportData {
  type: ReportType
  reportId: string
  reportName: string
  description: string
  id: string
  name: string
  schedule?: string | undefined
}

export class StoreItemBuilder {
  executionData!: ExecutionData

  childExecutionData!: ChildReportExecutionData[]

  syncUrl: AsyncReportUrlData | undefined

  queryData!: SetQueryFromFiltersResult | undefined

  interactiveQuery!: QueryData | undefined

  reportType!: ReportType

  reportIds!: {
    reportId: string
    id: string
  }

  reportMeta!: { name: string; reportName: string; description: string }

  reportData!: ReportData

  constructor(readonly res: Response) {
    //
  }

  withReportMetaData = (reportData: ReportData) => {
    this.reportData = reportData

    return this
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

  withInteractiveQuery = (interactiveQueryData: QueryData | undefined) => {
    this.interactiveQuery = interactiveQueryData

    return this
  }

  buildInteractiveQuery = (): AsyncReportQueryData | undefined => {
    if (!this.interactiveQuery?.query || !this.interactiveQuery?.querySummary) {
      return undefined
    }

    const { query, querySummary: summary } = this.interactiveQuery

    const data = {
      ...query,
      ...(query['columns'] && {
        columns: normalizeQueryStringArray(query['columns']),
      }),
    }

    return {
      data,
      summary,
    }
  }
}
