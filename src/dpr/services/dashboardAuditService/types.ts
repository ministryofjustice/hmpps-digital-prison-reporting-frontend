import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { components } from '../../types/api'
import { DashboardDataResponse } from 'src/dpr/types/Metrics'

export interface AuditContext {
  definition: components['schemas']['DashboardDefinition']
  visuals: VisualAuditContext[]
}

export interface VisualAuditContext {
  id: string
  name: string
  type: DashboardVisualisationType
  definition: components['schemas']['DashboardVisualisationDefinition']
  dataset: DashboardDataResponse[]
  rowCount: number
  columnCount: number
}

export interface AuditSuggestion {
  code: string
  severity: DashboardAuditSeverity
  title: string
  description: string
  visualId?: string
}

export enum DashboardAuditSeverity {
  INFO = 'info',
  SUGGESTION = 'suggestion',
  WARNING = 'warning',
  ERROR = 'error',
}

export interface GroupedAuditSuggestions {
  errors: AuditSuggestion[]
  warnings: AuditSuggestion[]
  suggestions: AuditSuggestion[]
  info: AuditSuggestion[]
  errorCount: number
  warningCount: number
  suggestionCount: number
  infoCount: number
  totalCount: number
}
