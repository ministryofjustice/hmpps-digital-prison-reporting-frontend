import { DprClientClass } from './DprClientClass.mjs'

export default class DprPollingStatusClass extends DprClientClass {
  getPollingFrquency () {
    return '2000' // 2 seconds
  }

  getPollingStatuses () {
    return ['SUBMITTED', 'STARTED', 'PICKED']
  }

  async getRequestStatus (metaData, csrfToken) {
    await this.getStatus('/getStatus/', metaData, csrfToken)
  }

  async getExpiredStatus (metaData, csrfToken) {
    await this.getStatus('/getExpiredStatus/', metaData, csrfToken)
  }

  async getStatus (endpoint, body, csrfToken) {
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
