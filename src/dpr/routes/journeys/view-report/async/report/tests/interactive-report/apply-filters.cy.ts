import {
  setupInteractiveReportStubs,
  requestInteractiveReport,
  applyFilters,
  showFilters,
  removeAllFilters,
} from './interactive-test-helpers'
import { checkSelectedFilterValues } from '../../../../../../../../../cypress-tests/cypressUtils'

context('Interactive report – apply filters (date ranges)', () => {
  const path = '/'

  beforeEach(() => {
    setupInteractiveReportStubs()
    cy.task('stubRequestSuccessResult20')
    requestInteractiveReport(path)
  })

  describe('Absolute date range', () => {
    it('applies a manual date range', () => {
      // initial state
      cy.findByRole('textbox', { name: 'From' }).should('have.value', '01/02/2003')
      cy.findByRole('textbox', { name: 'To' }).should('have.value', '04/05/2006')

      removeAllFilters()
      showFilters()

      cy.findByRole('textbox', { name: 'From' }).clear().type('02/05/2025')
      cy.findByRole('textbox', { name: 'To' }).clear().type('05/07/2025').blur()

      applyFilters()

      cy.location().should((location) => {
        expect(location.search).to.contain('filters.field3.start=2025-05-02')
        expect(location.search).to.contain('filters.field3.end=2025-07-05')
      })

      checkSelectedFilterValues({
        length: 1,
        buttonValues: [{ key: 'Field 3', value: '02/05/2025 - 05/07/2025' }],
      })
    })
  })

  describe('Relative date range', () => {
    it('applies a preset relative date range', () => {
      removeAllFilters()
      showFilters()

      cy.findByRole('tab', { name: 'Preset date ranges' }).click()
      cy.findByRole('radio', { name: 'Tomorrow' }).check()

      applyFilters()

      let startValue: string
      let endValue: string

      cy.findByRole('textbox', { name: 'From' })
        .invoke('val')
        .then((val) => {
          startValue = String(val)
        })

      cy.findByRole('textbox', { name: 'To' })
        .invoke('val')
        .then((val) => {
          endValue = String(val)
        })

      cy.location().then((location) => {
        cy.task('dateMapperToDateString', startValue).then((startDate) => {
          expect(location.search).to.contain(`filters.field3.start=${startDate}`)
        })
        cy.task('dateMapperToDateString', endValue).then((endDate) => {
          expect(location.search).to.contain(`filters.field3.end=${endDate}`)
        })
        expect(location.search).to.contain('filters.field3.relative-duration=tomorrow')
      })

      checkSelectedFilterValues({
        length: 1,
        buttonValues: [
          {
            key: 'Field 3',
            value: /\d{2}\/\d{2}\/\d{4} - \d{2}\/\d{2}\/\d{4} \/ Tomorrow/,
          },
        ],
      })
    })
  })
})

context('Interactive report – multiselect filters', () => {
  const path = '/'

  beforeEach(() => {
    setupInteractiveReportStubs()
    cy.task('stubRequestSuccessResult20')
    requestInteractiveReport(path)
  })

  it('applies multiple multiselect values', () => {
    // initial defaults
    cy.findByRole('checkbox', { name: 'Value 8.2' }).should('be.checked')
    cy.findByRole('checkbox', { name: 'Value 8.3' }).should('be.checked')

    removeAllFilters()
    showFilters()

    cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
    cy.findByRole('checkbox', { name: 'Value 8.3' }).check()

    applyFilters()

    cy.findByRole('checkbox', { name: 'Value 8.1' }).should('be.checked')
    cy.findByRole('checkbox', { name: 'Value 8.2' }).should('not.be.checked')
    cy.findByRole('checkbox', { name: 'Value 8.3' }).should('be.checked')
    cy.findByRole('checkbox', { name: 'Value 8.4' }).should('not.be.checked')

    checkSelectedFilterValues({
      length: 1,
      buttonValues: [{ key: 'Field 8', value: 'Value 8.1, Value 8.3' }],
    })
  })

  it('shows "+1 more" when more than three values are selected', () => {
    removeAllFilters()
    showFilters()

    cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
    cy.findByRole('checkbox', { name: 'Value 8.2' }).check()
    cy.findByRole('checkbox', { name: 'Value 8.3' }).check()
    cy.findByRole('checkbox', { name: 'Value 8.4' }).check()

    applyFilters()

    checkSelectedFilterValues({
      length: 1,
      buttonValues: [
        {
          key: 'Field 8',
          value: 'Value 8.1, Value 8.2, Value 8.3 + 1 more',
        },
      ],
    })
  })

  it('displays a single selected value correctly', () => {
    removeAllFilters()
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
