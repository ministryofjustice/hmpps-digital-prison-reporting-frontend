export type PageElement = Cypress.Chainable<JQuery>

export default class DashboardPage {
  dashboardName = (): PageElement => cy.xpath(`//*[@id="main-content"]/h1`)

  dashboardDescription = (): PageElement => cy.xpath(`//*[@id="main-content"]/p`)

  metricName = (): PageElement => cy.xpath(`//*[@id="test-metric-id-1-chart-card"]/h2`)

  metricDescription = (): PageElement => cy.xpath(`//*[@id="test-metric-id-1-chart-card"]/p`)

  metricDoughnutTab = (): PageElement => cy.xpath(`//*[@id="tab_test-metric-id-1_doughnut_tab"]`)

  metricBarTab = (): PageElement => cy.xpath(`//*[@id="tab_test-metric-id-1_bar_tab"]`)

  matricTableTab = (): PageElement => cy.xpath(`//*[@id="tab_test-metric-id-1_table_tab"]`)

  metricTable = (): PageElement => cy.xpath(`//*[@id="test-metric-id-1_table_tab"]/div/table`)

  metricTable_row1 = (): PageElement => cy.xpath(`//*[@id="test-metric-id-1_table_tab"]/div/table/tbody/tr[1]`)

  metricTable_row2 = (): PageElement => cy.xpath(`//*[@id="test-metric-id-1_table_tab"]/div/table/tbody/tr[2]`)

  metricTable_row3 = (): PageElement => cy.xpath(`//*[@id="test-metric-id-1_table_tab"]/div/table/tbody/tr[3]`)

  metricDetailValue = (): PageElement => cy.xpath(`//*[@id="dpr-test-metric-id-1-tooltip-details"]`)

  canvasWrapper = (): PageElement => cy.xpath(`//*[@id="test-metric-id-1-chart-wrapper"]`)
}
