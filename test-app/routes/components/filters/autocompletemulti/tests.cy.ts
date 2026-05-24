import {
  checkA11y,
  checkSelectedFilterValues,
  executeReportStubs,
  requestReportByNameAndDescription,
  startReportRequest,
  stubDefinitionsTasks,
} from '../../../../../cypress-tests/cypressUtils'

context('Filters: Autocomplete', () => {
  const path = '/components/filters/auto-multi-select'

  before(() => {
    stubDefinitionsTasks()
    executeReportStubs()
  })

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    checkA11y()
  })

  describe('Setting a values', () => {
    it('should show options when the input value is greater than 3', () => {
      cy.findByRole('textbox', { name: /search/i }).type('Pri')

      cy.findByText(/^Prince Humperdink$/i).should('be.visible')
      cy.findByText(/^Princess Buttercup$/i).should('be.visible')
      cy.findByText(/^Inigo Montoya$/i).should('not.be.visible')
      cy.findByText(/^Fezzick$/i).should('not.be.visible')
      cy.findByText(/^Westley$/i).should('not.be.visible')
    })

    it('should not show options when the input value is greater than 3', () => {
      cy.findByRole('textbox', { name: /search/i }).type('Pr')

      cy.findByText(/^Prince Humperdink$/i).should('not.be.visible')
      cy.findByText(/^Princess Buttercup$/i).should('not.be.visible')
      cy.findByText(/^Inigo Montoya$/i).should('not.be.visible')
      cy.findByText(/^Fezzick$/i).should('not.be.visible')
      cy.findByText(/^Westley$/i).should('not.be.visible')
    })

    it('should not show options when the input empty', () => {
      cy.findByRole('textbox', { name: /search/i }).type('Pri')

      cy.findByText(/^Prince Humperdink$/i).should('be.visible')
      cy.findByText(/^Princess Buttercup$/i).should('be.visible')

      cy.findByRole('textbox', { name: /search/i }).clear()

      cy.findByText(/^Prince Humperdink$/i).should('not.be.visible')
      cy.findByText(/^Princess Buttercup$/i).should('not.be.visible')
      cy.findByText(/^Inigo Montoya$/i).should('not.be.visible')
      cy.findByText(/^Fezzick$/i).should('not.be.visible')
      cy.findByText(/^Westley$/i).should('not.be.visible')
    })

    it('should show no options when no matches are found', () => {
      cy.findByRole('textbox', { name: /search/i }).type('Ini')

      cy.findByText(/^Prince Humperdink$/i).should('not.be.visible')
      cy.findByText(/^Princess Buttercup$/i).should('not.be.visible')
      cy.findByText(/^Inigo Montoya$/i).should('be.visible')
      cy.findByText(/^Fezzick$/i).should('not.be.visible')
      cy.findByText(/^Westley$/i).should('not.be.visible')

      cy.findByRole('textbox', { name: /search/i })
        .clear()
        .type('Wes')

      cy.findByText(/^Prince Humperdink$/i).should('not.be.visible')
      cy.findByText(/^Princess Buttercup$/i).should('not.be.visible')
      cy.findByText(/^Inigo Montoya$/i).should('not.be.visible')
      cy.findByText(/^Fezzick$/i).should('not.be.visible')
      cy.findByText(/^Westley$/i).should('be.visible')
    })

    it('should set the input values via the checkboxes', () => {
      cy.findByRole('textbox', { name: /search/i }).type('Pri')

      cy.findByRole('checkbox', { name: 'Prince Humperdink' }).check()
      cy.findByRole('checkbox', { name: 'Princess Buttercup' }).check()

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('button').eq(0).contains('Autocompletemulti')
        cy.findAllByRole('button').eq(0).contains('Prince Humperdink, Princess Buttercup')
      })

      cy.location().should((location) => {
        expect(location.search).to.contain('filters.autocompletemulti=PrHu')
        expect(location.search).to.contain('filters.autocompletemulti=Princess+Buttercup')
      })

      cy.findByRole('textbox', { name: /search/i }).clear()
    })

    it('should keep selected options visible', () => {
      cy.findByRole('textbox', { name: /search/i }).type('Pri')

      cy.findByRole('checkbox', { name: 'Prince Humperdink' }).check()
      cy.findByRole('checkbox', { name: 'Princess Buttercup' }).check()

      cy.findByRole('textbox', { name: /search/i })
        .clear()
        .type('Wes')

      cy.findByRole('checkbox', { name: 'Westley' }).check()

      cy.findByRole('textbox', { name: /search/i }).clear()

      cy.findByText(/^Prince Humperdink$/i).should('be.visible')
      cy.findByText(/^Princess Buttercup$/i).should('be.visible')
      cy.findByText(/^Inigo Montoya$/i).should('not.be.visible')
      cy.findByText(/^Fezzick$/i).should('not.be.visible')
      cy.findByText(/^Westley$/i).should('be.visible')
    })

    it('should truncate the selected values when more than 3 checkboxes selected', () => {
      cy.findByRole('textbox', { name: /search/i }).type('Pri')

      cy.findByRole('checkbox', { name: 'Prince Humperdink' }).check()
      cy.findByRole('checkbox', { name: 'Princess Buttercup' }).check()

      cy.findByRole('textbox', { name: /search/i })
        .clear()
        .type('Wes')

      cy.findByRole('checkbox', { name: 'Westley' }).check()

      cy.findByRole('textbox', { name: /search/i })
        .clear()
        .type('Fez')

      cy.findByRole('checkbox', { name: 'Fezzick' }).check()

      cy.findByLabelText(/Selected filters.*/i).within(() => {
        cy.findAllByRole('button').eq(0).contains('Fezzick, Prince Humperdink, Princess Buttercup + 1 more')
      })
    })
  })

  describe('Interactive filter', () => {
    const reportDetails = { name: 'Establishment autocomplete multi', description: 'Autocomplete Multiselect example' }

    beforeEach(() => {
      cy.task('stubAutoMultiselectDefinitionRequest')
      cy.task('stubResultSuccessResult')

      cy.visit('/')
    })

    it('should work interactively', () => {
      requestReportByNameAndDescription(reportDetails)

      cy.findByRole('heading', { level: 1, name: /Establishment autocomplete multi/, timeout: 10000 }).should(
        'be.visible',
      )

      cy.findAllByRole('group')
        .contains(/Show filters/)
        .click()

      // Show initialised values
      cy.findByText(/^Value 1$/i).should('be.visible')
      cy.findByText(/^Value 2$/i).should('be.visible')

      checkSelectedFilterValues({
        length: 1,
        buttonValues: [{ key: 'Interactive autocompletemulti', value: 'Value 1, Value 2' }],
      })

      // Set values correctly
      cy.findByRole('textbox', { name: /search/i }).type('ue 4')

      cy.findByText(/^Value 1$/i).should('be.visible')
      cy.findByText(/^Value 2$/i).should('be.visible')
      cy.findByText(/^Value 3$/i).should('not.be.visible')
      cy.findByText(/^Value 4$/i).should('be.visible')
      cy.findByText(/^Value 5$/i).should('not.be.visible')

      cy.findByRole('checkbox', { name: 'Value 4' }).check()

      cy.findByRole('textbox', { name: /search/i })
        .clear()
        .type('ue 5')

      cy.findByRole('checkbox', { name: 'Value 5' }).check()

      cy.findByRole('button', { name: 'Apply filters' }).click()

      checkSelectedFilterValues({
        length: 1,
        buttonValues: [{ key: 'Interactive autocompletemulti', value: 'Value 1, Value 2, Value 4 + 1 more' }],
      })

      cy.findAllByRole('group')
        .contains(/Show filters/)
        .click()

      // deselect values
      cy.findByRole('checkbox', { name: 'Value 1' }).uncheck()
      cy.findByRole('checkbox', { name: 'Value 2' }).uncheck()

      cy.findByRole('textbox', { name: /search/i }).type('ue 3')

      cy.findByRole('checkbox', { name: 'Value 3' }).check()

      cy.findByRole('textbox', { name: /search/i }).clear()

      cy.findByText(/^Value 1$/i).should('not.be.visible')
      cy.findByText(/^Value 2$/i).should('not.be.visible')
      cy.findByText(/^Value 3$/i).should('be.visible')
      cy.findByText(/^Value 4$/i).should('be.visible')
      cy.findByText(/^Value 5$/i).should('be.visible')

      cy.findByRole('button', { name: 'Apply filters' }).click()

      checkSelectedFilterValues({
        length: 1,
        buttonValues: [{ key: 'Interactive autocompletemulti', value: 'Value 3, Value 4, Value 5' }],
      })
    })
  })

  describe('Validation', () => {
    const reportDetails = {
      name: 'Establishment autocomplete multi min max',
      description: 'Autocomplete Multiselect with min and max validation example',
    }

    beforeEach(() => {
      cy.task('stubAutoMultiselectMinMaxDefinitionRequest')
      cy.task('stubResultSuccessResult')

      cy.visit('/')
    })

    describe('pre-request', () => {
      it('show validate the input correctly', () => {
        startReportRequest(reportDetails)

        // show validation errors when the min is set and values are out of bounds
        // show validation errors when the max is set and values are out of bounds
        //show pass validation when values are in bounds
      })
    })

    describe('interactive', () => {
      it('show validate the input correctly', () => {
        requestReportByNameAndDescription(reportDetails)
        // show validation errors when the min is set and values are out of bounds
        // show validation errors when the max is set and values are out of bounds
        //show pass validation when values are in bounds
      })
    })
  })
})
