import { DprClientClass } from '../../DprClientClass.mjs'

export default class BookmarkToggle extends DprClientClass {
  static getModuleName () {
    return 'bookmark-toggle'
  }

  initialise () {
    this.initToggles()
  }

  initToggles () {
    document.querySelectorAll('.bookmark-input[type=checkbox]').forEach((bookmarkToggle) => {
      const csrfToken = bookmarkToggle.getAttribute('data-csrf-token')
      const reportId = bookmarkToggle.getAttribute('data-report-id')
      const variantId = bookmarkToggle.getAttribute('data-variant-id')

      bookmarkToggle.addEventListener('change', async () => {
        if (bookmarkToggle.checked) {
          bookmarkToggle.parentNode.setAttribute('tooltip', 'Remove Bookmark')
          await this.toggleBookmark('add', variantId, reportId, csrfToken)
        } else {
          bookmarkToggle.parentNode.setAttribute('tooltip', 'Add Bookmark')
          await this.toggleBookmark('remove', variantId, reportId, csrfToken)
        }
      })
    })
  }

  async toggleBookmark (type, variantId, reportId, csrfToken) {
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
        window.location.reload()
      })
      .catch((error) => console.error('Error:', error))
  }
}
