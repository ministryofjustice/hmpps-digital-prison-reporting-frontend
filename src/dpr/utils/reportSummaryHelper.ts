import { CardData } from '../components/table-card-group/types'
import { AsyncReportData, AsyncReportUrlItemData } from '../types/AsyncReport'

export const createDetailsHtml = (title: string, content: string) => {
  return `<details class="govuk-details">
  <summary class="govuk-details__summary">
    <span class="govuk-details__summary-text">
      ${title}
    </span>
  </summary>
  <div class="govuk-details__text">
    ${content}
  </div>
</details>`
}

export const createSummaryHtml = (card: CardData) => {
  const summaryHtml = card.summary.map((item) => `<li class="govuk-body-s">${item.name}: ${item.value}</li>`).join('')
  return `<ul class="dpr-card-group__item__filters-list">${summaryHtml}</ul>`
}

export const getDuplicateRequestIds = (newReportSearchParams: string, existingReports: AsyncReportData[]) => {
  const duplicates: string[] = []
  const newQueryParams = new URLSearchParams(newReportSearchParams)

  existingReports.forEach((existingReportData: AsyncReportData) => {
    const matches: boolean[] = []
    const existingQueryParams = new URLSearchParams(existingReportData.url.request.search)

    if (existingQueryParams.entries.length === newQueryParams.entries.length) {
      newQueryParams.forEach((newValue, newKey) => {
        const match = existingQueryParams.has(newKey, newValue)
        matches.push(match)
      })
    }
    if (matches.every(Boolean)) {
      duplicates.push(existingReportData.executionId)
    }
  })

  return duplicates
}
