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
      const variantId = bookmarkToggle.getAttribute('data-variant-id')

      this.bookmarkWrapper = bookmarkToggle.parentNode
      this.bookmarkColumn = this.bookmarkWrapper.parentNode
      this.bookmarkLabel = this.bookmarkWrapper.querySelector('.dpr-bookmark-label--component')

      bookmarkToggle.addEventListener('change', async () => {
        if (bookmarkToggle.checked) {
          bookmarkToggle.setAttribute('checked', '')
          this.bookmarkWrapper.setAttribute('tooltip', 'Remove Bookmark')
          if (this.bookmarkLabel) this.bookmarkLabel.innerText = 'Bookmarked'
          await this.toggleBookmark('add', variantId, reportId, csrfToken)
        } else {
          bookmarkToggle.removeAttribute('checked')
          this.bookmarkWrapper.setAttribute('tooltip', 'Add Bookmark')
          if (this.bookmarkLabel) this.bookmarkLabel.innerText = 'Bookmark removed'
          await this.toggleBookmark('remove', variantId, reportId, csrfToken)
        }
      })

      this.bookmarkColumn.addEventListener('keyup', async (e) => {
        if (e.key === 'Enter') {
          await this.handleBookmarkChange(bookmarkToggle, variantId, reportId, csrfToken)
        }
      })
    })
  }

  async handleBookmarkChange(bookmarkToggle, variantId, reportId, csrfToken) {
    if (bookmarkToggle.checked) {
      bookmarkToggle.removeAttribute('checked')
      this.bookmarkWrapper.setAttribute('tooltip', 'Add Bookmark')
      if (this.bookmarkLabel) this.bookmarkLabel.innerText = 'Bookmark removed'
      await this.toggleBookmark('remove', variantId, reportId, csrfToken)
    } else {
      bookmarkToggle.setAttribute('checked', '')
      this.bookmarkWrapper.setAttribute('tooltip', 'Bookmarked')
      if (this.bookmarkLabel) this.bookmarkLabel.innerText = 'Bookmarked'
      await this.toggleBookmark('add', variantId, reportId, csrfToken)
    }
  }

  async toggleBookmark(type, variantId, reportId, csrfToken) {
    const endpoint = type === 'add' ? '/addBookmark/' : '/removeBookmark/'
    await fetch(endpoint, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken,
      },
      body: JSON.stringify({
        variantId,
        reportId,
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
