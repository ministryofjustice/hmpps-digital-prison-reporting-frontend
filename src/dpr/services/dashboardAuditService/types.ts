import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { components } from '../../types/api'
import { DashboardDataResponse } from 'src/dpr/types/Metrics'

export interface AuditContext {
  definition: components['schemas']['DashboardDefinition']
  sections: SectionAuditContext[]
  visuals: VisualAuditContext[]
}

export interface VisualAuditContext {
  auditKey: string
  id: string
  name: string
  type: DashboardVisualisationType
  definition: components['schemas']['DashboardVisualisationDefinition']
  dataset: DashboardDataResponse[]
  rowCount: number
  columnCount: number
}

export interface SectionAuditContext {
  auditKey: string
  id: string
  name: string
  definition: components['schemas']['DashboardSectionDefinition']
}

export interface AuditSuggestion {
  code: string
  severity: DashboardAuditSeverity
  title: string
  description: string
}

export interface VisualAuditSuggestion extends AuditSuggestion {
  visualAuditKey: string
  visualId: string
  visualTitle: string
}

export interface SectionAuditSuggestion extends AuditSuggestion {
  sectionId: string
  sectionTitle: string
  sectionAuditKey: string
}

export enum DashboardAuditSeverity {
  INFO = 'info',
  SUGGESTION = 'suggestion',
  WARNING = 'warning',
  ERROR = 'error',
}

export interface GroupedAuditSuggestions {
  errors: Array<AuditSuggestion | VisualAuditSuggestion | SectionAuditSuggestion>
  warnings: Array<AuditSuggestion | VisualAuditSuggestion | SectionAuditSuggestion>
  suggestions: Array<AuditSuggestion | VisualAuditSuggestion | SectionAuditSuggestion>
  info: Array<AuditSuggestion | VisualAuditSuggestion | SectionAuditSuggestion>

  byVisualKey: Record<string, AuditGroup>
  bySectionKey: Record<string, AuditGroup>

  errorCount: number
  warningCount: number
  suggestionCount: number
  infoCount: number

  totalCount: number
}

export interface AuditGroup {
  id: string
  name: string
  auditKey: string

  errors: VisualAuditSuggestion[] | SectionAuditSuggestion[]
  warnings: VisualAuditSuggestion[] | SectionAuditSuggestion[]
  suggestions: VisualAuditSuggestion[] | SectionAuditSuggestion[]
  info: VisualAuditSuggestion[] | SectionAuditSuggestion[]

  errorCount: number
  warningCount: number
  suggestionCount: number
  infoCount: number

  totalCount: number
}
