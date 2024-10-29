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
          await this.addBookmark(bookmarkToggle, id, reportId, csrfToken)
        } else {
          await this.removeBookmark(bookmarkToggle, id, reportId, csrfToken)
        }
      })

      this.bookmarkColumn.addEventListener('keyup', async (e) => {
        if (e.key === 'Enter') {
          await this.handleBookmarkChange(bookmarkToggle, id, reportId, csrfToken)
        }
      })
    })
  }

  async addBookmark(bookmarkToggle, id, reportId, csrfToken) {
    bookmarkToggle.setAttribute('checked', '')
    this.bookmarkWrapper.setAttribute('tooltip', 'Remove Bookmark')
    if (this.bookmarkLabel) this.bookmarkLabel.innerText = 'Bookmarked'
    await this.toggleBookmark('add', id, reportId, csrfToken)
  }

  async removeBookmark(bookmarkToggle, id, reportId, csrfToken) {
    bookmarkToggle.removeAttribute('checked')
    this.bookmarkWrapper.setAttribute('tooltip', 'Add Bookmark')
    if (this.bookmarkLabel) this.bookmarkLabel.innerText = 'Bookmark removed'
    await this.toggleBookmark('remove', id, reportId, csrfToken)
  }

  async handleBookmarkChange(bookmarkToggle, id, reportId, csrfToken) {
    console.log('handleBookmarkChange', { bookmarkToggle, id, reportId, csrfToken })
    if (bookmarkToggle.checked) {
      bookmarkToggle.removeAttribute('checked')
      this.bookmarkWrapper.setAttribute('tooltip', 'Add Bookmark')
      if (this.bookmarkLabel) this.bookmarkLabel.innerText = 'Bookmark removed'
      await this.toggleBookmark('remove', id, reportId, csrfToken)
    } else {
      bookmarkToggle.setAttribute('checked', '')
      this.bookmarkWrapper.setAttribute('tooltip', 'Bookmarked')
      if (this.bookmarkLabel) this.bookmarkLabel.innerText = 'Bookmarked'
      await this.toggleBookmark('add', id, reportId, csrfToken)
    }
  }

  async toggleBookmark(type, id, reportId, csrfToken) {
    const endpoint = type === 'add' ? '/addBookmark/' : '/removeBookmark/'

    console.log('toggleBookmark', { type, id, reportId, csrfToken, endpoint })
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
      }),
    })
      .then(() => {
        if (!window.location.href.includes('/report')) {
          // window.location.reload()
        }
      })
      .catch((error) => console.error('Error:', error))
  }
}
