import DprStatusPolling from '../../../DprStatusPolling'
import DprHtmlClient from '../../../DprHtmlClient'

class DprReportStatus extends DprStatusPolling {
  private container!: HTMLElement

  private path!: string

  static override getModuleName() {
    return 'dpr-current-status-polling'
  }

  override initialise() {
    const element = this.getElement()
    const { tableId, path } = this.element.dataset

    if (!tableId || !path) {
      throw new Error(`Missing data required for polling: ${JSON.stringify({ tableId, path })}`)
    }

    this.path = path

    this.csrfToken = DprHtmlClient.getCsrfToken(element)

    const container = element.querySelector<HTMLElement>('#dpr-current-status__content')
    if (!container) return

    this.container = element

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
      const fetchPath = `${this.path}/current-status`

      const fragment = await DprHtmlClient.fetchFragment(fetchPath, this.csrfToken)
      if (!fragment) return

      const newContainer = fragment.querySelector<HTMLElement>('#dpr-current-status__content')
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

export default DprReportStatus
