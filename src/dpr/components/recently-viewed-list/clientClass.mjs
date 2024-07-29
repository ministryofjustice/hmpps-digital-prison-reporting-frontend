/* eslint-disable class-methods-use-this */
import DprPollingStatusClass from '../../DprPollingStatusClass.mjs'

export default class DprRecentlyViewedList extends DprPollingStatusClass {
  static getModuleName () {
    return 'recently-viewed-list'
  }

  initialise () {
    this.POLLING_STATUSES = []
    this.POLLING_FREQUENCY = '60000' // 1 min

    this.viewedList = document.getElementById('dpr-recently-viewed-component')
    this.viewedReportData = this.viewedList.getAttribute('data-request-data')
    this.csrfToken = this.viewedList.getAttribute('data-csrf-token')
    this.initPollingStatus()
  }

  initPollingStatus () {
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
}
