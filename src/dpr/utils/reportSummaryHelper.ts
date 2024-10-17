import { CardData } from '../components/table-card-group/types'

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
  return `<ul class="dpr-card-group__item__filters-list govuk-!-margin-top-3">${summaryHtml}</ul>`
}
