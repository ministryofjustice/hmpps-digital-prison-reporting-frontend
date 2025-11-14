import { featureTestingUnprintable } from '@networkMocks/report/mockVariants/feature-testing/unprintable'
import { featureTestingEmptyQuery } from '@networkMocks/report/mockVariants/feature-testing/emptyQuery'
import { stubBaseTasks, stubDefinitionsTasks } from '../../../../../../cypress-tests/cypressUtils'

context('Bookmarks list', () => {
  const path = '/embedded/platform/'

  describe('check the default starting state', () => {
    it('should have the default bookmarks from the caseload bookmark config', () => {
      stubBaseTasks()
      stubDefinitionsTasks()
      cy.visit(path)

      cy.findByRole('tab', { name: /Bookmarks/ }).click()
      cy.findByLabelText(/Bookmarks.*/i).within(() => {
        cy.findAllByRole('rowgroup')
          .eq(1)
          .within(() => {
            cy.findAllByRole('row').should('have.length', 2)
            cy.findByRole('link', {
              name: (_, element) => (element as HTMLAnchorElement).href.includes(featureTestingUnprintable.id),
            })
            cy.findByRole('link', {
              name: (_, element) => (element as HTMLAnchorElement).href.includes(featureTestingEmptyQuery.id),
            })
          })
      })
    })
  })

  describe('check other interactions', () => {
    before(() => {
      stubBaseTasks()
      stubDefinitionsTasks()
      cy.task('stubDefinitionRequestExamplesSuccess')
      cy.task('stubListExampleDashboard')
      cy.task('stubDefinitionMockReportVariant35')
      cy.task('stubTestDashboard8')
      cy.task('stubDefinitionFeatureTestingInteractive')
      cy.task('stubDashboardSuccessResult20')
      cy.task('stubRequestSuccessResult20')
      cy.task('stubPollingReportEndpoint')
    })

    beforeEach(() => {
      cy.visit(path)
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
                return Boolean(element.textContent?.includes('Interactive Report with async filters'))
              },
            }).within(() => {
              cy.findByRole('button', { name: /Add bookmark/ }).click()
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
                return Boolean(element.textContent?.includes('Interactive Report with async filters'))
              },
            }).within(() => {
              cy.findByRole('button', { name: /Remove bookmark/ }).should('exist')
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
                return Boolean(element.textContent?.includes('Interactive Report with async filters'))
              },
            }).within(() => {
              cy.findByRole('button', { name: /Remove bookmark/ }).click()
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
                return Boolean(element.textContent?.includes('Interactive Report with async filters'))
              },
            }).within(() => {
              cy.findByRole('button', { name: /Add bookmark/ }).should('exist')
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
                return Boolean(element.textContent?.includes('Data quality data set'))
              },
            }).within(() => {
              cy.findByRole('button', { name: /Add bookmark/ }).click()
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
                return Boolean(element.textContent?.includes('Data quality data set'))
              },
            }).within(() => {
              cy.findByRole('button', { name: /Remove bookmark/ }).should('exist')
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
                return Boolean(element.textContent?.includes('Data quality data set'))
              },
            }).within(() => {
              cy.findByRole('button', { name: /Remove bookmark/ }).click()
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
                return Boolean(element.textContent?.includes('Data quality data set'))
              },
            }).within(() => {
              cy.findByRole('button', { name: /Add bookmark/ }).should('exist')
            })
          })
        })
      })

      describe('missing report', () => {
        it('should not be able to be bookmarked', () => {
          cy.findByRole('tab', { name: /Bookmarks/ }).click()
          cy.findByLabelText(/Reports catalogue.*/i).within(() => {
            cy.findByRole('row', {
              name: (_, element) => {
                return Boolean(element.textContent?.includes('Description for missing report 1'))
              },
            }).within(() => {
              cy.findByRole('button', { name: /Add bookmark/ }).should('not.exist')
              cy.findByRole('link', { name: /Request report/ }).should('be.visible')
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
              return Boolean(element.textContent?.includes('Data quality data set'))
            },
          }).within(() => {
            cy.findByRole('button', { name: /Add bookmark/ }).click()
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
              return Boolean(element.textContent?.includes('Data quality data set'))
            },
          }).within(() => {
            cy.findByRole('button', { name: /Remove bookmark/ }).click()
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
              return Boolean(element.textContent?.includes('Interactive Report with async filters'))
            },
          }).within(() => {
            cy.findByRole('button', { name: /Add bookmark/ }).click()
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
              return Boolean(element.textContent?.includes('Interactive Report with async filters'))
            },
          }).within(() => {
            cy.findByRole('button', { name: /Remove bookmark/ }).click()
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
      let viewReportUrl: string

      before(() => {
        cy.task('stubDefinitionFeatureTestingMissingDesc')
        cy.task('stubReportsFinishedStatus')
        cy.task('stubViewAsyncReportingResults')
        cy.task('stubRequestSuccessReportTablesCount')

        cy.visit(path)
        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return (
                Boolean(element.textContent?.includes('Feature testing')) &&
                Boolean(element.textContent?.includes('Missing variant description')) &&
                Boolean(element.textContent?.includes('Example variants used for feature testing'))
              )
            },
          }).within(() => {
            cy.findByRole('link', { name: 'Request report' }).click()
          })
        })
        cy.findByRole('combobox', { name: /Field 2/ }).select('Value 2.1')
        cy.findByRole('button', { name: /Request report/ }).click()

        cy.findByRole('button', { name: /Enable download/ }).should('be.visible')
        cy.url().then((url) => {
          viewReportUrl = url
        })
      })

      it('should add a bookmark', () => {
        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 2)
            })
        })

        cy.visit(viewReportUrl)
        cy.findByRole('button', { name: /Add bookmark/ }).click()
        cy.findByRole('button', { name: /Bookmarked/ }).should('be.visible')

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
        cy.visit(viewReportUrl)

        cy.findByRole('button', { name: /Remove bookmark/ }).click()
        cy.findByRole('button', { name: /Bookmark removed/ })

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
      let viewReportUrl: string

      before(() => {
        cy.task('stubTestDashboard8')
        cy.task('stubMockDashboardsStatusFinished')
        cy.task('stubViewAsyncResults')
        cy.task('stubDashboardSuccessResult20')

        cy.visit(path)
        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return (
                Boolean(element.textContent?.includes('Test Dashboard')) &&
                Boolean(element.textContent?.includes('Dashboard used for testing testing'))
              )
            },
          }).within(() => {
            cy.findByRole('link', { name: 'Request dashboard' }).click()
          })
        })
        cy.findByRole('button', { name: /Request dashboard/ }).click()

        cy.url().then((url) => {
          viewReportUrl = url
        })
      })

      it('should add a bookmark', () => {
        cy.visit(viewReportUrl)
        cy.findByRole('button', { name: /Add bookmark/ })
          .click()
          .contains('Bookmarked')
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
        cy.visit(path)
        cy.findByLabelText(/Bookmarks.*/i).within(() => {
          cy.findAllByRole('rowgroup')
            .eq(1)
            .within(() => {
              cy.findAllByRole('row').should('have.length', 3)
            })
        })
        cy.visit(viewReportUrl)
        cy.findByRole('button', { name: /Remove bookmark/ })
          .click()
          .contains('Bookmark removed')
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

    describe('bookmarking should be idempotent', () => {
      it('should not change the bookmark status of an already bookmarked item', () => {
        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return Boolean(element.textContent?.includes('Interactive Report with async filters'))
            },
          }).within(() => {
            cy.findByRole('button', { name: /Add bookmark/ }).click()
          })
        })
        // Deselect the bookmark hidden input so that we try to add it whilst it's already added
        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return Boolean(element.textContent?.includes('Interactive Report with async filters'))
            },
          }).within(() => {
            cy.get('input').then((el) => {
              // eslint-disable-next-line no-param-reassign
              ;(el.get(0) as HTMLInputElement).checked = false
              el.get(0).removeAttribute('checked')
            })
            cy.get('input').invoke('attr', 'checked').should('equal', undefined)
          })
        })
        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return Boolean(element.textContent?.includes('Interactive Report with async filters'))
            },
          }).within(() => {
            cy.findByRole('button', { name: /Remove bookmark/ }).click()
          })
        })
        cy.reload()
        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return Boolean(element.textContent?.includes('Interactive Report with async filters'))
            },
          }).within(() => {
            cy.findByRole('button', { name: /Remove bookmark/ }).should('exist')
          })
        })
        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return Boolean(element.textContent?.includes('Interactive Report with async filters'))
            },
          }).within(() => {
            cy.findByRole('button', { name: /Remove bookmark/ }).click()
          })
        })
      })

      it('should not change the bookmark status of an unbookmarked item', () => {
        // Select the bookmark hidden input so that we try to add it whilst it's already added
        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return Boolean(element.textContent?.includes('Interactive Report with async filters'))
            },
          }).within(() => {
            cy.get('input').then((el) => {
              // eslint-disable-next-line no-param-reassign
              ;(el.get(0) as HTMLInputElement).checked = true
              el.get(0).setAttribute('checked', 'true')
            })
            // Browser does funny things with checked attribute, it can be 'checked' or 'true' or unset - just check its there and not false
            cy.get('input').invoke('attr', 'checked').should('not.equal', undefined).and('not.equal', false)
          })
        })
        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return Boolean(element.textContent?.includes('Interactive Report with async filters'))
            },
          }).within(() => {
            cy.findByRole('button', { name: /Add bookmark/ }).click()
          })
        })
        cy.reload()
        cy.findByLabelText(/Reports catalogue.*/i).within(() => {
          cy.findByRole('row', {
            name: (_, element) => {
              return Boolean(element.textContent?.includes('Interactive Report with async filters'))
            },
          }).within(() => {
            cy.findByRole('button', { name: /Add bookmark/ }).should('exist')
          })
        })
      })
    })
  })
})
