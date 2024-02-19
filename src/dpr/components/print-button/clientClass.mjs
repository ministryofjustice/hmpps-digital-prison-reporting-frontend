import { DprClientClass } from '../../DprClientClass.mjs'

export default class PrintButton extends DprClientClass {
  static getModuleName() {
    return 'print-button'
  }

  initialise() {
    const copyUrlButtons = document.querySelectorAll('[data-print-page=true]')

    copyUrlButtons.forEach((actionButton) => {
      actionButton.addEventListener('click', () => {
        window.print()
      })
    })
  }
}
