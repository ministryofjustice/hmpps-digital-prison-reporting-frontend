import { ListType } from '../types'
import PollingClientClass from '../../../DprStatusPolling'
import DprHtmlClient from '../../../DprHtmlClient'

class DprMyReports extends PollingClientClass {
  private rows!: NodeListOf<HTMLElement>

  static override getModuleName() {
    return 'dpr-my-reports'
  }

  override initialise() {
    const element = this.getElement()

    // Only poll on requested list
    if (element.dataset['listType'] !== `my-reports-${ListType.REQUESTED}`) {
      return
    }

    this.csrfToken = DprHtmlClient.getCsrfToken(element)

    this.rows = element.querySelectorAll<HTMLElement>('[data-row-id]')

    if (this.rows.length && !this.allTerminal()) {
      this.startPolling(
        () => this.pollAllReports(),
        () => this.allTerminal(),
      )
    }
  }

  /**
   * Polls each row in the list
   */
  private async pollAllReports() {
    if (this.polling) return
    this.polling = true

    await Array.from(this.rows)
      .reduce<Promise<void>>((chain, row) => {
        return chain.then(async () => {
          if (this.isTerminalElement(row)) return
          await this.pollRow(row)
        })
      }, Promise.resolve())
      .finally(() => {
        this.polling = false

        if (this.allTerminal()) {
          this.stopPolling()
        }
      })
  }

  /**
   * Poll an individual row
   */
  private async pollRow(uiRow: HTMLElement) {
    try {
      const { rowId, id, reportId, executionId, tableId, path } = uiRow.dataset
      if (!rowId || !tableId || !path || !executionId || !id) return

      const fetchPath = `${path}/requested-reports/row/${reportId}/${id}/${executionId}/${tableId}`

      const fragment = await HtmlClient.fetchFragment(fetchPath, this.csrfToken)
      if (!fragment) return

      const newRow = fragment.querySelector<HTMLElement>(`[data-row-id="${rowId}"]`)
      if (!newRow) return

      uiRow.replaceWith(newRow)

      // Re-query rows after DOM update
      this.rows = this.getElement().querySelectorAll('[data-row-id]')
    } catch (error) {
      console.error('Polling error', error)
    }
  }

  /**
   * Checks if all rows are terminal
   */

  private allTerminal(): boolean {
    return Array.from(this.rows).every((row) => this.isTerminalElement(row))
  }
}

export default DprMyReports
