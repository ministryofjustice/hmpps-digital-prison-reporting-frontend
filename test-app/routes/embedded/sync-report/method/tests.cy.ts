context('Embedded sync report by method', () => {
  const path = '/embedded/sync/method'

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  describe('Actions', () => {
    it('should show the print screen action', () => {
      cy.findByLabelText(/Print screen/)
        .should('be.visible')
        .should('not.be.disabled')
    })

    it('should show the copy report link action', () => {
      cy.findByLabelText(/Copy report link/).should('be.visible')
    })
  })

  describe('report details', () => {
    it('should show the product name', () => {
      cy.findAllByRole('heading', { name: 'Test Variant' }).should('be.visible')
      cy.findAllByRole('heading', { name: 'Method' }).should('be.visible')
    })

    it('should show the report details', () => {
      cy.findAllByRole('group').contains('Report details').should('be.visible').click()

      cy.findAllByRole('group')
        .contains('Report details')
        .parent()
        .parent()
        .within(() => {
          cy.findAllByRole('row').each((row, index) => {
            cy.wrap(row).within(() => {
              switch (index) {
                case 0:
                  cy.findAllByRole('cell', { name: 'Name:' }).should('exist')
                  cy.findAllByRole('cell', { name: 'Test Variant' }).should('exist')
                  break
                case 1:
                  cy.findAllByRole('cell', { name: 'Product:' }).should('exist')
                  cy.findAllByRole('cell', { name: 'Method' }).should('exist')
                  break
                case 2:
                  cy.findAllByRole('cell', { name: 'Description:' }).should('exist')
                  cy.findAllByRole('cell', { name: 'Test Variant Description' }).should('exist')
                  break
                case 3:
                  cy.findAllByRole('cell', { name: 'Classification:' }).should('exist')
                  cy.findAllByRole('cell', { name: 'OFFICIAL' }).should('exist')
                  break
                default:
                  break
              }
            })
          })
        })
    })
  })

  describe('Columns', () => {
    const expectInitialisedColumns = () => {
      cy.findByRole('checkbox', { name: 'Field 1' }).should('be.checked').should('not.be.disabled')
      cy.findByRole('checkbox', { name: 'Field 2' }).should('be.checked').should('be.disabled')
      cy.findByRole('checkbox', { name: 'Field 3' }).should('be.checked').should('not.be.disabled')
      cy.findByRole('checkbox', { name: 'Field 4' }).should('not.be.checked').should('not.be.disabled')
      cy.findByRole('checkbox', { name: 'Field 5' }).should('not.be.checked').should('not.be.disabled')
      cy.findByRole('checkbox', { name: 'Field 6' }).should('be.checked').should('not.be.disabled')
      cy.findByRole('checkbox', { name: 'Field 7' }).should('not.be.checked').should('not.be.disabled')

      cy.location().should((location) => {
        expect(location.search).to.contain(`columns=field1`)
        expect(location.search).to.contain(`columns=field2`)
        expect(location.search).to.contain(`columns=field3`)
        expect(location.search).not.to.contain(`columns=field4`)
        expect(location.search).not.to.contain(`columns=field5`)
        expect(location.search).to.contain(`columns=field6`)
        expect(location.search).not.to.contain(`columns=field7`)
      })
    }

    const setColumnValues = () => {
      cy.findByRole('checkbox', { name: 'Field 1' }).uncheck()
      cy.findByRole('checkbox', { name: 'Field 3' }).uncheck()
      cy.findByRole('checkbox', { name: 'Field 5' }).check()
      cy.findByRole('checkbox', { name: 'Field 7' }).check()
    }

    const expectUpdatedColumns = () => {
      cy.findByRole('checkbox', { name: 'Field 1' }).should('not.be.checked').should('not.be.disabled')
      cy.findByRole('checkbox', { name: 'Field 2' }).should('be.checked').should('be.disabled')
      cy.findByRole('checkbox', { name: 'Field 3' }).should('not.be.checked').should('not.be.disabled')
      cy.findByRole('checkbox', { name: 'Field 4' }).should('not.be.checked').should('not.be.disabled')
      cy.findByRole('checkbox', { name: 'Field 5' }).should('be.checked').should('not.be.disabled')
      cy.findByRole('checkbox', { name: 'Field 6' }).should('be.checked').should('not.be.disabled')
      cy.findByRole('checkbox', { name: 'Field 7' }).should('be.checked').should('not.be.disabled')

      cy.location().should((location) => {
        expect(location.search).not.to.contain(`columns=field1`)
        expect(location.search).to.contain(`columns=field2`)
        expect(location.search).not.to.contain(`columns=field3`)
        expect(location.search).not.to.contain(`columns=field4`)
        expect(location.search).to.contain(`columns=field5`)
        expect(location.search).to.contain(`columns=field6`)
        expect(location.search).to.contain(`columns=field7`)
      })
    }

    it('should initialise the column filter values', () => {
      cy.findAllByRole('group')
        .contains(/Show columns/)
        .should('be.visible')
        .click()
      expectInitialisedColumns()
    })

    it('should initialise the correct columns in the list table', () => {
      cy.findAllByRole('group').contains('Show columns (4 of 7 shown)')

      cy.findByLabelText(/Test Variant/).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(0)
          .within(() => {
            cy.findAllByRole('columnheader')
              .should('have.length', 4)
              .each((head, index) => {
                switch (index) {
                  case 0:
                    cy.wrap(head).contains('Field 1')
                    break
                  case 1:
                    cy.wrap(head).contains('Field 2')
                    break
                  case 2:
                    cy.wrap(head).contains('Field 3')
                    break
                  case 3:
                    cy.wrap(head).contains('Field 6')
                    break
                  default:
                    break
                }
              })
          })
      })
    })

    it('should apply the columns', () => {
      cy.findAllByRole('group')
        .contains(/Show columns/)
        .click()

      setColumnValues()
      expectUpdatedColumns()

      cy.findByRole('button', { name: 'Apply columns' }).click()

      expectUpdatedColumns()

      cy.findByLabelText(/Test Variant/).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(0)
          .within(() => {
            cy.findAllByRole('columnheader')
              .should('have.length', 4)
              .each((head, index) => {
                switch (index) {
                  case 0:
                    cy.wrap(head).contains('Field 2')
                    break
                  case 1:
                    cy.wrap(head).contains('Field 5')
                    break
                  case 2:
                    cy.wrap(head).contains('Field 6')
                    break
                  case 3:
                    cy.wrap(head).contains('Field 7')
                    break
                  default:
                    break
                }
              })
          })
      })
    })

    it('should reset the columns to their DPD defaults', () => {
      cy.findAllByRole('group')
        .contains(/Show columns/)
        .click()

      setColumnValues()
      expectUpdatedColumns()

      cy.findByRole('button', { name: 'Apply columns' }).click()

      expectUpdatedColumns()

      cy.findAllByRole('group')
        .contains(/Show columns/)
        .click()

      cy.findByRole('link', { name: 'Reset columns' }).click()

      expectInitialisedColumns()
    })

    it('should apply the columns from the URL', () => {
      cy.visit(`${path}?columns=field1&columns=field5`)

      cy.findByRole('checkbox', { name: 'Field 1' }).should('be.checked')
      cy.findByRole('checkbox', { name: 'Field 2' }).should('be.checked').should('be.disabled')
      cy.findByRole('checkbox', { name: 'Field 3' }).should('not.be.checked')
      cy.findByRole('checkbox', { name: 'Field 4' }).should('not.be.checked')
      cy.findByRole('checkbox', { name: 'Field 5' }).should('be.checked')
      cy.findByRole('checkbox', { name: 'Field 6' }).should('not.be.checked')
      cy.findByRole('checkbox', { name: 'Field 7' }).should('not.be.checked')

      cy.findByLabelText(/Test Variant/).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(0)
          .within(() => {
            cy.findAllByRole('columnheader').each((head, index) => {
              switch (index) {
                case 0:
                  cy.wrap(head).contains('Field 1')
                  break
                case 1:
                  cy.wrap(head).contains('Field 2')
                  break
                case 2:
                  cy.wrap(head).contains('Field 5')
                  break
                default:
                  break
              }
            })
          })
      })
    })
  })

  describe('Filters', () => {
    const expectDefaultLocation = () => {
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1=value1.1`)
        expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
        expect(location.search).to.contain(`filters.field3.end=2006-05-04`)
        expect(location.search).not.to.contain(`filters.field2=value2.2`)
        expect(location.search).not.to.contain(`filters.field7=value8.1`)
        expect(location.search).to.contain(`filters.field7=value8.2`)
        expect(location.search).to.contain(`filters.field7=value8.3`)
        expect(location.search).not.to.contain(`filters.field7=value8.4`)
      })
    }

    const expectDefaultSelectedFilters = () => {
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link')
          .should('have.length', 4)
          .each((filter, index) => {
            switch (index) {
              case 0:
                cy.wrap(filter).contains('Field 1')
                cy.wrap(filter).contains('Value 1.1')
                break
              case 1:
                cy.wrap(filter).contains('Field 3')
                cy.wrap(filter).contains('2003-02-01 - 2006-05-04')
                break
              case 2:
                cy.wrap(filter).contains('Field 7')
                cy.wrap(filter).contains('Value 8.2, Value 8.3')
                break
              case 3:
                cy.wrap(filter).contains('Reset filters')
                break
              default:
                break
            }
          })
      })
    }

    const expectUpdatedLocation = () => {
      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.field1=value1.1`)
        expect(location.search).to.contain(`filters.field3.start=2003-02-01`)
        expect(location.search).to.contain(`filters.field3.end=2006-05-04`)
        expect(location.search).to.contain(`filters.field2=value2.2`)
        expect(location.search).to.contain(`filters.field7=value8.2`)
        expect(location.search).to.contain(`filters.field7=value8.4`)
        expect(location.search).to.contain(`filters.field7=value8.1`)
        expect(location.search).not.to.contain(`filters.field7=value8.3`)
      })
    }

    const expectUpdatedSelectedFilters = () => {
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link')
          .should('have.length', 5)
          .each((filter, index) => {
            switch (index) {
              case 0:
                cy.wrap(filter).contains('Field 1')
                cy.wrap(filter).contains('Value 1.1')
                break
              case 1:
                cy.wrap(filter).contains('Field 2')
                cy.wrap(filter).contains('Value 2.2')
                break
              case 2:
                cy.wrap(filter).contains('Field 3')
                cy.wrap(filter).contains('2003-02-01 - 2006-05-04')
                break
              case 3:
                cy.wrap(filter).contains('Field 7')
                cy.wrap(filter).contains('Value 8.2, Value 8.1, Value 8.4')
                break
              case 4:
                cy.wrap(filter).contains('Reset filters')
                break
              default:
                break
            }
          })
      })
    }

    it('should set the default selected filters', () => {
      expectDefaultLocation()
      expectDefaultSelectedFilters()
    })

    it('should apply the updated filters', () => {
      cy.findAllByRole('group').contains('Show filters').should('be.visible').click()

      cy.findByRole('combobox', { name: 'Field 2' }).select('value2.2')
      cy.findByRole('checkbox', { name: 'Value 8.3' }).uncheck()
      cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.4' }).check()

      cy.findByRole('button', { name: 'Apply filters' }).click()

      expectUpdatedLocation()
      expectUpdatedSelectedFilters()
    })

    it('should reset the filters back to the definition defaults', () => {
      cy.findAllByRole('group').contains('Show filters').should('be.visible').click()

      cy.findByRole('combobox', { name: 'Field 2' }).select('value2.2')
      cy.findByRole('checkbox', { name: 'Value 8.3' }).uncheck()
      cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.4' }).check()

      cy.findByRole('button', { name: 'Apply filters' }).click()

      expectUpdatedLocation()
      expectUpdatedSelectedFilters()

      cy.findByRole('link', { name: 'Reset filters' }).click()

      expectDefaultLocation()
      expectDefaultSelectedFilters()
    })

    it('should apply the updated filters via the URL', () => {
      cy.visit(
        `${path}?filters.field2=value2.3&filters.field1=value1.3&filters.field3.start=2004-03-02&filters.field3.end=2005-10-10`,
      )

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link')
          .should('have.length', 4)
          .each((filter, index) => {
            switch (index) {
              case 0:
                cy.wrap(filter).contains('Field 1')
                cy.wrap(filter).contains('Value 1.3')
                break
              case 1:
                cy.wrap(filter).contains('Field 2')
                cy.wrap(filter).contains('Value 2.3')
                break
              case 2:
                cy.wrap(filter).contains('Field 3')
                cy.wrap(filter).contains('2004-03-02 - 2005-10-10')
                break
              case 3:
                cy.wrap(filter).contains('Reset filters')
                break
              default:
                break
            }
          })
      })

      cy.findAllByRole('group').contains('Show filters').should('be.visible').click()

      cy.findByRole('combobox', { name: 'Field 2' }).find('option:selected').should('have.text', 'Value 2.3')
      cy.findByRole('textbox', { name: 'From' }).should('have.value', '02/03/2004')
      cy.findByRole('textbox', { name: 'To' }).should('have.value', '10/10/2005')
      cy.findByRole('radio', { name: 'Value 1.3' }).should('be.checked')
    })

    it('should remove the selected filter when clicked', () => {
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').should('have.length', 4).eq(0).click(1, 1)
      })

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link')
          .should('have.length', 3)
          .each((filter, index) => {
            switch (index) {
              case 0:
                cy.wrap(filter).contains('Field 3')
                cy.wrap(filter).contains('2003-02-01 - 2006-05-04')
                break
              case 1:
                cy.wrap(filter).contains('Field 7')
                cy.wrap(filter).contains('Value 8.2, Value 8.3')
                break
              case 2:
                cy.wrap(filter).contains('Reset filters')
                break
              default:
                break
            }
          })
      })
    })

    it('should keep the current columns when resetting the filters', () => {
      cy.findAllByRole('group')
        .contains(/Show columns/)
        .click()

      cy.findByRole('checkbox', { name: 'Field 1' }).uncheck()
      cy.findByRole('checkbox', { name: 'Field 3' }).uncheck()
      cy.findByRole('checkbox', { name: 'Field 5' }).check()

      cy.findByRole('button', { name: 'Apply columns' }).click()

      cy.findAllByRole('group').contains('Show filters').should('be.visible').click()

      cy.findByRole('combobox', { name: 'Field 2' }).select('value2.2')
      cy.findByRole('checkbox', { name: 'Value 8.3' }).uncheck()
      cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.4' }).check()

      cy.findByRole('button', { name: 'Apply filters' }).click()

      expectUpdatedLocation()
      expectUpdatedSelectedFilters()

      cy.findByRole('link', { name: 'Reset filters' }).click()

      expectDefaultLocation()
      expectDefaultSelectedFilters()

      cy.findAllByRole('group')
        .contains(/Show columns/)
        .should('be.visible')
    })
  })

  describe('Data', () => {
    it('should', () => {})
  })

  describe('Sorting', () => {
    it('should sort the data by the selected column', () => {})
  })
})
