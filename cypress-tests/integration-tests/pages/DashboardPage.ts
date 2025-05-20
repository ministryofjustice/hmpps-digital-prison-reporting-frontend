export type PageElement = Cypress.Chainable<JQuery>

export default class DashboardPage {
  dashboardName = (): PageElement => cy.xpath(`//*[@id="main-content"]/div/div/div[1]/div[1]/div[1]/h1`)

  // Sections
  section1Name = (): PageElement => cy.xpath(`//*[@id="test-section-1-dashboard-section"]/h2`)

  section1Description = (): PageElement => cy.xpath(`//*[@id="test-section-1-dashboard-section"]/p`)

  section2Name = (): PageElement => cy.xpath(`//*[@id="test-section-2-dashboard-section"]/h2`)

  section2Description = (): PageElement => cy.xpath(`//*[@id="test-section-2-dashboard-section"]/p`)

  section3Name = (): PageElement => cy.xpath(`//*[@id="test-section-3-dashboard-section"]/h2`)

  section3Description = (): PageElement => cy.xpath(`//*[@id="test-section-3-dashboard-section"]/p`)

  section4Name = (): PageElement => cy.xpath(`//*[@id="test-section-4-dashboard-section"]/h2`)

  section4Description = (): PageElement => cy.xpath(`//*[@id="test-section-4-dashboard-section"]/p`)

  section5Name = (): PageElement => cy.xpath(`//*[@id="test-section-5-dashboard-section"]/h2`)

  section5Description = (): PageElement => cy.xpath(`//*[@id="test-section-5-dashboard-section"]/p`)

  section6Name = (): PageElement => cy.xpath(`//*[@id="test-section-6-dashboard-section"]/h2`)

  section6Description = (): PageElement => cy.xpath(`//*[@id="test-section-6-dashboard-section"]/p`)

  section7Name = (): PageElement => cy.xpath(`//*[@id="test-section-7-dashboard-section"]/h2`)

  section7Description = (): PageElement => cy.xpath(`//*[@id="test-section-7-dashboard-section"]/p`)

  // Visualisations

  visBarTitle = (): PageElement => cy.xpath(`//*[@id="mockEthnicityBarChart-dash-section-visualisation"]/h3`)

  visBarDescription = (): PageElement => cy.xpath(`//*[@id="mockEthnicityBarChart-dash-section-visualisation"]/p`)

  visBarTab = (): PageElement => cy.xpath(`//*[@id="tab_mockEthnicityBarChart_bar_tab"]`)

  visBarTableTab = (): PageElement => cy.xpath(`//*[@id="tab_mockEthnicityBarChart_table_tab"]`)

  visBarTable_head = (): PageElement => cy.xpath(`//*[@id="mockEthnicityBarChart_table_tab"]/div/table/thead/tr`)
}
