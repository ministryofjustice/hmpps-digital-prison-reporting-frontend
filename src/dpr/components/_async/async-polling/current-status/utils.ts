import { Response } from 'express'
import { RequestStatus, RequestedReport } from 'src/dpr/types/UserReports'
import { getValues } from 'src/dpr/utils/localsHelper'

export const buildCurrentStatusView = (data: RequestedReport, status: RequestStatus, res: Response) => {
  const { csrfToken } = getValues(res)
  const metaDetails = setMetaDetails(data)
  const requestDetails = setRequestDetails(data)
  const statusDetails = setStatusDetails(status, data)

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
    path: '', // ???
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

const setStatusDetails = (status: string, data: RequestedReport) => {
  const { url } = data
  const reportUrl = url?.report?.fullUrl
  const requestUrl = url?.request?.fullUrl

  let descriptionText = ''
  let buttonText = ''
  let buttonHref = ''
  let errorMessage

  switch (status) {
    case RequestStatus.ABORTED:
      descriptionText = ''
      buttonText = ''
      buttonHref = ''
      break
    case RequestStatus.FAILED:
      descriptionText = ''
      buttonText = ''
      buttonHref = ''
      errorMessage = setErrorMessage(data)
      break
    case RequestStatus.EXPIRED:
      descriptionText = ''
      buttonText = ''
      buttonHref = ''
      break

    case RequestStatus.STARTED:
    case RequestStatus.SUBMITTED:
    case RequestStatus.PICKED:
      descriptionText = ''
      buttonText = ''
      buttonHref = ''
      break

    case RequestStatus.FINISHED:
    case RequestStatus.READY:
      descriptionText = ''
      buttonText = ''
      buttonHref = ''
      break

    default:
      break
  }

  return {
    status,
    descriptionText,
    buttonText,
    buttonHref,
  }
}

const setErrorMessage = (data: RequestedReport) => {
  return data?.errorMessage ? JSON.parse(data?.errorMessage) : undefined
}
