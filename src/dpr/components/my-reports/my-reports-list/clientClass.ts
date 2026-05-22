import { ListType } from '../types'
import PollingClientClass from '../../../DprStatusPolling'
import DprHtmlClient from '../../../DprHtmlClient'

class DprMyReports extends PollingClientClass {
  private rows!: NodeListOf<HTMLElement>

  private listType!: string

  private maxRows!: string | undefined

  private removing = false

  static override getModuleName() {
    return 'dpr-my-reports'
  }

  override initialise() {
    const element = this.getElement()

    this.maxRows = element.dataset['maxRows']

    this.listType = element.dataset['listType'] ?? `my-reports-${ListType.REQUESTED}`

    this.initRemoveAction()

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

      const fragment = await DprHtmlClient.fetchFragment(fetchPath, this.csrfToken)
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

  /**
   * Setup the remove action
   */
  private initRemoveAction() {
    this.getElement().addEventListener('submit', (e) => {
      const form = e.target as HTMLFormElement

      // Only intercept matching forms
      if (!form.matches('[data-remove-report-form]')) return

      e.preventDefault()

      const row = form.closest('[data-row-id]')
      if (!row) return

      this.handleRemove(form)
    })
  }

  /**
   * Handles the removal of report items
   * - reloads the full list dynamically without a page reload
   *
   * @private
   * @param {HTMLFormElement} form
   * @memberof DprMyReports
   */
  private async handleRemove(form: HTMLFormElement) {
    if (this.removing) return
    this.removing = true

    try {
      const formData = new URLSearchParams()

      if (this.maxRows !== undefined) {
        formData.append('maxRows', this.maxRows)
      }
      formData.append('_csrf', this.csrfToken)

      const res = await fetch(form.action, {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
        credentials: 'same-origin',
      })

      if (!res.ok) {
        console.error('Remove failed')
        return
      }

      // Set the html to a template fragment
      const html = await res.text()
      const template = document.createElement('template')
      template.innerHTML = html.trim()

      // Update the root with the updated root
      const newRoot = template.content.querySelector('[data-list-root]')
      const currentRoot = this.getElement().closest('[data-list-root]')

      // Early return if nothing found
      if (!newRoot || !currentRoot) return

      // Extract the total
      const totalEl = newRoot.querySelector('[data-total-total]')
      const total = totalEl?.textContent?.trim() ?? '0'

      // Replace DOM
      currentRoot.replaceWith(newRoot)

      // Re-initialise the module as the old one is still referenced but does not exist anymore
      const newModuleEl = newRoot.querySelector('[data-dpr-module="dpr-my-reports"]')
      if (!newModuleEl) return
      new DprMyReports(newModuleEl as HTMLElement).initialise()

      // Update the count in the tab
      if (total) this.updateTabCount(total)
    } catch (err) {
      console.error('Remove error', err)
    } finally {
      this.removing = false
    }
  }

  /**
   * Updates the totals count in the tabs
   *
   * @private
   * @memberof DprMyReports
   */
  private updateTabCount(total: string) {
    let label = ''

    if (this.listType === `my-reports-${ListType.REQUESTED}`) {
      label = 'Requested'
    } else if (this.listType === `my-reports-${ListType.VIEWED}`) {
      label = 'Viewed'
    }

    const tabs = document.querySelectorAll<HTMLAnchorElement>('.govuk-tabs__tab')

    Array.from(tabs).forEach((tab) => {
      const text = tab.textContent?.replace(/\s+/g, ' ').trim()
      if (text.startsWith(label)) {
        tab.textContent = `${label} (${total})`
      }
    })
  }
}

export default DprMyReports
