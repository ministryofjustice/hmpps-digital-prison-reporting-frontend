export type PageElement = Cypress.Chainable<JQuery>

export default class ReportPage {
  showFilterButton = (): PageElement => cy.get(`#Filters-accordion-button`)

  showColumnsButton = (): PageElement => cy.get(`#Columns-accordion-button`)

  resetFilterButton = (): PageElement => cy.get(`.filter-actions-buttons .govuk-button.govuk-button--secondary`).first()

  resetColumnsButton = (): PageElement => cy.get(`[data-reset-columns='true']`)

  pagingLink = (): PageElement => cy.get('.govuk-pagination__link').first()

  pageSizeSelector = (): PageElement => cy.get('#pageSize')

  filter = (id): PageElement => cy.get(`#filters\\.${id}`)

  dateStartFilter = (): PageElement => cy.get(`#filters\\.field3\\.start`)

  dateEndFilter = (): PageElement => cy.get(`#filters\\.field3\\.end`)

  columnCheckBox = (): PageElement => cy.get(`.data-table-columns input`).first()

  columnCheckBoxDisabled = (): PageElement => cy.get(`.data-table-columns input`).eq(1)

  visibleAutocompleteOptions = (id): PageElement =>
    this.filter(id).parentsUntil('.autocomplete-text-input').parent().find('li:visible')

  dataTable = (): PageElement => cy.get('table')

  applyFiltersButton = (): PageElement => cy.get(`[data-apply-form-to-querystring='true']`)

  applyColumnsButton = (): PageElement => cy.get(`[data-apply-columns-to-querystring='true']`)

  selectedFilterButton = (): PageElement => cy.get(`.selected-accordion-button .accordion-summary-remove-button`)

  unsortedSortColumnLink = (): PageElement => this.dataTable().find(`a[aria-sort='none']`).first()

  currentSortColumnLink = (): PageElement => this.dataTable().find(`a[aria-sort!='none']`).first()

  actionsButton = (): PageElement => cy.get('#actions-button')

  actionsButtonMenu = (): PageElement => cy.get('#actions-menu')

  printButton = (): PageElement => cy.get('#print_dd')

  printButtonDisabled = (): PageElement => cy.get('#print_dd_disabled')

  emailButton = (): PageElement => cy.get('#email-button')

  copyUrlButton = (): PageElement => cy.get('#copy-url-button')
}
