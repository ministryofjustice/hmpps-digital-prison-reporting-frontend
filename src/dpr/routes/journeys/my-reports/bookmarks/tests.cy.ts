context('Bookmarks list', () => {
  const path = '/embedded/platform/'
  const dashboardCatalogueListingBookmarkToggle =
    '#list-examples-data-quality-dataset-dashboard-visualisations-reports-list-bookmark-label > span'
  const reportCatalogueListingBookmarkToggle = '#variantId-35-mock-report-reports-list-bookmark-label > span'

  beforeEach(() => {
    cy.visit(path)
  })

  it('is accessible', () => {
    cy.visit(path)
    cy.injectAxe()
    cy.checkA11y()
  })

  describe('Bookmarking via the catalogue', () => {
    describe('report', () => {
      it('should add a bookmark to the bookmarks list', () => {
        cy.findByRole('tab', { name: /Bookmarks/ }).click()
        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 2)
            })
        })

        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return element.textContent.includes('Interactive Report with async filters')
            },
          }).within(() => {
            cy.findByRole('checkbox', { name: 'Add bookmark' }).click()
          })
        })

        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 3)
            })
        })
        cy.get('#dpr-bookmarks-list > div > table > tbody > tr:nth-child(1) > td:nth-child(1)').contains(
          'Interactive Report with async filters',
        )
        cy.get(reportCatalogueListingBookmarkToggle).contains('Remove bookmark')
      })

      it('should remove a bookmark to the bookmarks list', () => {
        cy.findByRole('tab', { name: /Bookmarks/ }).click()
        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 3)
            })
        })
        cy.get(reportCatalogueListingBookmarkToggle).contains('Remove bookmark')
        cy.get(reportCatalogueListingBookmarkToggle).click()
        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 2)
            })
        })
        cy.get(reportCatalogueListingBookmarkToggle).contains('Add bookmark')
      })
    })

    describe('dashboard', () => {
      it('should add a bookmark to the bookmarks list', () => {
        cy.findByRole('tab', { name: /Bookmarks/ }).click()
        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 2)
            })
        })
        cy.get(dashboardCatalogueListingBookmarkToggle).contains('Add bookmark').click()
        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 3)
            })
        })
        cy.get('#dpr-bookmarks-list > div > table > tbody > tr:nth-child(1) > td:nth-child(1)').contains(
          'Data quality data set',
        )
        cy.get(dashboardCatalogueListingBookmarkToggle).contains('Remove bookmark')
      })

      it('should remove a bookmark from the bookmarks list', () => {
        cy.findByRole('tab', { name: /Bookmarks/ }).click()
        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 3)
            })
        })
        cy.get(dashboardCatalogueListingBookmarkToggle).contains('Remove bookmark')
        cy.get(dashboardCatalogueListingBookmarkToggle).click()
        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 2)
            })
        })
        cy.get(dashboardCatalogueListingBookmarkToggle).contains('Add bookmark')
      })
    })
  })

  describe('Removing via the user reports list', () => {
    it('should remove a dashboard bookmark', () => {
      cy.get(dashboardCatalogueListingBookmarkToggle).contains('Add bookmark').click()
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 3)
          })
      })
      cy.get(dashboardCatalogueListingBookmarkToggle).contains('Remove bookmark').click()
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 2)
          })
      })
    })

    it('should remove a report bookmark', () => {
      cy.get(reportCatalogueListingBookmarkToggle).contains('Add bookmark').click()
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 3)
          })
      })
      cy.get(reportCatalogueListingBookmarkToggle).contains('Remove bookmark').click()
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 2)
          })
      })
    })
  })

  describe('Bookmarking via the report', () => {
    const reportPath =
      '/embedded/platform/async/report/feature-testing/feature-testing-interactive/request/tblId_1733925499607/report'
    const reportBookmarkToggle = '#feature-testing-interactive-feature-testing-report-bookmark-label > span'

    it('should add a bookmark', () => {
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 2)
          })
      })
      cy.visit(reportPath)
      cy.get(reportBookmarkToggle).contains('Add bookmark').click()
      cy.get(reportBookmarkToggle).contains('Bookmarked')
      cy.visit(path)
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 3)
          })
      })
    })

    it('should remove a bookmark', () => {
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 3)
          })
      })
      cy.visit(reportPath)
      cy.get(reportBookmarkToggle).click()
      cy.get(reportBookmarkToggle).contains('Bookmark removed')
      cy.visit(path)
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 2)
          })
      })
    })
  })

  describe('Bookmarking via the dashboard', () => {
    const dashboardPath =
      '/embedded/platform/async/dashboard/mock-dashboards/test-dashboard-8/request/tblId_1730302242487/dashboard'
    const dashboardBookmarkToggle = '#test-dashboard-8-mock-dashboards-report-bookmark-label > span'

    it('should remove a bookmark', () => {
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 2)
          })
      })
      cy.visit(dashboardPath)
      cy.get(dashboardBookmarkToggle).click().contains('Bookmark removed')
      cy.visit(path)
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 1)
          })
      })
    })

    it('should add a bookmark', () => {
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 1)
          })
      })
      cy.visit(dashboardPath)
      cy.get(dashboardBookmarkToggle).click().contains('Bookmarked')
      cy.visit(path)
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 2)
          })
      })
    })
  })
})
