import {
  setupInteractiveReportStubs,
  requestInteractiveReport,
  applyFilters,
  showFilters,
} from './interactive-test-helpers'
import { checkSelectedFilterValues } from '../../../../../../../../../cypress-tests/cypressUtils'

context('Interactive report – user defined defaults', () => {
  const path = '/'
  let viewReportUrl: string

  const saveDefaultsButton = () => cy.findByRole('button', { name: 'Save current filter values as defaults' })

  const updateDefaultsButton = () => cy.findByRole('button', { name: 'Update defaults' })

  const deleteDefaultsButton = () => cy.findByRole('button', { name: 'Delete defaults' })

  beforeEach(() => {
    setupInteractiveReportStubs()
    cy.task('stubRequestSuccessResult20')
    requestInteractiveReport(path)
    cy.url().then((url) => {
      viewReportUrl = url
    })
  })

  /* ------------------------------------------------------------------ */
  /* Defaults lifecycle                                                  */
  /* ------------------------------------------------------------------ */

  it('saves interactive defaults', () => {
    showFilters()
    cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
    cy.findByRole('checkbox', { name: 'Value 8.4' }).check()
    cy.findByRole('combobox', { name: 'Field 2' }).select('value2.2')
    applyFilters()

    const expected = [
      { key: 'Field 1', value: 'Value 1.2' },
      { key: 'Field 2', value: 'Value 2.2' },
      { key: 'Field 3', value: '01/02/2003 - 04/05/2006' },
      { key: 'Field 7', value: '01/02/2005' },
      { key: 'Field 8', value: 'Value 8.1, Value 8.2, Value 8.3 + 1 more' },
    ]

    checkSelectedFilterValues({ length: 5, buttonValues: expected })
    saveDefaultsButton().click()

    updateDefaultsButton().should('exist')
    deleteDefaultsButton().should('exist')
  })

  it('initialises report with saved defaults', () => {
    saveDefaultsButton().click()

    requestInteractiveReport(path)

    updateDefaultsButton().should('exist')
    deleteDefaultsButton().should('exist')
  })

  it('resets filters to saved defaults', () => {
    saveDefaultsButton().click()

    showFilters()
    cy.findByRole('checkbox', { name: 'Value 8.1' }).uncheck()
    cy.findByRole('combobox', { name: 'Field 2' }).select('value2.3')
    applyFilters()

    cy.findByRole('button', { name: 'Reset filters' }).click()

    checkSelectedFilterValues({
      length: 4,
      buttonValues: [
        { key: 'Field 1', value: 'Value 1.2' },
        { key: 'Field 3', value: '01/02/2003 - 04/05/2006' },
        { key: 'Field 7', value: '01/02/2005' },
        { key: 'Field 8', value: 'Value 8.2, Value 8.3' },
      ],
    })
  })

  it('updates saved defaults', () => {
    saveDefaultsButton().click()

    showFilters()
    cy.findByRole('checkbox', { name: 'Value 8.3' }).uncheck()
    applyFilters()

    updateDefaultsButton().click()

    requestInteractiveReport(path)

    checkSelectedFilterValues({
      length: 4,
      buttonValues: [
        { key: 'Field 1', value: 'Value 1.2' },
        { key: 'Field 3', value: '01/02/2003 - 04/05/2006' },
        { key: 'Field 7', value: '01/02/2005' },
        { key: 'Field 8', value: 'Value 8.2' },
      ],
    })
  })

  it('deletes saved defaults', () => {
    saveDefaultsButton().click()
    deleteDefaultsButton().click()

    checkSelectedFilterValues({
      length: 4,
      buttonValues: [
        { key: 'Field 1', value: 'Value 1.2' },
        { key: 'Field 3', value: '01/02/2003 - 04/05/2006' },
        { key: 'Field 7', value: '01/02/2005' },
        { key: 'Field 8', value: 'Value 8.2, Value 8.3' },
      ],
    })
  })

  /* ------------------------------------------------------------------ */
  /* Input type variants                                                 */
  /* ------------------------------------------------------------------ */

  describe('input types', () => {
    it('persists relative date range defaults', () => {
      showFilters()
      cy.findByRole('tab', { name: 'Preset date ranges' }).click()
      cy.findByRole('radio', { name: 'Tomorrow' }).check()
      applyFilters()

      saveDefaultsButton().click()
      requestInteractiveReport(path)

      checkSelectedFilterValues({
        length: 4,
        buttonValues: [
          { key: 'Field 1', value: 'Value 1.2' },
          { key: 'Field 3', value: 'Tomorrow' },
          { key: 'Field 7', value: '01/02/2005' },
          { key: 'Field 8', value: 'Value 8.2, Value 8.3' },
        ],
      })
    })

    it('persists single multiselect defaults', () => {
      showFilters()
      cy.findByRole('checkbox', { name: 'Value 8.3' }).uncheck()
      applyFilters()

      saveDefaultsButton().click()
      requestInteractiveReport(path)

      checkSelectedFilterValues({
        length: 4,
        buttonValues: [
          { key: 'Field 1', value: 'Value 1.2' },
          { key: 'Field 3', value: '01/02/2003 - 04/05/2006' },
          { key: 'Field 7', value: '01/02/2005' },
          { key: 'Field 8', value: 'Value 8.2' },
        ],
      })
    })
  })
})
