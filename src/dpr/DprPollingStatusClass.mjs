import { DprClientClass } from './DprClientClass.mjs'

export default class DprPollingStatusClass extends DprClientClass {
  getPollingFrquency () {
    return '2000' // 2 seconds
  }

  getPollingStatuses () {
    return ['SUBMITTED', 'STARTED', 'PICKED']
  }

  async getStatus (metaData, csrfToken) {
    await fetch('/getStatus/', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken,
      },
      body: JSON.stringify({
        ...metaData,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        window.location.reload()
      })
      .catch((error) => console.error('Error:', error))
  }
}
