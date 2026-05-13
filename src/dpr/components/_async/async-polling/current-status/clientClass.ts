import DprStatusPolling from '../../../../DprStatusPolling'
import HttpClient from '../../../../DprHtmlClient'

class DprSingleReport extends DprStatusPolling {
  private container!: HTMLElement

  static override getModuleName() {
    return 'dpr-current-status-polling'
  }

  override initialise() {
    const element = this.getElement()

    this.csrfToken = HttpClient.getCsrfToken(element)

    const container = element.querySelector<HTMLElement>('[data-report-id]')
    if (!container) return

    this.container = container

    if (!this.isTerminal()) {
      this.startPolling(
        () => this.pollReport(),
        () => this.isTerminal(),
      )
    }
  }

  /**
   * Poll the single report
   */
  private async pollReport() {
    if (this.polling) return
    this.polling = true

    try {
      const { reportId, id, executionId, tableId, path } = this.container.dataset
      if (!reportId || !id || !executionId || !tableId || !path) return

      const fetchPath = `${path}/requested-reports/report/${reportId}/${id}/${executionId}/${tableId}`

      const fragment = await HttpClient.fetchFragment(fetchPath, this.csrfToken)
      if (!fragment) return

      const newContainer = fragment.querySelector<HTMLElement>('[data-report-id]')
      if (!newContainer) return

      this.container.replaceWith(newContainer)
      this.container = newContainer
    } catch (error) {
      console.error('Polling error', error)
    } finally {
      this.polling = false
    }
  }

  /**
   * Check if report is in a terminal state
   */
  private isTerminal(): boolean {
    return this.isTerminalElement(this.container)
  }
}

export default DprSingleReport
