import {
  executeReportStubs,
  requestReportByNameAndDescription,
  stubBaseTasks,
  startReportRequest,
} from 'cypress-tests/cypressUtils'

context('Viewing a report', () => {
  const path = '/embedded/platform/'

  describe('report variants', () => {
    before(() => {
      stubBaseTasks()
      executeReportStubs()
    })

    describe('list-section', () => {
      const listSectionReport = {
        name: 'List-section',
        description: 'list-section template',
      }

      beforeEach(() => {
        cy.task('stubListSectionDefinitionRequest')
        cy.task('stubResultSuccessResult')
      })

      it('should display a list-section variant', () => {
        cy.visit(path)
        requestReportByNameAndDescription(listSectionReport)
        cy.findByRole('heading', { level: 1, name: /List-section/ })
        cy.findAllByRole('heading', { name: /First.*Second/ }).should('have.length', 4)

        // Test headings exist
        cy.findByRole('heading', { name: /First: One, Second: A 4 results/ })
          .should('be.visible')
          .scrollIntoView()
        cy.findByRole('heading', { name: /First: One, Second: B 6 results/ })
          .should('be.visible')
          .scrollIntoView()
        cy.findByRole('heading', { name: /First: Two, Second: A 3 results/ })
          .should('be.visible')
          .scrollIntoView()
        cy.findByRole('heading', { name: /First: Two, Second: B 7 results/ })
          .should('be.visible')
          .scrollIntoView()

        // Test they only include 1 table per section
        cy.findAllByLabelText(/First: One, Second: A 4 results/)
          .eq(1)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 1)
          })
        cy.findAllByLabelText(/First: One, Second: B 6 results/)
          .eq(1)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 1)
          })
        cy.findAllByLabelText(/First: Two, Second: A 3 results/)
          .eq(1)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 1)
          })
        cy.findAllByLabelText(/First: Two, Second: B 7 results/)
          .eq(1)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 1)
          })
      })

      it('should sort the sections correctly', () => {
        cy.visit(path)
        startReportRequest(listSectionReport)
        cy.findByRole('group', { name: /Column/ })
          .findByRole('radio', { name: 'Second' })
          .check()
        cy.findByRole('button', { name: /Request/ }).click()

        cy.findByRole('heading', { level: 1, name: /List-section/ })
        cy.findAllByRole('heading', { name: /First.*Second/ })
          .should('have.length', 4)
          .each((heading, index) => {
            switch (index) {
              case 0:
                cy.wrap(heading).contains('First: One, Second: A 4 results')
                break
              case 1:
                cy.wrap(heading).contains('First: Two, Second: A 3 results')
                break
              case 2:
                cy.wrap(heading).contains('First: One, Second: B 6 results')
                break
              case 3:
                cy.wrap(heading).contains('First: Two, Second: B 7 results')
                break
              default:
                break
            }
          })
      })
    })

    describe('summary-section', () => {
      it('should display a summary section variant', () => {
        cy.task('stubSummarySectionDefinitionRequest')
        cy.task('stubAsyncSummaryReport')
        cy.task('stubResultSuccessResultDifferentValues')

        cy.visit(path)
        requestReportByNameAndDescription({ name: 'Summary-section', description: 'Summary-section template' })
        cy.findByRole('heading', { level: 1, name: /Summary-section/ }).should('be.visible')

        cy.findAllByLabelText(/First: One, Second: A/)
          .eq(0)
          .within(() => {
            cy.findAllByRole('table')
              .should('have.length', 2)
              .each((table) => {
                cy.wrap(table).within(() => {
                  cy.findAllByRole('row').should('have.length', 5)
                })
              })
          })

        cy.findAllByLabelText(/First: One, Second: B/)
          .eq(0)
          .within(() => {
            cy.findAllByRole('table')
              .should('have.length', 2)
              .each((table) => {
                cy.wrap(table).within(() => {
                  cy.findAllByRole('row').should('have.length', 7)
                })
              })
          })

        cy.findAllByLabelText(/First: Two, Second: A/)
          .eq(0)
          .within(() => {
            cy.findAllByRole('table')
              .should('have.length', 2)
              .each((table) => {
                cy.wrap(table).within(() => {
                  cy.findAllByRole('row').should('have.length', 4)
                })
              })
          })

        cy.findAllByLabelText(/First: Two, Second: B/)
          .eq(0)
          .within(() => {
            cy.findAllByRole('table')
              .should('have.length', 2)
              .each((table) => {
                cy.wrap(table).within(() => {
                  cy.findAllByRole('row').should('have.length', 8)
                })
              })
          })
      })
    })

    describe('parent-child-section', () => {
      const ParentChildSectionReport = {
        name: 'Parent-child-section',
        description: 'Parent-child-section template',
      }

      beforeEach(() => {
        cy.task('stubParentChildSectionDefinitionRequest')
        cy.task('stubResultSuccessResultDifferentValues')
      })

      it('should display a parent child section variant', () => {
        cy.visit(path)
        requestReportByNameAndDescription(ParentChildSectionReport)
        cy.findByRole('heading', { level: 1, name: /Parent-child-section/ }).should('be.visible')

        cy.findByRole('heading', { name: /Section 1: One, Section 2: A 5 results/ })
          .scrollIntoView()
          .should('be.visible')
        cy.findByRole('heading', { name: /Section 1: One, Section 2: B 2 results/ })
          .scrollIntoView()
          .should('be.visible')
        cy.findByRole('heading', { name: /Section 1: Two, Section 2: A 8 results/ })
          .scrollIntoView()
          .should('be.visible')
        cy.findByRole('heading', { name: /Section 1: Two, Section 2: B 5 results/ })
          .scrollIntoView()
          .should('be.visible')

        cy.findAllByLabelText('Section 1: One, Section 2: A 5 results')
          .eq(1)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 10)

            cy.findAllByLabelText('Parent 1')
              .eq(0)
              .within(() => {
                cy.findAllByRole('table').should('have.length', 2)

                // parent
                cy.findAllByLabelText('Parent 1')
                  .eq(0)
                  .within(() => {
                    cy.findByRole('table').within(() => {
                      cy.findAllByRole('row').should('have.length', 4)
                    })
                  })

                // Child
                cy.findAllByLabelText('Child Report')
                  .eq(0)
                  .within(() => {
                    cy.findByRole('table').within(() => {
                      cy.findAllByRole('row').should('have.length', 23)
                    })
                  })
              })
          })

        cy.findAllByLabelText('Section 1: Two, Section 2: A 8 results')
          .eq(1)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 16)

            cy.findAllByLabelText('Parent 1')
              .eq(0)
              .within(() => {
                cy.findAllByRole('table').should('have.length', 2)

                // parent
                cy.findAllByLabelText('Parent 1')
                  .eq(0)
                  .within(() => {
                    cy.findByRole('table').within(() => {
                      cy.findAllByRole('row').should('have.length', 4)
                    })
                  })

                // Child
                cy.findAllByLabelText('Child Report')
                  .eq(0)
                  .within(() => {
                    cy.findByRole('table').within(() => {
                      cy.findAllByRole('row').should('have.length', 23)
                    })
                  })
              })
          })
      })

      it('should sort the sections correctly', () => {
        cy.visit(path)
        startReportRequest(ParentChildSectionReport)
        cy.findByRole('group', { name: /Column/ })
          .findByRole('radio', { name: 'Section 2' })
          .check()
        cy.findByRole('button', { name: /Request/ }).click()

        cy.findByRole('heading', { level: 1, name: /Parent-child-section/ }).should('be.visible')

        cy.findAllByRole('heading', { name: /Section 1.*Section 2/ })
          .should('have.length', 4)
          .each((heading, index) => {
            switch (index) {
              case 0:
                cy.wrap(heading).contains('Section 1: One, Section 2: A 5 results')
                break
              case 1:
                cy.wrap(heading).contains('Section 1: Two, Section 2: A 8 results')
                break
              case 2:
                cy.wrap(heading).contains('Section 1: One, Section 2: B 2 results')
                break
              case 3:
                cy.wrap(heading).contains('Section 1: Two, Section 2: B 5 results')
                break
              default:
                break
            }
          })
      })
    })

    describe('parent-child', () => {
      it('should display a parent-child variant', () => {
        cy.task('stubParentChildDefinitionRequest')
        cy.task('stubResultSuccessResultDifferentValues')

        cy.visit(path)
        requestReportByNameAndDescription({ name: 'Parent-child', description: 'Parent-child template' })
        cy.findByRole('heading', { level: 1, name: /Parent-child/ }).should('be.visible')

        // Parent child group
        cy.findAllByLabelText('Parent 1')
          .eq(0)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 3)

            // parent
            cy.findAllByLabelText('Parent 1')
              .eq(0)
              .within(() => {
                cy.findByRole('table').within(() => {
                  cy.findAllByRole('row').should('have.length', 4)
                })
              })

            // child
            cy.findAllByLabelText('Child Report')
              .eq(0)
              .within(() => {
                cy.findByRole('table').within(() => {
                  cy.findAllByRole('row').should('have.length', 10)
                })
              })

            // child 2
            cy.findAllByLabelText('Child Report 2')
              .eq(0)
              .within(() => {
                cy.findByRole('table').within(() => {
                  cy.findAllByRole('row').should('have.length', 10)
                })
              })
          })

        // Parent child group
        cy.findAllByLabelText('Parent 8')
          .eq(0)
          .within(() => {
            cy.findAllByRole('table').should('have.length', 3)

            // parent
            cy.findAllByLabelText('Parent 8')
              .eq(0)
              .within(() => {
                cy.findByRole('table').within(() => {
                  cy.findAllByRole('row').should('have.length', 4)
                })
              })

            // child
            cy.findAllByLabelText('Child Report')
              .eq(0)
              .within(() => {
                cy.findByRole('table').within(() => {
                  cy.findAllByRole('row').should('have.length', 16)
                })
              })

            // child 2
            cy.findAllByLabelText('Child Report 2')
              .eq(0)
              .within(() => {
                cy.findByRole('table').within(() => {
                  cy.findAllByRole('row').should('have.length', 16)
                })
              })
          })
      })
    })
  })
})
