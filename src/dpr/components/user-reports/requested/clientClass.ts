// @ts-nocheck
/* eslint-disable class-methods-use-this */
import DprPollingStatusClass from '../../../DprPollingStatusClass'

class DprAsyncRequestList extends DprPollingStatusClass {
  static getModuleName() {
    return 'async-request-list'
  }

  initialise() {
    this.END_STATUSES = this.getEndStatuses()
    this.EXPIRED_END_STATUSES = this.getExpiredCheckStatuses()
    this.POLLING_FREQUENCY = this.getPollingFrquency()

    this.requestList = document.getElementById('dpr-async-request-component')
    const requestData = this.requestList.getAttribute('data-request-data')
    this.requestData = requestData ? JSON.parse(requestData) : undefined
    this.csrfToken = this.requestList.getAttribute('data-csrf-token')
    this.removeActions = document.querySelectorAll('.dpr-remove-requested-report-button')

    this.initItemActions()
    this.initPollingIntervals()
  }

  async initPollingIntervals() {
    await this.checkIfExpired()

    if (this.requestData && !this.allHaveInvalidIds()) {
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

  hasValidIds(metaData) {
    const { id, reportId, executionId, tableId } = metaData
    return id !== undefined && reportId !== undefined && executionId !== undefined && tableId !== undefined
  }

  allHaveInvalidIds() {
    return this.requestData.every((meta) => {
      return !this.hasValidIds(meta)
    })
  }

  async checkIfExpired() {
    await Promise.all(
      this.requestData.map(async (metaData) => {
        const { status, reportUrl } = metaData
        if (this.hasValidIds(metaData) && !this.EXPIRED_END_STATUSES.includes(status)) {
          const response = await this.getExpiredStatus(reportUrl, metaData, this.csrfToken)

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
      this.requestData.map(async (metaData) => {
        // Don't poll if current state is an end state
        if (this.hasValidIds(metaData) && !this.END_STATUSES.includes(metaData.status)) {
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
    await fetch(`dpr/my-reports/requested-reports/${executionId}`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'CSRF-Token': this.csrfToken,
      },
    })
      .then(() => {
        window.location.reload()
      })
      .catch((error) => console.error('Error:', error))

    return response
  }
}

export { DprAsyncRequestList }
export default DprAsyncRequestList
