/* eslint-disable func-names */

import { Then, When } from '@badeball/cypress-cucumber-preprocessor'
import HomePage from '../pages/HomePage'

When(/^I click on the (.+) card$/, (cardTitle: string) => {
  new HomePage().cards().each((card) => {
    if (card.find('a.card__link').text().trim() === cardTitle) {
      card.trigger('click')
    }
  })
})

Then(/^(\d+) cards are displayed$/, (numberOfCards: number) => {
  new HomePage().cards().should('have.length', numberOfCards)
})

Then(/^a card is displayed with the title (.*)$/, function (this: Mocha.Context, title: string) {
  let matchingCardIndex

  new HomePage()
    .cards()
    .each((card, index) => {
      if (card.find('.card__link').text().trim() === title) {
        matchingCardIndex = index
      }
    })
    .then(() => {
      expect(matchingCardIndex).to.not.equal(undefined)

      this.currentCardIndex = matchingCardIndex
    })
})

Then(/^it has the description (.*)$/, function (this: Mocha.Context, description: string) {
  new HomePage().card(this.currentCardIndex).then((card) => {
    expect(card.find('.card__description').text()).contains(description)
  })
})

Then(/^it has a link of (.*)$/, function (this: Mocha.Context, link: string) {
  new HomePage().card(this.currentCardIndex).then((card) => {
    expect(card.find('.card__link')).has.attr('href', link)
  })
})
