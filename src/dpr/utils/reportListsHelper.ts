import { Response } from 'express'
import { LoadType, ReportType, RequestStatus } from '../types/UserReports'
import localsHelper from './localsHelper'

export const itemActionsHtml = (
  retryHref: string,
  executionId: string,
  type: 'requested' | 'viewed',
  status: RequestStatus,
) => {
  const text = status === RequestStatus.EXPIRED ? 'Refresh' : 'Retry'
  return `<div class="dpr-icon-wrapper__item-actions">
      <a class='dpr-user-list-action govuk-link--no-visited-state govuk-!-margin-bottom-1' href="${retryHref}">${text}</a>
      <a class="dpr-user-list-action govuk-link--no-visited-state dpr-remove-${type}-report-button"" href="#" data-execution-id='${executionId}'>Remove</a>
    </div>`
}

const getTypeTagColor = (type: ReportType) => {
  let tagColourClass = ''
  switch (type) {
    case ReportType.DASHBOARD:
      tagColourClass = 'govuk-tag--purple'
      break
    case ReportType.UNAVAILABLE:
      tagColourClass = 'govuk-tag--grey'
      break
    default:
      tagColourClass = ''
      break
  }
  return tagColourClass
}

export const createListItemProduct = (productName: string, reportName: string, type: ReportType, ts?: string) => {
  const tsClass = !ts ? 'dpr-display-none' : ''
  const tagColor = getTypeTagColor(type)
  const reportType = toSentenceCase(type)
  return `<div>
  <p class="govuk-body govuk-!-margin-bottom-1"><strong>${reportName}</strong></p>
  <p class="govuk-body-s govuk-!-margin-bottom-3">${productName}</p>
  <strong class="govuk-tag ${tagColor} dpr-request-status-tag--small govuk-!-margin-bottom-4'">${reportType}</strong>
  <p class="govuk-body-xs govuk-!-margin-bottom-0 govuk-!-margin-top-3 ${tsClass}">${ts}</p>
</div>`
}

export const createListItemProductMin = (reportName: string, type: ReportType) => {
  const tagColor = getTypeTagColor(type)
  const reportType = toSentenceCase(type)
  return `<div>
  <p class="govuk-body-s govuk-!-margin-bottom-2"><strong>${reportName}</strong></p>
  <strong class="govuk-tag ${tagColor} dpr-request-status-tag--small">${reportType}</strong>
</div>`
}

export const createListActions = (
  href: string,
  type: ReportType,
  loadType?: LoadType,
  bookmarkHtml?: string,
  authorised = true,
) => {
  if (!authorised) {
    return `<strong class="govuk-tag govuk-tag--red dpr-request-status-tag dpr-request-status-tag--small dpr-unauthorised-report" aria-label="You are unauthorised to view this report">Unauthorised</strong>`
  }

  let requestAction
  let actionText
  if (type === ReportType.UNAVAILABLE) {
    actionText = `Request missing report`
    requestAction = `<a class='dpr-user-list-action govuk-link--no-visited-state govuk-!-margin-bottom-1 dpr-missing-report' href="${href}">${actionText}</a>`
  } else {
    actionText = `Request ${type}`
    if (loadType && loadType === LoadType.SYNC) {
      actionText = `Load ${type}`
    }
    requestAction = `<a class='dpr-user-list-action govuk-link--no-visited-state govuk-!-margin-bottom-1 dpr-live-report dpr-type__${type}' href="${href}">${actionText}</a>`

    if (bookmarkHtml) {
      requestAction = `${requestAction}${bookmarkHtml}`
    }
  }
  return requestAction
}

export const toSentenceCase = (text: string) => {
  return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
}

export const setInitialHref = (loadType: LoadType, type: ReportType, reportId: string, id: string, res: Response) => {
  let href = ''
  if (type === ReportType.UNAVAILABLE) {
    href = `dpr/request-missing-report/${reportId}/${id}/form`
  } else {
    const { pathSuffix, dpdPathFromQuery } = localsHelper.getValues(res)
    const dpdPathQueryParam = dpdPathFromQuery ? pathSuffix : ''
    href = `dpr/request-report/${type}/${reportId}/${id}/filters${dpdPathQueryParam}`

    if (loadType && loadType === LoadType.SYNC) {
      href = `dpr/view-report/sync/${type}/${reportId}/${id}/load-report${dpdPathQueryParam}`
    }
  }
  return href
}
