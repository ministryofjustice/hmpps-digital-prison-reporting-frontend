import { DprClientClass } from '../../DprClientClass.mjs'

export default class DownloadMessage extends DprClientClass {
  static getModuleName() {
    return 'download-message'
  }

  initialise() {
    this.downloadMessage = this.getElement()
    if (window.location.hash === '#download') {
      this.downloadMessage.classList.remove('dpr-download-message--hidden')
    }
  }
}
