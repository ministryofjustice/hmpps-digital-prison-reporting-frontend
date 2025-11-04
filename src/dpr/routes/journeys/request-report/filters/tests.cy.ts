describe('Request a report', () => {
  const path = '/embedded/platform/dpr/request-report/report/request-examples/request-example-success/filters'
  const orderPath = '/embedded/platform/dpr/request-report/report/feature-testing/feature-testing-filter-order/filters'
  let field2: Cypress.Chainable<JQuery<HTMLElement>>
  let field3Start: Cypress.Chainable<JQuery<HTMLElement>>
  let field3End: Cypress.Chainable<JQuery<HTMLElement>>
  let field4: Cypress.Chainable<JQuery<HTMLElement>>
  let field5: Cypress.Chainable<JQuery<HTMLElement>>
  let field6: Cypress.Chainable<JQuery<HTMLElement>>
  let field7: Cypress.Chainable<JQuery<HTMLElement>>

  const clearSelectedFilters = () => {
    for (let index = 0; index < 5; index += 1) {
      const selectedFilter = cy.get('#dpr-selected-filters > a:nth-child(1)')
      selectedFilter.click(1, 1)
    }
  }

  const updateFilterValues = () => {
    cy.findByRole('combobox', { name: 'Field 2' }).select('value2.2')
    cy.findByRole('textbox', { name: 'From' }).type('1/2/2003')
    cy.findByRole('textbox', { name: 'To' }).type('4/5/2007')
    cy.findByRole('combobox', { name: 'Field 4' }).type('Inigo Montoya')
    cy.findByRole('textbox', { name: 'Field 6' }).type('Value 6.1')
    cy.findByRole('textbox', { name: 'Field 7' }).type('05/05/2005')
    // multiselect
    cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
    cy.findByRole('checkbox', { name: 'Value 8.2' }).check()
    cy.findByRole('checkbox', { name: 'Value 8.3' }).check()
    cy.findByRole('checkbox', { name: 'Value 8.4' }).check()
  }

  before(() => {
    cy.task('resetStubs')
    cy.task('resetRedis')
    cy.task('stubDefinitions')
    cy.task('stubDefinitionRequestExamplesSuccess')
    cy.task('stubViewAsyncReportingResults')
    cy.task('stubReportsFinishedStatus')
    cy.task('stubRequestSuccessResult20')
    cy.task('stubRequestSuccessReportTablesCount')
    cy.task('stubDefinitionOrderFilters')
  })

  beforeEach(() => {
    cy.visit(path)

    field2 = cy.findByRole('combobox', { name: 'Field 2' })
    field3Start = cy.findByRole('textbox', { name: 'From' })
    field3End = cy.findByRole('textbox', { name: 'To' })
    field4 = cy.findByRole('combobox', { name: 'Field 4' })
    field5 = cy.findByRole('combobox', { name: 'Field 5' })
    field6 = cy.findByRole('textbox', { name: 'Field 6' })
    field7 = cy.findByRole('textbox', { name: 'Field 7' })
  })

  it('is accessible', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  context('Selected filters', () => {
    it('should show the default selected filters', () => {
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link')
          .should('have.length', 6)
          .each((filter, index) => {
            switch (index) {
              case 0:
                cy.wrap(filter).contains('Field 1')
                cy.wrap(filter).contains('Value 1.2')
                break
              case 1:
                cy.wrap(filter).contains('Field 3 start')
                cy.wrap(filter).contains('01/02/2003')
                break
              case 2:
                cy.wrap(filter).contains('Field 3 end')
                cy.wrap(filter).contains('04/05/2006')
                break
              case 3:
                cy.wrap(filter).contains('Field 7')
                cy.wrap(filter).contains('01/02/2005')
                break
              case 4:
                cy.wrap(filter).contains('Field 8')
                cy.wrap(filter).contains('Value 8.2, Value 8.3')
                break
              case 5:
                cy.wrap(filter).contains('Reset filters')
                break
              default:
                break
            }
          })
      })
    })

    it('should remove the selected filter and reset the input', () => {
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').should('have.length', 6)
      })
      clearSelectedFilters()
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').should('have.length', 1)
      })

      cy.findByRole('radio', { name: 'None' }).should('not.be.checked')
      cy.findByRole('radio', { name: 'Value 1.1' }).should('not.be.checked')
      cy.findByRole('radio', { name: 'Value 1.2' }).should('not.be.checked')
      cy.findByRole('radio', { name: 'Value 1.3' }).should('not.be.checked')
      field2.find('option:selected').should('have.text', 'Select your option')
      field3Start.should('have.value', '')
      field3End.should('have.value', '')
      field4.should('have.value', '')
      field5.should('have.value', '')
      field6.should('have.value', '')
      field7.should('have.value', '')
    })

    it('should add selected filters when inputs values are updated', () => {
      clearSelectedFilters()
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').should('have.length', 1)
      })

      updateFilterValues()
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link')
          .should('have.length', 8)
          .each((filter, index) => {
            switch (index) {
              case 0:
                cy.wrap(filter).contains('Field 2')
                cy.wrap(filter).contains('Value 2.2')
                break
              case 1:
                cy.wrap(filter).contains('Field 3 start')
                cy.wrap(filter).contains('01/02/2003')
                break
              case 2:
                cy.wrap(filter).contains('Field 3 end')
                cy.wrap(filter).contains('4/5/2007')
                break
              case 3:
                cy.wrap(filter).contains('Field 4')
                cy.wrap(filter).contains('Inigo Montoya')
                break
              case 4:
                cy.wrap(filter).contains('Field 6')
                cy.wrap(filter).contains('Value 6.1')
                break
              case 5:
                cy.wrap(filter).contains('Field 7')
                cy.wrap(filter).contains('05/05/2005')
                break
              case 6:
                cy.wrap(filter).contains('Field 8')
                cy.wrap(filter).contains('Value 8.1, Value 8.2, Value 8.3 + 1 more')
                break
              default:
                break
            }
          })
      })

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field2=value2.2`)
        expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
        expect(location.search).to.contain(`filters.field3.end=2007-05-04`)
        expect(location.search).to.contain(`filters.field4=Inigo+Montoya`)
        expect(location.search).to.contain(`filters.field6=Value+6.1`)
        expect(location.search).to.contain(`filters.field7=2005-05-05`)
      })
    })

    it('should reset the filters back to their DPD defaults', () => {
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').should('have.length', 6)
      })
      clearSelectedFilters()

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').should('have.length', 1)
      })

      cy.findByRole('link', { name: 'Reset filters' }).click()

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').should('have.length', 6)
      })
    })
  })

  context('Request query parameters', () => {
    it('should correctly set the request query parameters from DPD defaults', () => {
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1=value1.2`)
        expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
        expect(location.search).to.contain(`filters.field3.end=2006-05-04`)
        expect(location.search).to.contain(`filters.field7=2005-02-01`)
        expect(location.search).to.contain(`filters.field8=value8.2&filters.field8=value8.3`)
      })

      clearSelectedFilters()
      updateFilterValues()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field2=value2.2`)
        expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
        expect(location.search).to.contain(`filters.field3.end=2007-05-04`)
        expect(location.search).to.contain(`filters.field4=Inigo+Montoya`)
        expect(location.search).to.contain(`filters.field6=Value+6.1`)
        expect(location.search).to.contain(`filters.field7=2005-05-05`)
        expect(location.search).to.contain(
          `filters.field8=value8.1&filters.field8=value8.2&filters.field8=value8.3&filters.field8=value8.4`,
        )
      })
    })

    it('should correctly set the request query parameters when inputs are updated', () => {
      clearSelectedFilters()
      updateFilterValues()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field2=value2.2`)
        expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
        expect(location.search).to.contain(`filters.field3.end=2007-05-04`)
        expect(location.search).to.contain(`filters.field4=Inigo+Montoya`)
        expect(location.search).to.contain(`filters.field6=Value+6.1`)
        expect(location.search).to.contain(`filters.field7=2005-05-05`)
        expect(location.search).to.contain(
          `filters.field8=value8.1&filters.field8=value8.2&filters.field8=value8.3&filters.field8=value8.4`,
        )
      })
    })
  })

  context('User defined defaults', () => {
    it('should save the user defined defaults', () => {
      clearSelectedFilters()
      updateFilterValues()

      cy.findByRole('button', { name: 'Save current filter values as defaults' }).click()

      cy.location().should((location) => {
        expect(location.search).to.contain('defaultsSaved=true')
      })

      cy.findByRole('button', { name: 'Update defaults' }).should('exist')
      cy.findByRole('button', { name: 'Delete defaults' }).should('exist')
    })

    it('should pre-fill the filter values with the saved defaults next visit', () => {
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field2=value2.2`)
        expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
        expect(location.search).to.contain(`filters.field3.end=2007-05-04`)
        expect(location.search).to.contain(`filters.field4=Inigo+Montoya`)
        expect(location.search).to.contain(`filters.field6=Value+6.1`)
        expect(location.search).to.contain(`filters.field7=2005-05-05`)
        expect(location.search).not.to.contain(`defaultsSaved=true`)
        expect(location.search).to.contain(
          `filters.field8=value8.1&filters.field8=value8.2&filters.field8=value8.3&filters.field8=value8.4`,
        )
      })

      cy.findByRole('button', { name: 'Update defaults' }).should('exist')
      cy.findByRole('button', { name: 'Delete defaults' }).should('exist')
    })

    it('should update the saved defaults', () => {
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').eq(1).click(1, 1)
        cy.findAllByRole('link').eq(1).click(1, 1)
        cy.findAllByRole('link').eq(1).click(1, 1)
      })

      cy.findByRole('checkbox', { name: 'Value 8.2' }).uncheck()
      cy.findByRole('checkbox', { name: 'Value 8.3' }).uncheck()
      cy.findByRole('combobox', { name: 'Field 2' }).select('value2.3')

      cy.findByRole('button', { name: 'Update defaults' }).click()

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').should('have.length', 5)
      })

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field2=value2.3`)
        expect(location.search).not.to.contain(`filters.field3.start=2003-02-01`)
        expect(location.search).not.to.contain(`filters.field3.end=2007-05-04`)
        expect(location.search).to.contain(`filters.field6=Value+6.1`)
        expect(location.search).to.contain(`filters.field7=2005-05-05`)
        expect(location.search).to.contain(`defaultsSaved=true`)
        expect(location.search).not.to.contain(`filters.field4=Inigo+Montoya`)
        expect(location.search).not.to.contain(
          `filters.field8=value8.1&filters.field8=value8.2&filters.field8=value8.3&filters.field8=value8.4`,
        )
        expect(location.search).to.contain(`&filters.field8=value8.1&filters.field8=value8.4`)
      })

      cy.reload()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field2=value2.3`)
        expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
        expect(location.search).to.contain(`filters.field3.end=2007-05-04`)
        expect(location.search).to.contain(`filters.field6=Value+6.1`)
        expect(location.search).to.contain(`filters.field7=2005-05-05`)
        expect(location.search).to.contain(`defaultsSaved=true`)
        expect(location.search).not.to.contain(`filters.field4=Inigo+Montoya`)
        expect(location.search).not.to.contain(
          `filters.field8=value8.1&filters.field8=value8.2&filters.field8=value8.3&filters.field8=value8.4`,
        )
        expect(location.search).to.contain(`&filters.field8=value8.1&filters.field8=value8.4`)
      })
    })

    it('should reset the defaults back to the user saved defaults', () => {
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').eq(1).click(1, 1)
        cy.findAllByRole('link').eq(1).click(1, 1)
        cy.findAllByRole('link').eq(1).click(1, 1)
      })

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').should('have.length', 2)
      })

      cy.findByRole('link', { name: 'Reset filters' }).click()

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').should('have.length', 5)
      })
    })

    it('should remove the save defaults', () => {
      cy.findByRole('button', { name: 'Delete defaults' }).click()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1=value1.2`)
        expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
        expect(location.search).to.contain(`filters.field3.end=2006-05-04`)
        expect(location.search).to.contain(`filters.field7=2005-02-01`)
        expect(location.search).to.contain(`filters.field8=value8.2&filters.field8=value8.3`)
      })
    })
  })

  context('Submission', () => {
    it('should submit the report details in the request', () => {
      cy.intercept({
        method: 'POST',
        url: '/embedded/platform/dpr/request-report/report/**/**/filters?**',
      }).as('requestSubmit')

      cy.findByRole('button', { name: /Request/ }).click()

      cy.wait('@requestSubmit')
        .its('request')
        .then((request) => {
          cy.wrap(request).its('body').should('include', 'reportId=request-examples')
          cy.wrap(request).its('body').should('include', 'name=Successful+Report')
          cy.wrap(request).its('body').should('include', 'reportName=Successful+Report')
          cy.wrap(request).its('body').should('include', 'id=request-example-success')
        })
    })

    it('should submit the request with the correct query params', () => {
      cy.intercept({
        method: 'POST',
        url: '/embedded/platform/dpr/request-report/report/**/**/filters?**',
      }).as('requestSubmit')

      cy.findByRole('button', { name: /Request/ }).click()

      cy.wait('@requestSubmit')
        .its('request')
        .then((request) => {
          expect(request.query).to.have.property('filters.field1', 'value1.2')
          expect(request.query).to.have.property('filters.field3.end', '2006-05-04')
          expect(request.query).to.have.property('filters.field3.start', '2003-02-01')
          expect(request.query).to.have.property('filters.field7', '2005-02-01')
          expect(request.query).to.have.property('filters.field8')
          cy.wrap(request.query['filters.field8']).should('deep.eq', ['value8.2', 'value8.3'])
          expect(request.query).to.have.property('sortColumn', 'field1')
          expect(request.query).to.have.property('sortedAsc', 'false')
        })
    })
  })

  context('Filter order', () => {
    beforeEach(() => {
      cy.visit(orderPath)
    })

    it('should order the filters correctly', () => {
      cy.findAllByLabelText(/Filters/).within(() => {
        cy.findAllByRole('textbox').each((el, idx) => {
          switch (idx) {
            case 0:
              cy.wrap(el)
                .should('have.attr', 'display-name')
                .then((displayName) => {
                  expect(displayName).contains('Field 2')
                })
              break
            case 1:
              cy.wrap(el)
                .should('have.attr', 'display-name')
                .then((displayName) => {
                  expect(displayName).contains('Field 3')
                })
              break
            case 2:
              cy.wrap(el)
                .should('have.attr', 'display-name')
                .then((displayName) => {
                  expect(displayName).contains('Field 1')
                })
              break
            default:
              break
          }
        })
      })
    })
  })
})
