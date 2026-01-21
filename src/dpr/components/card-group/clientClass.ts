// @ts-nocheck
import { DprClientClass } from '../../DprClientClass'

class CardGroup extends DprClientClass {
  static getModuleName() {
    return 'card-group'
  }


  initialise() {
    const cards = this.getElement().querySelectorAll('[data-click-navigate-to]')
    const wrapperClass = 'card-loading'

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        card.classList.add(wrapperClass)
        this.loadingHelper.showLoadingAnimation(wrapperClass)

        cards.forEach((c) => {
          if (!c.classList.contains('card-loading')) {
            const disabledClass = 'card-disabled'
            c.classList.add(disabledClass)
          }
        })
        window.location.href = card.dataset.clickNavigateTo
      })
    })
  }
}

export { CardGroup }
export default CardGroup
