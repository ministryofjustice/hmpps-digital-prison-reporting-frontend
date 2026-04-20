import { executeReportStubs } from '../../../../../../cypress-tests/cypressUtils'

describe('Filter validation', () => {
  const path = '/embedded/platform/dpr/request-report/report/feature-testing/feature-testing-validation/filters'
  let interactiveFiltersPath = ''

  const fillRadioInput = () => {
    cy.findByRole('radio', { name: 'Value 1.1' }).check()
  }

  const fillSelectInput = (name = 'Field 2') => {
    cy.findByRole('combobox', { name }).select('value2.2')
  }

  const fillDateRange = () => {
    cy.findByRole('textbox', { name: 'From' }).type('1/2/2003')
    cy.findByRole('textbox', { name: 'To' }).type('4/5/2007')
  }

  const fillAutocomplete = (name = 'Field 4') => {
    cy.findByRole('combobox', { name }).type('Inigo Montoya')
  }

  const fillPatternTextInput = (name = 'Field 5') => {
    cy.findByRole('textbox', { name }).type('Value 6.1')
  }

  const fillDateInput = (name = 'Field 6') => {
    cy.findByRole('textbox', { name }).type('05/05/2005')
  }

  const fillMultiselect = () => {
    cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
    cy.findByRole('checkbox', { name: 'Value 8.2' }).check()
    cy.findByRole('checkbox', { name: 'Value 8.3' }).check()
    cy.findByRole('checkbox', { name: 'Value 8.4' }).check()
  }

  before(() => {
    executeReportStubs()
    cy.task('stubDefinitionValidation')
    cy.task('stubRequestSuccessResult20')
  })

  describe('Pre-request filters', () => {
    beforeEach(() => {
      cy.visit(path)
    })

    describe('Radio', () => {
      beforeEach(() => {
        fillSelectInput()
        fillDateRange()
        fillPatternTextInput()
        fillAutocomplete()
        fillDateInput()
        fillMultiselect()
      })

      it('should show validation message', () => {
        cy.findByRole('group', { name: 'Field 1' }).should('not.have.attr', 'aria-describedby')
        cy.findByRole('button', { name: /Request/ }).click()
        cy.findByRole('link', { name: /Field 1 is required/ }).should('be.visible')
        cy.findByRole('group', { name: 'Field 1' })
          .invoke('attr', 'aria-describedby')
          .then((id) => {
            cy.get(`[id="${id}"]`).should('contain.text', 'Field 1 is required')
          })
      })
    })

    describe('Select', () => {
      beforeEach(() => {
        fillRadioInput()
        fillDateRange()
        fillPatternTextInput()
        fillAutocomplete()
        fillDateInput()
        fillMultiselect()
      })

      it('should show validation message', () => {
        cy.findByRole('combobox', { name: 'Field 2' }).should('not.have.attr', 'aria-describedby')
        cy.findByRole('button', { name: /Request/ }).click()
        cy.findByRole('link', { name: /Field 2 is required/ }).should('be.visible')
        cy.findByRole('combobox', { name: 'Field 2' })
          .invoke('attr', 'aria-describedby')
          .then((id) => {
            cy.get(`[id="${id}"]`).should('contain.text', 'Field 2 is required')
          })
      })
    })

    describe('Autocomplete', () => {
      beforeEach(() => {
        fillRadioInput()
        fillSelectInput()
        fillDateRange()
        fillPatternTextInput()
        fillDateInput()
        fillMultiselect()
      })

      it('should show validation message', () => {
        cy.findByRole('combobox', { name: 'Field 4' }).should('not.have.attr', 'aria-describedby')
        cy.findByRole('button', { name: /Request/ }).click()
        cy.findByRole('link', { name: /Field 4 is required/ }).should('be.visible')
        cy.findByRole('combobox', { name: 'Field 4' })
          .invoke('attr', 'aria-describedby')
          .then((id) => {
            cy.get(`[id="${id}"]`).should('contain.text', 'Field 4 is required')
          })
      })
    })

    describe('Text', () => {
      beforeEach(() => {
        fillRadioInput()
        fillSelectInput()
        fillDateRange()
        fillAutocomplete()
        fillDateInput()
        fillMultiselect()
      })

      it('should show validation message', () => {
        cy.findByRole('textbox', { name: 'Field 5' }).should('not.have.attr', 'aria-describedby')
        cy.findByRole('button', { name: /Request/ }).click()
        cy.findByRole('link', { name: /Field 5 is required/ }).should('be.visible')
        cy.findByRole('textbox', { name: 'Field 5' })
          .invoke('attr', 'aria-describedby')
          .then((id) => {
            cy.get(`[id="${id}"]`).should('contain.text', 'Field 5 is required')
          })
      })

      it('should show validation the correct pattern', () => {
        cy.findByRole('textbox', { name: 'Field 5' }).should('not.have.attr', 'aria-describedby')
        cy.findByRole('textbox', { name: 'Field 5' }).type('ABC')
        cy.findByRole('button', { name: /Request/ }).click()
        cy.findByRole('link', { name: /Field 5 has an invalid format/ }).should('be.visible')
        cy.findByRole('textbox', { name: 'Field 5' })
          .invoke('attr', 'aria-describedby')
          .then((id) => {
            cy.get(`[id="${id}"]`).should('contain.text', 'Field 5 has an invalid format')
          })
      })
    })

    describe('Multiselect', () => {
      beforeEach(() => {
        fillRadioInput()
        fillSelectInput()
        fillDateRange()
        fillPatternTextInput()
        fillAutocomplete()
        fillDateInput()
      })

      it('should show validation message', () => {
        cy.findByRole('group', { name: 'Field 7' }).should('not.have.attr', 'aria-describedby')
        cy.findByRole('button', { name: /Request/ }).click()
        cy.findByRole('link', { name: /Field 7 Please select at least one/ }).should('be.visible')
        cy.findByRole('group', { name: 'Field 7' })
          .invoke('attr', 'aria-describedby')
          .then((describedBy) => {
            cy.get(`[id="${describedBy}"]`).should('be.visible').and('contain.text', 'Please select at least one')
          })
      })
    })

    describe('Date range', () => {
      beforeEach(() => {
        fillSelectInput()
        fillRadioInput()
        fillPatternTextInput()
        fillAutocomplete()
        fillMultiselect()
        fillDateInput()
      })

      it('should show validation message', () => {
        cy.findByRole('button', { name: /Request/ }).click()
        cy.findByRole('link', { name: /Field 3 start date is required/ }).should('be.visible')
        cy.findByRole('link', { name: /Field 3 start date must be a valid date/ }).should('be.visible')
        cy.findByRole('link', { name: /Field 3 end date is required/ }).should('be.visible')
        cy.findByRole('link', { name: /Field 3 end date must be a valid date/ }).should('be.visible')

        cy.get('[id="filters.field3.start-error"]')
          .should('be.visible')
          .and('contain.text', 'Field 3 start date is required')

        cy.get('[id="filters.field3.end-error"]')
          .should('be.visible')
          .and('contain.text', 'Field 3 end date is required')
      })

      it('should show validation message when incorrect format', () => {
        cy.findByRole('textbox', { name: 'From' }).type('2003/01/01')
        cy.findByRole('textbox', { name: 'To' }).type('2007/4/5/')

        cy.findByRole('button', { name: /Request/ }).click()

        cy.findByRole('link', { name: /Field 3 start date must be a valid date/ }).should('be.visible')
        cy.findByRole('link', { name: /Field 3 end date must be a valid date/ }).should('be.visible')

        cy.get('[id="filters.field3.start-error"]')
          .should('be.visible')
          .and('contain.text', 'Field 3 start date must be a valid date')

        cy.get('[id="filters.field3.end-error"]')
          .should('be.visible')
          .and('contain.text', 'Field 3 end date must be a valid date')
      })

      it('should validate start is before end date', () => {
        cy.findByRole('textbox', { name: 'From' }).type('02/01/2026')
        cy.findByRole('textbox', { name: 'To' }).type('01/01/2026')

        cy.findByRole('button', { name: /Request/ }).click()

        cy.findByRole('link', { name: /Field 3 end date must be the same as or after the start date/ }).should(
          'be.visible',
        )

        cy.get('[id="filters.field3.end-error"]')
          .should('be.visible')
          .and('contain.text', 'Field 3 end date must be the same as or after the start date')
      })
    })

    describe('success', () => {
      beforeEach(() => {
        fillRadioInput()
        fillSelectInput()
        fillDateRange()
        fillPatternTextInput()
        fillAutocomplete()
        fillDateInput()
        fillMultiselect()
      })

      it('should make the request', () => {
        cy.findByRole('button', { name: /Request/ }).click()
        cy.location('pathname', { timeout: 20000 }).should('include', '/view-report')
        cy.findByRole('heading', { level: 1, name: /Validation Test/ }).should('be.visible')

        cy.location('pathname').then((interactivePath) => {
          interactiveFiltersPath = interactivePath
        })
      })
    })
  })

  describe('Interactive filters', () => {
    beforeEach(() => {
      cy.visit(interactiveFiltersPath)
      cy.findAllByRole('group')
        .contains(/Show filters/)
        .click()
    })

    describe('Radio', () => {
      beforeEach(() => {
        fillSelectInput('Field 9')
        fillDateRange()
        fillPatternTextInput('Field 12')
        fillAutocomplete('Field 11')
        fillDateInput('Field 13')
        fillMultiselect()
      })

      it('should show validation message', () => {
        cy.findByRole('group', { name: 'Field 8' }).should('not.have.attr', 'aria-describedby')
        cy.findByRole('button', { name: 'Apply filters' }).click()
        cy.findAllByRole('group')
          .contains(/Show filters/)
          .click()
        cy.findByRole('link', { name: /Field 8 is required/ }).should('be.visible')
        cy.findByRole('group', { name: 'Field 8' })
          .invoke('attr', 'aria-describedby')
          .then((id) => {
            cy.get(`[id="${id}"]`).should('contain.text', 'Field 8 is required')
          })
      })
    })

    describe('Select', () => {
      beforeEach(() => {
        fillRadioInput()
        fillDateRange()
        fillPatternTextInput('Field 12')
        fillAutocomplete('Field 11')
        fillDateInput('Field 13')
        fillMultiselect()
      })

      it('should show validation message', () => {
        cy.findByRole('combobox', { name: 'Field 9' }).should('not.have.attr', 'aria-describedby')
        cy.findByRole('button', { name: 'Apply filters' }).click()
        cy.findAllByRole('group')
          .contains(/Show filters/)
          .click()
        cy.findByRole('link', { name: /Field 9 is required/ }).should('be.visible')
        cy.findByRole('combobox', { name: 'Field 9' })
          .invoke('attr', 'aria-describedby')
          .then((id) => {
            cy.get(`[id="${id}"]`).should('contain.text', 'Field 9 is required')
          })
      })
    })

    describe('Autocomplete', () => {
      beforeEach(() => {
        fillRadioInput()
        fillSelectInput('Field 9')
        fillDateRange()
        fillPatternTextInput('Field 12')
        fillDateInput('Field 13')
        fillMultiselect()
      })

      it('should show validation message', () => {
        cy.findByRole('combobox', { name: 'Field 11' }).should('not.have.attr', 'aria-describedby')
        cy.findByRole('button', { name: 'Apply filters' }).click()
        cy.findAllByRole('group')
          .contains(/Show filters/)
          .click()
        cy.findByRole('link', { name: /Field 11 is required/ }).should('be.visible')
        cy.findByRole('combobox', { name: 'Field 11' })
          .invoke('attr', 'aria-describedby')
          .then((id) => {
            cy.get(`[id="${id}"]`).should('contain.text', 'Field 11 is required')
          })
      })
    })

    describe('Text', () => {
      beforeEach(() => {
        fillRadioInput()
        fillSelectInput('Field 9')
        fillDateRange()
        fillAutocomplete('Field 11')
        fillDateInput('Field 13')
        fillMultiselect()
      })

      it('should show validation message', () => {
        cy.findByRole('textbox', { name: 'Field 12' }).should('not.have.attr', 'aria-describedby')
        cy.findByRole('button', { name: 'Apply filters' }).click()
        cy.findAllByRole('group')
          .contains(/Show filters/)
          .click()
        cy.findByRole('link', { name: /Field 12 is required/ }).should('be.visible')
        cy.findByRole('textbox', { name: 'Field 12' })
          .invoke('attr', 'aria-describedby')
          .then((id) => {
            cy.get(`[id="${id}"]`).should('contain.text', 'Field 12 is required')
          })
      })

      it('should show validation the correct pattern', () => {
        cy.findByRole('textbox', { name: 'Field 12' }).should('not.have.attr', 'aria-describedby')
        cy.findByRole('textbox', { name: 'Field 12' }).type('ABC')
        cy.findByRole('button', { name: 'Apply filters' }).click()
        cy.findAllByRole('group')
          .contains(/Show filters/)
          .click()
        cy.findByRole('link', { name: /Field 12 has an invalid format/ }).should('be.visible')
        cy.findByRole('textbox', { name: 'Field 12' })
          .invoke('attr', 'aria-describedby')
          .then((id) => {
            cy.get(`[id="${id}"]`).should('contain.text', 'Field 12 has an invalid format')
          })
      })
    })

    describe('Multiselect', () => {
      beforeEach(() => {
        fillRadioInput()
        fillSelectInput('Field 9')
        fillDateRange()
        fillPatternTextInput('Field 12')
        fillAutocomplete('Field 11')
        fillDateInput('Field 13')
      })

      it('should show validation message', () => {
        cy.findByRole('group', { name: 'Field 14' }).should('not.have.attr', 'aria-describedby')
        cy.findByRole('button', { name: 'Apply filters' }).click()
        cy.findAllByRole('group')
          .contains(/Show filters/)
          .click()
        cy.findByRole('link', { name: /Field 14 Please select at least one/ }).should('be.visible')
        cy.findByRole('group', { name: 'Field 14' })
          .invoke('attr', 'aria-describedby')
          .then((describedBy) => {
            cy.get(`[id="${describedBy}"]`).should('be.visible').and('contain.text', 'Please select at least one')
          })
      })
    })

    describe('Date range', () => {
      beforeEach(() => {
        fillSelectInput('Field 9')
        fillRadioInput()
        fillPatternTextInput('Field 12')
        fillAutocomplete('Field 11')
        fillMultiselect()
        fillDateInput('Field 13')
      })

      it('should show validation message', () => {
        cy.findByRole('button', { name: 'Apply filters' }).click()
        cy.findAllByRole('group')
          .contains(/Show filters/)
          .click()

        cy.findByRole('link', { name: /Field 10 start date is required/ }).should('be.visible')
        cy.findByRole('link', { name: /Field 10 start date must be a valid date/ }).should('be.visible')
        cy.findByRole('link', { name: /Field 10 end date is required/ }).should('be.visible')
        cy.findByRole('link', { name: /Field 10 end date must be a valid date/ }).should('be.visible')

        cy.get('[id="filters.field10.start-error"]')
          .should('be.visible')
          .and('contain.text', 'Field 10 start date is required')

        cy.get('[id="filters.field10.end-error"]')
          .should('be.visible')
          .and('contain.text', 'Field 10 end date is required')
      })

      it('should show validation message when incorrect format', () => {
        cy.findByRole('textbox', { name: 'From' }).type('2003/01/01')
        cy.findByRole('textbox', { name: 'To' }).type('2007/4/5/')

        cy.findByRole('button', { name: 'Apply filters' }).click()
        cy.findAllByRole('group')
          .contains(/Show filters/)
          .click()

        cy.findByRole('link', { name: /Field 10 start date must be a valid date/ }).should('be.visible')
        cy.findByRole('link', { name: /Field 10 end date must be a valid date/ }).should('be.visible')

        cy.get('[id="filters.field10.start-error"]')
          .should('be.visible')
          .and('contain.text', 'Field 10 start date must be a valid date')

        cy.get('[id="filters.field10.end-error"]')
          .should('be.visible')
          .and('contain.text', 'Field 10 end date must be a valid date')
      })
    })
  })
})
