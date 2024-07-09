/* eslint-disable class-methods-use-this */
import { DprClientClass } from '../../DprClientClass.mjs'

export default class dprAsyncPolling extends DprClientClass {
  static getModuleName () {
    return 'async-polling-content'
  }

  async initialise () {
    this.POLLING_STATUSES = ['SUBMITTED', 'STARTED', 'PICKED']
    this.POLLING_FREQUENCY = '200' // 2 seconds

    this.statusSection = document.getElementById('async-request-polling-status')
    this.retryRequestButton = document.getElementById('retry-async-request')
    this.cancelRequestButton = document.getElementById('cancel-async-request')
    this.viewReportButton = document.getElementById('view-async-report-button')

    this.initCancelRequestButton()
    this.initPollingStatus()
  }

  initPollingStatus () {
    const status = this.statusSection.getAttribute('data-current-status')
    if (this.POLLING_STATUSES.includes(status)) {
      setTimeout(() => {
        window.location.reload()
      }, this.POLLING_FREQUENCY)
    }
  }

  initCancelRequestButton () {
    if (this.cancelRequestButton) {
      const executionId = this.cancelRequestButton.getAttribute('data-execution-id')
      const reportId = this.cancelRequestButton.getAttribute('data-report-id')
      const variantId = this.cancelRequestButton.getAttribute('data-variant-id')
      const csrfToken = this.cancelRequestButton.getAttribute('data-csrf-token')

      this.cancelRequestButton.addEventListener('click', async () => {
        await fetch('/cancelRequest/', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'CSRF-Token': csrfToken,
          },
          body: JSON.stringify({
            executionId,
            reportId,
            variantId,
          }),
        })
          .then(() => {
            window.location.reload()
          })
          .catch((error) => console.error('Error:', error))
      })
    }
  }
}
