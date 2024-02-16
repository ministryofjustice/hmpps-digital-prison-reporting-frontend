import { DprClientClass } from '../../DprClientClass.mjs'

export default class DropDownButton extends DprClientClass {
  static getModuleName() {
    return 'dropdown-button'
  }

  initialise() {
    const button = this.getElement().querySelector('[aria-expanded]')
    const menu = this.getElement().querySelector('ul')
    const actionButtons = menu.querySelectorAll('[data-dropdown-submit=true]')

    button.addEventListener('click', (event) => {
      this.onButtonClick(event, button, menu)
    })

    document.querySelector('body').addEventListener('click', () => {
      menu.style.display = 'none'
      button.setAttribute('aria-expanded', 'false')
    })

    actionButtons.forEach((actionButton) => {
      const action = actionButton.getAttribute('data-dropdown-submit-action')
      actionButton.addEventListener('click', () => {
        // eslint-disable-next-line no-eval
        eval(action)
      })
    })
  }

  // eslint-disable-next-line class-methods-use-this
  onButtonClick(event, button, menu) {
    event.stopPropagation()

    if (button.getAttribute('aria-expanded') !== 'true') {
      // eslint-disable-next-line no-param-reassign
      menu.style.display = 'inline-block'
      button.setAttribute('aria-expanded', 'true')
    } else {
      // eslint-disable-next-line no-param-reassign
      menu.style.display = 'none'
      button.setAttribute('aria-expanded', 'false')
    }
  }
}
