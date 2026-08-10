import {
  expectMyReportRowCountInTab,
  findCatalogueRowAndConfirmActionExists,
  findCatalogueRowAndInitAction,
  getMyReportRow,
  requestReportByNameAndDescription,
  startReportRequest,
  stubBaseTasks,
  stubDefinitionsTasks,
} from 'cypress-tests/cypressUtils'

describe('Subscriptions', () => {
  const reportName = 'Scheduled Report'
  const reportDescription = 'This is an scheduled report'

  const paths = ['/', '/dpr', '/embedded/platform', '/embedded/platform/dpr']

  after(() => {
    cy.task('resetRedis')
  })

  beforeEach(() => {
    cy.task('resetStubs')
    stubBaseTasks()
    stubDefinitionsTasks()
  })

  const sharedTests = (path: string) => {
    describe('Subscribing', () => {
      describe('Subscribe from the catalogue', () => {
        beforeEach(() => {
          cy.visit(path)
        })

        after(() => {
          cy.task('resetRedis')
        })

        it('should subscribe to the report', () => {
          cy.findByRole('tab', { name: /Subscriptions/ }).click()

          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 0 })

          findCatalogueRowAndInitAction(reportName, 'Subscribe')

          findCatalogueRowAndConfirmActionExists(reportName, 'Unsubscribe')

          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 1 })

          cy.findByLabelText(/Subscriptions.*/i).within(() => {
            getMyReportRow({ name: reportName })
          })
        })
      })

      describe('Subscribe from the report', () => {
        beforeEach(() => {
          cy.visit(path)
        })

        after(() => {
          cy.task('resetRedis')
        })

        it('should subscribe to the report', () => {
          requestReportByNameAndDescription({ name: reportName, description: reportDescription })
        })
      })

      describe('Subscribe from the the request page', () => {
        it('should subscribe to the report', () => {
          startReportRequest({ name: reportName, description: reportDescription })
        })
      })
    })

    describe('Unsubscribing', () => {
      describe('Unubscribe from the catalogue', () => {
        beforeEach(() => {
          cy.visit(path)
        })

        after(() => {
          cy.task('resetRedis')
        })

        it('should show the unsubscribe button', () => {
          cy.findByRole('tab', { name: /Subscriptions/ }).click()

          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 1 })

          findCatalogueRowAndInitAction(reportName, 'Unsubscribe')

          findCatalogueRowAndConfirmActionExists(reportName, 'Subscribe')

          expectMyReportRowCountInTab({ tabName: /Subscriptions.*/i, count: 0 })
        })
      })

      // describe('Unubscribe from the report', () => {
      //   beforeEach(() => {
      //     cy.visit(path)
      //   })

      //   after(() => {
      //     cy.task('resetRedis')
      //   })

      //   it('should unsubscribe to the report', () => {
      //     requestReportByNameAndDescription({ name: reportName, description: reportDescription })
      //   })
      // })

      // describe('Unubscribe from the the request page', () => {
      //   it('should unsubscribe to the report', () => {})
      // })
    })

    describe('Notifications', () => {
      describe('Refreshed subscription notification', () => {
        it('should show an in-app notification when a subscription has been refreshed', () => {})
      })
    })
  }

  paths.forEach(route => sharedTests(route))
})
