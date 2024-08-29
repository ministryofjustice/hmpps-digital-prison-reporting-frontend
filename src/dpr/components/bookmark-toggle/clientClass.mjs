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

      const bookmarkWrapper = bookmarkToggle.parentNode
      const bookmarkColumn = bookmarkWrapper.parentNode

      bookmarkToggle.addEventListener('change', async () => {
        if (bookmarkToggle.checked) {
          bookmarkWrapper.setAttribute('tooltip', 'Remove Bookmark')
          await this.toggleBookmark('add', variantId, reportId, csrfToken)
        } else {
          bookmarkWrapper.setAttribute('tooltip', 'Add Bookmark')
          await this.toggleBookmark('remove', variantId, reportId, csrfToken)
        }
      })

      bookmarkColumn.addEventListener('keyup', async (e) => {
        if (e.key === 'Enter') {
          if (bookmarkToggle.checked) {
            bookmarkToggle.removeAttribute('checked')
            bookmarkWrapper.setAttribute('tooltip', 'Remove Bookmark')
            await this.toggleBookmark('remove', variantId, reportId, csrfToken)
          } else {
            bookmarkToggle.setAttribute('checked', true)
            bookmarkWrapper.setAttribute('tooltip', 'Remove Bookmark')
            await this.toggleBookmark('add', variantId, reportId, csrfToken)
          }
        }
      })
    })
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
