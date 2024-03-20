import { DprClientClass } from './DprClientClass.mjs'

export default class DprLoadingClientClass extends DprClientClass {
  showLoadingAnimation(wrapperClass) {
    const loadingPanelClass = '.loading-panel'
    document.querySelectorAll(loadingPanelClass).forEach((l) => {
      l.classList.add('show')
    })

    let loadingAnimClass = '.dpr-loading-anim'
    if (wrapperClass) loadingAnimClass = `.${wrapperClass} ${loadingAnimClass}`
    document.querySelectorAll(loadingAnimClass).forEach((l) => {
      l.classList.add('show')
    })

    this.loading = true
  }

  hideLoadingAnimation() {
    document.querySelectorAll('.loading-panel').forEach((l) => {
      l.classList.remove('show')
    })
    document.querySelectorAll('.dpr-loading-anim').forEach((l) => {
      l.classList.remove('show')
    })

    this.loading = false
  }

  isLoading() {
    return this.loading
  }
}
