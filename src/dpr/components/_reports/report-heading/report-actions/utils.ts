import { Request, Response } from 'express'
import { RequestedReport } from 'src/dpr/types/UserReports'
import { buildRequestAction } from 'src/dpr/components/my-reports/my-reports-list-item/my-reports-list-item-actions/utils'
import { ExtractedDefinitionData } from '../../../../routes/journeys/view-report/async/report/types'
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
import { DownloadFormat } from '../../../../types/Download'

export const getActions = ({ refresh, print, share, copy, download }: GetActionsParams): ReportAction[] => {
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
    actions.push(...setDownloadActions(download))
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

/**
 * Builds the download buttons.
 *
 * Once downloading is permitted the user picks a format, so we render one button per
 * format. Each is a submit button on the shared download form carrying `format`, which is
 * how the server learns which one was pressed.
 *
 * While downloading is still gated behind the feedback request form there is nothing to
 * choose between yet, so a single "Enable download" button is rendered instead.
 */
const setDownloadActions = (data: DownloadActionParams): ReportAction[] => {
  const { canDownload } = data

  if (!canDownload) {
    return [setDownloadAction(actionTemplates.downloadable, data)]
  }

  return [
    setDownloadAction(actionTemplates.downloadableXlsx, data, 'xlsx'),
    setDownloadAction(actionTemplates.downloadableCsv, data, 'csv'),
  ]
}

const setDownloadAction = (
  template: ActionTemplate,
  data: DownloadActionParams,
  format?: DownloadFormat,
): ReportAction => {
  const { canDownload, enabled } = data
  const { text, ariaLabelText } = template

  const ariaLabel = canDownload ? ariaLabelText : 'Enable download'

  return {
    ...template,
    text: canDownload ? text : 'Enable download',
    disabled: !enabled,
    ...(format && { name: 'format', value: format }),
    attributes: {
      ...data,
    },
    ariaLabelText: !enabled ? `${ariaLabel}, disabled` : ariaLabel,
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

const setActions = (
  res: Response,
  req: Request,
  definitionData: ExtractedDefinitionData,
  downloadConfig?: DownloadActionParams,
  requestData?: RequestedReport | undefined,
) => {
  const { reportName, name, printable } = definitionData
  const requestAction = buildRequestAction(res, req, requestData)

  let shareConfig
  let copyConfig
  if (requestAction) {
    shareConfig = {
      reportName,
      name,
      url: requestAction.href,
    }
    copyConfig = {
      url: requestAction.href,
    }
  }

  let refreshConfig
  if (requestData?.executionId && requestAction) {
    refreshConfig = {
      url: requestAction.href,
      executionId: requestData.executionId,
    }
  }

  return getActions({
    ...(downloadConfig && { download: downloadConfig }),
    ...(shareConfig && { share: shareConfig }),
    ...(refreshConfig && { refresh: refreshConfig }),
    ...(copyConfig && { copy: copyConfig }),
    print: { enabled: printable },
  })
}

export default {
  getActions,
  setActions,
}
