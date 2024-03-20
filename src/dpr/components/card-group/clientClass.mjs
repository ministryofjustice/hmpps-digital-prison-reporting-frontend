import DprLoadingClientClass from '../../DprLoadingClientClass.mjs'

export default class CardGroup extends DprLoadingClientClass {
  static getModuleName() {
    return 'card-group'
  }

  initialise() {
    this.loading = false
    this.getElement()
      .querySelectorAll('[data-click-navigate-to]')
      .forEach((card) => {
        card.addEventListener('click', () => {
          if (!this.isLoading()) {
            const wrapperClass = 'card-loading'
            card.classList.add(wrapperClass)
            this.showLoadingAnimation(wrapperClass)
            window.location.href = card.dataset.clickNavigateTo
          }
        })
      })
  }
}
