import { Response } from 'express'
import { components } from '../types/api'
import type ReportingClient from '../data/reportingClient'
import ReportQuery from '../types/ReportQuery'
import Dict = NodeJS.Dict
import { ListWithWarnings } from '../data/types'
import { DEFAULT_DOWNLOAD_FORMAT, DownloadFormat } from '../types/Download'

class ReportingService {
  constructor(private readonly reportingClient: ReportingClient) {
    this.reportingClient = reportingClient
  }

  async getCount(resourceName: string, token: string, listRequest: ReportQuery): Promise<number> {
    return this.reportingClient.getCount(resourceName, token, listRequest)
  }

  async getList(resourceName: string, token: string, listRequest: ReportQuery): Promise<Array<NodeJS.Dict<string>>> {
    return this.reportingClient.getList(resourceName, token, listRequest)
  }

  async getListWithWarnings(resourceName: string, token: string, listRequest: ReportQuery): Promise<ListWithWarnings> {
    return this.reportingClient.getListWithWarnings(resourceName, token, listRequest)
  }

  async getDefinitionSummary(
    token: string,
    reportId: string,
  ): Promise<components['schemas']['ReportDefinitionSummary']> {
    return this.reportingClient.getDefinitionSummary(token, reportId)
  }

  async getDefinitions(token: string): Promise<Array<components['schemas']['ReportDefinitionSummary']>> {
    return this.reportingClient.getDefinitions(token)
  }

  async getDefinition(
    token: string,
    reportId: string,
    variantId: string,
    query?: Dict<string | string[]>,
  ): Promise<components['schemas']['SingleVariantReportDefinition']> {
    return this.reportingClient.getDefinition(token, reportId, variantId, query)
  }

  async requestAsyncReport(
    token: string,
    reportId: string,
    variantId: string,
    query: Record<string, string | boolean | number>,
  ): Promise<Dict<string>> {
    return this.reportingClient.requestAsyncReport(token, reportId, variantId, query)
  }

  async cancelAsyncRequest(
    token: string,
    reportId: string,
    variantId: string,
    executionId: string,
  ): Promise<Dict<string>> {
    return this.reportingClient.cancelAsyncRequest(token, reportId, variantId, executionId)
  }

  async downloadAsyncReport(
    token: string,
    reportId: string,
    variantId: string,
    tableId: string,
    query: Record<string, string | string[]>,
    res: Response,
    format: DownloadFormat = DEFAULT_DOWNLOAD_FORMAT,
  ): Promise<void> {
    return this.reportingClient.downloadAsyncReport(token, reportId, variantId, tableId, query, res, format)
  }

  async downloadSyncReport(
    token: string,
    resourceName: string,
    query: Record<string, string | string[]>,
    res: Response,
    format: DownloadFormat = DEFAULT_DOWNLOAD_FORMAT,
  ): Promise<void> {
    return this.reportingClient.downloadSyncReport(token, resourceName, query, res, format)
  }

  async getAsyncReport(
    token: string,
    reportId: string,
    variantId: string,
    tableId: string,
    query: Record<string, string | string[]>,
  ): Promise<Array<Record<string, string>>> {
    return this.reportingClient.getAsyncReport(token, reportId, variantId, tableId, query)
  }

  async getAsyncSummaryReport(
    token: string,
    reportId: string,
    variantId: string,
    tableId: string,
    summaryId: string,
    query: Dict<string | number>,
  ): Promise<Array<Record<string, string>>> {
    return this.reportingClient.getAsyncSummaryReport(token, reportId, variantId, tableId, summaryId, query)
  }

  async getAsyncReportStatus(
    token: string,
    reportId: string,
    variantId: string,
    executionId: string,
    tableId: string,
  ): Promise<components['schemas']['StatementExecutionStatus']> {
    return this.reportingClient.getAsyncReportStatus(token, reportId, variantId, executionId, tableId)
  }

  async getAsyncCount(token: string, tableId: string): Promise<number> {
    return this.reportingClient.getAsyncCount(token, tableId)
  }

  async getAsyncInteractiveCount(
    token: string,
    tableId: string,
    reportId: string,
    id: string,
    filters: ReportQuery,
  ): Promise<number> {
    return this.reportingClient.getAsyncInteractiveCount(token, tableId, reportId, id, filters)
  }

  async getTableExpiryState(
    token: string,
    tableIds: string[],
  ): Promise<components['schemas']['ResultTableExpiryState'][]> {
    return this.reportingClient.getTableExpiryState(token, tableIds)
  }
}

export { ReportingService }
export default ReportingService
