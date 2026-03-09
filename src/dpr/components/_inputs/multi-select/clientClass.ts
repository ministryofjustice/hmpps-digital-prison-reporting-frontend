import { DprClientClass } from '../../../DprClientClass'

class MultiselectInput extends DprClientClass {
  fullListLink!: HTMLElement | null
  hideListLink!: HTMLElement | null
  filtersContainer!: HTMLElement | null
  filterId!: string | null

  static override getModuleName() {
    return 'multiselect-input'
  }

  override initialise() {
    this.element = this.getElement()
    this.filterId = this.element.getAttribute('data-filter-id')
    this.filtersContainer = document.getElementById(`dpr_filter-wrapper_${this.filterId}`)
    this.fullListLink = this.element.querySelector('.dpr-multiselect-action__view-all')
    this.hideListLink = this.element.querySelector('.dpr-multiselect-action__hide-all')

    this.initActions()
  }

  initActions() {
    this.initFullWidthAction()
    this.initHideListAction()
  }

  /**
   * Initialise full list link
   * Listeners for both click and keydown to meet accessibilty requirements
   *
   * @memberof MultiselectInput
   */
  initFullWidthAction() {
    this.fullListLink?.addEventListener('click', (e: MouseEvent) => {
      this.addFullWidthClasses(e)
    })
    this.fullListLink?.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        this.addFullWidthClasses(e)
      }
    })
  }

  /**
   * Initialise hide list link
   * Listeners for both click and keydown to meet accessibilty requirements
   *
   * @memberof MultiselectInput
   */
  initHideListAction() {
    this.hideListLink?.addEventListener('click', (e: MouseEvent) => {
      this.removeFullWidthClasses(e)
    })
    this.hideListLink?.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        this.removeFullWidthClasses(e)
      }
    })
  }

  /**
   * Adds classes to relevant element to show all select items
   *
   * @param {Event} e
   * @memberof MultiselectInput
   */
  addFullWidthClasses(e: Event) {
    e.preventDefault()
    this.element.classList.add('multiselect-container__full-width')
    this.filtersContainer?.classList.add('dpr-filter-item__span-3')

    // Update button visability
    this.fullListLink?.classList.add('dpr-multiselect-action--hide')
    this.hideListLink?.classList.remove('dpr-multiselect-action--hide')
  }

  /**
   * Removes classes to relevant element to hide all select items
   *
   * @param {Event} e
   * @memberof MultiselectInput
   */
  removeFullWidthClasses(e: Event) {
    e.preventDefault()
    this.element.classList.remove('multiselect-container__full-width')
    this.filtersContainer?.classList.remove('dpr-filter-item__span-3')

    // Update button visability
    this.fullListLink?.classList.remove('dpr-multiselect-action--hide')
    this.hideListLink?.classList.add('dpr-multiselect-action--hide')
  }
}

export { MultiselectInput }
export default MultiselectInput
