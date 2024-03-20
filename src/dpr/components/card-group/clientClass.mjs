import DprLoadingClientClass from '../../DprLoadingClientClass.mjs'

export default class CardGroup extends DprLoadingClientClass {
  static getModuleName() {
    return 'card-group'
  }

  initialise() {
    const cards = this.getElement().querySelectorAll('[data-click-navigate-to]')

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const wrapperClass = 'card-loading'
        card.classList.add(wrapperClass)
        this.showLoadingAnimation(wrapperClass)

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
