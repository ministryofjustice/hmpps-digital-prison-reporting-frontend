import { DprClientClass } from './DprClientClass.mjs'

export class DprLoadingClientClass extends DprClientClass {

  constructor(element) {
    super(element)
  }

  showLoadingAnimation() {
    document.querySelectorAll('.loading-panel').forEach((l) => {
      l.classList.add('show')
    })

    this.getElement().querySelectorAll('button').forEach((b) => {
      b.disabled = true
    })
  }

  hideLoadingAnimation() {
    document.querySelectorAll('.loading-panel').forEach((l) => {
      l.classList.remove('show')
    })

    this.getElement().querySelectorAll('button').forEach((b) => {
      b.disabled = false
    })
  }
}