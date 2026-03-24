import { checkA11y, executeReportStubs, requestReportByNameAndDescription, startReportRequest } from 'cypress-tests/cypressUtils'

context('Inputs: multiselect', () => {
  const path = '/components/filters/multi-select'

  const getCheckbox = (label: string) => cy.findByRole('checkbox', { name: new RegExp(`^${label}$`, 'i') })

  beforeEach(() => {
    executeReportStubs()
    cy.visit(path)
  })

  it('is accessible', () => {
    checkA11y()
  })

  describe('Setting values', () => {
    it('should set the input values via the checkboxes', () => {
      cy.findByRole('checkbox', { name: 'Value 8.2' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.4' }).check()

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').eq(0).contains('Multiselect')
        cy.findAllByRole('link').eq(0).contains('Value 8.2, Value 8.4')
      })

      cy.location().should((location) => {
        expect(location.search).to.contain('filters.multiselect=value8.2')
        expect(location.search).to.contain('filters.multiselect=value8.4')
      })
    })

    it('should truncate the selected values when more than 3 checkboxes selected', () => {
      cy.findByRole('checkbox', { name: 'Value 8.1' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.2' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.3' }).check()
      cy.findByRole('checkbox', { name: 'Value 8.4' }).check()

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').eq(0).contains('Multiselect')
        cy.findAllByRole('link').eq(0).contains('Value 8.1, Value 8.2, Value 8.3 + 1 more')
      })
    })

    it('should uncheck the values when the selected filter button is clicked', () => {
      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('link').eq(0).click()
      })
      cy.findByRole('checkbox', { name: 'Value 8.1' }).should('not.be.checked')
      cy.findByRole('checkbox', { name: 'Value 8.2' }).should('not.be.checked')
      cy.findByRole('checkbox', { name: 'Value 8.3' }).should('not.be.checked')
      cy.findByRole('checkbox', { name: 'Value 8.4' }).should('not.be.checked')
    })
  })

  describe('Validation', () => {
    it('should show the validation message when no value is provided', () => {
      cy.findByRole('button', { name: /Request/ }).click()
      cy.findByRole('alert').should('exist')
    })
  })

  describe('Multi‑select filter component', () => {
    const route = '/components/filters/multi-select'

    const getSelectedFiltersSection = () => cy.findByRole('heading', { name: /Selected filters/i })

    const pretestSetup = (queryParams: string = '') => {
      cy.visit(`${route}?${queryParams}`)
      cy.findByRole('group', { name: /multiselect, long options list/i }).should('exist')
    }

    beforeEach(() => {
      executeReportStubs()
    })

    it('renders correctly and shows a scrollable region for long lists', () => {
      pretestSetup()

      cy.findByRole('group', { name: /multiselect, long options list/i }).should('be.visible')
      getCheckbox('Value 1.2').should('exist')
      getCheckbox('Value 10.2').should('exist')

      cy.get('[data-govuk-checkboxes-init]')
        .eq(1)
        .should(($el) => {
          const el = $el[0]
          expect(el.scrollHeight, 'has more content than viewport').to.be.greaterThan(el.clientHeight)
          expect(getComputedStyle(el).overflowY, 'allows vertical scrolling').to.match(/auto|scroll/)
        })
    })

    it('selects and unselects values, updating the selected filters section', () => {
      pretestSetup()

      getCheckbox('Value 1.2').click()
      getCheckbox('Value 3.2').click()

      getSelectedFiltersSection().should('be.visible')
      cy.findByRole('link', { name: /Value 1.2/i }).should('exist')
      cy.findByRole('link', { name: /Value 3.2/i }).should('exist')

      getCheckbox('Value 1.2').click()
      cy.findByRole('link', { name: /Value 1.2/i }).should('not.exist')
      cy.findByRole('link', { name: /Value 3.2/i }).should('exist')
    })

    it('updates the querystring as checkboxes are toggled', () => {
      pretestSetup()

      getCheckbox('Value 2.2').click().blur()

      cy.location('search').should((qs) => {
        expect(qs).to.match(/filters\.multiselect-long=.*value2.2/i)
      })

      getCheckbox('Value 4.2').click().blur()

      cy.location('search').should((qs) => {
        expect(qs).to.match(/filters\.multiselect-long=.*value2.2/i)
        expect(qs).to.match(/filters\.multiselect-long=.*value4.2/i)
      })
    })

    it('initialises defaults from existing query params', () => {
      pretestSetup('filters.multiselect-long=value3.2&filters.multiselect-long=value5.2')

      getCheckbox('Value 3.2').should('be.checked')
      getCheckbox('Value 5.2').should('be.checked')

      cy.findByRole('link', { name: /Value 3.2/i }).should('exist')
      cy.findByRole('link', { name: /Value 5.2/i }).should('exist')
    })

    it('supports clearing all selections through the UI', () => {
      pretestSetup()

      getCheckbox('Value 1.2').click()
      getCheckbox('Value 2.2').click()
      getCheckbox('Value 3.2').click()

      getCheckbox('Value 1.2').should('be.checked')
      getCheckbox('Value 2.2').should('be.checked')
      getCheckbox('Value 3.2').should('be.checked')

      cy.findByRole('link', { name: /Reset filters/i }).click()

      getCheckbox('Value 1.2').should('not.be.checked')
      getCheckbox('Value 2.2').should('not.be.checked')
      getCheckbox('Value 3.2').should('not.be.checked')

      cy.findByRole('link', { name: /Value /i }).should('not.exist')
    })

    it('allows toggling a single option on and off without disturbing others', () => {
      pretestSetup()

      getCheckbox('Value 4.2').click()
      getCheckbox('Value 7.2').click()

      getCheckbox('Value 4.2').should('be.checked')
      getCheckbox('Value 7.2').should('be.checked')

      getCheckbox('Value 4.2').click()

      getCheckbox('Value 4.2').should('not.be.checked')
      getCheckbox('Value 7.2').should('be.checked')
    })

    it('supports keyboard interaction (space toggles a checkbox)', () => {
      pretestSetup()

      getCheckbox('Value 2.2').focus().type(' ')

      getCheckbox('Value 2.2').should('be.checked')
    })
  })

  describe('Show/hide all', () => {
    const reportDetails = { name: 'Multiselect', description: 'Multiselect example' }

    beforeEach(() => {
      cy.task('stubMultiselectDefinitionRequest')
      cy.task('stubResultSuccessResult')

      cy.visit('/embedded/platform/')
    })

    it('should toggle the full list in the pre-request filters', () => {
      startReportRequest(reportDetails)
      cy.findByRole('heading', { level: 1, name: /Request report/ }).should('be.visible')
      cy.findByRole('link', { name: /View full list/ }).should('be.visible')
      cy.findByLabelText('Value 16').then(($checkbox) => {
        cy.get(`label[for="${$checkbox.attr('id')}"]`).should('not.be.visible')
      })
      cy.findByRole('link', { name: /View full list/ }).click()
      cy.findByLabelText('Value 16').then(($checkbox) => {
        cy.get(`label[for="${$checkbox.attr('id')}"]`).should('be.visible')
      })
      cy.findByRole('link', { name: /Hide full list/ })
        .should('be.visible')
        .click()
      cy.findByLabelText('Value 16').then(($checkbox) => {
        cy.get(`label[for="${$checkbox.attr('id')}"]`).should('not.be.visible')
      })
    })

    it('should toggle the full list in the interactive filters', () => {
      requestReportByNameAndDescription(reportDetails)
      cy.findByRole('heading', { level: 1, name: /Multiselect/ }).should('be.visible')
      cy.findAllByRole('group')
        .contains(/Show filters/)
        .click()

      cy.findAllByRole('link', { name: /View full list/ }).should('have.length', 2)

      cy.findByLabelText('Value 16').then(($checkbox) => {
        cy.get(`label[for="${$checkbox.attr('id')}"]`).should('not.be.visible')
      })
      cy.findByLabelText('Value 4.16').then(($checkbox) => {
        cy.get(`label[for="${$checkbox.attr('id')}"]`).should('not.be.visible')
      })

      cy.findAllByRole('link', { name: /View full list/ })
        .eq(0)
        .click()

      cy.findAllByRole('link', { name: /View full list/ })
        .eq(0)
        .click()

      cy.findByLabelText('Value 16').then(($checkbox) => {
        cy.get(`label[for="${$checkbox.attr('id')}"]`).should('be.visible')
      })
      cy.findByLabelText('Value 4.16').then(($checkbox) => {
        cy.get(`label[for="${$checkbox.attr('id')}"]`).should('be.visible')
      })

      cy.findAllByRole('link', { name: /Hide full list/ })
        .eq(0)
        .click()

      cy.findAllByRole('link', { name: /Hide full list/ })
        .eq(0)
        .click()

      cy.findByLabelText('Value 16').then(($checkbox) => {
        cy.get(`label[for="${$checkbox.attr('id')}"]`).should('not.be.visible')
      })
      cy.findByLabelText('Value 4.16').then(($checkbox) => {
        cy.get(`label[for="${$checkbox.attr('id')}"]`).should('not.be.visible')
      })
    })
  })
})
