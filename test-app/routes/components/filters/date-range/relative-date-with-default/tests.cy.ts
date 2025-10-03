import { checkA11y } from '../../../../../../cypress-tests/cypressUtils'

context('Inputs: Relative date range with defaults', () => {
  const path = '/components/filters/date-range/relative-date-range-with-default'
  const platformPath =
    '/embedded/platform/dpr/request-report/report/filter-inputs/relative-daterange-with-default/filters'

  describe('Setting the relative date range', () => {
    beforeEach(() => {
      cy.visit(path)
      cy.task('resetStubs')
      cy.task('resetRedis')
      cy.task('stubDefinitions')
      cy.task('stubFilterInputsRelDateDef')
    })
    it('should initialise the start and end values', () => {
      checkA11y()
      cy.findByRole('textbox', { name: 'From' }).should('not.have.value', '')
      cy.findByRole('textbox', { name: 'To' }).should('not.have.value', '')

      cy.findByRole('tab', { name: 'Preset date ranges' }).click()
      cy.findByRole('radio', { name: 'Last week' }).should('be.checked')
    })

    it('should save the relative date range as user defined defaults, overriding the existing defaults', () => {
      cy.visit(platformPath)
      checkA11y()
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1.relative-duration=next-month`)
      })

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Preset date range')
              cy.wrap(filter).contains('Next month')
              break
            default:
              break
          }
        })
      })

      cy.findByRole('button', { name: 'Save current filter values as defaults' }).should('exist').click()

      checkA11y()

      cy.location().should((location) => {
        expect(location.search).to.contain('defaultsSaved=true')
      })

      cy.findByRole('button', { name: 'Update defaults' }).should('exist')

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Preset date range')
              cy.wrap(filter).contains('Next month')
              break
            default:
              break
          }
        })
      })

      cy.visit(platformPath)
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1.relative-duration=next-month`)
        expect(location.search).not.to.contain(`defaultsSaved=true`)
      })
    })
  })
})
