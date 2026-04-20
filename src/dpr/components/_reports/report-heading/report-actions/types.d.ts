import { LoadType, ReportType } from '../../../../types/UserReports'

export interface DownloadActionParams {
  enabled: boolean
  canDownload: boolean
  csrfToken: string
  formAction: string
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
  disabled: boolean
  text: string
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
  disabled: boolean
  text: string
  ariaLabelText: string
  href?: string
  attributes?: {
    formAction?: string
    csrfToken?: string
  }
}
