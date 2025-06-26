/* eslint-disable class-methods-use-this */
import { DprClientClass } from '../../DprClientClass.mjs'

export default class BookmarkToggle extends DprClientClass {
  static getModuleName() {
    return 'bookmark-toggle'
  }

  initialise() {
    this.initToggles()
  }

  initToggles() {
    const element = this.getElement()
    element.querySelectorAll('.bookmark-input[type=checkbox]').forEach((bookmarkToggle) => {
      const csrfToken = bookmarkToggle.getAttribute('data-csrf-token')
      const reportId = bookmarkToggle.getAttribute('data-report-id')
      const id = bookmarkToggle.getAttribute('data-id')
      const reportType = bookmarkToggle.getAttribute('data-report-type')

      this.bookmarkWrapper = bookmarkToggle.parentNode
      this.bookmarkColumn = this.bookmarkWrapper.parentNode
      this.bookmarkLabel = this.bookmarkWrapper.querySelector('.dpr-bookmark-label--component')

      bookmarkToggle.addEventListener('change', async () => {
        if (bookmarkToggle.checked) {
          await this.addBookmark(bookmarkToggle, id, reportId, reportType, csrfToken)
        } else {
          await this.removeBookmark(bookmarkToggle, id, reportId, reportType, csrfToken)
        }
      })

      this.bookmarkColumn.addEventListener('keyup', async (e) => {
        if (e.key === 'Enter') {
          await this.handleBookmarkChange(bookmarkToggle, id, reportId, reportType, csrfToken)
        }
      })
    })
  }

  async addBookmark(bookmarkToggle, id, reportId, reportType, csrfToken) {
    bookmarkToggle.setAttribute('checked', '')
    this.bookmarkWrapper.setAttribute('tooltip', 'Remove bookmark')
    if (this.bookmarkLabel) this.bookmarkLabel.innerText = 'Bookmarked'
    await this.toggleBookmark('add', id, reportId, reportType, csrfToken)
  }

  async removeBookmark(bookmarkToggle, id, reportId, reportType, csrfToken) {
    bookmarkToggle.removeAttribute('checked')
    this.bookmarkWrapper.setAttribute('tooltip', 'Add bookmark')
    if (this.bookmarkLabel) this.bookmarkLabel.innerText = 'Bookmark removed'
    await this.toggleBookmark('remove', id, reportId, reportType, csrfToken)
  }

  async handleBookmarkChange(bookmarkToggle, id, reportId, reportType, csrfToken) {
    if (bookmarkToggle.checked) {
      bookmarkToggle.removeAttribute('checked')
      this.bookmarkWrapper.setAttribute('tooltip', 'Add bookmark')
      if (this.bookmarkLabel) this.bookmarkLabel.innerText = 'Bookmark removed'
      await this.toggleBookmark('remove', id, reportId, reportType, csrfToken)
    } else {
      bookmarkToggle.setAttribute('checked', '')
      this.bookmarkWrapper.setAttribute('tooltip', 'Bookmarked')
      if (this.bookmarkLabel) this.bookmarkLabel.innerText = 'Bookmarked'
      await this.toggleBookmark('add', id, reportId, reportType, csrfToken)
    }
  }

  async toggleBookmark(type, id, reportId, reportType, csrfToken) {
    const endpoint = type === 'add' ? '/dpr/bookmarks/add-bookmark/' : '/dpr/bookmarks/remove-bookmark/'
    await fetch(endpoint, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken,
      },
      body: JSON.stringify({
        id,
        reportId,
        reportType,
      }),
    })
      .then(() => {
        if (!window.location.href.includes('/report')) {
          window.location.reload()
        }
      })
      .catch((error) => console.error('Error:', error))
  }
}
