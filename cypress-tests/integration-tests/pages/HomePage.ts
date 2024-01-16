export type PageElement = Cypress.Chainable<JQuery>

export default class HomePage {
  cards = (): PageElement => cy.get(`.card`)

  card = (index: number): PageElement => cy.get(`.card:eq(${index})`)
}
