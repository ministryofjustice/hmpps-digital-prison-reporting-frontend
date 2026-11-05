import { DprClientClass } from '../../../DprClientClass'

class AutoCompleteMulti extends DprClientClass {
  filterId!: string | null

  minimumLength!: number

  searchInput!: HTMLInputElement | null

  multiselectOptions!: HTMLInputElement[]

  toggleButton!: HTMLButtonElement | null

  showAll = false

  static override getModuleName() {
    return 'autocomplete-multiselect-input'
  }

  override initialise() {
    this.element = this.getElement()

    this.filterId = this.element.getAttribute('data-filter-id')

    this.searchInput = document.getElementById(`search.${this.filterId}`) as HTMLInputElement | null

    this.minimumLength = Number(this.searchInput?.getAttribute('data-minimum-length')) || 3

    this.multiselectOptions = Array.from(this.element.querySelectorAll<HTMLInputElement>('.govuk-checkboxes__input'))

    this.toggleButton = this.element.querySelector('[data-autocomplete-toggle]') as HTMLButtonElement | null

    if (!this.searchInput || !this.multiselectOptions.length) {
      return
    }

    this.initialiseCheckboxes()
    this.initSearchInputAction()
    this.initToggleAction()
  }

  initialiseCheckboxes() {
    this.multiselectOptions.forEach(input => {
      const wrapper = input.closest('.govuk-checkboxes__item')

      if (!wrapper) {
        return
      }

      wrapper.classList.toggle('dpr-form--hidden', !input.checked)
    })
  }

  initSearchInputAction() {
    if (!this.searchInput) {
      return
    }

    this.searchInput.addEventListener('keyup', () => {
      this.updateCheckboxes()
    })
  }

  initToggleAction() {
    if (!this.toggleButton) {
      return
    }

    this.toggleButton.addEventListener('click', () => {
      this.showAll = !this.showAll

      this.toggleButton!.textContent = this.showAll ? 'Show selected only' : 'Show all options'

      this.updateCheckboxes()
    })
  }

  updateCheckboxes() {
    const query = this.searchInput?.value.toLowerCase().trim() ?? ''

    this.multiselectOptions.forEach(input => {
      const wrapper = input.closest('.govuk-checkboxes__item')

      if (!wrapper) {
        return
      }

      const labelText = input.labels?.[0]?.innerText.toLowerCase() ?? ''

      // Always show selected items
      if (input.checked) {
        wrapper.classList.remove('dpr-form--hidden')
        return
      }

      // Show all mode:
      // Display everything when query is empty,
      // otherwise only display matching items.
      if (this.showAll) {
        if (query.length < this.minimumLength) {
          wrapper.classList.remove('dpr-form--hidden')
          return
        }

        const matches = labelText.includes(query)

        wrapper.classList.toggle('dpr-form--hidden', !matches)
        return
      }

      // Search mode:
      // Hide everything until minimum search length reached.
      if (query.length < this.minimumLength) {
        wrapper.classList.add('dpr-form--hidden')
        return
      }

      const matches = labelText.includes(query)

      wrapper.classList.toggle('dpr-form--hidden', !matches)
    })
  }
}

export { AutoCompleteMulti }
export default AutoCompleteMulti
