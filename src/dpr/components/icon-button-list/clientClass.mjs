import { DprClientClass } from '../../DprClientClass.mjs'

export default class IconButtonList extends DprClientClass {
  static getModuleName () {
    return 'icon-button-list'
  }

  initialise () {
    this.printButton = document.getElementById('printable')
    this.shareButton = document.getElementById('sharable')
    this.downloadButton = document.getElementById('downloadable')
    this.copyButton = document.getElementById('copy')

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
}
