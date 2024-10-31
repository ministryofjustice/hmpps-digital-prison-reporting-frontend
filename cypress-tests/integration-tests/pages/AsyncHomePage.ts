export type PageElement = Cypress.Chainable<JQuery>

export default class HomePage {
  // REQUESTED REPORT

  // V1
  requestedTab = (): PageElement => cy.get(`#tab_requested-reports-tab`)

  requestedReportsList = (): PageElement => cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`)

  requestedReportRow_Finished = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Successful report v1')

  requestedReportRow_Expired = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Expiring report v1')

  requestedReportRow_Failed = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Failing report v1')

  requestedReportRow_Aborted = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Cancelled Report v1')

  // V2
  requestedReportRow_FinishedV2 = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Successful report v2')

  requestedReportRow_ExpiredV2 = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Expiring report v2')

  requestedReportRow_FailedV2 = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Failing report v2')

  requestedReportRow_AbortedV2 = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Cancelled report v2')

  // Dashboards
  requestedDashboardRow_Finished = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Successful dashboard')

  requestedDashboardRow_Expired = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Expiring dashboard')

  requestedDashboardRow_Failed = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Failing dashboard')

  requestedDashboardRow_Aborted = (): PageElement =>
    cy
      .xpath(`//*[@id="dpr-async-request-component"]/div/table`)
      .find('tr')
      .contains('ABORTED')
      .parent()
      .parent()
      .contains('Cancelled dashboard')

  // VIEWED REPORTS
  recentlyViewedTab = (): PageElement => cy.get(`#tab_recently-viewed-tab`)

  viewedReportsList = (): PageElement => cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/table`)

  viewedReportRow_Finished = (): PageElement =>
    cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/table`).find('tr').contains('Viewed report v1')

  viewedReportRow_Expired = (): PageElement =>
    cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/table`).find('tr').contains('Expiring viewed report v1')

  viewedReportRow_FinishedV2 = (): PageElement =>
    cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/table`).find('tr').contains('Viewed report v2')

  viewedReportRow_ExpiredV2 = (): PageElement =>
    cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/table`).find('tr').contains('Expired viewed report v2')

  viewedDashboardRow_Ready = (): PageElement =>
    cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/table`).find('tr').contains('Viewed dashboard')

  viewedDashboardRow_Expired = (): PageElement =>
    cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/table`).find('tr').contains('Expired viewed dashboard')

  // Bookmarks
  bookmarksTab = (): PageElement => cy.get(`#tab_my-bookmarks-tab`)

  bookmarkTable = (): PageElement => cy.xpath(`//*[@id="dpr-bookmarks-list"]/div/table`) //* [@id="dpr-bookmarks-list"]/div/table

  bookmarkRow = (): PageElement => cy.xpath(`//*[@id="dpr-bookmarks-list"]/div/table/tbody/tr`)

  bookmarkButton = (): PageElement => cy.xpath(`//*[@id="variantId-1-test-report-3-bookmark-list-bookmark-label"]`)

  bookmarkDashboardButton = (): PageElement =>
    cy.xpath(`//*[@id="test-dashboard-8-test-report-1-bookmark-list-bookmark-label"]`)

  bookmarkLink = (): PageElement => cy.xpath(`//*[@id="dpr-bookmarks-list"]/div/table/tbody/tr/td[2]/a`)

  bookmarkButtonFromList = (): PageElement => cy.xpath(`//*[@id="main-content"]/div/div[2]/table/tbody/tr[1]/td[5]/div`)

  bookmarkDashboardButtonFromList = (): PageElement =>
    cy.xpath(`/html/body/div[1]/main/div/div[2]/table/tbody/tr[12]/td[5]/div/label`)

  bookmarkButtonFromReport = (): PageElement => cy.xpath(`//*[@id="variantId-1-test-report-3-report-bookmark-label"]`)

  bookmarkDashboardButtonFromReport = (): PageElement =>
    cy.xpath(`//*[@id="variantId-1-test-report-3-report-bookmark-label"]`)

  // Dashboards
  dashboardLink = (): PageElement => cy.xpath(`//*[@id="main-content"]/div/div[2]/table/tbody/tr[11]/td[2]/a`)
}
