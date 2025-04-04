/* global document */
/* eslint-disable class-methods-use-this */

export default class DprLoadingHelper {
  showLoadingAnimation(wrapperClass) {
    const loadingPanelClass = '.dpr-loading-panel'
    document.querySelectorAll(loadingPanelClass).forEach((l) => {
      l.classList.add('show')
    })

    let loadingAnimClass = '.dpr-loading-anim'
    if (wrapperClass) loadingAnimClass = `.${wrapperClass} ${loadingAnimClass}`
    document.querySelectorAll(loadingAnimClass).forEach((l) => {
      l.classList.add('show')
    })
  }

  hideLoadingAnimation() {
    document.querySelectorAll('.dpr-loading-panel').forEach((l) => {
      l.classList.remove('show')
    })
    document.querySelectorAll('.dpr-loading-anim').forEach((l) => {
      l.classList.remove('show')
    })
  }
}
