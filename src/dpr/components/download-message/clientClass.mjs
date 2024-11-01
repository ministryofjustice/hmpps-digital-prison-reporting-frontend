import { DprClientClass } from '../../DprClientClass.mjs'

export default class DownloadMessage extends DprClientClass {
  static getModuleName() {
    return 'download-message'
  }

  initialise() {
    this.downloadMessage = this.getElement()
    if (window.location.href.indexOf('download-disabled') > -1) {
      this.downloadMessage.classList.remove('dpr-download-message--hidden')
    }
  }
}
