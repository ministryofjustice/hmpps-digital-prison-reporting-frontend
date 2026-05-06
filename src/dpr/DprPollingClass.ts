import type { meta } from './types/UserReports'

class DprPollingHelper {
  readonly POLLING_FREQUENCY = 3000

  readonly POLLING_EXPIRED_FREQUENCY = 60000

  readonly POLLING_STATUSES: readonly string[] = ['SUBMITTED', 'STARTED', 'PICKED']

  async getRequestStatus(metaData: meta, csrfToken: string): Promise<{ status?: string } | null> {
    const { pollingUrl } = metaData
    return this.getStatus(pollingUrl || '', metaData, csrfToken)
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
      // eslint-disable-next-line no-console
      console.error('Error:', err)
      return null
    }
  }
}

export { DprPollingHelper }
export default DprPollingHelper
