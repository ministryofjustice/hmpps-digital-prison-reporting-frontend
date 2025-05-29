/* eslint-disable class-methods-use-this */
import DprPollingStatusClass from '../../../DprPollingStatusClass.mjs'

export default class DprAsyncPolling extends DprPollingStatusClass {
  static getModuleName() {
    return 'async-polling-content'
  }

  initialise() {
    this.POLLING_STATUSES = this.getPollingStatuses()
    this.POLLING_FREQUENCY = this.getPollingFrquency()

    this.statusSection = document.getElementById('async-request-polling-status')
    this.retryRequestButton = document.getElementById('retry-async-request')
    this.cancelRequestButton = document.getElementById('cancel-async-request')
    this.viewReportButton = document.getElementById('view-async-report-button')

    this.requestData = this.statusSection.getAttribute('data-request-data')
    this.currentStatus = this.statusSection.getAttribute('data-current-status')
    this.csrfToken = this.statusSection.getAttribute('data-csrf-token')
    this.reportUrl = this.statusSection.getAttribute('data-report-url')

    this.initCancelRequestButton()
    this.initPollingInterval()
  }

  async initPollingInterval() {
    if (this.POLLING_STATUSES.includes(this.currentStatus)) {
      this.pollingInterval = setInterval(async () => {
        await this.pollStatus()
      }, this.POLLING_FREQUENCY)
    } else if (this.currentStatus === 'FINISHED') {
      window.location.href = this.reportUrl
    }
  }

  async pollStatus() {
    if (this.requestData) {
      const meta = JSON.parse(this.requestData)
      const response = await this.getRequestStatus(meta, this.csrfToken)
      // Reload if new status is an end state
      if (this.currentStatus !== response.status) {
        clearInterval(this.pollingInterval)

        window.location.reload()
      }
    }
  }

  initCancelRequestButton() {
    if (this.cancelRequestButton) {
      const executionId = this.cancelRequestButton.getAttribute('data-execution-id')
      const reportId = this.cancelRequestButton.getAttribute('data-report-id')
      const id = this.cancelRequestButton.getAttribute('data-id')
      const type = this.cancelRequestButton.getAttribute('data-type')
      const csrfToken = this.cancelRequestButton.getAttribute('data-csrf-token')

      this.cancelRequestButton.addEventListener('click', async () => {
        await fetch('/dpr/cancelRequest/', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'CSRF-Token': csrfToken,
          },
          body: JSON.stringify({
            executionId,
            reportId,
            id,
            type,
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
