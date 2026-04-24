import { DprClientClass } from '../../../DprClientClass'
import { ListType } from '../types'

class DprMyReports extends DprClientClass {
  private polling = false

  private rows!: NodeListOf<HTMLElement>

  private csrfToken!: string

  private TERMINAL_STATUSES = ['FINISHED', 'EXPIRED', 'FAILED', 'ABORTED']

  private POLLING_INTERVAL = 3000 // 3 seconds

  private pollingTimer: number | null = null

  static override getModuleName() {
    return 'dpr-my-reports'
  }

  override initialise() {
    const element = this.getElement()

    // Only poll on requested list
    if (element.dataset['listType'] === `my-reports-${ListType.REQUESTED}`) {
      this.setCsrfToken(element)

      this.rows = element.querySelectorAll<HTMLElement>('[data-row-id]')
      if (this.rows && this.rows.length && !this.allTerminal()) {
        // init the polling
        console.log('startPolling')
        this.startPolling()
      }
    }
  }

  /**
   * Starts the polling process
   *
   * @private
   * @memberof MyReports
   */
  private startPolling() {
    const tick = async () => {
      await this.pollAllReports()

      if (this.allTerminal()) {
        this.stopPolling()
        return
      }

      this.pollingTimer = window.setTimeout(tick, this.POLLING_INTERVAL)
    }

    tick()
  }

  /**
   * Polls each row in the list
   *
   * @private
   * @memberof MyReports
   */
  private async pollAllReports() {
    if (this.polling) return
    this.polling = true

    console.log('pollAllReports')

    // Convert NodeList to array to use array iterators
    Array.from(this.rows)
      .reduce<Promise<void>>((chain, row) => {
        return chain.then(async () => {
          if (this.isTerminal(row)) return

          console.log({ row })
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

  private async pollRow(uiRow: HTMLElement) {
    try {
      const rowId = uiRow.dataset['rowId']
      const id = uiRow.dataset['id']
      const reportId = uiRow.dataset['reportId']
      const executionId = uiRow.dataset['executionId']
      const tableId = uiRow.dataset['tableId']
      const path = uiRow.dataset['path']

      if (!rowId || !tableId || !path || !executionId || !tableId || !id) return

      const fetchPath = `${path}/requested-reports/row/${reportId}/${id}/${executionId}/${tableId}`

      // GET the updated html for the row that contains the latest status
      const res = await fetch(fetchPath, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'text/html',
          'CSRF-Token': this.csrfToken,
        },
      })

      if (!res.ok) {
        throw new Error(`Polling fetch failed: ${res.status}`)
      }

      // Setup the html to get the new status
      const html = await res.text()
      const template = document.createElement('template')
      template.innerHTML = html.trim()

      console.log({ html })
      console.log(template.innerHTML)

      const newRow = template.content.querySelector<HTMLElement>(`[data-row-id="${rowId}"]`)

      console.log('here 1')

      if (!newRow) return

      console.log('here 2')

      console.log({ old: uiRow.dataset['status'], new: newRow.dataset['status'] })

      if (newRow.dataset['status'] !== uiRow.dataset['status']) {
        console.log('here 3')

        uiRow.replaceWith(newRow)
        this.rows = this.getElement().querySelectorAll('[data-row-id]')

        console.log('here 4')
      }
    } catch (error) {
      console.error('Polling error', error)
    }
  }

  /**
   * Checks if the status is in a terminal state
   *
   * @param {HTMLElement} row
   * @return {*}
   */
  private isTerminal(row: HTMLElement): boolean {
    const status = row.getAttribute('data-status')
    return status !== null && this.TERMINAL_STATUSES.includes(status)
  }

  /**
   * Checks if all rows are in a terminal state
   *
   * @private
   * @return {*}  {boolean}
   * @memberof DprMyReports
   */
  private allTerminal(): boolean {
    return Array.from(this.rows).every((row) => this.isTerminal(row))
  }

  /**
   * Stops polling
   *
   * @private
   * @memberof DprMyReports
   */
  private stopPolling() {
    if (this.pollingTimer !== null) {
      clearTimeout(this.pollingTimer)
      this.pollingTimer = null
    }
  }

  /**
   * Sets the csrf token
   *
   * @param {HTMLElement} element
   */
  private setCsrfToken = (element: HTMLElement) => {
    const csrfToken = element.dataset['csrfToken']
    if (csrfToken) {
      this.csrfToken = csrfToken
    } else {
      throw new Error('No csrf token provided in my reports list')
    }
  }
}

export default DprMyReports
