/* eslint-disable class-methods-use-this */
import DprPollingStatusClass from '../../../DprPollingStatusClass.mjs'

export default class DprRecentlyViewedList extends DprPollingStatusClass {
  static getModuleName() {
    return 'recently-viewed-list'
  }

  initialise() {
    this.EXPIRED_END_STATUSES = this.getExpiredCheckStatuses()
    this.POLLING_FREQUENCY = '60000' // 1 min

    this.viewedList = document.getElementById('dpr-recently-viewed-component')
    this.viewedReportData = this.viewedList.getAttribute('data-request-data')
    this.csrfToken = this.viewedList.getAttribute('data-csrf-token')
    this.removeActions = document.querySelectorAll('.dpr-remove-viewed-report-button')

    this.initItemActions()
    this.initPollingIntervals()
  }

  async initPollingIntervals() {
    await this.checkIsExpired()

    if (this.viewedReportData && this.shouldPollExpired(this.viewedReportData)) {
      this.expiredViewedInterval = setInterval(async () => {
        await this.checkIsExpired()
      }, this.POLLING_FREQUENCY)
    }
  }

  async checkIsExpired() {
    await Promise.all(
      JSON.parse(this.viewedReportData).map(async (metaData) => {
        if (metaData.status !== 'EXPIRED') {
          const response = await this.getExpiredStatus(
            '/dpr/my-reports/recently-viewed/update-expired-status/',
            metaData,
            this.csrfToken,
          )
          if (response && response.isExpired) {
            clearInterval(this.expiredViewedInterval)
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
    await fetch(`/dpr/my-reports/recently-viewed/${executionId}`, {
      method: 'delete',
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
