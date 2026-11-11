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
}

export interface VisualAuditSuggestion extends AuditSuggestion {
  visualId: string
  visualTitle: string
}

export enum DashboardAuditSeverity {
  INFO = 'info',
  SUGGESTION = 'suggestion',
  WARNING = 'warning',
  ERROR = 'error',
}

export interface GroupedAuditSuggestions {
  errors: Array<AuditSuggestion | VisualAuditSuggestion>
  warnings: Array<AuditSuggestion | VisualAuditSuggestion>
  suggestions: Array<AuditSuggestion | VisualAuditSuggestion>
  info: Array<AuditSuggestion | VisualAuditSuggestion>

  byVisualId: Record<string, Array<AuditSuggestion | VisualAuditSuggestion>>

  errorCount: number
  warningCount: number
  suggestionCount: number
  infoCount: number

  totalCount: number
}
