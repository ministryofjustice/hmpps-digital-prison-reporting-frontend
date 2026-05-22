import { DprClientClass } from '../../../DprClientClass'

class AutoCompleteMulti extends DprClientClass {
  filterId!: string | null

  searchInput!: HTMLInputElement | null

  searchInputValue!: string

  multiselectOptions!: HTMLInputElement[]

  static override getModuleName() {
    return 'autocomplete-multiselect-input'
  }

  override initialise() {
    this.element = this.getElement()
    this.filterId = this.element.getAttribute('data-filter-id')

    // Search input
    this.searchInput = document.getElementById(`search.${this.filterId}`) as HTMLInputElement | null
    this.multiselectOptions = Array.from(this.element.querySelectorAll<HTMLInputElement>('.govuk-checkboxes__input'))

    if (!this.searchInput || !this.multiselectOptions) return

    this.initialiseCheckboxes()
    this.initSearchInputAction()
  }

  initialiseCheckboxes() {
    this.multiselectOptions.forEach((input) => {
      const wrapper = input.closest('.govuk-checkboxes__item')
      if (!wrapper) return

      wrapper.classList.toggle('dpr-form--hidden', !input.checked)
    })
  }

  initSearchInputAction() {
    if (!this.searchInput) return

    const input = this.searchInput

    this.searchInput.addEventListener('keyup', (_event) => {
      this.searchInputValue = input.value
      this.updateCheckboxes()
    })
  }

  updateCheckboxes() {
    const query = this.searchInputValue.toLowerCase().trim()
    const minLength = 3

    this.multiselectOptions.forEach((input) => {
      const wrapper = input.closest('.govuk-checkboxes__item')
      if (!wrapper) return

      // Always show selected items
      if (input.checked) {
        wrapper.classList.remove('dpr-form--hidden')
        return
      }

      // Below threshold - hide unselected
      if (query.length < minLength) {
        wrapper.classList.add('dpr-form--hidden')
        return
      }

      const labelText = input.labels?.[0]?.innerText.toLowerCase() ?? ''
      const matches = labelText.includes(query)

      wrapper.classList.toggle('dpr-form--hidden', !matches)
    })
  }
}

export { AutoCompleteMulti }
export default AutoCompleteMulti
