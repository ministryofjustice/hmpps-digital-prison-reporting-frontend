export type PageElement = Cypress.Chainable<JQuery>

export default class HomePage {
  // Requested Reports
  requestedTab = (): PageElement => cy.get(`#tab_requested-reports-tab`)

  requestedReportsList = (): PageElement => cy.xpath(`//*[@id="dpr-async-request-component"]/div/table`)

  requestedReportFinishedRow = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table/tbody/tr[2]`)

  requestedReportFailedRow = (): PageElement => cy.xpath(`//*[@id="dpr-async-request-component"]/div/table/tbody/tr[3]`)

  requestedReportExpiredRow = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table/tbody/tr[4]`)

  requestedFailedRetryButton = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table/tbody/tr[3]/td[6]/div/a[1]`)

  requestedFailedRemoveButton = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table/tbody/tr[3]/td[6]/div/a[2]`)

  requestedExpiredRetryButton = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table/tbody/tr[4]/td[6]/div/a[1]`)

  requestedExpiredRemoveButton = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/table/tbody/tr[4]/td[6]/div/a[2]`)

  // Viewed Reports

  recentlyViewedTab = (): PageElement => cy.get(`#tab_recently-viewed-tab`)

  viewedReportsList = (): PageElement => cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/table`)

  viewedReadyRow = (): PageElement => cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/table/tbody/tr[1]`)

  viewedExpiredRow = (): PageElement => cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/table/tbody/tr[2]`)

  viewedExpiredRefreshButton = (): PageElement =>
    cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/table/tbody/tr[2]/td[6]/div/a[1]`)

  viewedExpiredRemoveButton = (): PageElement =>
    cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/table/tbody/tr[2]/td[6]/div/a[2]`)

  // Bookmarks

  bookmarksTab = (): PageElement => cy.get(`#tab_my-bookmarks-tab`)

  bookmarkTable = (): PageElement => cy.xpath(`//*[@id="dpr-bookmarks-list"]/div/table`) //* [@id="dpr-bookmarks-list"]/div/table

  bookmarkRow = (): PageElement => cy.xpath(`//*[@id="dpr-bookmarks-list"]/div/table/tbody/tr`)

  bookmarkButton = (): PageElement => cy.xpath(`//*[@id="variantId-1-test-report-3-bookmark-list-bookmark-label"]`)

  bookmarkLink = (): PageElement => cy.xpath(`//*[@id="dpr-bookmarks-list"]/div/table/tbody/tr/td[2]/a`)

  bookmarkButtonFromList = (): PageElement => cy.xpath(`//*[@id="main-content"]/div/div[2]/table/tbody/tr[1]/td[5]/div`)

  bookmarkButtonFromReport = (): PageElement => cy.xpath(`//*[@id="variantId-1-test-report-3-bookmark-label"]`)

  // Dashboards
  dashboardLink = (): PageElement => cy.xpath(`//*[@id="main-content"]/div/div[2]/table/tbody/tr[11]/td[2]/a`)
}
