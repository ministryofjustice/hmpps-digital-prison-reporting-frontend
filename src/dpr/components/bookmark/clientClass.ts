import { DprClientClass } from '../../DprClientClass'

type BookmarkResponse = {
  success: boolean
  type: 'add' | 'remove'
  bookmarked: boolean
}

class BookmarkButton extends DprClientClass {
  private isSubmitting = false
  private form!: HTMLFormElement
  private button!: HTMLButtonElement | null
  private typeInput!: HTMLInputElement | null

  static override getModuleName() {
    return 'bookmark-button'
  }

  override initialise(): void {
    this.form = this.getElement() as HTMLFormElement
    this.button = this.form.querySelector<HTMLButtonElement>('[data-bookmark-button="true"]')
    this.typeInput = this.form.querySelector<HTMLInputElement>('input[name="type"]')

    this.form.addEventListener('submit', event => {
      void this.handleSubmit(event)
    })
  }

  private async handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault()

    if (this.isSubmitting) {
      return
    }

    if (!this.button || !this.typeInput) {
      return
    }

    try {
      this.startSubmitting(this.button)

      const data = await this.submitBookmark()

      if (!data.success) {
        return
      }

      this.updateUi(this.button, this.typeInput, data)
    } catch (error) {
      console.error('Bookmark update failed', error)
    } finally {
      this.finishSubmitting(this.button)
    }
  }

  private startSubmitting(button: HTMLButtonElement): void {
    this.isSubmitting = true

    button.classList.add('bookmark-disabled')
    button.disabled = true
    button.setAttribute('aria-disabled', 'true')
  }

  private finishSubmitting(button: HTMLButtonElement): void {
    this.isSubmitting = false

    button.classList.remove('bookmark-disabled')
    button.disabled = false
    button.removeAttribute('aria-disabled')
  }

  private async submitBookmark(): Promise<BookmarkResponse> {
    const csrfToken = this.form.querySelector<HTMLInputElement>('input[name="_csrf"]')?.value ?? ''

    const payload = Object.fromEntries(new FormData(this.form).entries())

    const response = await fetch(this.form.action, {
      method: this.form.method || 'POST',
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

    return response.json() as Promise<BookmarkResponse>
  }

  private updateUi(button: HTMLButtonElement, typeInput: HTMLInputElement, data: BookmarkResponse): void {
    const addText = button.dataset['addText'] ?? 'Add bookmark'

    const removeText = button.dataset['removeText'] ?? 'Remove bookmark'

    const isBookmarked = data.type === 'remove'

    typeInput.value = data.type

    button.textContent = isBookmarked ? removeText : addText

    button.setAttribute('aria-pressed', String(isBookmarked))

    button.dataset['bookmarked'] = String(data.bookmarked)
  }
}

export { BookmarkButton }
export default BookmarkButton
