export type PageElement = Cypress.Chainable<JQuery>

export default class QueryPage {
  columnsDetails = (): PageElement =>
    cy.xpath(`//*[@id="main-content"]/div/div/div[1]/div/div[5]/div/div[2]/div/details/summary`)

  column4CheckBox = (): PageElement => cy.xpath(`//*[@id="columns-4"]`)

  column5CheckBox = (): PageElement => cy.xpath(`//*[@id="columns-5"]`)

  column7CheckBox = (): PageElement => cy.xpath(`//*[@id="columns-7"]`)

  applyColumnsButton = (): PageElement =>
    cy.xpath(`//*[@id="main-content"]/div/div/div[1]/div/div[5]/div[1]/div[2]/div/details/div/form/div[2]/button`)

  resetColumns = (): PageElement =>
    cy.xpath(`//*[@id="main-content"]/div/div/div[1]/div/div[5]/div[1]/div[2]/div/details/div/form/div[2]/a`)

  pageSizeSelector = (): PageElement => cy.xpath(`//*[@id="page-size-select"]`)

  pagination_page10 = (): PageElement => cy.xpath(`//*[@id="main-content"]/div/div/div[2]/div[4]/div[1]/nav/ul/li[4]/a`)

  totals = (): PageElement => cy.xpath(`//*[@id="main-content"]/div/div/div[2]/div[1]/p`)

  refreshActionButton = (): PageElement => cy.xpath(`//*[@id="dpr-button-refresh"]`)

  tableHeaders = (): PageElement => cy.xpath(`//*[@id="dpr-data-table"]/thead/tr[2]`)
}
