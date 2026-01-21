// @ts-nocheck
import { DprClientClass } from '../../../DprClientClass'

class DownloadMessage extends DprClientClass {
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

export { DownloadMessage }
export default DownloadMessage
