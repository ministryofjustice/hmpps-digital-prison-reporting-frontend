import { DprClientClass } from '../../DprClientClass'

class BookmarkButton extends DprClientClass {
  csrfToken!: string
  reportId!: string
  id!: string
  linkType!: 'add' | 'remove'
  reportType!: 'dashboard' | 'report'
  endpoint!: string
  baseUrl!: string

  static override getModuleName() {
    return 'bookmark-button'
  }

  override initialise(): void {
    const element = this.getElement()
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
    this.getElement().setAttribute('data-link-type', type)
    this.getElement().textContent = textContent
  }

  /**
   * Inits the bookmark button click event
   *
   * @memberof BookmarkButton
   */
  initEventListener() {
    const ctx = this
    this.getElement().addEventListener('click', async (e: Event) => {
      e.preventDefault()

      await fetch(ctx.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: ctx.linkType,
          id: ctx.id,
          reportId: ctx.reportId,
          reportType: ctx.reportType,
        }),
      })
        .then(() => {
          // The page should reload if on the report/dashboard page so not to have to reload the data and cause a delay
          // Should instead update the UI labels to signify the change has been made
          if (!window.location.href.includes('/report') && !window.location.href.includes('/dashboard')) {
            window.location.reload()
          } else {
            ctx.updateUI()
          }
        })
        .catch((error) => console.error('Error:', error))
    })
  }
}

export { BookmarkButton }
export default BookmarkButton
