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
      wrapper.classList.add('dpr-form--hidden')
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

    this.multiselectOptions.forEach((input) => {
      const labelText = input.labels?.[0]?.innerText.toLowerCase() ?? ''
      const matches = labelText.includes(query)

      const wrapper = input.closest('.govuk-checkboxes__item')
      if (!wrapper) return

      if (matches || query === '') {
        wrapper.classList.remove('dpr-form--hidden')
      } else {
        wrapper.classList.add('dpr-form--hidden')
      }
    })
  }
}

export { AutoCompleteMulti }
export default AutoCompleteMulti
