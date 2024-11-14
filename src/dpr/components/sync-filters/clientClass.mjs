// import DprFormValidationClass from '../../DprFormValidationClass.mjs'
import DprFiltersFormClass from '../../DprFiltersFormClass.mjs'

export default class SyncFilters extends DprFiltersFormClass {
  static getModuleName() {
    return 'sync-filters'
  }

  initialise() {
    this.initFiltersForm({
      formId: 'sync-filters-form',
      submitButtonId: 'sync-apply-filters-button',
      resetButtonId: 'sync-reset-filters-button',
    })

    this.initSelectedFiltersButtons()
  }
}
