import { Response, Request, NextFunction } from 'express'
import { Services } from './Services'
import { components } from './api'
import { DashboardMetricDefinition } from './Dashboards'
import { ReportType } from './UserReports'

export interface AsyncReportUtilsParams {
  req?: Request
  res: Response
  next?: NextFunction
  services: Services
}

export interface EmbeddedReportUtilsParams {
  req?: Request
  res: Response
  next?: NextFunction
  services: Services
}

export interface ExecutionData {
  executionId: string
  tableId: string
}

export interface RequestDataResult {
  fields?: components['schemas']['FieldDefinition'][]
  interactive?: boolean
  reportData: {
    interactiveFilters?: components['schemas']['FilterDefinition'][]
    reportName: string
    name: string
    description: string
    reportId: string
    id: string
    definitionPath: string
    csrfToken: string
    template?: string
    metrics?: DashboardMetricDefinition[]
    type: ReportType
    defaultInteractiveQueryString?: string
  }
}
