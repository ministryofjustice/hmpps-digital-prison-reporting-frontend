import { CardData } from '../components/table-card-group/types'
import { createSummaryHtml } from './reportSummaryHelper'
import { AsyncReportData } from '../types/AsyncReport'
import { RecentlyViewedReportData } from '../types/RecentlyViewed'

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
  const displayString = sanitizedString.length < stringLength ? sanitizedString : ''
  return `<div class="dpr-show-more" data-content="${sanitizedString}" data-dpr-module="show-more" data-length="${stringLength}">
    <p class="govuk-body-s govuk-!-margin-bottom-0"><span class='dpr-show-more-content'>${displayString}</span><a class="dpr-show-hide-button" href="#">show more</a></p>
  </div>`
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
      { text: 'Timestamp', classes: 'dpr-req-ts-head' },
      { text: 'Status', classes: 'dpr-req-status-head' },
    ],
  }
}

const itemActionsHtml = (retryHref: string, executionId: string, type: 'requested' | 'viewed') => {
  const tooltip = type === 'requested' ? 'Retry report' : 'Refresh report'
  return `<div class="dpr-icon-wrapper__item-actions">
      <div class="dpr-icon-wrapper dpr-icon-wrapper--l dpr-icon-live" tooltip="${tooltip}">
        <a href="${retryHref}"><span class='dpr-visually-hidden'>${tooltip}</span><i class="dpr-icon refresh-icon"></i></a>
      </div><div class="dpr-icon-wrapper dpr-icon-wrapper--l dpr-icon-live dpr-remove-${type}-report-button" tooltip="Remove from list" data-execution-id='${executionId}'>
        <a href="#"><span class='dpr-visually-hidden'>Remove Report from list</span><i class="dpr-icon close-icon"></i>
      </div></div>`
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
      statusClass = 'govuk-tag--yellow'
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
      html: `${itemActions}<strong class="govuk-tag dpr-request-status-tag ${statusClass}">${card.status}</strong>`,
      classes: 'dpr-req-cell dpr-req-cell__status',
    },
  ]
}

export const formatCards = async (
  reports: AsyncReportData[] | RecentlyViewedReportData[],
  filterFunction: (report: AsyncReportData | RecentlyViewedReportData) => boolean,
  formatFunction: (reportData: RecentlyViewedReportData | AsyncReportData) => CardData,
): Promise<CardData[]> => {
  return reports.filter(filterFunction).map((report: AsyncReportData | RecentlyViewedReportData) => {
    return formatFunction(report)
  })
}
