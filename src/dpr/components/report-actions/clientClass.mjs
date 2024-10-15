import { DprClientClass } from '../../DprClientClass.mjs'

export default class IconButtonList extends DprClientClass {
  static getModuleName() {
    return 'report-actions'
  }

  initialise() {
    this.refreshButton = document.getElementById('dpr-button-refresh')
    this.printButton = document.getElementById('dpr-button-printable')
    this.shareButton = document.getElementById('dpr-button-sharable')
    this.downloadButton = document.getElementById('dpr-button-downloadable')
    this.copyButton = document.getElementById('dpr-button-copy')

    this.initRefreshEvent()
    this.initPrintButtonEvent()
    this.initShareButtonEvent()
    this.initCopyButtonEvent()
    this.initDownloadButtonEvent()
  }

  initPrintButtonEvent() {
    if (this.printButton) {
      const disabled = this.printButton.getAttribute('data-disabled')
      this.printButton.addEventListener('click', () => {
        if (disabled !== 'true') {
          window.print()
        }
      })

      this.printButton.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          if (disabled !== 'true') {
            window.print()
          }
        }
      })
    }
  }

  initShareButtonEvent() {
    if (this.shareButton) {
      const href = this.shareButton.getAttribute('data-href')
      this.shareButton.addEventListener('click', () => {
        window.location = href
      })

      this.shareButton.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          window.location = href
        }
      })
    }
  }

  initCopyButtonEvent() {
    if (this.copyButton) {
      const href = this.copyButton.getAttribute('data-href')
      this.copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(href)
      })

      this.copyButton.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          navigator.clipboard.writeText(href)
        }
      })
    }
  }

  initDownloadButtonEvent() {
    const hashFragment = 'download'
    if (window.location.hash === `#${hashFragment}`) {
      this.downloadButton.setAttribute('disabled', '')
    }

    this.downloadButton.addEventListener('click', () => {
      if (window.location.hash !== `#${hashFragment}`) {
        this.downloadButton.setAttribute('disabled', '')
        this.setHashAndReload(hashFragment, true)
      }
    })
  }

  initRefreshEvent() {
    if (this.refreshButton) {
      const href = this.refreshButton.getAttribute('data-href')
      this.refreshButton.addEventListener('click', () => {
        window.location = href
      })

      this.refreshButton.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          window.location = href
        }
      })
    }
  }

  setHashAndReload(hashFragment, reload) {
    window.location.hash = hashFragment
    if (reload) {
      window.location.reload()
    }
  }
}
