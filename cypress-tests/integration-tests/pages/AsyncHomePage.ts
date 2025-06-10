export type PageElement = Cypress.Chainable<JQuery>

export default class HomePage {
  // REQUESTED REPORT

  // V1
  requestedTab = (): PageElement => cy.get(`#tab_requested-reports-tab`)

  requestedReportsList = (): PageElement => cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`)

  requestedReportRow_Finished = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Successful report v1')

  requestedReportRow_Finished_Full = (): PageElement =>
    cy
      .xpath(`//*[@id="dpr-async-request-component"]/div/table`)
      .find('tr')
      .contains('Successful report v1')
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('FINISHED')

  requestedReportRow_Expired = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Expiring report v1')

  requestedReportRow_Expired_Full = (): PageElement =>
    cy
      .xpath(`//*[@id="dpr-async-request-component"]/div/table`)
      .find('tr')
      .contains('Expiring report v1')
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('EXPIRED')

  requestedReportRow_Failed = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Failing report v1')

  requestedReportRow_Failed_Full = (): PageElement =>
    cy
      .xpath(`//*[@id="dpr-async-request-component"]/div/table`)
      .find('tr')
      .contains('Failing report v1')
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('FAILED')

  requestedReportRow_Aborted = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Cancelled Report v1')

  requestedReportRow_Aborted_Full = (): PageElement =>
    cy
      .xpath(`//*[@id="dpr-async-request-component"]/div/table`)
      .find('tr')
      .contains('Cancelled Report v1')
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('ABORTED')

  // V2
  requestedReportRow_FinishedV2 = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Successful report v2')

  requestedReportRow_FinishedV2_Full = (): PageElement =>
    cy
      .xpath(`//*[@id="dpr-async-request-component"]/div/table`)
      .find('tr')
      .contains('Successful report v2')
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('FINISHED')

  requestedReportRow_ExpiredV2 = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Expiring report v2')

  requestedReportRow_ExpiredV2_Full = (): PageElement =>
    cy
      .xpath(`//*[@id="dpr-async-request-component"]/div/table`)
      .find('tr')
      .contains('Expiring report v2')
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('EXPIRED')

  requestedReportRow_FailedV2 = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Failing report v2')

  requestedReportRow_FailedV2_Full = (): PageElement =>
    cy
      .xpath(`//*[@id="dpr-async-request-component"]/div/table`)
      .find('tr')
      .contains('Failing report v2')
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('FAILED')

  requestedReportRow_AbortedV2 = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Cancelled report v2')

  requestedReportRow_AbortedV2_Full = (): PageElement =>
    cy
      .xpath(`//*[@id="dpr-async-request-component"]/div/table`)
      .find('tr')
      .contains('Cancelled report v2')
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('ABORTED')

  // Dashboards
  requestedDashboardRow_Finished = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Successful dashboard')

  requestedDashboardRow_Finished_Full = (): PageElement =>
    cy
      .xpath(`//*[@id="dpr-async-request-component"]/div/table`)
      .find('tr')
      .contains('Successful dashboard')
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('FINISHED')

  requestedDashboardRow_Expired = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Expiring dashboard')

  requestedDashboardRow_Expired_Full = (): PageElement =>
    cy
      .xpath(`//*[@id="dpr-async-request-component"]/div/table`)
      .find('tr')
      .contains('Expiring dashboard')
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('EXPIRED')

  requestedDashboardRow_Failed = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Failing dashboard')

  requestedDashboardRow_Failed_Full = (): PageElement =>
    cy
      .xpath(`//*[@id="dpr-async-request-component"]/div/table`)
      .find('tr')
      .contains('Failing dashboard')
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('FAILED')

  requestedDashboardRow_Aborted = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`).find('tr').contains('Cancelled dashboard')

  requestedDashboardRow_Aborted_Full = (): PageElement =>
    cy
      .xpath(`//*[@id="dpr-async-request-component"]/div/table`)
      .find('tr')
      .contains('Cancelled dashboard')
      .parent()
      .parent()
      .parent()
      .parent()
      .contains('ABORTED')

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

  viewedInteractiveRow_Ready = (): PageElement =>
    cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/table`).find('tr').contains('Interactive Report')

  viewedDashboardRow_Expired = (): PageElement =>
    cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/table`).find('tr').contains('Expired viewed dashboard')

  // Bookmarks
  bookmarksTab = (): PageElement => cy.get(`#tab_my-bookmarks-tab`)

  bookmarkTable = (): PageElement => cy.xpath(`//*[@id="dpr-bookmarks-list"]/div/table`)

  bookmarkRow = (): PageElement => cy.xpath(`//*[@id="dpr-bookmarks-list"]/div/table/tbody/tr`)

  bookmarkButton = (): PageElement => cy.xpath(`//*[@id="variantId-1-test-report-3-bookmark-list-bookmark-label"]`)

  bookmarkDashboardButton = (): PageElement =>
    cy.xpath(`//*[@id="test-dashboard-8-test-report-1-bookmark-list-bookmark-label"]`)

  bookmarkLink = (): PageElement => cy.xpath(`//*[@id="dpr-bookmarks-list"]/div/table/tbody/tr/td[3]/a`)

  bookmarkButtonFromList = (): PageElement =>
    cy.xpath(`//*[@id="variantId-16-test-report-1-reports-list-bookmark-label"]`)

  bookmarkDashboardButtonFromList = (): PageElement =>
    cy.xpath(`//*[@id="test-dashboard-1-test-report-1-reports-list-bookmark-label"]`)

  bookmarkButtonFromReport = (): PageElement => cy.xpath(`//*[@id="variantId-1-test-report-3-report-bookmark-label"]`)

  bookmarkDashboardButtonFromReport = (): PageElement =>
    cy.xpath(`//*[@id="variantId-1-test-report-3-report-bookmark-label"]`)

  // Dashboards
  dashboardLink = (): PageElement => cy.xpath(`//*[@id="main-content"]/div/div[2]/table/tbody/tr[11]/td[4]/a`)
}
