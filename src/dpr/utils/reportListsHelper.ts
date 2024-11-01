import { ReportType, RequestStatus } from '../types/UserReports'

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
  return type === ReportType.DASHBOARD ? 'govuk-tag--purple' : ''
}

export const createListItemProduct = (productName: string, reportName: string, type: ReportType, ts?: string) => {
  const tsClass = !ts ? 'dpr-display-none' : ''
  const tagColor = getTypeTagColor(type)
  return `<div>
  <p class="govuk-body-s govuk-!-margin-bottom-1">${productName}</p>
  <p class="govuk-body govuk-!-margin-bottom-2"><strong>${reportName}</strong></p>
  <strong class="govuk-tag ${tagColor} dpr-request-status-tag dpr-request-status-tag--small govuk-!-margin-bottom-4'">${type}</strong>
  <p class="govuk-body-xs govuk-!-margin-bottom-0 govuk-!-margin-top-2 ${tsClass}">${ts}</p>
</div>`
}

export const createListItemProductMin = (reportName: string, type: ReportType) => {
  const tagColor = getTypeTagColor(type)
  return `<div>
  <p class="govuk-body-s govuk-!-margin-bottom-2"><strong>${reportName}</strong></p>
  <strong class="govuk-tag ${tagColor} dpr-request-status-tag dpr-request-status-tag--small">${type}</strong>
</div>`
}