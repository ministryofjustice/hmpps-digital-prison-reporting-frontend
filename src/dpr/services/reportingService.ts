import { components } from '../types/api'
import type ReportingClient from '../data/reportingClient'
import ReportQuery from '../types/ReportQuery'
import Dict = NodeJS.Dict
import { ListWithWarnings } from '../data/types'

export default class ReportingService {
  constructor(private readonly reportingClient: ReportingClient) {}

  async getCount(resourceName: string, token: string, listRequest: ReportQuery): Promise<number> {
    return this.reportingClient.getCount(resourceName, token, listRequest)
  }

  async getList(resourceName: string, token: string, listRequest: ReportQuery): Promise<Array<NodeJS.Dict<string>>> {
    return this.reportingClient.getList(resourceName, token, listRequest)
  }

  async getListWithWarnings(resourceName: string, token: string, listRequest: ReportQuery): Promise<ListWithWarnings> {
    return this.reportingClient.getListWithWarnings(resourceName, token, listRequest)
  }

  async getDefinitions(
    token: string,
    dataProductDefinitionsPath?: string,
  ): Promise<Array<components['schemas']['ReportDefinitionSummary']>> {
    return this.reportingClient.getDefinitions(token, dataProductDefinitionsPath)
  }

  async getDefinition(
    token: string,
    reportId: string,
    variantId: string,
    dataProductDefinitionsPath?: string,
  ): Promise<components['schemas']['SingleVariantReportDefinition']> {
    return this.reportingClient.getDefinition(token, reportId, variantId, dataProductDefinitionsPath)
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

  async getAsyncReport(
    token: string,
    reportId: string,
    variantId: string,
    tableId: string,
    query: Dict<string | number>,
  ): Promise<Array<Dict<string>>> {
    return this.reportingClient.getAsyncReport(token, reportId, variantId, tableId, query)
  }

  async getAsyncSummaryReport(
    token: string,
    reportId: string,
    variantId: string,
    tableId: string,
    summaryId: string,
    query: Dict<string | number>,
  ): Promise<Array<Dict<string>>> {
    return this.reportingClient.getAsyncSummaryReport(token, reportId, variantId, tableId, summaryId, query)
  }

  async getAsyncReportStatus(
    token: string,
    reportId: string,
    variantId: string,
    executionId: string,
    dataProductDefinitionsPath: string,
  ): Promise<Dict<string>> {
    return this.reportingClient.getAsyncReportStatus(
      token,
      reportId,
      variantId,
      executionId,
      dataProductDefinitionsPath,
    )
  }

  async getAsyncCount(token: string, tableId: string, dataProductDefinitionsPath?: string): Promise<number> {
    return this.reportingClient.getAsyncCount(token, tableId, dataProductDefinitionsPath)
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
}
