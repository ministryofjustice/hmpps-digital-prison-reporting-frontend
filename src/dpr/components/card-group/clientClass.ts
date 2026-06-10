import { DprClientClass } from '../../DprClientClass'

class CardGroup extends DprClientClass {
  static override getModuleName() {
    return 'card-group'
  }

  override initialise() {
    const cards = this.getElement().querySelectorAll<HTMLElement>('[data-click-navigate-to]')
    const wrapperClass = 'card-loading'

    cards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.add(wrapperClass)
        cards.forEach(c => {
          if (!c.classList.contains('card-loading')) {
            const disabledClass = 'card-disabled'
            c.classList.add(disabledClass)
          }
        })

        const url = card.dataset['clickNavigateTo']

        if (url) {
          window.location.href = url
        }
      })
    })
  }
}

export { CardGroup }
export default CardGroup
