/* eslint-disable class-methods-use-this */
import DprPollingStatusClass from '../../DprPollingStatusClass.mjs'

export default class DprAsyncRequestList extends DprPollingStatusClass {
  static getModuleName () {
    return 'async-request-list'
  }

  initialise () {
    this.POLLING_STATUSES = []
    this.POLLING_FREQUENCY = '2000'

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
            await this.getStatus(metaData, this.csrfToken)
            return metaData
          }),
        )
      }
    }, this.POLLING_FREQUENCY)
  }
}
