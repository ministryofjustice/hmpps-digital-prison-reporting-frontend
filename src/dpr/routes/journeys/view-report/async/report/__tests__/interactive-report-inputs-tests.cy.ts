import {
  applyFilters,
  checkSelectedFilterValues,
  deleteDefaultsButton,
  executeReportStubs,
  requestReport,
  saveDefaultsButton,
  showFilters,
  updateDefaultsButton,
} from '../../../../../../../../cypress-tests/cypressUtils'

context('Interactive report - inputs', () => {
  const path = '/'

  before(() => {
    executeReportStubs()
    cy.task('stubDefinitionFeatureTestingInteractive')
    cy.task('stubAsyncRequestSuccessReportTablesCount')
    cy.task('stubRequestSuccessResult20')
    cy.task('stubRequestSuccessResult100')
  })

  describe('Input types', () => {
    describe('Relative date range', () => {
      it('should save the relative daterange', () => {
        // request the report
        requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })

        checkSelectedFilterValues({
          length: 4,
          buttonValues: [
            { key: 'Field 1', value: 'Value 1.2' },
            { key: 'Field 3', value: '01/02/2003 - 04/05/2006' },
            { key: 'Field 7', value: '01/02/2005' },
            { key: 'Field 8', value: 'Value 8.2, Value 8.3' },
          ],
        })

        // update the filters
        showFilters()
        cy.findByRole('tab', { name: 'Preset date ranges' }).click()
        cy.findByRole('radio', { name: 'Tomorrow' }).check()
        applyFilters()

        const expectedUpdatedSelected = [
          { key: 'Field 1', value: 'Value 1.2' },
          { key: 'Field 3', value: 'Tomorrow' },
          { key: 'Field 7', value: '01/02/2005' },
          { key: 'Field 8', value: 'Value 8.2, Value 8.3' },
        ]

        checkSelectedFilterValues({
          length: 4,
          buttonValues: expectedUpdatedSelected,
        })

        // save the filters
        saveDefaultsButton().click()

        // check for saved page furniture
        updateDefaultsButton().should('exist')
        deleteDefaultsButton().should('exist')

        // check the selected filters
        checkSelectedFilterValues({
          length: 4,
          buttonValues: expectedUpdatedSelected,
        })

        // request the report to check it defaults to saved
        requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })

        // check the selected filters
        checkSelectedFilterValues({
          length: 4,
          buttonValues: expectedUpdatedSelected,
        })

        deleteDefaultsButton().click()
      })
    })

    describe('Multiselect', () => {
      it('should save a single multiselect value', () => {
        // request the report
        requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })

        checkSelectedFilterValues({
          length: 4,
          buttonValues: [
            { key: 'Field 1', value: 'Value 1.2' },
            { key: 'Field 3', value: '01/02/2003 - 04/05/2006' },
            { key: 'Field 7', value: '01/02/2005' },
            { key: 'Field 8', value: 'Value 8.2, Value 8.3' },
          ],
        })

        // update the filters
        showFilters()
        cy.findByRole('checkbox', { name: 'Value 8.3' }).uncheck()
        applyFilters()

        const expectedUpdatedSelected = [
          { key: 'Field 1', value: 'Value 1.2' },
          { key: 'Field 3', value: '01/02/2003 - 04/05/2006' },
          { key: 'Field 7', value: '01/02/2005' },
          { key: 'Field 8', value: 'Value 8.2' },
        ]

        checkSelectedFilterValues({
          length: 4,
          buttonValues: expectedUpdatedSelected,
        })

        // save the filters
        saveDefaultsButton().click()

        // check for saved page furniture
        updateDefaultsButton().should('exist')
        deleteDefaultsButton().should('exist')

        // check the selected filters
        checkSelectedFilterValues({
          length: 4,
          buttonValues: expectedUpdatedSelected,
        })

        // request the report to check it defaults to saved
        requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })

        // check the selected filters
        checkSelectedFilterValues({
          length: 4,
          buttonValues: expectedUpdatedSelected,
        })

        deleteDefaultsButton().click()
      })
    })
  })
})
