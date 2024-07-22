/* eslint-disable class-methods-use-this */
import DprPollingStatusClass from '../../DprPollingStatusClass.mjs'

export default class DprAsyncRequestList extends DprPollingStatusClass {
  static getModuleName () {
    return 'async-request-list'
  }

  initialise () {
    this.END_STATUSES = this.getEndStatuses()
    this.POLLING_FREQUENCY = this.getPollingFrquency()

    this.requestList = document.getElementById('dpr-async-request-component')
    this.requestData = this.requestList.getAttribute('data-request-data')
    this.csrfToken = this.requestList.getAttribute('data-csrf-token')
    this.initPollingStatus()
  }

  initPollingStatus () {
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
}
