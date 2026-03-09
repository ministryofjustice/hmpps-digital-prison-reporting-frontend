import type { meta } from './types/UserReports'

class DprPollingHelper {
  readonly POLLING_FREQUENCY = 5000

  readonly POLLING_EXPIRED_FREQUENCY = 60000

  readonly POLLING_STATUSES: readonly string[] = ['SUBMITTED', 'STARTED', 'PICKED']

  readonly END_STATUSES: readonly string[] = ['FINISHED', 'FAILED', 'EXPIRED', 'ABORTED']

  readonly EXPIRED_END_STATUSES: readonly string[] = ['FAILED', 'EXPIRED', 'ABORTED']

  getPollingStatuses(): readonly string[] {
    return this.POLLING_STATUSES
  }

  async getRequestStatus(metaData: meta, csrfToken: string): Promise<{ status?: string } | null> {
    const { pollingUrl } = metaData
    return this.getStatus(pollingUrl || '', metaData, csrfToken)
  }

  async getExpiredStatus(endpoint: string, metaData: meta, csrfToken: string): Promise<{ isExpired?: boolean } | null> {
    return this.getStatus(endpoint, metaData, csrfToken)
  }

  shouldPollStatus(data: meta[]): boolean {
    return data.some((item) => item.status && !this.END_STATUSES.includes(item.status))
  }

  shouldPollExpired(data: meta[]): boolean {
    return data.some((item) => item.status && !this.EXPIRED_END_STATUSES.includes(item.status))
  }

  async getStatus(
    endpoint: string,
    body: meta,
    csrfToken: string,
  ): Promise<{ status?: string; isExpired?: boolean } | null> {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken,
        },
        body: JSON.stringify(body),
      })

      return response.json()
    } catch (err) {
      console.error('Error:', err)
      return null
    }
  }
}

export { DprPollingHelper }
export default DprPollingHelper
