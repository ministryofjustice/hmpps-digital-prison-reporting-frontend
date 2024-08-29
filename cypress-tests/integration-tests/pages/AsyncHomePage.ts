export type PageElement = Cypress.Chainable<JQuery>

export default class HomePage {
  requestedTab = (): PageElement => cy.get(`#tab_requested-reports-tab`)

  recentlyViewedTab = (): PageElement => cy.get(`#tab_recently-viewed-tab`)

  bookmarksTab = (): PageElement => cy.get(`#tab_my-bookmarks-tab`)

  requestedReportsList = (): PageElement => cy.xpath(`//*[@id="dpr-async-request-component"]/div/div[2]/div[2]/table`)

  requestedReportFinishedRow = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/div[2]/div[2]/table/tbody/tr[1]`)

  requestedReportFailedRow = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/div[2]/div[2]/table/tbody/tr[2]`)

  requestedReportExpiredRow = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/div[2]/div[2]/table/tbody/tr[3]`)

  requestedFailedRetryButton = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/div[2]/div[2]/table/tbody/tr[2]/td[5]/div/div[1]/a`)

  requestedFailedRemoveButton = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/div[2]/div[2]/table/tbody/tr[2]/td[5]/div/div[2]/a`)

  requestedExpiredRetryButton = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/div[2]/div[2]/table/tbody/tr[3]/td[5]/div/div[1]`)

  requestedExpiredRemoveButton = (): PageElement =>
    cy.xpath(`//*[@id="dpr-async-request-component"]/div/div[2]/div[2]/table/tbody/tr[3]/td[5]/div/div[2]`)

  viewedReadyRow = (): PageElement =>
    cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/div[2]/div[2]/table/tbody/tr[1]`)

  viewedExpiredRow = (): PageElement =>
    cy.xpath(`//*[@id="dpr-recently-viewed-component"]/div/div[2]/div[2]/table/tbody/tr[2]`)

  bookmarkRow = (): PageElement => cy.xpath(`//*[@id="my-bookmarks-tab"]/div/div[2]/div[2]/table/tbody/tr[1]`)

  bookmarkButton = (): PageElement => cy.xpath(`//*[@id="variantId-16-test-report-2-bookmark-label"]`)
}
