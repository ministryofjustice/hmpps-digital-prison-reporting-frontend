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

      // get the updated current status fragment
      const fragment = await DprHtmlClient.fetchFragment(fetchPath, this.csrfToken)
      if (!fragment) return

      // Get the redirect to the report, if present it means the status is finished
      if (this.redirectToReport(fragment)) {
        return
      }

      // Set the new container
      const newContainer = fragment.querySelector<HTMLElement>('#dpr-current-status__content')
      if (!newContainer) return

      // Replace the old container
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

  private redirectToReport(fragment: DocumentFragment): boolean {
    const redirectEl = fragment.querySelector('[data-redirect]')
    if (!redirectEl) return false

    const url = redirectEl.getAttribute('data-redirect')
    if (!url) return false

    window.location.replace(url)

    return true
  }
}

export default DprReportStatus
