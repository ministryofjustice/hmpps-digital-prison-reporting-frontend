import { stubBaseTasks, stubDefinitionsTasks } from 'cypress-tests/cypressUtils'

describe('Gain access to unauthorised reports', () => {
  const paths = ['/', '/dpr', '/embedded/platform', '/embedded/platform/dpr']

  const sharedTests = (path: string) => {
    beforeEach(() => {
      stubBaseTasks()
      stubDefinitionsTasks()
    })

    describe(`Request access - ${path}`, () => {
      it('should show the request access page', () => {
        cy.visit(path)

        cy.findAllByRole('group').contains('Show more filters').should('be.visible').click()

        cy.findByRole('checkbox', { name: 'Show unauthorised reports' }).check()

        cy.findByRole('link', { name: 'Request access' }).click()

        cy.findByRole('heading', { name: /Request access to this report/ }).should('be.visible')

        cy.findByText('Interactive Report with async filters')
        cy.findByText('By Person ID and Visit Detail')
      })
    })
  }

  paths.forEach(route => sharedTests(route))
})
