import { DprClientClass } from '../../../../DprClientClass'

class DownloadMessage extends DprClientClass {
  private downloadMessage!: HTMLElement

  static override getModuleName() {
    return 'download-message'
  }

  override initialise() {
    this.downloadMessage = this.getElement()

    if (window.location.href.includes('download-disabled')) {
      this.downloadMessage.classList.remove('dpr-download-message--hidden')
    }
  }
}

export { DownloadMessage }
export default DownloadMessage
