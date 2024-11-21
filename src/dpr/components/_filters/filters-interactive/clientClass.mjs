// import DprFormValidationClass from '../../DprFormValidationClass.mjs'
import DprFiltersFormClass from '../../../DprFiltersFormClass.mjs'

export default class InteractiveFilters extends DprFiltersFormClass {
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

    this.initSelectedFiltersButtons()
  }
}
