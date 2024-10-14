export type PageElement = Cypress.Chainable<JQuery>

export default class QueryPage {
  columnsDetails = (): PageElement => cy.xpath(`//*[@id="main-content"]/div/div/div[3]/div[1]/div[1]/details/summary`)

  column4CheckBox = (): PageElement => cy.xpath(`//*[@id="columns-4"]`)

  column5CheckBox = (): PageElement => cy.xpath(`//*[@id="columns-5"]`)

  column7CheckBox = (): PageElement => cy.xpath(`//*[@id="columns-7"]`)

  applyColumnsButton = (): PageElement =>
    cy.xpath(`//*[@id="main-content"]/div/div/div[3]/div[1]/div/details/div/form/div[2]/button`)

  resetColumns = (): PageElement =>
    cy.xpath(`//*[@id="main-content"]/div/div/div[3]/div[1]/div/details/div/form/div[2]/a`)

  pageSizeSelector = (): PageElement => cy.xpath(`//*[@id="page-size-select"]`)

  pagination_page5 = (): PageElement => cy.xpath(`//*[@id="main-content"]/div/div/div[3]/div[5]/div[1]/nav/ul/li[4]/a`)

  totals = (): PageElement => cy.xpath(`//*[@id="main-content"]/div/div/div[3]/div[4]/div/p`)

  refreshActionButton = (): PageElement => cy.xpath(`//*[@id="dpr-button-refresh"]`)

  tableHeaders = (): PageElement => cy.xpath(`//*[@id="dpr-data-table"]/thead/tr[1]`)
}
