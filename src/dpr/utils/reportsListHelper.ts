import { CardData } from '../components/table-card-group/types'
import { createDetailsHtml, createSummaryHtml } from './reportSummaryHelper'
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

export const createShowMoreHtml = (text: string) => {
  const sanitizedString = text.replace(/"/g, "'")

  return `<div class="dpr-show-more" data-content="${sanitizedString}" data-dpr-module="show-more">
    <p><span class='dpr-show-more-content'>${sanitizedString}</span><a class="dpr-show-hide-button" href="#">Show more</a></p>
  </div>`
}

export const formatTable = (cardData: CardData[], type: 'requested' | 'viewed') => {
  const rows = cardData.map((card: CardData) => {
    return formatTableData(card, type)
  })

  return {
    rows,
    head: [
      { text: 'Name' },
      { text: 'Description' },
      { text: 'Applied Filters', classes: `dpr-req-filters-summary` },
      { text: 'Timestamp' },
      { text: 'Status' },
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

  return [
    { html: `<a href='${card.href}'>${card.text}</a>` },
    { html: createDetailsHtml('Description', card.description) },
    { html: createDetailsHtml('Applied Filters', createSummaryHtml(card)) },
    { text: card.timestamp },
    {
      html: `<strong class="govuk-tag dpr-request-status-tag ${statusClass}">${card.status}</strong>${itemActions}`,
    },
  ]
}

export const formatCards = async (
  reports: AsyncReportData[] | RecentlyViewedReportData[],
  filterFunction: (report: AsyncReportData | RecentlyViewedReportData) => boolean,
  formatFuntion: (reportData: RecentlyViewedReportData | AsyncReportData) => CardData,
): Promise<CardData[]> => {
  return reports.filter(filterFunction).map((report: AsyncReportData | RecentlyViewedReportData) => {
    return formatFuntion(report)
  })
}
