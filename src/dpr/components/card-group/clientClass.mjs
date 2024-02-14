import { DprClientClass } from '../../DprClientClass.mjs'

export class CardGroup extends DprClientClass {

  static getModuleName() {
    return "card-group"
  }

  initialise() {
    this.getElement().querySelectorAll('[data-click-navigate-to]').forEach(card => {
      card.addEventListener('click', () => {
        window.location.href = card.dataset.clickNavigateTo
      })
    })
  }
}
