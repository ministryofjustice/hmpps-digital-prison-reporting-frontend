import { ReportType } from 'src/dpr/types/UserReports'
import { DprClientClass } from '../../DprClientClass'

export enum BookmarkAction {
  ADD = 'add',
  REMOVE = 'remove',
}

class BookmarkButton extends DprClientClass {
  csrfToken!: string
  reportId!: string | null
  id!: string | null
  linkType!: BookmarkAction
  reportType!: ReportType
  endpoint!: string
  baseUrl!: string
  isRunning = false

  static override getModuleName() {
    return 'bookmark-button'
  }

  override initialise(): void {
    const element = this.getElement()
    element.style.pointerEvents = ''
    element.style.opacity = '1'
    this.id = element.getAttribute('data-id')
    this.reportId = element.getAttribute('data-report-id')
    this.setReportType()
    const linkType = element.getAttribute('data-link-type')
    this.linkType = linkType ? (linkType as BookmarkAction) : BookmarkAction.ADD
    this.baseUrl = element.getAttribute('data-base-url') || ''
    this.csrfToken = element.getAttribute('data-csrf-token') || ''
    this.endpoint =
      this.baseUrl && this.baseUrl !== 'undefined'
        ? `${this.baseUrl}/dpr/my-reports/bookmarks/`
        : `/dpr/my-reports/bookmarks/`

    this.initEventListener()
  }

  /**
   * Updates the bookmark button UI so that it shows:
   * - the correct text
   * - toggles the bookmark on and off correctly
   *
   * @memberof BookmarkButton
   */
  updateUI() {
    const linkType = this.getElement().getAttribute('data-link-type')
    const type = linkType === 'add' ? 'remove' : 'add'
    const textContent = linkType === 'add' ? 'Remove bookmark' : 'Add bookmark'
    const element = this.getElement()
    element.setAttribute('data-link-type', type)
    element.textContent = textContent
  }

  /**
   * Inits the bookmark button click event
   *
   * @memberof BookmarkButton
   */
  initEventListener() {
    this.getElement().addEventListener('click', (e: MouseEvent) => this.activateBookmark(e))
    this.getElement().addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        this.activateBookmark(e)
      }
    })
  }

  async activateBookmark(e: Event) {
    e.preventDefault()

    if (this.isRunning) return
    this.isRunning = true
    this.getElement().classList.add('bookmark-disabled')

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'CSRF-Token': this.csrfToken,
        },
        body: JSON.stringify({
          type: this.linkType,
          id: this.id,
          reportId: this.reportId,
          reportType: this.reportType,
        }),
      })
        .then(() => {
          // The page should not reload if on the report/dashboard page so not to have to reload the data and cause a delay
          // Should instead update the UI labels to signify the change has been made
          if (!window.location.href.includes('/report') && !window.location.href.includes('/dashboard')) {
            window.location.reload()
          } else {
            this.updateUI()
          }
        })
        .catch((error) => console.error('Error:', error))
    } finally {
      this.isRunning = false
      this.getElement().classList.remove('bookmark-disabled')
    }
  }

  setReportType() {
    const rawReportTypeValue = this.element.getAttribute('data-report-type') || ''
    if (!['dashboard', 'report'].includes(rawReportTypeValue)) {
      throw new Error(`Report type for bookmark setup was unexpected: ${rawReportTypeValue}`)
    }
  }

  setLinkType() {
    const linkType = this.element.getAttribute('data-link-type')
    this.linkType = linkType ? (linkType as BookmarkAction) : BookmarkAction.ADD
  }
}

export { BookmarkButton }
export default BookmarkButton
