import { CardData } from '../components/table-card-group/types'
import { createSummaryHtml } from './reportSummaryHelper'

export const getTotals = (cardData: CardData[], maxRows: number) => {
  return {
    amount: cardData.length,
    shown: cardData.length > maxRows ? maxRows : cardData.length,
    max: maxRows,
  }
}

export const getMeta = (cardData: CardData[]) => {
  return cardData.map((d) => {
    return {
      reportId: d.meta.reportId,
      variantId: d.meta.variantId,
      executionId: d.meta.executionId,
      status: d.meta.status,
      requestedAt: d.meta.requestedAt,
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

export const formatTable = (cardData: CardData[], type: 'requested' | 'viewed') => {
  const rows = cardData.map((card: CardData) => {
    return formatTableData(card, type)
  })

  return {
    rows,
    head: [
      { text: 'Product', classes: 'dpr-req-product-head' },
      { text: 'Name', classes: 'dpr-req-name-head' },
      { text: 'Description', classes: 'dpr-req-description-head' },
      { text: 'Date', classes: 'dpr-req-ts-head' },
      { text: 'Status', classes: 'dpr-req-status-head' },
    ],
  }
}

const itemActionsHtml = (retryHref: string, executionId: string, type: 'requested' | 'viewed') => {
  const text = type === 'requested' ? 'Retry report' : 'Refresh report'
  return `<div class="dpr-icon-wrapper__item-actions">
      <a class='dpr-user-list-action govuk-link--no-visited-state' href="${retryHref}">${text}</a>
      <a class="dpr-user-list-action govuk-link--no-visited-state dpr-remove-${type}-report-button"" href="#" data-execution-id='${executionId}'>Remove report</a>
    </div>`
}

export const formatTableData = (card: CardData, type: 'requested' | 'viewed') => {
  let statusClass
  let itemActions = ''
  switch (card.status) {
    case 'FAILED':
      statusClass = 'govuk-tag--red'
      itemActions = itemActionsHtml(card.href, card.id, type)
      break
    case 'EXPIRED':
      statusClass = 'govuk-tag--grey'
      itemActions = itemActionsHtml(card.href, card.id, type)
      break
    case 'ABORTED':
      statusClass = 'govuk-tag--orange'
      break
    case 'READY':
    case 'FINISHED':
      statusClass = 'govuk-tag--green'
      break
    default:
      break
  }
  const filtersSummary = createSummaryHtml(card)
  const description = `${card.description}${filtersSummary}`

  return [
    { html: `<p class="govuk-body-s govuk-!-margin-bottom-0">${card.reportName}</p>`, classes: 'dpr-req-cell' },
    {
      html: `<a href='${card.href}'><p class="govuk-body-s govuk-!-margin-bottom-0">${card.text}</p></a>`,
      classes: 'dpr-req-cell',
    },
    { html: createShowMoreHtml(description, 50), classes: 'dpr-req-cell' },
    {
      html: `<p class="govuk-body-s govuk-!-margin-bottom-0">${card.timestamp}</p>`,
      classes: 'dpr-req-cell',
    },
    {
      html: `<strong class="govuk-tag dpr-request-status-tag ${statusClass}">${card.status}</strong> ${itemActions}`,
      classes: 'dpr-req-cell dpr-req-cell__status',
    },
  ]
}
