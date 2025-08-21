context('Inputs: date range', () => {
  const path = '/components/filters/date-range/date-range'
  let dateRangeStart: Cypress.Chainable<JQuery<HTMLElement>>
  let dateRangeEnd: Cypress.Chainable<JQuery<HTMLElement>>

  beforeEach(() => {
    cy.visit(path)
    dateRangeStart = cy.findByRole('textbox', { name: 'From' })
    dateRangeEnd = cy.findByRole('textbox', { name: 'To' })
  })

  it('is accessible', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  describe('Setting the value via the input', () => {
    const setDateRangeValuesViaInput = () => {
      dateRangeStart.type('02/05/2025')
      dateRangeEnd.type('05/07/2025').blur()
    }

    const setDateRangeValuesViaInputSingleDigit = () => {
      dateRangeStart.type('2/5/2025')
      dateRangeEnd.type('5/7/2025').blur()
    }

    it('should set the date value in the query string', () => {
      setDateRangeValuesViaInput()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.date-range.start=2025-05-02`)
        expect(location.search).to.contain(`filters.date-range.end=2025-07-05`)
      })
    })

    it('should set the date value in the query string if single digits', () => {
      setDateRangeValuesViaInputSingleDigit()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.date-range.start=2025-05-02`)
        expect(location.search).to.contain(`filters.date-range.end=2025-07-05`)
      })
    })

    it('should set the selected filters correctly', () => {
      setDateRangeValuesViaInput()

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link')
          .should('have.length', 3)
          .each((filter, index) => {
            switch (index) {
              case 0:
                cy.wrap(filter).contains('Date-range start')
                cy.wrap(filter).contains('02/05/2025')
                break
              case 1:
                cy.wrap(filter).contains('Date-range end')
                cy.wrap(filter).contains('05/07/2025')
                break
              default:
                break
            }
          })
      })
    })

    it('should set the selected filters correctly with single digits', () => {
      setDateRangeValuesViaInputSingleDigit()

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link')
          .should('have.length', 3)
          .each((filter, index) => {
            switch (index) {
              case 0:
                cy.wrap(filter).contains('Date-range start')
                cy.wrap(filter).contains('2/5/2025')
                break
              case 1:
                cy.wrap(filter).contains('Date-range end')
                cy.wrap(filter).contains('5/7/2025')
                break
              default:
                break
            }
          })
      })
    })
  })

  describe('Setting the value via the datepicker', () => {
    const setDateRangeValuesViaCalendar = () => {
      cy.findAllByRole('button', { name: 'Choose date' }).eq(0).click()
      cy.findByRole('button', { name: 'Monday 11 August 2025' }).click()

      cy.findAllByRole('button', { name: 'Choose date' }).eq(0).click()
      cy.findByRole('button', { name: 'Saturday 30 August 2025' }).click()
    }

    const setDateRangeValuesViaCalendarSingleDigit = () => {
      cy.findAllByRole('button', { name: 'Choose date' }).eq(0).click()
      cy.findByRole('button', { name: 'Friday 1 August 2025' }).click()
      cy.findAllByRole('button', { name: 'Choose date' }).eq(0).click()
      cy.findByRole('button', { name: 'Saturday 9 August 2025' }).click()
    }

    it('should set the date value in the inputs', () => {
      setDateRangeValuesViaCalendar()

      cy.findByRole('textbox', { name: 'From' }).should('have.value', '11/8/2025')
      cy.findByRole('textbox', { name: 'To' }).should('have.value', '30/8/2025')
    })

    it('should set the date value in the inputs - single digits', () => {
      setDateRangeValuesViaCalendarSingleDigit()

      cy.findByRole('textbox', { name: 'From' }).should('have.value', '1/8/2025')
      cy.findByRole('textbox', { name: 'To' }).should('have.value', '9/8/2025')
    })

    it('should set the date value correctly in the query string', () => {
      setDateRangeValuesViaCalendar()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.date-range.start=2025-08-11`)
        expect(location.search).to.contain(`filters.date-range.end=2025-08-30`)
      })
    })

    it('should format the date value correctly in the query string when single digits', () => {
      setDateRangeValuesViaCalendarSingleDigit()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.date-range.start=2025-08-01`)
        expect(location.search).to.contain(`filters.date-range.end=2025-08-09`)
      })
    })

    it('should set the selected filters correctly', () => {
      setDateRangeValuesViaCalendar()

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').each((filter, index) => {
          switch (index) {
            case 0:
              cy.wrap(filter).contains('Date-range start')
              cy.wrap(filter).contains('11/8/2025')
              break
            case 1:
              cy.wrap(filter).contains('Date-range end')
              cy.wrap(filter).contains('30/8/2025')
              break
            default:
              break
          }
        })
      })
    })

    it('should set the selected filters correctly with single digits', () => {
      setDateRangeValuesViaCalendarSingleDigit()

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link')
          .should('have.length', 3)
          .each((filter, index) => {
            switch (index) {
              case 0:
                cy.wrap(filter).contains('Date-range start')
                cy.wrap(filter).contains('1/8/2025')
                break
              case 1:
                cy.wrap(filter).contains('Date-range end')
                cy.wrap(filter).contains('9/8/2025')
                break
              default:
                break
            }
          })
      })
    })
  })

  describe('Setting the value via the url', () => {
    it('should set the date value from the query string', () => {
      cy.visit(`${path}?filters.date-range.start=2024-11-01&filters.date-range.end=2025-06-11`)

      cy.findByRole('textbox', { name: 'From' }).should('have.value', '01/11/2024')
      cy.findByRole('textbox', { name: 'To' }).should('have.value', '11/06/2025')

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link')
          .should('have.length', 3)
          .each((filter, index) => {
            switch (index) {
              case 0:
                cy.wrap(filter).contains('Date-range start')
                cy.wrap(filter).contains('01/11/2024')
                break
              case 1:
                cy.wrap(filter).contains('Date-range end')
                cy.wrap(filter).contains('11/06/2025')
                break
              default:
                break
            }
          })
      })
    })
  })

  describe('Reseting to default values', () => {
    it('should reset the input to the default DPD values', () => {
      dateRangeStart.type('02/05/2025')
      dateRangeEnd.type('05/07/2025').blur()

      cy.location().should((location) => {
        expect(location.search).to.contain(`filters.date-range.start=2025-05-02`)
        expect(location.search).to.contain(`filters.date-range.end=2025-07-05`)
      })

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').should('have.length', 3)
      })

      cy.findByRole('link', { name: 'Reset filters' }).click()

      cy.location().should((location) => {
        expect(location.search).not.to.contain(`filters.date-range.start`)
        expect(location.search).not.to.contain(`filters.date-range.end`)
      })
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').should('have.length', 1)
      })
    })
  })
})
