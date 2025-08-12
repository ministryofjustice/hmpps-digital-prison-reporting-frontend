context('Bookmarks list', () => {
  const path = '/embedded/platform/'

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })

  describe('Bookmarking via the catalogue', () => {
    describe('report', () => {
      it('should add a bookmark to the bookmarks list', () => {
        cy.get('#tab_my-bookmarks-tab').click()
        cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 2)

        cy.get('#variantId-35-mock-report-reports-list-bookmark-label > span').contains('Add bookmark').click()

        cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 3)
        cy.get('#dpr-bookmarks-list > div > table > tbody > tr:nth-child(1) > td:nth-child(1)').contains(
          'Interactive Report with async filters',
        )
        cy.get('#variantId-35-mock-report-reports-list-bookmark-label > span').contains('Remove bookmark')
      })

      it('should remove a bookmark to the bookmarks list', () => {
        cy.get('#tab_my-bookmarks-tab').click()
        cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 3)
        cy.get('#variantId-35-mock-report-reports-list-bookmark-label > span').contains('Remove bookmark')

        cy.get('#variantId-35-mock-report-reports-list-bookmark-label > span').click()
        cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 2)
        cy.get('#variantId-35-mock-report-reports-list-bookmark-label > span').contains('Add bookmark')
      })
    })

    describe('dashboard', () => {
      it('should add a bookmark to the bookmarks list', () => {
        cy.get('#tab_my-bookmarks-tab').click()
        cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 2)

        cy.get('#list-examples-data-quality-dataset-dashboard-visualisations-reports-list-bookmark-label > span')
          .contains('Add bookmark')
          .click()

        cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 3)
        cy.get('#dpr-bookmarks-list > div > table > tbody > tr:nth-child(1) > td:nth-child(1)').contains(
          'Data quality data set',
        )
        cy.get(
          '#list-examples-data-quality-dataset-dashboard-visualisations-reports-list-bookmark-label > span',
        ).contains('Remove bookmark')
      })

      it('should remove a bookmark to the bookmarks list', () => {
        cy.get('#tab_my-bookmarks-tab').click()
        cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 3)
        cy.get(
          '#list-examples-data-quality-dataset-dashboard-visualisations-reports-list-bookmark-label > span',
        ).contains('Remove bookmark')

        cy.get(
          '#list-examples-data-quality-dataset-dashboard-visualisations-reports-list-bookmark-label > span',
        ).click()
        cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 2)
        cy.get(
          '#list-examples-data-quality-dataset-dashboard-visualisations-reports-list-bookmark-label > span',
        ).contains('Add bookmark')
      })
    })
  })

  describe('Removing via the user reports list', () => {
    it('should remove a dashboard bookmark', () => {
      cy.get('#list-examples-data-quality-dataset-dashboard-visualisations-reports-list-bookmark-label > span')
        .contains('Add bookmark')
        .click()

      cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 3)

      cy.get('#list-examples-data-quality-dataset-dashboard-visualisations-reports-list-bookmark-label > span')
        .contains('Remove bookmark')
        .click()

      cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 2)
    })

    it('should remove a report bookmark', () => {
      cy.get('#variantId-35-mock-report-reports-list-bookmark-label > span').contains('Add bookmark').click()
      cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 3)
      cy.get('#variantId-35-mock-report-reports-list-bookmark-label > span').contains('Remove bookmark').click()
      cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 2)
    })
  })

  describe('Bookmarking via the report', () => {
    it('should add a bookmark', () => {
      cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 2)
      cy.visit(
        '/embedded/platform/async/report/feature-testing/feature-testing-interactive/request/tblId_1733925499607/report',
      )
      cy.get('#feature-testing-interactive-feature-testing-report-bookmark-label > span')
        .contains('Add bookmark')
        .click()

      cy.get('#feature-testing-interactive-feature-testing-report-bookmark-label > span').contains('Bookmarked')

      cy.visit(path)
      cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 3)
    })

    it('should remove a bookmark', () => {
      cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 3)
      cy.visit(
        '/embedded/platform/async/report/feature-testing/feature-testing-interactive/request/tblId_1733925499607/report',
      )

      cy.get('#feature-testing-interactive-feature-testing-report-bookmark-label > span').click()
      cy.get('#feature-testing-interactive-feature-testing-report-bookmark-label > span').contains('Bookmark removed')

      cy.visit(path)
      cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 2)
    })
  })

  describe('Bookmarking via the dashboard', () => {
    it('should remove a bookmark', () => {
      cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 2)
      cy.visit(
        '/embedded/platform/async/dashboard/mock-dashboards/test-dashboard-8/request/tblId_1730302242487/dashboard',
      )

      cy.get('#test-dashboard-8-mock-dashboards-report-bookmark-label > span').click()
      cy.get('#test-dashboard-8-mock-dashboards-report-bookmark-label > span').contains('Bookmark removed')

      cy.visit(path)
      cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 1)
    })

    it('should add a bookmark', () => {
      cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 1)
      cy.visit(
        '/embedded/platform/async/dashboard/mock-dashboards/test-dashboard-8/request/tblId_1730302242487/dashboard',
      )
      cy.get('#test-dashboard-8-mock-dashboards-report-bookmark-label > span').contains('Add bookmark').click()

      cy.get('#test-dashboard-8-mock-dashboards-report-bookmark-label > span').contains('Bookmarked')

      cy.visit(path)
      cy.get('#dpr-bookmarks-list > div > table > tbody > tr').should('have.length', 2)
    })
  })
})
