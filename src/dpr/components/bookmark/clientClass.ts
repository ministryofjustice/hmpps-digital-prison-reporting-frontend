import { DprClientClass } from '../../DprClientClass'

class BookmarkButton extends DprClientClass {
  csrfToken!: string
  reportId!: string
  id!: string
  linkType!: 'add' | 'remove'
  reportType!: 'dashboard' | 'report'
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
    this.reportType = element.getAttribute('data-report-type')
    this.linkType = element.getAttribute('data-link-type')
    this.baseUrl = element.getAttribute('data-base-url')
    this.csrfToken = element.getAttribute('data-csrf-token')
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
    element.style.pointerEvents = ''
    element.style.opacity = '1'
  }

  /**
   * Inits the bookmark button click event
   *
   * @memberof BookmarkButton
   */
  initEventListener() {
    this.getElement().addEventListener('click', () => this.activateBookmark())
    this.getElement().addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        this.activateBookmark()
      }
    })
  }

  async activateBookmark() {
    if (this.isRunning) return
    this.isRunning = true

    this.getElement().style.pointerEvents = 'none'
    this.getElement().style.opacity = '0.5'

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    }
  }
}

export { BookmarkButton }
export default BookmarkButton
