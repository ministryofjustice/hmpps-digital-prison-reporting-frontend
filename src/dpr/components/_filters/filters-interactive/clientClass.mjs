import DprSelectedFiltersClass from '../filters-selected/clientClass.mjs'

export default class InteractiveFilters extends DprSelectedFiltersClass {
  static getModuleName() {
    return 'interactive-filters'
  }

  initialise() {
    this.initFiltersForm({
      formId: 'interactive-filters-form',
      submitButtonId: 'interactive-apply-filters-button',
      resetButtonId: 'interactive-reset-filters-button',
      removeSelectedButtonClass: 'interactive-remove-filter-button',
    })

    this.initInteractiveFilterButtons()
  }
}
