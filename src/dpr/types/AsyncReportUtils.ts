import { Response, Request, NextFunction } from 'express'
import { Services } from './Services'
import { components } from './api'
import { ReportType } from './UserReports'
import { DashboardSection } from '../components/_dashboards/dashboard/types'
import { RenderFiltersReturnValue } from '../components/_async/async-filters-form/types'

export interface AsyncReportUtilsParams {
  req?: Request
  res?: Response
  next?: NextFunction
  services: Services
}

export interface EmbeddedReportUtilsParams {
  req?: Request
  res: Response
  next?: NextFunction
  services: Services
}

export interface RequestReportData {
  interactiveFilters?: components['schemas']['FilterDefinition'][]
  reportName: string
  name: string
  description: string
  reportId: string
  id: string
  definitionPath: string
  csrfToken: string
  template?: string
  sections: DashboardSection[]
  type: ReportType
  defaultInteractiveQueryString?: string
  hasDefaults: boolean
  defaultsSaved?: string
}

export interface RequestDataResult {
  title: string
  filtersDescription: string
  filtersData: RenderFiltersReturnValue
  reportData: RequestReportData
}
