import { Response, Request, NextFunction } from 'express'
import { Services } from './Services'
import { components } from './api'
import { ReportType } from './UserReports'
import { ScorecardGroup } from '../components/_dashboards/scorecard/types'
import { MetricDefinition } from './Metrics'

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
    metrics?: MetricDefinition[]
    scorecards?: ScorecardGroup[]
    type: ReportType
    defaultInteractiveQueryString?: string
  }
}
