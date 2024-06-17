/* eslint-disable class-methods-use-this */
import { DprClientClass } from '../../DprClientClass.mjs'

export default class dprAsyncPolling extends DprClientClass {
  static getModuleName () {
    return 'async-polling-content'
  }

  async initialise () {
    this.POLLING_STATUSES = ['SUBMITTED', 'STARTED', 'PICKED', 'FAILED']
    this.POLLING_FREQUENCY = '5000' // 5 seconds

    this.statusSection = document.getElementById('async-request-polling-status')
    this.retryRequestButton = document.getElementById('retry-async-request')
    this.cancelRequestButton = document.getElementById('cancel-async-request')
    this.viewReportButton = document.getElementById('view-async-report-button')

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
      this.cancelRequestButton.addEventListener('click', () => {
        // TODO
      })
    }
  }

  initRetryRequestButton () {
    if (this.retryRequestButton) {
      this.retryRequestButton.addEventListener('click', () => {
        // TODO
      })
    }
  }
}
