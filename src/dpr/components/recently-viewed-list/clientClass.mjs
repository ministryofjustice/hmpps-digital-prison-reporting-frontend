/* eslint-disable class-methods-use-this */
import DprPollingStatusClass from '../../DprPollingStatusClass.mjs'

export default class DprRecentlyViewedList extends DprPollingStatusClass {
  static getModuleName() {
    return 'recently-viewed-list'
  }

  initialise() {
    this.POLLING_STATUSES = []
    this.POLLING_FREQUENCY = '60000' // 1 min

    this.viewedList = document.getElementById('dpr-recently-viewed-component')
    this.viewedReportData = this.viewedList.getAttribute('data-request-data')
    this.csrfToken = this.viewedList.getAttribute('data-csrf-token')
    this.removeActions = document.querySelectorAll('.dpr-remove-viewed-report-button')

    this.initItemActions()
    this.initPollingStatus()
  }

  initPollingStatus() {
    setInterval(async () => {
      if (this.viewedReportData) {
        const meta = JSON.parse(this.viewedReportData)
        await Promise.all(
          meta.map(async (metaData) => {
            if (metaData.status !== 'EXPIRED') {
              const response = await this.getExpiredStatus(metaData, this.csrfToken)
              if (response.isExpired) {
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
      button.addEventListener('click', () => {
        this.removeItemFromList(id)
      })
    })
  }

  async removeItemFromList(executionId) {
    let response
    await fetch('/removeViewedItem/', {
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
