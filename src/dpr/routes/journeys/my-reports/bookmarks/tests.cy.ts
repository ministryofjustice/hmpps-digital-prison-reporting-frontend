context('Bookmarks list', () => {
  const path = '/embedded/platform/'

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
            cy.findByLabelText('bookmark toggle').should('exist').contains('Add bookmark').click()
          })
        })

        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 3)
              cy.findAllByRole('row').contains('Interactive Report with async filters').should('exist')
            })
        })

        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return element.textContent.includes('Interactive Report with async filters')
            },
          }).within(() => {
            cy.findByLabelText('bookmark toggle').should('exist').contains('Remove bookmark')
          })
        })
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

        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return element.textContent.includes('Interactive Report with async filters')
            },
          }).within(() => {
            cy.findByLabelText('bookmark toggle').should('exist').contains('Remove bookmark').click()
          })
        })

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
            cy.findByLabelText('bookmark toggle').should('exist').contains('Add bookmark').should('exist')
          })
        })
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

        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return element.textContent.includes('Data quality data set')
            },
          }).within(() => {
            cy.findByLabelText('bookmark toggle').should('exist').contains('Add bookmark').click()
          })
        })

        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 3)
              cy.findAllByRole('row').contains('Data quality data set').should('exist')
            })
        })

        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return element.textContent.includes('Data quality data set')
            },
          }).within(() => {
            cy.findByLabelText('bookmark toggle').should('exist').contains('Remove bookmark')
          })
        })
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

        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return element.textContent.includes('Data quality data set')
            },
          }).within(() => {
            cy.findByLabelText('bookmark toggle').should('exist').contains('Remove bookmark').click()
          })
        })

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
              return element.textContent.includes('Data quality data set')
            },
          }).within(() => {
            cy.findByLabelText('bookmark toggle').should('exist').contains('Add bookmark')
          })
        })
      })
    })
  })

  describe('Removing via the user reports list', () => {
    it('should remove a dashboard bookmark', () => {
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Data quality data set')
          },
        }).within(() => {
          cy.findByLabelText('bookmark toggle').should('exist').contains('Add bookmark').click()
        })
      })

      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 3)
          })
      })

      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Data quality data set')
          },
        }).within(() => {
          cy.findByLabelText('bookmark toggle').should('exist').contains('Remove bookmark').click()
        })
      })

      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 2)
          })
      })
    })

    it('should remove a report bookmark', () => {
      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Interactive Report with async filters')
          },
        }).within(() => {
          cy.findByLabelText('bookmark toggle').should('exist').contains('Add bookmark').click()
        })
      })

      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 3)
          })
      })

      cy.findByLabelText(/Reports catalogue.*/i).within(() => {
        cy.findByRole('row', {
          name: (_, element) => {
            return element.textContent.includes('Interactive Report with async filters')
          },
        }).within(() => {
          cy.findByLabelText('bookmark toggle').should('exist').contains('Remove bookmark').click()
        })
      })

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

    it('should add a bookmark', () => {
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 2)
          })
      })
      cy.visit(reportPath)
      cy.findByLabelText('bookmark toggle').should('exist').contains('Add bookmark').click()
      cy.findByLabelText('bookmark toggle').should('exist').contains('Bookmarked')
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

      cy.findByLabelText('bookmark toggle').contains('Remove bookmark').should('exist').click()
      cy.findByLabelText('bookmark toggle').should('exist').contains('Bookmark removed')

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

    it('should remove a bookmark', () => {
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 2)
          })
      })
      cy.visit(dashboardPath)
      cy.findByLabelText('bookmark toggle')
        .contains('Remove bookmark')
        .should('exist')
        .click()
        .contains('Bookmark removed')
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

      cy.findByLabelText('bookmark toggle').contains('Add bookmark').should('exist').click().contains('Bookmarked')

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
