export type PageElement = Cypress.Chainable<JQuery>

export default class HomePage {
  cards = (): PageElement => cy.get(`.dpr-card-group__item`)

  card = (index: number): PageElement => cy.get(`.dpr-card-group__item:eq(${index})`)
}
