import { DprClientClass } from '../../DprClientClass.mjs'

export default class IconButtonList extends DprClientClass {
  static getModuleName () {
    return 'icon-button-list'
  }

  initialise () {
    this.refreshButton = document.getElementById('dpr-button-refresh')
    this.printButton = document.getElementById('dpr-button-printable')
    this.shareButton = document.getElementById('dpr-button-sharable')
    this.downloadButton = document.getElementById('dpr-button-downloadable')
    this.copyButton = document.getElementById('dpr-button-copy')

    this.initRefreshEvent()
    this.initPrintButtonEvent()
    this.initShareButtonEvent()
    this.initCopyButtonEvent()
  }

  initPrintButtonEvent () {
    this.printButton.addEventListener('click', () => {
      window.print()
    })
  }

  initShareButtonEvent () {
    const href = this.shareButton.getAttribute('data-href')
    this.shareButton.addEventListener('click', () => {
      window.location = href
    })
  }

  initCopyButtonEvent () {
    const href = this.copyButton.getAttribute('data-href')
    this.copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(href)
    })
  }

  initExportButtonEvent () {
    this.downloadButton.addEventListener('click', () => {
      // todo
    })
  }

  initRefreshEvent () {
    if (this.refreshButton) {
      const href = this.refreshButton.getAttribute('data-href')
      this.refreshButton.addEventListener('click', () => {
        window.location = href
      })
    }
  }
}
