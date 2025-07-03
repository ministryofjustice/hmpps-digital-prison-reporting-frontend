import { DprClientClass } from './DprClientClass.mjs'

export default class DprPollingStatusClass extends DprClientClass {
  getPollingFrquency() {
    return '2000' // 2 seconds
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
    const { executionId, reportId, id, type } = metaData
    return this.getStatus(`/dpr/request-report/${type}/${reportId}/${id}/${executionId}/status`, metaData, csrfToken)
  }

  async getExpiredStatus(endpoint, metaData, csrfToken) {
    return this.getStatus(endpoint, metaData, csrfToken)
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
