context('Truncate component', () => {
  const path = '/components/truncate'

  beforeEach(() => {
    cy.visit(path)
  })

  const runTruncateTests = (selector: string) => {
    cy.get(`${selector} .dpr-truncate`).each(($truncate, _index) => {
      cy.wrap($truncate).within(() => {
        cy.get('.js-content').then($content => {
          const fullHtml = $content.attr('data-full-html')
          const truncatedHtml = $content.attr('data-truncated-html')

          expect(fullHtml).to.exist
          expect(truncatedHtml).to.exist

          const hasShowMore = Cypress.$('.js-show-more', $truncate).length > 0

          if (hasShowMore) {
            cy.get('.js-show-more').should('contain.text', 'Show more').click()

            cy.get('.js-content').invoke('html').should('eq', fullHtml)

            cy.get('.js-show-more').should('contain.text', 'Show less').click()

            cy.get('.js-content').invoke('html').should('eq', truncatedHtml)

            cy.get('.js-show-more').should('contain.text', 'Show more')
          } else {
            cy.get('.js-content')
              .invoke('html')
              .then(html => {
                expect(html.trim()).to.eq(truncatedHtml?.trim())
              })
          }
        })
      })
    })
  }

  it('string truncate', () => {
    runTruncateTests('.dpr-tests-truncate--strings')
  })

  it('HTML truncate', () => {
    runTruncateTests('.dpr-tests-truncate--html-strings')
  })

  it('Complex HTML truncate', () => {
    runTruncateTests('.dpr-tests-truncate--complex-html-strings')
  })
})
