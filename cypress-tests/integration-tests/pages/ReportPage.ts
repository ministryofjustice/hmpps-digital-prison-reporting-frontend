export type PageElement = Cypress.Chainable<JQuery>

export default class ReportPage {
  showFilterButton = (): PageElement => cy.get(`#Filters-accordion-button`)

  showColumnsButton = (): PageElement => cy.get(`.columns-section-button .govuk-details__summary`)

  resetFilterButton = (): PageElement => cy.get(`.filter-actions-buttons .govuk-button.govuk-button--secondary`).first()

  resetColumnsButton = (): PageElement => cy.get(`.dpr-reset-columns-button`)

  pagingLink = (): PageElement => cy.get('.govuk-pagination__link').first()

  pageSizeSelector = (): PageElement => cy.get('#page-size-select')

  filter = (id): PageElement => cy.get(`#filters\\.${id}`)

  dateStartLabel = (): PageElement => cy.xpath('//*[@id="dpr-date-range"]/div[1]/div/div/label')

  dateEndLabel = (): PageElement => cy.xpath('//*[@id="dpr-date-range"]/div[2]/div/div/div/label')

  filterOption = (id, index = 1): PageElement => cy.get(`#filters\\.${id}-${index}`)

  dateStartFilter = (): PageElement => cy.get(`#filters\\.field3\\.start`)

  dateEndFilter = (): PageElement => cy.get(`#filters\\.field3\\.end`)

  columnCheckBox = (): PageElement => cy.get(`.dpr-columns-form input`).first()

  selectedColumnCheckBoxes = (): PageElement => cy.get(`.dpr-columns-form input:checked`)

  columnCheckBoxDisabled = (): PageElement => cy.get(`.dpr-columns-form input`).eq(1)

  visibleAutocompleteOptions = (id): PageElement =>
    this.filter(id).parentsUntil('.dpr-autocomplete-text-input').parent().find('li:visible')

  dataTable = (): PageElement => cy.xpath('//*[@id="dpr-data-table"]')

  applyFiltersButton = (): PageElement => cy.get(`[data-apply-form-to-querystring='true']`)

  applyColumnsButton = (): PageElement => cy.get(`.dpr-apply-columns-button`)

  selectedFilterButton = (): PageElement => cy.get(`.selected-accordion-button .accordion-summary-remove-button`)

  unsortedSortColumnLink = (): PageElement => this.dataTable().find(`.data-table-header-button-sort-none`).first()

  currentAscendingSortColumnLink = (): PageElement =>
    this.dataTable().find(`.data-table-header-button-sort-ascending`).first()

  currentDescendingSortColumnLink = (): PageElement =>
    this.dataTable().find(`.data-table-header-button-sort-descending`).first()

  actionsButtonMenu = (): PageElement => cy.get('.icon-button-list')

  printButton = (): PageElement => cy.get('#dpr-button-printable')

  emailButton = (): PageElement => cy.get('#dpr-button-sharable')

  copyUrlButton = (): PageElement => cy.get('#dpr-button-copy')

  filterForm = (): PageElement => cy.get('#user-selected-filters-form')
}
