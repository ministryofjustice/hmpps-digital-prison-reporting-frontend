import { DprClientClass } from '../../DprClientClass'

type BookmarkResponse = {
  success: boolean
  type: 'add' | 'remove'
  bookmarked: boolean
}

class BookmarkButton extends DprClientClass {
  private isSubmitting = false

  static override getModuleName() {
    return 'bookmark-button'
  }

  override initialise(): void {
    const form = this.getElement() as HTMLFormElement

    form.addEventListener('submit', event => {
      void this.handleSubmit(event)
    })
  }

  private async handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault()

    if (this.isSubmitting) {
      return
    }

    const form = this.getElement() as HTMLFormElement

    const button = form.querySelector<HTMLButtonElement>('[data-bookmark-button="true"]')

    const typeInput = form.querySelector<HTMLInputElement>('input[name="type"]')

    if (!button || !typeInput) {
      return
    }

    try {
      this.isSubmitting = true

      button.classList.add('bookmark-disabled')

      button.disabled = true

      button.setAttribute('aria-disabled', 'true')

      const csrfToken = form.querySelector<HTMLInputElement>('input[name="_csrf"]')?.value ?? ''
      const formData = new FormData(form)
      const payload = Object.fromEntries(formData.entries())

      const response = await fetch(form.action, {
        method: form.method || 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'CSRF-Token': csrfToken,
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Bookmark request failed (${response.status})`)
      }

      const data = (await response.json()) as BookmarkResponse

      if (!data.success) {
        return
      }

      const addText = button.dataset['addText'] ?? 'Add bookmark'

      const removeText = button.dataset['removeText'] ?? 'Remove bookmark'

      if (data.type === 'remove') {
        typeInput.value = 'remove'
        button.textContent = removeText
        button.setAttribute('aria-pressed', 'true')
      } else {
        typeInput.value = 'add'
        button.textContent = addText
        button.setAttribute('aria-pressed', 'false')
      }

      button.dataset['bookmarked'] = String(data.bookmarked)
    } catch (error) {
      console.error('Bookmark update failed', error)
    } finally {
      this.isSubmitting = false

      button.classList.remove('bookmark-disabled')

      button.disabled = false
      button.removeAttribute('aria-disabled')
    }
  }
}

export { BookmarkButton }
export default BookmarkButton
