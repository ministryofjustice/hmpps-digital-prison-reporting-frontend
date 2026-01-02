import { checkA11y, executeReportStubs } from 'cypress-tests/cypressUtils'
import dayjs from 'dayjs'
import { getRedisState, setRedisState } from 'test-app/routes/integrationTests/appStateUtils'

context('Request status', () => {
  const path = '/embedded/platform/'

  beforeEach(() => {
    executeReportStubs()
    cy.task('stubDefinitionRequestExamplesSuccess')
    cy.task('stubRequestSuccessResult20WithDelay')
  })

  describe('post request', () => {
    const executionId = ''

    it('should show the status pages', () => {
      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return (
              Boolean(element.textContent?.includes('Successful Report')) &&
              Boolean(element.textContent?.includes('this will succeed'))
            )
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })
      cy.findByRole('button', { name: /Request/ }).click()
      checkA11y()
      cy.task('stubReportsPickedStatus')
      cy.findByText(/picked/i).should('be.visible')
      checkA11y()
      cy.task('stubReportsStartedStatus')
      cy.findByText(/started/i).should('be.visible')
      checkA11y()
      cy.task('stubReportsFinishedStatus')
      cy.findAllByRole('heading', { name: /successful report/i }).should('be.visible')
    })

    it('should timeout', () => {
      cy.visit(path)
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return (
              Boolean(element.textContent?.includes('Successful Report')) &&
              Boolean(element.textContent?.includes('this will succeed'))
            )
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })
      cy.findByRole('button', { name: /Request/ }).click()
      checkA11y()
      cy.task('stubReportsPickedStatus')
      cy.findByText('PICKED').should('be.visible')
      getRedisState().then((state) => {
        const newState = {
          ...state.body,
        }
        newState.requestedReports[0].timestamp.requested = dayjs(state.body.requestedReports[0].timestamp.requested)
          .add(-1, 'days')
          .toDate()
        setRedisState(newState)
      })
      cy.findAllByText(/Request taking too long/)
        .eq(0)
        .should('be.visible')
      checkA11y()
    })

    describe('failure status pages', () => {
      beforeEach(() => {
        cy.task('resetRedis')
        cy.task('stubReportsPickedStatus')
        cy.visit(path)
        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return (
                Boolean(element.textContent?.includes('Successful Report')) &&
                Boolean(element.textContent?.includes('this will succeed'))
              )
            },
          }).within(() => {
            cy.findByRole('link', { name: 'Request report' }).click()
          })
        })
        cy.findByRole('button', { name: /Request/ }).click()
        cy.findByText(/submitted/i).should('be.visible')
        cy.findByText(/picked/i).should('be.visible')
      })

      it('should show the aborted status page', () => {
        cy.task('stubReportsAbortedStatus')
        cy.findByText(/aborted/i).should('be.visible')
        cy.injectAxe()
        cy.checkA11y()
      })
      it('should show the expired status page', () => {
        cy.task('stubReportsExpiredStatus')
        cy.findByText(/expired/i).should('be.visible')
        cy.injectAxe()
        cy.checkA11y()
      })
      it('should show the failed status page', () => {
        cy.task('stubReportsFailedStatus')
        cy.findByText(/your report has failed to generate/i).should('be.visible')
        cy.findByRole('group').contains('Show full error').should('be.visible')
        cy.findByText(/Show full error/).click()
        cy.findByText(/a developer message goes here/).should('be.visible')
        cy.findAllByRole('list').contains('Report ID: request-examples').should('be.visible')
        cy.findAllByRole('list').contains(`Execution ID: ${executionId}`).should('be.visible')
        cy.findAllByRole('list').contains('Table ID: tblId_').should('be.visible')
        cy.injectAxe()
        cy.checkA11y()
      })
    })
  })
})
