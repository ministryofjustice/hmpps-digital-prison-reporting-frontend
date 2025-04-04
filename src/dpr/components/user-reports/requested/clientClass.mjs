/* global window */
/* global document */

import DprPollingStatusClass from '../../../DprPollingStatusClass.mjs'

export default class DprAsyncRequestList extends DprPollingStatusClass {
  static getModuleName() {
    return 'async-request-list'
  }

  initialise() {
    this.END_STATUSES = this.getEndStatuses()
    this.EXPIRED_END_STATUSES = this.getExpiredCheckStatuses()
    this.POLLING_FREQUENCY = this.getPollingFrquency()

    this.requestList = document.getElementById('dpr-async-request-component')
    this.requestData = this.requestList.getAttribute('data-request-data')
    this.csrfToken = this.requestList.getAttribute('data-csrf-token')
    this.removeActions = document.querySelectorAll('.dpr-remove-requested-report-button')

    this.initItemActions()
    this.initPollingIntervals()
  }

  async initPollingIntervals() {
    await this.checkIfExpired()

    if (this.requestData) {
      if (this.shouldPollExpired(this.requestData)) {
        this.expiredInterval = setInterval(async () => {
          await this.checkIfExpired()
        }, '60000') // 1 minute
      }

      if (this.shouldPollStatus(this.requestData)) {
        this.pollingInterval = setInterval(async () => {
          await this.pollStatus()
        }, this.POLLING_FREQUENCY)
      }
    }
  }

  async checkIfExpired() {
    await Promise.all(
      JSON.parse(this.requestData).map(async (metaData) => {
        if (!this.EXPIRED_END_STATUSES.includes(metaData.status)) {
          const response = await this.getExpiredStatus('/getRequestedExpiredStatus/', metaData, this.csrfToken)

          if (response && response.isExpired) {
            clearInterval(this.expiredInterval)
            window.location.reload()
          }
        }
      }),
    )
  }

  async pollStatus() {
    await Promise.all(
      JSON.parse(this.requestData).map(async (metaData) => {
        // Don't poll if current state is an end state
        if (!this.END_STATUSES.includes(metaData.status)) {
          const response = await this.getRequestStatus(metaData, this.csrfToken)

          // Reload if new status is an end state
          if (this.END_STATUSES.includes(response.status)) {
            clearInterval(this.pollingInterval)
            window.location.reload()
          }
        }
      }),
    )
  }

  initItemActions() {
    this.removeActions.forEach((button) => {
      const id = button.getAttribute('data-execution-id')
      button.addEventListener('click', async (e) => {
        e.preventDefault()
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
      // eslint-disable-next-line no-console
      .catch((error) => console.error('Error:', error))

    return response
  }
}
