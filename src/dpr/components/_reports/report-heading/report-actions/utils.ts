import { Request, Response } from 'express'
import {
  ExtractedDefinitionData,
  ExtractedRequestData,
  ReportUrls,
} from '../../../../routes/journeys/view-report/async/report/types'
import { LoadType } from '../../../../types/UserReports'
import { setUpDownload } from '../../../../routes/journeys/download-report/utils'
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
import { Columns } from '../report-columns/report-columns-form/types'

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
  const { text, ariaLabelText } = template

  const ariaLabel = canDownload ? ariaLabelText : 'Enable download'

  return {
    ...template,
    text: canDownload ? text : 'Enable download',
    disabled: !enabled,
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
  definitionData: ExtractedDefinitionData,
  downloadConfig: DownloadActionParams,
  requestData?: ExtractedRequestData,
) => {
  const { reportName, name, printable } = definitionData
  let shareConfig
  let copyConfig
  if (requestData?.requestUrl?.fullUrl) {
    shareConfig = {
      reportName,
      name,
      url: requestData.requestUrl.fullUrl,
    }
    copyConfig = {
      url: requestData.requestUrl.fullUrl,
    }
  }

  let refreshConfig
  if (requestData?.executionId && requestData?.requestUrl?.fullUrl) {
    refreshConfig = {
      url: requestData.requestUrl.fullUrl,
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
