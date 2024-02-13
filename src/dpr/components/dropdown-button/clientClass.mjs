import { DprClientClass } from '../../DprClientClass.mjs'

export class DropDownButton extends DprClientClass {

  static getModuleName() {
    return "dropdown-button"
  }

  initialise() {
    const button = this.getElement().querySelector('[aria-expanded]')
    const menu = this.getElement().querySelector('ul')

    button.addEventListener('click', event => {
      this.onButtonClick(event, button, menu)
    })

    document.querySelector('body').addEventListener('click', () => {
      menu.style.display = 'none'
      button.setAttribute('aria-expanded', 'false')
    })
  }

  onButtonClick(event, button, menu) {
    event.stopPropagation()

    if (button.getAttribute('aria-expanded') !== 'true') {
      menu.style.display = 'inline-block'
      button.setAttribute('aria-expanded', 'true')
    } else {
      menu.style.display = 'none'
      button.setAttribute('aria-expanded', 'false')
    }
  }
}
