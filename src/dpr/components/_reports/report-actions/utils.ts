import { RequestedReport } from '../../../types/UserReports'
import { components } from '../../../types/api'
import {
  ActionTemplate,
  CopyActionParams,
  DownloadActionParams,
  GetActionsParams,
  PrintActionParams,
  RefreshActionParams,
  ReportAction,
  ShareActionParams,
} from './types'
import { actionTemplates } from './actionsTemplate'

const initReportActions = ({
  reportName,
  name,
  printable,
  url,
  executionId = null,
  downloadable = true,
}: {
  reportName: string
  name: string
  printable: boolean
  url: string
  executionId?: string
  downloadable?: boolean
}): ReportAction[] => {
  const actions: ReportAction[] = []

  // Refresh
  if (executionId) {
    actions.push({
      ...actionTemplates.refresh,
      href: url,
    })
  }

  // Print
  actions.push({
    ...actionTemplates.printable,
    disabled: !printable,
    href: '#',
    ariaLabelText: !printable
      ? `${actionTemplates.printable.ariaLabelText}, disabled`
      : actionTemplates.printable.ariaLabelText,
  })

  // Share
  actions.push({
    ...actionTemplates.sharable,
    href: `mailto:?subject=${reportName}-${name}&body=${encodeURIComponent(url)}`,
  })

  // Copy
  actions.push({
    ...actionTemplates.copy,
    href: url,
  })

  // Downloadable
  actions.push({
    ...actionTemplates.downloadable,
    disabled: !downloadable,
    ariaLabelText: !downloadable
      ? `${actionTemplates.downloadable.ariaLabelText}, disabled`
      : actionTemplates.downloadable.ariaLabelText,
  })

  return actions
}

const getActions = ({ refresh, print, share, copy, download }: GetActionsParams): ReportAction[] => {
  const actions: ReportAction[] = []

  if (refresh && refresh.url && refresh.executionId) {
    actions.push(setRefreshAction(actionTemplates.refresh, refresh))
  }

  if (print) {
    actions.push(setPrintAction(actionTemplates.printable, print))
  }

  if (share) {
    actions.push(setShareAction(actionTemplates.sharable, share))
  }

  if (copy) {
    actions.push(setCopyAction(actionTemplates.copy, copy))
  }

  if (download) {
    actions.push(setDownloadAction(actionTemplates.downloadable, download))
  }

  return actions
}

const setRefreshAction = (template: ActionTemplate, data: RefreshActionParams) => {
  const { url: href } = data

  return {
    ...template,
    href,
  }
}

const setShareAction = (template: ActionTemplate, data: ShareActionParams) => {
  const { reportName, name, url } = data
  const href = `mailto:?subject=${reportName}-${name}&body=${encodeURIComponent(url)}`

  return {
    ...template,
    href,
  }
}

const setCopyAction = (template: ActionTemplate, data: CopyActionParams) => {
  const { url: href } = data

  return {
    ...template,
    href,
  }
}

const setDownloadAction = (template: ActionTemplate, data: DownloadActionParams) => {
  const { canDownload, enabled } = data
  const { tooltipText, ariaLabelText } = template

  return {
    ...template,
    tooltipText: canDownload ? tooltipText : 'Enable download',
    disabled: !enabled,
    attributes: {
      ...data,
    },
    ariaLabelText: !enabled ? `${ariaLabelText}, disabled` : ariaLabelText,
  }
}

const setPrintAction = (template: ActionTemplate, data: PrintActionParams) => {
  const { enabled } = data
  const { ariaLabelText } = template

  return {
    ...template,
    disabled: !enabled,
    href: '#',
    ariaLabelText: !enabled ? `${ariaLabelText}, disabled` : ariaLabelText,
  }
}

export default {
  initAsyncReportActions: (variant: components['schemas']['VariantDefinition'], reportData: RequestedReport) => {
    return initReportActions({
      reportName: reportData.reportName,
      name: reportData.name,
      printable: variant.printable,
      url: reportData.url.request.fullUrl,
      executionId: reportData.executionId,
    })
  },

  initReportActions,
  getActions,
}
