export type PageElement = Cypress.Chainable<JQuery>

export default class ReportPage {
  showFilterButton = (): PageElement => cy.get(`.filter-summary-show-filter-button`)

  resetFilterButton = (): PageElement => cy.get(`.moj-button-menu__wrapper .govuk-button--secondary`).first()

  pagingLink = (): PageElement => cy.get('.govuk-pagination__link').first()

  pageSizeSelector = (): PageElement => cy.get('#pageSize')

  filterPanel = (): PageElement => cy.get('.moj-filter')

  filter = (id): PageElement => cy.get(`#filters\\.${id}`)

  visibleAutocompleteOptions = (id): PageElement =>
    this.filter(id).parentsUntil('.autocomplete-text-input').parent().find('li:visible')

  dataTable = (): PageElement => cy.get('table')

  applyFiltersButton = (): PageElement => cy.get(`[data-apply-form-to-querystring='true']`)

  selectedFilterButton = (): PageElement => cy.get('.filter-summary-remove-button')

  unsortedSortColumnLink = (): PageElement => this.dataTable().find(`a[aria-sort='none']`).first()

  currentSortColumnLink = (): PageElement => this.dataTable().find(`a[aria-sort!='none']`).first()
}
