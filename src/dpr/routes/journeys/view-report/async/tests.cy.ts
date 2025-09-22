import { checkA11y } from '../../../../../../cypress-tests/cypressUtils'

context('Viewing a report', () => {
  const path = '/embedded/platform/'
  let viewReportUrl: string
  let tableId: string

  describe('Interactive filters', () => {
    before(() => {
      cy.task('resetStubs')
      cy.task('resetRedis')
      cy.task('stubDefinitions')
      cy.task('stubFeatureTestingInteractive')

      cy.visit(path)
      checkA11y()
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return (
              element.textContent.includes('Interactive Report') &&
              element.textContent.includes('this is an interactive report')
            )
          },
        }).within(() => {
          cy.findByRole('link', { name: 'Request report' }).click()
        })
      })
      checkA11y()
      cy.findByRole('button', { name: /Request/ }).click()
      checkA11y()
      cy.findByRole('heading', { level: 1, name: /Interactive Report/ }).should('be.visible')
      cy.url().then((url) => {
        viewReportUrl = url
        const urlArr = url.split('/')
        tableId = urlArr[urlArr.length - 2]
      })
    })

    beforeEach(() => {
      cy.visit(viewReportUrl)
    })

    describe('Filter types', () => {
      describe('Date', () => {
        //
        it('should', () => {
          cy.findByLabelText(/Print screen/).should('not.be.visible')
        })
      })

      describe('Date range', () => {
        //
      })

      describe('Granular Date range', () => {
        //
      })

      describe('Multiselect', () => {
        //
      })

      describe('Autocomplete', () => {
        //
      })
    })
  })
})
