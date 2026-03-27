import {
  executeReportStubs,
  requestReportByNameAndDescription,
  stubBaseTasks,
  startReportRequest,
} from '../../../../../../../../cypress-tests/cypressUtils'

context('Parent-child', () => {
  const path = '/'

  describe('viewing parent-child variants', () => {
    before(() => {
      stubBaseTasks()
      executeReportStubs()
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
                      cy.findAllByRole('row').should('have.length', 2)
                    })
                  })

                // Child
                cy.findAllByLabelText('Child Report')
                  .eq(0)
                  .within(() => {
                    cy.findByRole('table').within(() => {
                      cy.findAllByRole('row').should('have.length', 21)
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
                      cy.findAllByRole('row').should('have.length', 2)
                    })
                  })

                // Child
                cy.findAllByLabelText('Child Report')
                  .eq(0)
                  .within(() => {
                    cy.findByRole('table').within(() => {
                      cy.findAllByRole('row').should('have.length', 21)
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
                cy.wrap(heading).contains('Section 1: Two, Section 2: B 5 results')
                break
              case 1:
                cy.wrap(heading).contains('Section 1: One, Section 2: B 2 results')
                break
              case 2:
                cy.wrap(heading).contains('Section 1: Two, Section 2: A 8 results')
                break
              case 3:
                cy.wrap(heading).contains('Section 1: One, Section 2: A 5 results')
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
                  cy.findAllByRole('row').should('have.length', 2)
                })
              })

            // child
            cy.findAllByLabelText('Child Report')
              .eq(0)
              .within(() => {
                cy.findByRole('table').within(() => {
                  cy.findAllByRole('row').should('have.length', 8)
                })
              })

            // child 2
            cy.findAllByLabelText('Child Report 2')
              .eq(0)
              .within(() => {
                cy.findByRole('table').within(() => {
                  cy.findAllByRole('row').should('have.length', 8)
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
                  cy.findAllByRole('row').should('have.length', 2)
                })
              })

            // child
            cy.findAllByLabelText('Child Report')
              .eq(0)
              .within(() => {
                cy.findByRole('table').within(() => {
                  cy.findAllByRole('row').should('have.length', 14)
                })
              })

            // child 2
            cy.findAllByLabelText('Child Report 2')
              .eq(0)
              .within(() => {
                cy.findByRole('table').within(() => {
                  cy.findAllByRole('row').should('have.length', 14)
                })
              })
          })
      })
    })
  })
})
