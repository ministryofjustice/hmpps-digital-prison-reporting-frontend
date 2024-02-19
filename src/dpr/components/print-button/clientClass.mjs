import { DprClientClass } from '../../DprClientClass.mjs'

export default class PrintButton extends DprClientClass {
  static getModuleName() {
    return 'print-button'
  }

  initialise() {
    const printButtons = document.querySelectorAll('[data-print-page=true]')

    printButtons.forEach((actionButton) => {
      actionButton.addEventListener('click', () => {
        window.print()
      })
    })
  }
}
