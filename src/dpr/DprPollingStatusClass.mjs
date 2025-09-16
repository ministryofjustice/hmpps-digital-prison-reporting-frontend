/* eslint-disable class-methods-use-this */
import { DprClientClass } from './DprClientClass.mjs'

export default class DprPollingStatusClass extends DprClientClass {
  getPollingFrquency() {
    return '1000' // 1 second
  }

  getPollingStatuses() {
    return ['SUBMITTED', 'STARTED', 'PICKED']
  }

  getEndStatuses() {
    return ['FINISHED', 'FAILED', 'EXPIRED', 'ABORTED']
  }

  getExpiredCheckStatuses() {
    return ['FAILED', 'EXPIRED', 'ABORTED']
  }

  async getRequestStatus(metaData, csrfToken) {
    const { pollingUrl } = metaData
    return this.getStatus(pollingUrl, metaData, csrfToken)
  }

  async getExpiredStatus(endpoint, metaData, csrfToken) {
    return this.getStatus(`${endpoint}/expired`, metaData, csrfToken)
  }

  shouldPollStatus(data) {
    return JSON.parse(data).some((item) => {
      return !this.END_STATUSES.includes(item.status)
    })
  }

  shouldPollExpired(data) {
    return JSON.parse(data).some((item) => {
      return !this.EXPIRED_END_STATUSES.includes(item.status)
    })
  }

  async getStatus(endpoint, body, csrfToken) {
    let response
    await fetch(endpoint, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken,
      },
      body: JSON.stringify({
        ...body,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        response = res
      })
      .catch((error) => console.error('Error:', error))

    return response
  }
}
