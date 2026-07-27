import { Response, Request } from 'express'
import { getValues } from 'src/dpr/utils/localsHelper'
import {
  buildReportPageAction,
  buildRequestAction,
} from 'src/dpr/components/my-reports/my-reports-list-item/my-reports-list-item-actions/utils'
import { RequestStatus, RequestedReport } from '../../../../types/UserReports'

/**
 * Public api for building out the congfig for a current status component
 *
 * @param {RequestedReport} data
 * @param {RequestStatus} status
 * @param {Response} res
 * @return {*}
 */
export const buildCurrentStatusView = (data: RequestedReport, status: RequestStatus, res: Response, req: Request) => {
  const { csrfToken } = getValues(res)
  const metaDetails = setMetaDetails(data)
  const requestDetails = setRequestDetails(data)
  const statusDetails = setStatusDetails(status, data, res, req)

  return {
    csrfToken,
    metaDetails,
    requestDetails,
    statusDetails,
  }
}

const setMetaDetails = (data: RequestedReport) => {
  const { reportId, id, executionId, tableId, type } = data
  return {
    reportId,
    id,
    executionId,
    tableId,
    type,
  }
}

const setRequestDetails = (data: RequestedReport) => {
  const { reportName, name, timestamp, query } = data
  return {
    reportName: reportName || '',
    name: name || '',
    requestedAt: timestamp.requested,
    ...(query && { querySummary: query?.summary }),
  }
}

const setStatusDetails = (status: string, data: RequestedReport, res: Response, req: Request) => {
  const { type } = data

  const reportPageAction = buildReportPageAction(res, req, data)
  const requestPageAction = buildRequestAction(res, req, data)

  let descriptionText: string | undefined
  let altText: string[] | undefined
  let buttonText: string | undefined
  let buttonHref: string | undefined
  let errorMessage

  switch (status) {
    case RequestStatus.ABORTED:
      descriptionText = 'Your request has been cancelled'
      buttonText = 'Return to request page'
      buttonHref = requestPageAction?.href ?? '/'
      break

    case RequestStatus.FAILED:
      buttonText = 'Retry'
      descriptionText = 'Your report is no longer available and needs to be refreshed'
      buttonHref = requestPageAction?.href ?? '/'
      errorMessage = setErrorMessage(data)
      break

    case RequestStatus.EXPIRED:
      descriptionText = 'Your report is no longer available and needs to be refreshed'
      buttonText = 'Refresh report'
      buttonHref = requestPageAction?.href ?? '/'
      break

    case RequestStatus.STARTED:
    case RequestStatus.SUBMITTED:
    case RequestStatus.PICKED:
      descriptionText = `We are generating your ${type}.`
      altText = [
        `Your ${type} will be generated shortly.`,
        `You may navigate away from this page at anytime. Please visit the homepage to monitor your report status.`,
      ]
      break

    case RequestStatus.FINISHED:
    case RequestStatus.READY:
      descriptionText = `Your ${type} has been generated`
      altText = [
        `Please wait, you are being redirected...`,
        `If you are not redirected within 10 seconds, please copy and paste this url into your browser and press enter:`,
        `${reportPageAction.href}`,
      ]
      buttonHref = reportPageAction.href
      break

    default:
      break
  }

  return {
    status,
    descriptionText,
    altText,
    buttonText,
    buttonHref,
    errorMessage,
  }
}

const setErrorMessage = (data: RequestedReport) => {
  return data?.errorMessage ? JSON.parse(data?.errorMessage) : undefined
}
