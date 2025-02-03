export type PageElement = Cypress.Chainable<JQuery>

export default class DashboardPage {
  dashboardName = (): PageElement => cy.xpath(`//*[@id="main-content"]/div/div/div[1]/div[1]/div[1]/h1`)

  metricName = (): PageElement => cy.xpath(`//*[@id="missing-ethnicity-metric-dashboard-section"]/h2`)

  metricDescription = (): PageElement => cy.xpath(`//*[@id="missing-ethnicity-metric-dashboard-section"]/p`)

  metricDoughnutTab = (): PageElement => cy.xpath(`//*[@id="tab_missing-ethnicity-metric_doughnut_tab"]`)

  metricBarTab = (): PageElement => cy.xpath(`//*[@id="tab_missing-ethnicity-metric_bar_tab"]`)

  matricTableTab = (): PageElement => cy.xpath(`//*[@id="tab_missing-ethnicity-metric_table_tab"]`)

  metricTable = (): PageElement => cy.xpath(`//*[@id="tab_missing-ethnicity-metric_table_tab"]/div/table`)

  metricTable_row1 = (): PageElement => cy.xpath(`//*[@id="missing-ethnicity-metric_table_tab"]/div/table/tbody/tr[1]`)

  metricTable_row2 = (): PageElement => cy.xpath(`//*[@id="missing-ethnicity-metric_table_tab"]/div/table/tbody/tr[2]`)

  metricTable_row3 = (): PageElement => cy.xpath(`//*[@id="missing-ethnicity-metric_table_tab"]/div/table/tbody/tr[3]`)

  metricDetailValue = (): PageElement => cy.xpath(`//*[@id="dpr-missing-ethnicity-metric-tooltip-details"]`)

  canvasWrapper = (): PageElement => cy.xpath(`//*[@id="missing-ethnicity-metric-chart-wrapper"]`)
}
