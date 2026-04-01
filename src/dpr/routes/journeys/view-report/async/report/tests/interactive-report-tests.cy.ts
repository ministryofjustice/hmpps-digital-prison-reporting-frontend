import {
  checkSelectedFilterValues,
  requestReport,
  executeReportStubs,
} from '../../../../../../../../cypress-tests/cypressUtils'
import DateMapper from '../../../../../../utils/DateMapper/DateMapper'

context('Interactive report', () => {
  const path = '/embedded/platform'
  let viewReportUrl: string

  const applyFilters = () => {
    cy.findByRole('button', { name: 'Apply filters' }).click()
  }

  const showFilters = () => {
    cy.findAllByRole('group')
      .contains(/Show filters/)
      .click()
  }

  before(() => {
    executeReportStubs()
    cy.task('stubDefinitionFeatureTestingInteractive')
    cy.task('stubAsyncRequestSuccessReportTablesCount')
    cy.task('stubRequestSuccessResult20')
    cy.task('stubRequestSuccessResult100')
  })

  // describe('List report page with weird data', () => {
  //   beforeEach(() => {
  //     executeReportStubs()
  //     cy.task('stubDefinitionFeatureTestingInteractive')
  //     cy.task('stubAsyncRequestSuccessReportTablesCount')
  //     cy.task('stubRequestSuccessResult20WithWeirdData')
  //   })

  //   it('should show results correctly even when input data is strange', () => {
  //     requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })
  //     cy.findAllByRole('table')
  //       .eq(1)
  //       .within(() => {
  //         cy.findAllByRole('row').eq(1).findAllByRole('cell').eq(2).should('have.text', '01/02/03 01:00')
  //         cy.findAllByRole('row')
  //           .eq(1)
  //           .findAllByRole('cell')
  //           .eq(4)
  //           .should('be.visible')
  //           .then((cell) => {
  //             expect(cell.text().trim()).to.equal('')
  //           })
  //         cy.findAllByRole('row')
  //           .eq(0)
  //           .findByRole('link', { name: /Field 1/, description: /Sorted ascending/, hidden: true })
  //           .should('exist')
  //         cy.findAllByRole('row')
  //           .eq(0)
  //           .findByRole('link', { name: /Field 2/, description: /Not sorted/, hidden: true })
  //           .should('exist')
  //       })
  //   })
  // })

  // describe('Apply filters', () => {
  //   before(() => {
  //     requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })
  //     cy.url().then((url) => {
  //       viewReportUrl = url
  //     })
  //   })

  //   beforeEach(() => {
  //     cy.visit(viewReportUrl)
  //   })

  //   const removeAllFilters = () => {
  //     for (let index = 0; index < 4; index += 1) {
  //       cy.findByLabelText('Selected filters').within(() => {
  //         cy.findAllByRole('link').first().click()
  //       })
  //     }
  //   }

  //   describe('Date range', () => {
  //     it('should apply the date range', () => {
  //       cy.findByRole('textbox', { name: 'From' }).should('have.value', '01/02/2003')
  //       cy.findByRole('textbox', { name: 'To' }).should('have.value', '04/05/2006')

  //       removeAllFilters()
  //       showFilters()

  //       cy.findByRole('textbox', { name: 'From' }).type('02/05/2025')
  //       cy.findByRole('textbox', { name: 'To' }).type('05/07/2025').blur()

  //       applyFilters()

  //       cy.location().should((location) => {
  //         expect(location.search).to.contain(`filters.field3.start=2025-05-02`)
  //         expect(location.search).to.contain(`filters.field3.end=2025-07-05`)
  //       })

  //       checkSelectedFilterValues({ length: 2, buttonValues: [{ key: 'Field 3', value: '02/05/2025 - 05/07/2025' }] })
  //     })

  //     it('should apply the relative daterange', () => {
  //       removeAllFilters()
  //       showFilters()

  //       cy.findByRole('tab', { name: 'Preset date ranges' }).click()
  //       cy.findByRole('radio', { name: 'Tomorrow' }).check()

  //       applyFilters()

  //       let startValue: string | number | string[] | undefined
  //       let endValue: string | number | string[] | undefined
  //       cy.findByRole('textbox', { name: 'From' })
  //         .invoke('val')
  //         .should('not.be.empty')
  //         .then((val) => {
  //           startValue = val
  //         })
  //       cy.findByRole('textbox', { name: 'To' })
  //         .invoke('val')
  //         .should('not.be.empty')
  //         .then((val) => {
  //           endValue = val
  //         })

  //       const dateMapper = new DateMapper()
  //       cy.location().should((location) => {
  //         expect(location.search).to.contain(
  //           `filters.field3.start=${dateMapper.toDateString(<string>startValue, 'iso')}`,
  //         )
  //         expect(location.search).to.contain(`filters.field3.end=${dateMapper.toDateString(<string>endValue, 'iso')}`)
  //         expect(location.search).to.contain(`filters.field3.relative-duration=tomorrow`)
  //       })

  //       checkSelectedFilterValues({ length: 2, buttonValues: [{ key: 'Field 3', value: 'Tomorrow' }] })
  //     })
  //   })

  //   describe('Multiselect', () => {
  //     it('should apply the multiselect values', () => {
  //       cy.findByRole('checkbox', { name: 'Value 8.2' }).should('be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.3' }).should('be.checked')

  //       removeAllFilters()

  //       cy.findByRole('checkbox', { name: 'Value 8.1' }).should('not.be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.2' }).should('not.be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.3' }).should('not.be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.4' }).should('not.be.checked')

  //       showFilters()

  //       cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
  //       cy.findByRole('checkbox', { name: 'Value 8.3' }).check()

  //       applyFilters()

  //       cy.findByRole('checkbox', { name: 'Value 8.1' }).should('be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.2' }).should('not.be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.3' }).should('be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.4' }).should('not.be.checked')

  //       checkSelectedFilterValues({ length: 2, buttonValues: [{ key: 'Field 8', value: 'Value 8.1, Value 8.3' }] })
  //     })

  //     it('should set the selected filter values correctly', () => {
  //       cy.findByRole('checkbox', { name: 'Value 8.2' }).should('be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.3' }).should('be.checked')

  //       removeAllFilters()

  //       cy.findByRole('checkbox', { name: 'Value 8.1' }).should('not.be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.2' }).should('not.be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.3' }).should('not.be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.4' }).should('not.be.checked')

  //       showFilters()

  //       cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
  //       cy.findByRole('checkbox', { name: 'Value 8.2' }).check()
  //       cy.findByRole('checkbox', { name: 'Value 8.3' }).check()
  //       cy.findByRole('checkbox', { name: 'Value 8.4' }).check()

  //       applyFilters()

  //       cy.findByRole('checkbox', { name: 'Value 8.1' }).should('be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.2' }).should('be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.3' }).should('be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.4' }).should('be.checked')

  //       checkSelectedFilterValues({
  //         length: 2,
  //         buttonValues: [{ key: 'Field 8', value: 'Value 8.1, Value 8.2, Value 8.3 + 1 more' }],
  //       })
  //     })

  //     it('should set the values correctly when only one checkbox selected', () => {
  //       removeAllFilters()

  //       cy.findByRole('checkbox', { name: 'Value 8.1' }).should('not.be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.2' }).should('not.be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.3' }).should('not.be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.4' }).should('not.be.checked')

  //       showFilters()

  //       cy.findByRole('checkbox', { name: 'Value 8.1' }).check()

  //       applyFilters()

  //       cy.findByRole('checkbox', { name: 'Value 8.1' }).should('be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.2' }).should('not.be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.3' }).should('not.be.checked')
  //       cy.findByRole('checkbox', { name: 'Value 8.4' }).should('not.be.checked')

  //       checkSelectedFilterValues({
  //         length: 2,
  //         buttonValues: [{ key: 'Field 8', value: 'Value 8.1' }],
  //       })
  //     })
  //   })

  //   it('Applying filters should persist current applied columns', () => {
  //     cy.findAllByRole('group')
  //       .contains(/Show columns/)
  //       .should('be.visible')
  //       .click()

  //     cy.findByRole('checkbox', { name: 'Field 1' }).uncheck()
  //     cy.findByRole('checkbox', { name: 'Field 3' }).uncheck()
  //     cy.findByRole('checkbox', { name: 'Field 5' }).check()
  //     cy.findByRole('checkbox', { name: 'Field 7' }).uncheck()
  //     cy.findByRole('checkbox', { name: 'Field 8' }).check()

  //     cy.findByRole('button', { name: 'Apply columns' }).click()
  //     cy.findAllByRole('group').contains('Show columns (4 of 8 shown)')

  //     showFilters()
  //     cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
  //     cy.findByRole('checkbox', { name: 'Value 8.3' }).check()
  //     applyFilters()

  //     cy.findAllByRole('group').contains('Show columns (4 of 8 shown)')
  //   })
  // })

  describe('User defined interactive defaults', () => {
    const saveDefaultsButton = () => {
      return cy.findByRole('button', { name: 'Save current filter values as defaults' })
    }
    const updateDefaultsButton = () => {
      return cy.findByRole('button', { name: 'Update defaults' })
    }
    const deleteDefaultsButton = () => {
      return cy.findByRole('button', { name: 'Delete defaults' })
    }

    const checkSelectedFiltersInUserReports = ({
      name,
      product,
      length,
      selectedFilters,
    }: {
      name: string
      product: string
      length: number
      selectedFilters: { key: string; value: string }[]
    }) => {
      cy.findByLabelText(/Viewed \(/).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return Boolean(element.textContent?.includes(name)) && Boolean(element.textContent?.includes(product))
          },
        }).within(() => {
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

    it('should save the interactive filters correctly', () => {
      // request the report
      requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })

      // check the default filters
      checkSelectedFilterValues({
        length: 5,
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
        length: 6,
        buttonValues: selectedFiltersButtonValues,
      })

      // save the filters
      saveDefaultsButton().click()

      // check for saved page furniture
      updateDefaultsButton().should('exist')
      deleteDefaultsButton().should('exist')

      // check the selected filters
      checkSelectedFilterValues({
        length: 6,
        buttonValues: selectedFiltersButtonValues,
      })
    })

    it('should init the report with saved interactive defaults', () => {
      // request the report
      requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })
      cy.url().then((url) => {
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
        length: 6,
        buttonValues: selectedFiltersButtonValues,
      })

      cy.visit(path)
      cy.findByRole('tab', { name: /Viewed/ }).click()
      checkSelectedFiltersInUserReports({
        name: 'Interactive Report',
        product: 'Interactive Report',
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
        length: 6,
        buttonValues: [...savedDefaultSelectedFilters],
      })

      // apply some filters
      showFilters()
      cy.findByRole('checkbox', { name: 'Value 8.1' }).uncheck()
      cy.findByRole('checkbox', { name: 'Value 8.3' }).uncheck()
      cy.findByRole('combobox', { name: 'Field 2' }).select('value2.3')
      applyFilters()

      checkSelectedFilterValues({
        length: 6,
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
        product: 'Interactive Report',
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

      cy.findByRole('link', { name: 'Reset filters' }).click()

      checkSelectedFilterValues({
        length: 6,
        buttonValues: savedDefaultSelectedFilters,
      })

      cy.visit(path)
      cy.findByRole('tab', { name: /Viewed/ }).click()
      checkSelectedFiltersInUserReports({
        name: 'Interactive Report',
        product: 'Interactive Report',
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
        length: 6,
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
        length: 6,
        buttonValues: expectedSelectedValues,
      })

      updateDefaultsButton().click()

      checkSelectedFilterValues({
        length: 6,
        buttonValues: expectedSelectedValues,
      })

      requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })
      cy.url().then((url) => {
        viewReportUrl = url
      })

      // check the initial filter values match the default
      checkSelectedFilterValues({
        length: 6,
        buttonValues: expectedSelectedValues,
      })

      // check saved defaults page furniture
      updateDefaultsButton().should('exist')
      deleteDefaultsButton().should('exist')

      cy.visit(path)
      cy.findByRole('tab', { name: /Viewed/ }).click()
      checkSelectedFiltersInUserReports({
        name: 'Interactive Report',
        product: 'Interactive Report',
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
        length: 6,
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
        length: 5,
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
        product: 'Interactive Report',
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

    describe('Input types', () => {
      describe('Relative date range', () => {
        it('should save the relative daterange', () => {
          // request the report
          requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })

          checkSelectedFilterValues({
            length: 5,
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
            length: 5,
            buttonValues: expectedUpdatedSelected,
          })

          // save the filters
          saveDefaultsButton().click()

          // check for saved page furniture
          updateDefaultsButton().should('exist')
          deleteDefaultsButton().should('exist')

          // check the selected filters
          checkSelectedFilterValues({
            length: 5,
            buttonValues: expectedUpdatedSelected,
          })

          // request the report to check it defaults to saved
          requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })

          // check the selected filters
          checkSelectedFilterValues({
            length: 5,
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
            length: 5,
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
            length: 5,
            buttonValues: expectedUpdatedSelected,
          })

          // save the filters
          saveDefaultsButton().click()

          // check for saved page furniture
          updateDefaultsButton().should('exist')
          deleteDefaultsButton().should('exist')

          // check the selected filters
          checkSelectedFilterValues({
            length: 5,
            buttonValues: expectedUpdatedSelected,
          })

          // request the report to check it defaults to saved
          requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })

          // check the selected filters
          checkSelectedFilterValues({
            length: 5,
            buttonValues: expectedUpdatedSelected,
          })

          deleteDefaultsButton().click()
        })
      })
    })
  })

  describe('Sorting', () => {
    before(() => {
      requestReport({ name: 'Interactive Report', description: 'this is an interactive report', path })
      cy.url().then((url) => {
        viewReportUrl = url
      })
    })

    beforeEach(() => {
      cy.visit(viewReportUrl)
    })

    it('should show the sort direction in the column header and the url', () => {
      cy.findByRole('link', { name: 'Reset filters' }).click()

      // Initial state
      cy.findByRole('link', { name: 'Field 1' }).should('have.class', 'data-table-header-button-sort-ascending')
      cy.findByRole('link', { name: 'Field 2' }).should('have.class', 'data-table-header-button-sort-none')

      // Sort desc by field 1
      cy.findByRole('link', { name: 'Field 1' }).click()
      cy.findByRole('link', { name: 'Field 1' }).should('have.class', 'data-table-header-button-sort-descending')
      cy.findByRole('link', { name: 'Field 2' }).should('have.class', 'data-table-header-button-sort-none')
      cy.location().should((location) => {
        expect(location.search).to.contain(`&sortColumn=field1&sortedAsc=false`)
        expect(location.search).to.contain(`filters.field8=value8.2&filters.field8=value8.3`)
      })

      // Sort asc by field 1
      cy.findByRole('link', { name: 'Field 1' }).click()
      cy.findByRole('link', { name: 'Field 1' }).should('have.class', 'data-table-header-button-sort-ascending')
      cy.findByRole('link', { name: 'Field 2' }).should('have.class', 'data-table-header-button-sort-none')
      cy.location().should((location) => {
        expect(location.search).to.contain(`&sortColumn=field1&sortedAsc=true`)
        expect(location.search).to.contain(`filters.field8=value8.2&filters.field8=value8.3`)
      })

      // Sort asc by field 2
      cy.findByRole('link', { name: 'Field 2' }).click()
      cy.findByRole('link', { name: 'Field 2' }).should('have.class', 'data-table-header-button-sort-ascending')
      cy.findByRole('link', { name: 'Field 1' }).should('have.class', 'data-table-header-button-sort-none')
      cy.location().should((location) => {
        expect(location.search).to.contain(`&sortColumn=field2&sortedAsc=true`)
        expect(location.search).to.contain(`filters.field8=value8.2&filters.field8=value8.3`)
      })

      // Sort desc by field 2
      cy.findByRole('link', { name: 'Field 2' }).click()
      cy.findByRole('link', { name: 'Field 2' }).should('have.class', 'data-table-header-button-sort-descending')
      cy.findByRole('link', { name: 'Field 1' }).should('have.class', 'data-table-header-button-sort-none')
      cy.location().should((location) => {
        expect(location.search).to.contain(`&sortColumn=field2&sortedAsc=false`)
        expect(location.search).to.contain(`filters.field8=value8.2&filters.field8=value8.3`)
      })
    })
  })
})
