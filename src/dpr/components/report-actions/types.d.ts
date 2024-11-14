import { LoadType } from '../../types/UserReports'

export interface DownloadActionParams {
  enabled: boolean
  csrfToken: string
  reportId: string
  reportName: string
  name: string
  id: string
  tableId?: string
  columns: string[]
  type: ReportType
  definitionPath: string
  canDownload: boolean
  loadType: LoadType
}

export interface ShareActionParams {
  reportName: string
  name: string
  url: string
}

export interface RefreshActionParams {
  url: string
  executionId: string
}

export interface PrintActionParams {
  enabled: boolean
}

export interface CopyActionParams {
  url: string
}

export interface GetActionsParams {
  refresh?: RefreshActionParams
  print?: PrintActionParams
  copy?: CopyActionParams
  share?: ShareActionParams
  download?: DownloadActionParams
}

export interface ActionTemplate {
  id: string
  icon: string
  disabled: boolean
  tooltipText: string
  ariaLabelText: string
}

export interface ActionTemplates {
  refresh: ActionTemplate
  printable: ActionTemplate
  sharable: ActionTemplate
  copy: ActionTemplate
  downloadable: ActionTemplate
}

export interface ReportAction {
  id: string
  icon: string
  disabled: boolean
  tooltipText: string
  ariaLabelText: string
  href?: string
  attributes?: {
    reportId?: string
    id?: string
    csrfToken?: string
    tableId?: string
    type?: ReportType
    reportName?: string
    name?: string
    columns: string[]
    definitionPath: string
  }
}
