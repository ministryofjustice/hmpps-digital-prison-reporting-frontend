import {
  applyFilters,
  checkSelectedFilterValues,
  deleteDefaultsButton,
  executeReportStubs,
  getMyReportRowCell,
  requestReport,
  saveDefaultsButton,
  showFilters,
  updateDefaultsButton,
} from '../../../../../../../../cypress-tests/cypressUtils'

context('Interactive report', () => {
  const path = '/'
  let viewReportUrl: string

  const checkSelectedFiltersInUserReports = ({
    name,
    length,
    selectedFilters,
  }: {
    name: string
    length: number
    selectedFilters: { key: string; value: string }[]
  }) => {
    cy.findByLabelText(/Viewed \(/).within(() => {
      getMyReportRowCell({ name, cell: 'filters' }).within(() => {
        cy.findAllByRole('listitem')
          .should('have.length', length)
          .each((li, index) => {
            if (selectedFilters[index]) {
              const { key, value } = selectedFilters[index]
              cy.wrap(li).contains(key)
              cy.wrap(li).contains(value)
            }
          })
      })
    })
  }

  before(() => {
    executeReportStubs()
    cy.task('stubDefinitionFeatureTestingInteractive')
    cy.task('stubAsyncRequestSuccessReportTablesCount')
    cy.task('stubRequestSuccessResult20')
    cy.task('stubRequestSuccessResult100')
  })

  describe('List report page with weird data', () => {
    beforeEach(() => {
      executeReportStubs()
      cy.task('stubDefinitionFeatureTestingInteractive')
      cy.task('stubAsyncRequestSuccessReportTablesCount')
      cy.task('stubRequestSuccessResult20WithWeirdData')
    })

    it('should show results correctly even when input data is strange', () => {
      requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })
      cy.findAllByRole('table')
        .eq(1)
        .within(() => {
          cy.findAllByRole('row').eq(1).findAllByRole('cell').eq(2).should('have.text', '01/02/03 01:00')
          cy.findAllByRole('row')
            .eq(1)
            .findAllByRole('cell')
            .eq(4)
            .should('be.visible')
            .then(cell => {
              expect(cell.text().trim()).to.equal('')
            })
          cy.findAllByRole('row')
            .eq(0)
            .findByRole('button', { name: /Field 1/, hidden: true })
            .should('exist')
          cy.findAllByRole('row')
            .eq(0)
            .findByRole('button', { name: /Field 2/, hidden: true })
            .should('exist')
        })
    })
  })

  describe('User defined interactive defaults', () => {
    it('should save the interactive filters correctly', () => {
      // request the report
      requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })

      // check the default filters
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
      cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.4' }).check()
      cy.findByRole('combobox', { name: 'Field 2' }).select('value2.2')
      applyFilters()

      const selectedFiltersButtonValues = [
        { key: 'Field 1', value: 'Value 1.2' },
        { key: 'Field 2', value: 'Value 2.2' },
        { key: 'Field 3', value: '01/02/2003 - 04/05/2006' },
        { key: 'Field 7', value: '01/02/2005' },
        { key: 'Field 8', value: 'Value 8.1, Value 8.2, Value 8.3 + 1 more' },
      ]
      checkSelectedFilterValues({
        length: 5,
        buttonValues: selectedFiltersButtonValues,
      })

      // save the filters
      saveDefaultsButton().click()

      // check for saved page furniture
      updateDefaultsButton().should('exist')
      deleteDefaultsButton().should('exist')

      // check the selected filters
      checkSelectedFilterValues({
        length: 5,
        buttonValues: selectedFiltersButtonValues,
      })
    })

    it('should init the report with saved interactive defaults', () => {
      // request the report
      requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })
      cy.url().then(url => {
        viewReportUrl = url
      })

      // check saved defaults page furniture
      updateDefaultsButton().should('exist')
      deleteDefaultsButton().should('exist')

      const selectedFiltersButtonValues = [
        { key: 'Field 1', value: 'Value 1.2' },
        { key: 'Field 2', value: 'Value 2.2' },
        { key: 'Field 3', value: '01/02/2003 - 04/05/2006' },
        { key: 'Field 7', value: '01/02/2005' },
        { key: 'Field 8', value: 'Value 8.1, Value 8.2, Value 8.3 + 1 more' },
      ]
      checkSelectedFilterValues({
        length: 5,
        buttonValues: selectedFiltersButtonValues,
      })

      cy.visit(path)
      cy.findByRole('tab', { name: /Viewed/ }).click()
      checkSelectedFiltersInUserReports({
        name: 'Interactive Report',
        length: 7,
        selectedFilters: [
          { key: 'Sort Column', value: 'Field 1' },
          { key: 'Sort Direction', value: 'Ascending' },
          ...selectedFiltersButtonValues,
        ],
      })
    })

    it('should reset the filter values to the saved defaults', () => {
      cy.visit(viewReportUrl)

      // check saved defaults page furniture
      updateDefaultsButton().should('exist')
      deleteDefaultsButton().should('exist')

      const savedDefaultSelectedFilters = [
        { key: 'Field 1', value: 'Value 1.2' },
        { key: 'Field 2', value: 'Value 2.2' },
        { key: 'Field 3', value: '01/02/2003 - 04/05/2006' },
        { key: 'Field 7', value: '01/02/2005' },
        { key: 'Field 8', value: 'Value 8.1, Value 8.2, Value 8.3 + 1 more' },
      ]
      checkSelectedFilterValues({
        length: 5,
        buttonValues: [...savedDefaultSelectedFilters],
      })

      // apply some filters
      showFilters()
      cy.findByRole('checkbox', { name: 'Value 8.1' }).uncheck()
      cy.findByRole('checkbox', { name: 'Value 8.3' }).uncheck()
      cy.findByRole('combobox', { name: 'Field 2' }).select('value2.3')
      applyFilters()

      checkSelectedFilterValues({
        length: 5,
        buttonValues: [
          { key: 'Field 1', value: 'Value 1.2' },
          { key: 'Field 2', value: 'Value 2.3' },
          { key: 'Field 3', value: '01/02/2003 - 04/05/2006' },
          { key: 'Field 7', value: '01/02/2005' },
          { key: 'Field 8', value: 'Value 8.4' },
        ],
      })

      cy.visit(path)
      cy.findByRole('tab', { name: /Viewed/ }).click()
      checkSelectedFiltersInUserReports({
        name: 'Interactive Report',
        length: 7,
        selectedFilters: [
          { key: 'Sort Column', value: 'Field 1' },
          { key: 'Sort Direction', value: 'Ascending' },
          { key: 'Field 1', value: 'Value 1.2' },
          { key: 'Field 2', value: 'Value 2.3' },
          { key: 'Field 3', value: '01/02/2003 - 04/05/2006' },
          { key: 'Field 7', value: '01/02/2005' },
          { key: 'Field 8', value: 'Value 8.4' },
        ],
      })

      cy.visit(viewReportUrl)

      cy.findByRole('button', { name: 'Reset filters' }).click()

      checkSelectedFilterValues({
        length: 5,
        buttonValues: savedDefaultSelectedFilters,
      })

      cy.visit(path)
      cy.findByRole('tab', { name: /Viewed/ }).click()
      checkSelectedFiltersInUserReports({
        name: 'Interactive Report',
        length: 7,
        selectedFilters: [
          { key: 'Sort Column', value: 'Field 1' },
          { key: 'Sort Direction', value: 'Ascending' },
          ...savedDefaultSelectedFilters,
        ],
      })
    })

    it('should update the filter values and init the report with the updated interactive defaults', () => {
      cy.visit(viewReportUrl)

      // check saved defaults page furniture
      updateDefaultsButton().should('exist')
      deleteDefaultsButton().should('exist')

      checkSelectedFilterValues({
        length: 5,
        buttonValues: [
          { key: 'Field 1', value: 'Value 1.2' },
          { key: 'Field 2', value: 'Value 2.2' },
          { key: 'Field 3', value: '01/02/2003 - 04/05/2006' },
          { key: 'Field 7', value: '01/02/2005' },
          { key: 'Field 8', value: 'Value 8.1, Value 8.2, Value 8.3 + 1 more' },
        ],
      })

      // apply some filters
      showFilters()
      cy.findByRole('checkbox', { name: 'Value 8.1' }).uncheck()
      cy.findByRole('checkbox', { name: 'Value 8.3' }).uncheck()
      cy.findByRole('combobox', { name: 'Field 2' }).select('value2.3')
      applyFilters()

      const expectedSelectedValues = [
        { key: 'Field 1', value: 'Value 1.2' },
        { key: 'Field 2', value: 'Value 2.3' },
        { key: 'Field 3', value: '01/02/2003 - 04/05/2006' },
        { key: 'Field 7', value: '01/02/2005' },
        { key: 'Field 8', value: 'Value 8.2, Value 8.4' },
      ]

      checkSelectedFilterValues({
        length: 5,
        buttonValues: expectedSelectedValues,
      })

      updateDefaultsButton().click()

      checkSelectedFilterValues({
        length: 5,
        buttonValues: expectedSelectedValues,
      })

      requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })
      cy.url().then(url => {
        viewReportUrl = url
      })

      // check the initial filter values match the default
      checkSelectedFilterValues({
        length: 5,
        buttonValues: expectedSelectedValues,
      })

      // check saved defaults page furniture
      updateDefaultsButton().should('exist')
      deleteDefaultsButton().should('exist')

      cy.visit(path)
      cy.findByRole('tab', { name: /Viewed/ }).click()
      checkSelectedFiltersInUserReports({
        name: 'Interactive Report',
        length: 7,
        selectedFilters: [
          { key: 'Sort Column', value: 'Field 1' },
          { key: 'Sort Direction', value: 'Ascending' },
          ...expectedSelectedValues,
        ],
      })
    })

    it('should delete the saved defaults', () => {
      cy.visit(viewReportUrl)

      checkSelectedFilterValues({
        length: 5,
        buttonValues: [
          { key: 'Field 1', value: 'Value 1.2' },
          { key: 'Field 2', value: 'Value 2.3' },
          { key: 'Field 3', value: '01/02/2003 - 04/05/2006' },
          { key: 'Field 7', value: '01/02/2005' },
          { key: 'Field 8', value: 'Value 8.2, Value 8.4' },
        ],
      })

      deleteDefaultsButton().click()

      // Expect DPD defaults to be applied
      checkSelectedFilterValues({
        length: 4,
        buttonValues: [
          { key: 'Field 1', value: 'Value 1.2' },
          { key: 'Field 3', value: '01/02/2003 - 04/05/2006' },
          { key: 'Field 7', value: '01/02/2005' },
          { key: 'Field 8', value: 'Value 8.2, Value 8.3' },
        ],
      })

      cy.visit(path)
      cy.findByRole('tab', { name: /Viewed/ }).click()
      checkSelectedFiltersInUserReports({
        name: 'Interactive Report',
        length: 6,
        selectedFilters: [
          { key: 'Sort Column', value: 'Field 1' },
          { key: 'Sort Direction', value: 'Ascending' },
          { key: 'Field 1', value: 'Value 1.2' },
          { key: 'Field 3', value: '01/02/2003 - 04/05/2006' },
          { key: 'Field 7', value: '01/02/2005' },
          { key: 'Field 8', value: 'Value 8.2, Value 8.3' },
        ],
      })
    })
  })
})
