context('Catalogue component', () => {
  const path = '/components/catalogue/configured'

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  describe('Configuration testing', () => {
    it('should not show the help text', () => {
      cy.get('#reports-catalogue > :nth-child(1) > .govuk-details__summary > .govuk-details__summary-text').should(
        'not.exist',
      )
    })

    it('should not show the checkbox filters', () => {
      cy.get(
        '.dpr-catalogue-filters__unauth-toggle > .dpr-unauthorised-toggle > .govuk-form-group > .govuk-fieldset',
      ).should('not.exist')
    })

    it('should not show the bookmark toggle', () => {
      const rows = cy
        .get('#dpr-reports-catalogue > tbody > tr')
        .not('.dpr-report-type-hide')
        .not('.dpr-missing-report-hide')

      rows.each((row) => {
        cy.wrap(row).find('td:nth-child(4) > div.dpr-bookmark-label').should('not.exist')
      })
    })
  })
})
