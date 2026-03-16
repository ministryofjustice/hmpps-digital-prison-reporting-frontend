import { executeReportStubs } from "cypress-tests/cypressUtils"

context('Search component', () => {
  const path = '/components/report-heading'

  before(() => {
    executeReportStubs()
  })

  it('should display the report heading component with working actions', () => {
    cy.visit(path)
    cy.findByRole('button', { name: /Refresh/ }).should('be.visible').click()
    cy.url().should('have.string', '/refreshme')

    cy.visit(path)
    cy.findByRole('button', { name: /Copy report link/ }).should('be.visible').click()
    cy.window().then(async (window) => {
      const clipboard = await window.navigator.clipboard.readText()
      expect(clipboard).to.equal('/copyme')
    })

    cy.findByRole('button', { name: /Download/ }).should('be.visible').click()
    cy.url().should('have.string', '/downloadme')

    cy.visit(path, {
      onBeforeLoad: (win) => {
        cy.stub(win, 'print')
      }
    })
    cy.findByRole('button', { name: /Print/ }).should('be.visible').click()
    cy.window().then((win) => {
      expect(win.print).to.be.calledOnce
    })

    cy.visit(path)
    cy.findByRole('link', { name: /Add bookmark/ }).should('be.visible').click()
    cy.findByRole('link', { name: /Remove bookmark/ }).should('be.visible').click()
    cy.findByRole('link', { name: /Add bookmark/ }).should('be.visible')
  })

})
