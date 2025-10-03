context('Inputs: date range', () => {
  const path = '/components/filters/date-range/date-range'
  const dateToday = new Date()
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
    const setDateRangeValuesViaCalendar = (dateFrom: number, dateTo: number) => {
      if (dateFrom < 0 || dateFrom > 31) {
        throw new Error('Invalid dateFrom sent to setDateRangeValuesViaCalendar')
      }
      if (dateTo < 0 || dateTo > 31) {
        throw new Error('Invalid dateTo sent to setDateRangeValuesViaCalendar')
      }
      if (dateFrom > dateTo) {
        throw new Error('dateFrom was greater than dateTo in setDateRangeValuesViaCalendar')
      }

      const monthYearStringLabel = new Date().toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
      })

      cy.findAllByRole('button', { name: 'Choose date' }).eq(1).should('be.visible').click()
      cy.findByRole('dialog', { name: new RegExp(monthYearStringLabel) })
        .should('be.visible')
        .within(() => {
          // The [^0-9] before ${dateTo} and ${dateFrom} in the regex is important, else e.g. 9 September 2025 could match 19 September 2025
          cy.findByRole('button', { name: new RegExp(`[^0-9]${dateTo} ${monthYearStringLabel}`) }).click()
        })

      cy.findAllByRole('button', { name: 'Choose date' }).first().click()
      cy.findByRole('dialog', { name: new RegExp(monthYearStringLabel) })
        .should('be.visible')
        .within(() => {
          cy.findByRole('button', { name: new RegExp(`[^0-9]${dateFrom} ${monthYearStringLabel}`) }).click()
        })
    }

    const getMOJFormattedDate = (date: Date) => {
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
    const getISOFormattedDate = (date: Date) => {
      const year = date.getFullYear()
      const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
      const twoDigitDate = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
      return `${year}-${month}-${twoDigitDate}`
    }

    it('should set the date value in the inputs', () => {
      setDateRangeValuesViaCalendar(11, 28)

      cy.findByRole('textbox', { name: 'From' }).should(
        'have.value',
        getMOJFormattedDate(new Date(dateToday.getFullYear(), dateToday.getMonth(), 11)),
      )
      cy.findByRole('textbox', { name: 'To' }).should(
        'have.value',
        getMOJFormattedDate(new Date(dateToday.getFullYear(), dateToday.getMonth(), 28)),
      )
    })

    it('should set the date value in the inputs - single digits', () => {
      setDateRangeValuesViaCalendar(1, 9)

      cy.findByRole('textbox', { name: 'From' }).should(
        'have.value',
        getMOJFormattedDate(new Date(dateToday.getFullYear(), dateToday.getMonth(), 1)),
      )
      cy.findByRole('textbox', { name: 'To' }).should(
        'have.value',
        getMOJFormattedDate(new Date(dateToday.getFullYear(), dateToday.getMonth(), 9)),
      )
    })

    it('should set the date value correctly in the query string', () => {
      setDateRangeValuesViaCalendar(11, 28)

      cy.location().should((location) => {
        expect(location.search).to.contain(
          `filters.date-range.start=${getISOFormattedDate(
            new Date(dateToday.getFullYear(), dateToday.getMonth(), 11),
          )}`,
        )
        expect(location.search).to.contain(
          `filters.date-range.end=${getISOFormattedDate(new Date(dateToday.getFullYear(), dateToday.getMonth(), 28))}`,
        )
      })
    })

    it('should format the date value correctly in the query string when single digits', () => {
      setDateRangeValuesViaCalendar(1, 9)

      cy.location().should((location) => {
        expect(location.search).to.contain(
          `filters.date-range.start=${getISOFormattedDate(new Date(dateToday.getFullYear(), dateToday.getMonth(), 1))}`,
        )
        expect(location.search).to.contain(
          `filters.date-range.end=${getISOFormattedDate(new Date(dateToday.getFullYear(), dateToday.getMonth(), 9))}`,
        )
      })
    })

    it('should set the selected filters correctly', () => {
      setDateRangeValuesViaCalendar(11, 28)

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findByRole('link', { name: /Date-range start/ })
          .contains(getMOJFormattedDate(new Date(dateToday.getFullYear(), dateToday.getMonth(), 11)))
          .should('be.visible')
        cy.findByRole('link', { name: /Date-range end/ })
          .contains(getMOJFormattedDate(new Date(dateToday.getFullYear(), dateToday.getMonth(), 28)))
          .should('be.visible')
      })
    })

    it('should set the selected filters correctly with single digits', () => {
      setDateRangeValuesViaCalendar(1, 9)

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findByRole('link', { name: /Date-range start/ })
          .contains(getMOJFormattedDate(new Date(dateToday.getFullYear(), dateToday.getMonth(), 1)))
          .should('be.visible')
        cy.findByRole('link', { name: /Date-range end/ })
          .contains(getMOJFormattedDate(new Date(dateToday.getFullYear(), dateToday.getMonth(), 9)))
          .should('be.visible')
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
