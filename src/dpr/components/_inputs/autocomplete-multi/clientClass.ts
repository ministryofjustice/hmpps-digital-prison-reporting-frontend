import { DprClientClass } from '../../../DprClientClass'

class AutoCompleteMulti extends DprClientClass {
  filterId!: string | null

  searchInput!: HTMLInputElement | null

  searchInputValue!: string

  multiselectOptions!: HTMLInputElement[]

  toggleButton!: HTMLButtonElement | null

  showAll = false

  static override getModuleName() {
    return 'autocomplete-multiselect-input'
  }

  override initialise() {
    this.element = this.getElement()
    this.filterId = this.element.getAttribute('data-filter-id')

    // Search input
    this.searchInput = document.getElementById(`search.${this.filterId}`) as HTMLInputElement | null
    this.multiselectOptions = Array.from(this.element.querySelectorAll<HTMLInputElement>('.govuk-checkboxes__input'))
    this.toggleButton = this.element.querySelector('[data-autocomplete-toggle]') as HTMLButtonElement | null

    if (!this.searchInput || !this.multiselectOptions) return

    this.initialiseCheckboxes()
    this.initSearchInputAction()
    this.initToggleAction()
  }

  initialiseCheckboxes() {
    this.multiselectOptions.forEach(input => {
      const wrapper = input.closest('.govuk-checkboxes__item')
      if (!wrapper) return

      wrapper.classList.toggle('dpr-form--hidden', !input.checked)
    })
  }

  initSearchInputAction() {
    if (!this.searchInput) return

    const input = this.searchInput

    this.searchInput.addEventListener('keyup', _event => {
      this.searchInputValue = input.value
      this.updateCheckboxes()
    })
  }

  updateCheckboxes() {
    const query = this.searchInputValue.toLowerCase().trim()
    const minLength = 3

    this.multiselectOptions.forEach(input => {
      const wrapper = input.closest('.govuk-checkboxes__item')
      if (!wrapper) return

      const labelText = input.labels?.[0]?.innerText.toLowerCase() ?? ''

      // Always show selected items
      if (input.checked) {
        wrapper.classList.remove('dpr-form--hidden')
        return
      }

      // Show all mode: apply search if present, otherwise show everything
      if (this.showAll) {
        const matches = !query || labelText.includes(query)

        wrapper.classList.toggle('dpr-form--hidden', !matches)
        return
      }

      // Search mode: only start filtering after threshold
      if (query.length < minLength) {
        wrapper.classList.add('dpr-form--hidden')
        return
      }

      const matches = labelText.includes(query)

      wrapper.classList.toggle('dpr-form--hidden', !matches)
    })
  }

  initToggleAction() {
    if (!this.toggleButton) return

    this.toggleButton.addEventListener('click', () => {
      this.showAll = !this.showAll

      this.toggleButton!.textContent = this.showAll ? 'Show selected only' : 'Show all options'

      this.updateCheckboxes()
    })
  }
}

export { AutoCompleteMulti }
export default AutoCompleteMulti
