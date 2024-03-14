import { DprClientClass } from './DprClientClass.mjs'

export default class DprLoadingClientClass extends DprClientClass {
  showLoadingAnimation() {
    document.querySelectorAll('.loading-panel').forEach((l) => {
      l.classList.add('show')
    })
  }

  hideLoadingAnimation() {
    document.querySelectorAll('.loading-panel').forEach((l) => {
      l.classList.remove('show')
    })
  }
}
