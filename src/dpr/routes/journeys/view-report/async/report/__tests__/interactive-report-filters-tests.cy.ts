import {
  applyFilters,
  checkSelectedFilterValues,
  executeReportStubs,
  requestReport,
  showFilters,
} from '../../../../../../../../cypress-tests/cypressUtils'

context('Interactive report - filters', () => {
  const path = '/'
  let viewReportUrl: string

  const removeAllFilters = () => {
    for (let index = 0; index < 4; index += 1) {
      cy.findByLabelText('Selected filters').within(() => {
        cy.findAllByRole('button').first().click()
      })
    }
  }

  before(() => {
    executeReportStubs()
    cy.task('stubDefinitionFeatureTestingInteractive')
    cy.task('stubAsyncRequestSuccessReportTablesCount')
    cy.task('stubRequestSuccessResult20')
    cy.task('stubRequestSuccessResult100')

    requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })
    cy.url().then(url => {
      viewReportUrl = url
    })
  })

  describe('Apply filters', () => {
    beforeEach(() => {
      cy.visit(viewReportUrl)
    })

    describe('Date range', () => {
      it('should apply the date range', () => {
        cy.findByRole('textbox', { name: 'From' }).should('have.value', '01/02/2003')
        cy.findByRole('textbox', { name: 'To' }).should('have.value', '04/05/2006')

        removeAllFilters()
        showFilters()

        cy.findByRole('textbox', { name: 'From' }).type('02/05/2025')
        cy.findByRole('textbox', { name: 'To' }).type('05/07/2025').blur()

        applyFilters()

        cy.location().should(location => {
          expect(location.search).to.contain(`filters.field3.start=2025-05-02`)
          expect(location.search).to.contain(`filters.field3.end=2025-07-05`)
        })

        checkSelectedFilterValues({ length: 1, buttonValues: [{ key: 'Field 3', value: '02/05/2025 - 05/07/2025' }] })
      })

      it('should apply the relative daterange', () => {
        removeAllFilters()
        showFilters()

        cy.findByRole('tab', { name: 'Preset date ranges' }).click()
        cy.findByRole('radio', { name: 'Tomorrow' }).check()

        applyFilters()

        let startValue: string | number | string[] | undefined
        let endValue: string | number | string[] | undefined
        cy.findByRole('textbox', { name: 'From' })
          .invoke('val')
          .should('not.be.empty')
          .then(val => {
            startValue = val
          })
        cy.findByRole('textbox', { name: 'To' })
          .invoke('val')
          .should('not.be.empty')
          .then(val => {
            endValue = val
          })

        cy.location().then(location => {
          cy.task('dateMapperToDateString', startValue).then(startDate => {
            expect(location.search).to.contain(`filters.field3.start=${startDate}`)
          })
          cy.task('dateMapperToDateString', endValue).then(endDate => {
            expect(location.search).to.contain(`filters.field3.end=${endDate}`)
          })
          expect(location.search).to.contain(`filters.field3.relative-duration=tomorrow`)
        })

        checkSelectedFilterValues({
          length: 1,
          buttonValues: [{ key: 'Field 3', value: /\d{2}\/\d{2}\/\d{4} - \d{2}\/\d{2}\/\d{4} \/ Tomorrow/ }],
        })
      })
    })

    describe('Multiselect', () => {
      it('should apply the multiselect values', () => {
        cy.findByRole('checkbox', { name: 'Value 8.2' }).should('be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.3' }).should('be.checked')

        removeAllFilters()

        cy.findByRole('checkbox', { name: 'Value 8.1' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.2' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.3' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.4' }).should('not.be.checked')

        showFilters()

        cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
        cy.findByRole('checkbox', { name: 'Value 8.3' }).check()

        applyFilters()

        cy.findByRole('checkbox', { name: 'Value 8.1' }).should('be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.2' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.3' }).should('be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.4' }).should('not.be.checked')

        checkSelectedFilterValues({ length: 1, buttonValues: [{ key: 'Field 8', value: 'Value 8.1, Value 8.3' }] })
      })

      it('should set the selected filter values correctly', () => {
        cy.findByRole('checkbox', { name: 'Value 8.2' }).should('be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.3' }).should('be.checked')

        removeAllFilters()

        cy.findByRole('checkbox', { name: 'Value 8.1' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.2' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.3' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.4' }).should('not.be.checked')

        showFilters()

        cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
        cy.findByRole('checkbox', { name: 'Value 8.2' }).check()
        cy.findByRole('checkbox', { name: 'Value 8.3' }).check()
        cy.findByRole('checkbox', { name: 'Value 8.4' }).check()

        applyFilters()

        cy.findByRole('checkbox', { name: 'Value 8.1' }).should('be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.2' }).should('be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.3' }).should('be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.4' }).should('be.checked')

        checkSelectedFilterValues({
          length: 1,
          buttonValues: [{ key: 'Field 8', value: 'Value 8.1, Value 8.2, Value 8.3 + 1 more' }],
        })
      })

      it('should set the values correctly when only one checkbox selected', () => {
        removeAllFilters()

        cy.findByRole('checkbox', { name: 'Value 8.1' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.2' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.3' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.4' }).should('not.be.checked')

        showFilters()

        cy.findByRole('checkbox', { name: 'Value 8.1' }).check()

        applyFilters()

        cy.findByRole('checkbox', { name: 'Value 8.1' }).should('be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.2' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.3' }).should('not.be.checked')
        cy.findByRole('checkbox', { name: 'Value 8.4' }).should('not.be.checked')

        checkSelectedFilterValues({
          length: 1,
          buttonValues: [{ key: 'Field 8', value: 'Value 8.1' }],
        })
      })
    })

    it('Applying filters should persist current applied columns', () => {
      cy.findAllByRole('group')
        .contains(/Show columns/)
        .should('be.visible')
        .click()

      cy.findByRole('checkbox', { name: 'Field 1' }).uncheck()
      cy.findByRole('checkbox', { name: 'Field 3' }).uncheck()
      cy.findByRole('checkbox', { name: 'Field 5' }).check()
      cy.findByRole('checkbox', { name: 'Field 7' }).uncheck()
      cy.findByRole('checkbox', { name: 'Field 8' }).check()

      cy.findByRole('button', { name: 'Apply columns' }).click()
      cy.findAllByRole('group').contains('Show columns (4 of 8 shown)')

      showFilters()
      cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.3' }).check()
      applyFilters()

      cy.findAllByRole('group').contains('Show columns (4 of 8 shown)')
    })
  })
})
