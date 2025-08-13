context('User reports component', () => {
  const path = '/components/user-reports/default'

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    cy.injectAxe()
    cy.checkA11y()
  })

  describe('Requested reports list', () => {
    const requestedRows = '#dpr-async-request-component > div > table > tbody > tr'
    beforeEach(() => {
      cy.get('#tab_requested-reports-tab').click()
    })

    it('should show the "Requested" tab', () => {
      cy.get('#tab_requested-reports-tab').should('be.visible')
    })

    it('should show the help text', () => {
      cy.get('#dpr-async-request-component > div > div > details > summary').should('be.visible')
    })

    it('should show the total reports', () => {
      cy.get('#dpr-async-request-component > :nth-child(1) > .dpr-slide__header > .dpr-slide__sub-text').should(
        'be.visible',
      )
      cy.get('#dpr-async-request-component > div > div > p > strong:nth-child(1)').should('not.be.empty')
      cy.get('#dpr-async-request-component > div > div > p > strong:nth-child(2)').should('not.be.empty')
    })

    it('should show the link to view all reports', () => {
      cy.get('#dpr-async-request-component > div > div > p > a').should('exist')
    })

    it('should show the correct table headers', () => {
      const th = cy.get('#dpr-async-request-component > div > table > thead > tr > th')
      th.should('have.length', 4)
      th.each((head, index) => {
        switch (index) {
          case 0:
            cy.wrap(head).contains('Product')
            break
          case 1:
            cy.wrap(head).contains('Filters')
            break
          case 2:
            cy.wrap(head).contains('Status')
            break
          case 3:
            cy.wrap(head).contains('Actions')
            break
          default:
            break
        }
      })
    })

    it('should show the product and variant information', () => {
      const rows = cy.get(requestedRows)
      rows.each((row) => {
        cy.wrap(row).get('td:nth-child(1) > div > p:nth-child(1) > strong').should('not.be.empty')
        cy.wrap(row).get('td:nth-child(1) > div > p:nth-child(2)').should('not.be.empty')
        cy.wrap(row)
          .get('td:nth-child(1) > div > strong')
          .contains(/Dashboard|Report/g)
        cy.wrap(row).get('td:nth-child(1) > div > p:nth-child(3)').should('not.be.empty')
      })
    })

    it('should show the requested filters', () => {
      const rows = cy.get(requestedRows)
      rows.each((row) => {
        cy.wrap(row)
          .get('td:nth-child(2) > ul > li')
          .each((li) => {
            cy.wrap(li).should('satisfy', ($el) => {
              const classList = Array.from($el[0].classList)
              return classList.includes('dpr-query-summary') || classList.includes('dpr-interactive-query-summary') // passes
            })
          })
      })
    })

    it('should show the status', () => {
      const rows = cy.get(requestedRows)
      rows.each((row) => {
        cy.wrap(row)
          .get('td:nth-child(3) > strong')
          .contains(/FINISHED|EXPIRED|FAILED|ABORTED/g)
      })
    })

    it('should show the correct actions', () => {
      const rows = cy.get(requestedRows)
      rows.each((row) => {
        cy.wrap(row)
          .find('td:nth-child(3) > strong')
          .then((status) => {
            const s = status.text()
            switch (s) {
              case 'FINISHED':
                cy.wrap(row).find('td:nth-child(4)').contains('Go to report')
                break
              case 'EXPIRED':
                cy.wrap(row).find('td:nth-child(4)').contains('Refresh')
                cy.wrap(row).find('td:nth-child(4)').contains('Remove')
                break
              case 'FAILED':
              case 'ABORTED':
                cy.wrap(row).find('td:nth-child(4)').contains('Retry')
                cy.wrap(row).find('td:nth-child(4)').contains('Remove')
                break
              default:
                break
            }
          })
      })
    })
  })

  describe('Viewed reports list', () => {
    const viewedRows = '#dpr-recently-viewed-component > div > table > tbody > tr'

    beforeEach(() => {
      cy.get('#tab_recently-viewed-tab').click()
    })

    it('should show the "Viewed" tab', () => {
      cy.get('#tab_recently-viewed-tab').should('be.visible')
    })

    it('should show the help text', () => {
      cy.get('#dpr-recently-viewed-component > div > div > details > summary').should('be.visible')
    })

    it('should show the total reports', () => {
      cy.get('#dpr-recently-viewed-component > :nth-child(1) > .dpr-slide__header > .dpr-slide__sub-text').should(
        'be.visible',
      )
      cy.get('#dpr-recently-viewed-component > div > div > p > strong:nth-child(1)').should('not.be.empty')
      cy.get('#dpr-recently-viewed-component > div > div > p > strong:nth-child(2)').should('not.be.empty')
    })

    it('should show the link to view all reports', () => {
      cy.get('#dpr-recently-viewed-component > div > div > p > a').should('exist')
    })

    it('should show the correct table headers', () => {
      const th = cy.get('#dpr-recently-viewed-component > div > table > thead > tr > th')
      th.should('have.length', 4)
      th.each((head, index) => {
        switch (index) {
          case 0:
            cy.wrap(head).contains('Product')
            break
          case 1:
            cy.wrap(head).contains('Filters')
            break
          case 2:
            cy.wrap(head).contains('Status')
            break
          case 3:
            cy.wrap(head).contains('Actions')
            break
          default:
            break
        }
      })
    })

    it('should show the product and variant information', () => {
      const rows = cy.get(viewedRows)
      rows.each((row) => {
        cy.wrap(row).get('td:nth-child(1) > div > p:nth-child(1) > strong').should('not.be.empty')
        cy.wrap(row).get('td:nth-child(1) > div > p:nth-child(2)').should('not.be.empty')
        cy.wrap(row)
          .get('td:nth-child(1) > div > strong')
          .contains(/Dashboard|Report/g)
        cy.wrap(row).get('td:nth-child(1) > div > p:nth-child(3)').should('not.be.empty')
      })
    })

    it('should show the requested filters', () => {
      const rows = cy.get(viewedRows)
      rows.each((row) => {
        cy.wrap(row)
          .get('td:nth-child(2) > ul > li')
          .each((li) => {
            cy.wrap(li).should('satisfy', ($el) => {
              const classList = Array.from($el[0].classList)
              return classList.includes('dpr-query-summary') || classList.includes('dpr-interactive-query-summary') // passes
            })
          })
      })
    })

    it('should show the status', () => {
      const rows = cy.get(viewedRows)
      rows.each((row) => {
        cy.wrap(row)
          .get('td:nth-child(3) > strong')
          .contains(/FINISHED|EXPIRED|FAILED|ABORTED/g)
      })
    })

    it('should show the correct actions', () => {
      const rows = cy.get(viewedRows)
      rows.each((row) => {
        cy.wrap(row)
          .find('td:nth-child(3) > strong')
          .then((status) => {
            const s = status.text()
            switch (s) {
              case 'FINISHED':
                cy.wrap(row).find('td:nth-child(4)').contains('Go to report')
                break
              case 'EXPIRED':
                cy.wrap(row).find('td:nth-child(4)').contains('Refresh')
                cy.wrap(row).find('td:nth-child(4)').contains('Remove')
                break
              default:
                break
            }
          })
      })
    })
  })

  describe('Bookmarked reports list', () => {
    const bookmarkRows = '#dpr-bookmarks-list > div > table > tbody > tr'
    beforeEach(() => {
      cy.get('#tab_my-bookmarks-tab').click()
    })

    it('should show the "Bookmarks" tab', () => {
      cy.get('#tab_my-bookmarks-tab').should('be.visible')
    })

    it('should show the help text', () => {
      cy.get('#dpr-bookmarks-list > div > div > details > summary').should('be.visible')
    })

    it('should show the total reports', () => {
      cy.get('#dpr-bookmarks-list > :nth-child(1) > .dpr-slide__header > .dpr-slide__sub-text').should('be.visible')
      cy.get('#dpr-bookmarks-list > div > div > p > strong:nth-child(1)').should('not.be.empty')
      cy.get('#dpr-bookmarks-list > div > div > p > strong:nth-child(2)').should('not.be.empty')
    })

    it('should show the link to view all reports', () => {
      cy.get('#dpr-bookmarks-list > div > div > p > a').should('not.exist')
    })

    it('should show the correct table headers', () => {
      const th = cy.get('#dpr-bookmarks-list > div > table > thead > tr > th')
      th.should('have.length', 3)
      th.each((head, index) => {
        switch (index) {
          case 0:
            cy.wrap(head).contains('Product')
            break
          case 1:
            cy.wrap(head).contains('Description')
            break
          case 3:
            cy.wrap(head).contains('Actions')
            break
          default:
            break
        }
      })
    })

    it('should show the product and variant information', () => {
      const rows = cy.get(bookmarkRows)
      rows.each((row) => {
        cy.wrap(row).get('td:nth-child(1) > div > p:nth-child(1) > strong').should('not.be.empty')
        cy.wrap(row).get('td:nth-child(1) > div > p:nth-child(2)').should('not.be.empty')
        cy.wrap(row)
          .get('td:nth-child(1) > div > strong')
          .contains(/Dashboard|Report/g)
        cy.wrap(row).get('td:nth-child(1) > div > p:nth-child(3)').should('not.exist')
      })
    })

    it('should show the correct actions', () => {
      const rows = cy.get(bookmarkRows)
      rows.each((row) => {
        cy.wrap(row)
          .find('td:nth-child(3)')
          .contains(/Request report|Request dashboard/g)
        cy.wrap(row).find('td:nth-child(3)').contains('Remove bookmark')
      })
    })
  })
})
