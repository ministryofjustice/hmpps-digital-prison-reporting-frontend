/* eslint-disable class-methods-use-this */
import DprPollingStatusClass from '../../DprPollingStatusClass.mjs'

export default class DprAsyncRequestList extends DprPollingStatusClass {
  static getModuleName() {
    return 'async-request-list'
  }

  initialise() {
    this.END_STATUSES = this.getEndStatuses()
    this.POLLING_FREQUENCY = this.getPollingFrquency()

    this.requestList = document.getElementById('dpr-async-request-component')
    this.requestData = this.requestList.getAttribute('data-request-data')
    this.csrfToken = this.requestList.getAttribute('data-csrf-token')
    this.removeActions = document.querySelectorAll('.dpr-remove-requested-report-button')

    this.initItemActions()
    this.initExpiredPollingStatus()
    this.initStatusPollingStatus()
  }

  initExpiredPollingStatus() {
    setInterval(async () => {
      if (this.requestData) {
        const meta = JSON.parse(this.requestData)
        await Promise.all(
          meta.map(async (metaData) => {
            if (metaData.status !== 'EXPIRED') {
              const response = await this.getExpiredStatus('/getRequestedExpiredStatus/', metaData, this.csrfToken)
              if (response.isExpired) {
                window.location.reload()
              }
            }
          }),
        )
      }
    }, '60000') // 1 minute
  }

  initStatusPollingStatus() {
    setInterval(async () => {
      if (this.requestData) {
        const meta = JSON.parse(this.requestData)
        await Promise.all(
          meta.map(async (metaData) => {
            // Don't poll if current state is an end state
            if (!this.END_STATUSES.includes(metaData.status)) {
              const response = await this.getRequestStatus(metaData, this.csrfToken)

              // Reload if new status is an end state
              if (this.END_STATUSES.includes(response.status)) {
                window.location.reload()
              }
            }
          }),
        )
      }
    }, this.POLLING_FREQUENCY)
  }

  initItemActions() {
    this.removeActions.forEach((button) => {
      const id = button.getAttribute('data-execution-id')
      button.addEventListener('click', async () => {
        await this.removeItemFromList(id)
      })
    })
  }

  async removeItemFromList(executionId) {
    let response
    await fetch('/removeRequestedItem/', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'CSRF-Token': this.csrfToken,
      },
      body: JSON.stringify({
        executionId,
      }),
    })
      .then(() => {
        window.location.reload()
      })
      .catch((error) => console.error('Error:', error))

    return response
  }
}
