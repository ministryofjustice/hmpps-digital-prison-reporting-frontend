import DprPollingHelper from '../../../DprPollingClass'
import { DprClientClass } from '../../../DprClientClass'
import type { meta } from '../../../types/UserReports'

class DprAsyncPolling extends DprClientClass {
  private statusSection!: HTMLElement | null

  private requestData!: string | null

  private currentStatus!: string | null

  private csrfToken!: string | null

  private reportUrl!: string | null

  private pollingInterval?: ReturnType<typeof setInterval>

  pollingHelper!: DprPollingHelper

  static override getModuleName(): string {
    return 'async-polling-content'
  }

  override initialise(): void {
    this.pollingHelper = new DprPollingHelper()
    this.statusSection = document.getElementById('async-request-polling-status')

    if (!this.statusSection) {
      console.error('Missing required DOM element: #async-request-polling-status')
      return
    }

    this.requestData = this.statusSection.getAttribute('data-request-data')
    this.currentStatus = this.statusSection.getAttribute('data-current-status')
    this.csrfToken = this.statusSection.getAttribute('data-csrf-token')
    this.reportUrl = this.statusSection.getAttribute('data-report-url')

    this.initPollingInterval()
  }

  private async initPollingInterval(): Promise<void> {
    if (!this.currentStatus) return

    if (this.pollingHelper.POLLING_STATUSES.includes(this.currentStatus)) {
      this.pollingInterval = setInterval(async () => {
        await this.pollStatus()
      }, this.pollingHelper.POLLING_FREQUENCY)
    } else if (this.currentStatus === 'FINISHED' && this.reportUrl) {
      window.location.href = this.reportUrl
    }
  }

  private async pollStatus(): Promise<void> {
    if (!this.requestData || !this.csrfToken) return

    try {
      const meta = JSON.parse(this.requestData) as meta
      const response = await this.pollingHelper.getRequestStatus(meta, this.csrfToken)

      // Reload if a status change occurs
      if (response?.status && response.status !== this.currentStatus) {
        if (this.pollingInterval) {
          clearInterval(this.pollingInterval)
        }
        window.location.reload()
      }
    } catch (err) {
      console.error('Error polling async request:', err)
    }
  }
}

export { DprAsyncPolling }
export default DprAsyncPolling
