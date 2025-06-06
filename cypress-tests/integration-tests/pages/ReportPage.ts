export type PageElement = Cypress.Chainable<JQuery>

export default class ReportPage {
  showFilterButton = (): PageElement => cy.xpath(`//*[@id="dpr-interactive-filters-details"]/summary`)

  filterButtonPanel = (): PageElement => cy.xpath(`//*[@id="dpr-interactive-filters-details"]`)

  showColumnsButton = (): PageElement =>
    cy.xpath(`//*[@id="main-content"]/div/div/div[1]/div/div[4]/div[1]/div[2]/div/details/summary`)

  resetFilterButton = (): PageElement => cy.xpath(`//*[@id="interactive-reset-filters-button"]`)

  resetColumnsButton = (): PageElement =>
    cy.xpath(`//*[@id="main-content"]/div/div/div[1]/div/div[4]/div[1]/div[2]/div/details/div/form/div[2]/a`)

  pagingLink = (): PageElement => cy.get('.govuk-pagination__link').first()

  pageSizeSelector = (): PageElement => cy.get('#page-size-select')

  filter = (id): PageElement => cy.xpath(`//*[@id="${id}"]`)

  dateStartLabel = (): PageElement => cy.xpath('//*[@id="dpr-date-range"]/div/div[1]/div/div/div/label')

  dateEndLabel = (): PageElement => cy.xpath('//*[@id="dpr-date-range"]/div/div[2]/div/div/div/label')

  filterOption = (id, index = 1): PageElement => cy.get(`#filters\\.${id}-${index}`)

  dateStartFilterLabel = (): PageElement => cy.xpath(`//*[@id="dpr-date-range"]/div/div[1]/div/div/div/label`)

  dateStartFilter = (): PageElement => cy.xpath(`//*[@id="filters.field3.start"]`)

  dateEndFilterLabel = (): PageElement => cy.xpath(`//*[@id="dpr-date-range"]/div/div[2]/div/div/div/label`)

  dateEndFilter = (): PageElement => cy.xpath(`//*[@id="filters.field3.end"]`)

  columnCheckBox = (): PageElement => cy.get(`.dpr-columns-form input`).first()

  selectedColumnCheckBoxes = (): PageElement => cy.get(`.dpr-columns-form input:checked`)

  columnCheckBoxDisabled = (): PageElement => cy.get(`.dpr-columns-form input`).eq(1)

  visibleAutocompleteOptions = (id): PageElement =>
    this.filter(id).parentsUntil('.dpr-autocomplete-text-input').parent().find('li:visible')

  dataTable = (): PageElement => cy.xpath('//*[@id="dpr-data-table"]')

  applyFiltersButton = (): PageElement => cy.xpath(`//*[@id="interactive-apply-filters-button"]`)

  applyColumnsButton = (): PageElement =>
    cy.xpath(`//*[@id="main-content"]/div/div/div[1]/div/div[4]/div[1]/div[2]/div/details/div/form/div[2]/button`)

  selectedFilterButton = (): PageElement => cy.get(`a.govuk-link.govuk-body.interactive-remove-filter-button`)

  selectedFilterButtonField1 = (): PageElement =>
    cy.xpath(`//*[@id="main-content"]/div/div/div[1]/div/div[4]/div[2]/div[1]/div/a[1]`)

  selectedFilterButtonField3 = (): PageElement =>
    cy.xpath(`//*[@id="main-content"]/div/div/div[1]/div/div[4]/div[2]/div[1]/div/a[2]`)

  selectedFilterButtonField7 = (): PageElement =>
    cy.xpath(`//*[@id="main-content"]/div/div/div[1]/div/div[4]/div[2]/div[1]/div/a[3]`)

  unsortedSortColumnLink = (): PageElement => this.dataTable().find(`.data-table-header-button-sort-none`).first()

  currentAscendingSortColumnLink = (): PageElement =>
    this.dataTable().find(`.data-table-header-button-sort-ascending`).first()

  currentDescendingSortColumnLink = (): PageElement =>
    this.dataTable().find(`.data-table-header-button-sort-descending`).first()

  actionsButtonMenu = (): PageElement => cy.get('.report-actions')

  printButton = (): PageElement => cy.get('#dpr-button-printable')

  emailButton = (): PageElement => cy.get('#dpr-button-sharable')

  copyUrlButton = (): PageElement => cy.get('#dpr-button-copy')

  filterForm = (): PageElement => cy.xpath('//*[@id="interactive-filters-form"]')
}
