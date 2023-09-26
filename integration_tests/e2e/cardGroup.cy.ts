import IndexPage from '../pages/index'
import Page from '../pages/page'

context('Card group', () => {
  [
    { name: 'One', place: 'first' },
    { name: 'Two', place: 'second' },
    { name: 'Three', place: 'third' },
  ].forEach((card) => {
    it(`Card displays as expected: ${card.name}`, () => {
      cy.visit('/')

      Page.verifyOnPage(IndexPage)

      cy.get(`a[href="#${card.name.toLowerCase()}"]`)
    })
  })
})
