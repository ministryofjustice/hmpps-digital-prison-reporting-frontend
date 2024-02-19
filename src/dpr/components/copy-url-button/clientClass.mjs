import { DprClientClass } from '../../DprClientClass.mjs'

export default class CopyUrlButton extends DprClientClass {
  static getModuleName() {
    return 'copy-url-button'
  }

  initialise() {
    const printButtons = document.querySelectorAll('[data-copy-url=true]')

    printButtons.forEach((actionButton) => {
      actionButton.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location)
      })
    })
  }
}
