import { FormattedUserReportData } from '../types/UserReports'
import { createSummaryHtml } from './reportSummaryHelper'

export const getTotals = (formattedData: FormattedUserReportData[], maxRows: number) => {
  return {
    amount: formattedData.length,
    shown: formattedData.length > maxRows ? maxRows : formattedData.length,
    max: maxRows,
  }
}

export const getMeta = (formattedData: FormattedUserReportData[]) => {
  return formattedData.map((d) => {
    return {
      reportId: d.meta.reportId,
      id: d.meta.id,
      executionId: d.meta.executionId,
      status: d.meta.status,
      requestedAt: d.meta.requestedAt,
      type: d.meta.type,
      dataProductDefinitionsPath: d.meta.dataProductDefinitionsPath,
    }
  })
}

export const createShowMoreHtml = (text: string, length?: number) => {
  const sanitizedString = text ? text.replace(/"/g, "'") : ''
  const stringLength = length || 200

  return `<div class="dpr-show-more" data-content="${sanitizedString}" data-dpr-module="show-more" data-length="${stringLength}">
    <p class="govuk-body-s govuk-!-margin-bottom-0">
      <div class='dpr-show-more-content'>${sanitizedString}</div><a class="dpr-show-hide-button govuk-link--no-visited-state" href="#">show more</a>
    </p>
  </div>`
}

export const createTag = (text: string, classes?: string) => {
  return `<p class="govuk-body dpr-tag ${classes}">
    ${text}
  </p>`
}

export const formatTable = (data: FormattedUserReportData[], type: 'requested' | 'viewed') => {
  const rows = data.map((card: FormattedUserReportData) => {
    return formatTableRow(card, type)
  })

  return {
    rows,
    head: [
      { text: 'Product', classes: 'dpr-req-product-head' },
      { text: 'Name', classes: 'dpr-req-name-head' },
      { text: 'Description', classes: 'dpr-req-description-head' },
      { text: 'Type', classes: 'dpr-req-type-head' },
      { text: 'Date', classes: 'dpr-req-ts-head' },
      { text: 'Status', classes: 'dpr-req-status-head' },
    ],
  }
}

const itemActionsHtml = (retryHref: string, executionId: string, type: 'requested' | 'viewed') => {
  const text = type === 'requested' ? 'Retry' : 'Refresh'
  return `<div class="dpr-icon-wrapper__item-actions">
      <a class='dpr-user-list-action govuk-link--no-visited-state' href="${retryHref}">${text}</a>
      <a class="dpr-user-list-action govuk-link--no-visited-state dpr-remove-${type}-report-button"" href="#" data-execution-id='${executionId}'>Remove</a>
    </div>`
}

export const formatTableRow = (data: FormattedUserReportData, type: 'requested' | 'viewed') => {
  let statusClass
  let itemActions = ''

  const { href, id, reportName, text, timestamp, type: reportType, status } = data
  switch (status) {
    case 'FAILED':
      statusClass = 'govuk-tag--red'
      itemActions = itemActionsHtml(href, id, type)
      break
    case 'EXPIRED':
      statusClass = 'govuk-tag--grey'
      itemActions = itemActionsHtml(href, id, type)
      break
    case 'ABORTED':
      statusClass = 'govuk-tag--orange'
      itemActions = itemActionsHtml(href, id, type)
      break
    case 'READY':
    case 'FINISHED':
      statusClass = 'govuk-tag--green'
      break
    default:
      break
  }

  let filtersSummary = ''
  if (data.summary) {
    filtersSummary = createSummaryHtml(data)
  }
  const description = `${data.description}${filtersSummary}`

  return [
    { html: `<p class="govuk-body-s govuk-!-margin-bottom-0">${reportName}</p>`, classes: 'dpr-req-cell' },
    {
      html: `<a href='${href}'><p class="govuk-body-s govuk-!-margin-bottom-0">${text}</p></a>`,
      classes: 'dpr-req-cell',
    },
    { html: createShowMoreHtml(description, 50), classes: 'dpr-req-cell' },
    {
      html: createTag(reportType),
      classes: 'dpr-req-cell dpr-req-cell__type',
    },
    {
      html: `<p class="govuk-body-s govuk-!-margin-bottom-0">${timestamp}</p>`,
      classes: 'dpr-req-cell',
    },
    {
      html: `<strong class="govuk-tag dpr-request-status-tag ${statusClass}">${status}</strong> ${itemActions}`,
      classes: 'dpr-req-cell dpr-req-cell__status',
    },
  ]
}
