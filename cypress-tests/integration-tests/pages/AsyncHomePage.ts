export type PageElement = Cypress.Chainable<JQuery>

export default class HomePage {
  // Requested Reports
  requestedTab = (): PageElement => cy.get(`#tab_requested-reports-tab`)

  requestedReportsList = (): PageElement => cy.xpath(`//*[@id="dpr-async-request-component"]/div/div[2]/div[2]/table`)

  requestedReportFinishedRow = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/div[2]/div[2]/table/tbody/tr[2]`)

  requestedReportFailedRow = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/div[2]/div[2]/table/tbody/tr[3]`)

  requestedReportExpiredRow = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/div[2]/div[2]/table/tbody/tr[4]`)

  requestedFailedRetryButton = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/div[2]/div[2]/table/tbody/tr[3]/td[6]/div/div[1]/a`)

  requestedFailedRemoveButton = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/div[2]/div[2]/table/tbody/tr[3]/td[6]/div/div[2]/a`)

  requestedExpiredRetryButton = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/div[2]/div[2]/table/tbody/tr[4]/td[6]/div/div[1]`)

  requestedExpiredRemoveButton = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/div[2]/div[2]/table/tbody/tr[4]/td[6]/div/div[2]`)

  // Viewed Reports

  recentlyViewedTab = (): PageElement => cy.get(`#tab_recently-viewed-tab`)

  viewedReportsList = (): PageElement => cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/div[2]/div[2]/table`)

  viewedReadyRow = (): PageElement =>
    cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/div[2]/div[2]/table/tbody/tr[1]`)

  viewedExpiredRow = (): PageElement =>
    cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/div[2]/div[2]/table/tbody/tr[2]`)

  viewedExpiredRefreshButton = (): PageElement =>
    cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/div[2]/div[2]/table/tbody/tr[2]/td[6]/div/div[1]`)

  viewedExpiredRemoveButton = (): PageElement =>
    cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/div[2]/div[2]/table/tbody/tr[2]/td[6]/div/div[2]`)

  // Bookmarks

  bookmarksTab = (): PageElement => cy.get(`#tab_my-bookmarks-tab`)

  bookmarkTable = (): PageElement => cy.xpath(`//*[@id="my-bookmarks-tab"]/div/div[2]/div[2]/table`)

  bookmarkRow = (): PageElement => cy.xpath(`//*[@id="my-bookmarks-tab"]/div/div[2]/div[2]/table/tbody/tr`)

  bookmarkButton = (): PageElement => cy.xpath(`//*[@id="variantId-1-test-report-1-bookmark-list-bookmark-label"]`)

  bookmarkLink = (): PageElement => cy.xpath(`//*[@id="my-bookmarks-tab"]/div/div[2]/div[2]/table/tbody/tr[1]/td[2]/a`)

  bookmarkButtonFromList = (): PageElement => cy.xpath(`//*[@id="main-content"]/div/div[2]/table/tbody/tr[1]/td[4]/div`)

  bookmarkButtonFromReport = (): PageElement =>
    cy.xpath(`//*[@id="main-content"]/div/div/div[2]/div/div[1]/div[1]/h1/div/label`)
}
