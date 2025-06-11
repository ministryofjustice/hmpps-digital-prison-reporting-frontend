/* eslint-disable class-methods-use-this */
import DprFiltersFormClass from '../../_filters/filters-form/clientClass.mjs'

export default class AsyncFilters extends DprFiltersFormClass {
  static getModuleName() {
    return 'async-filters'
  }

  initialise() {
    this.initFiltersForm({
      formId: 'async-filters-form',
      submitButtonId: 'async-request-report-button',
      resetButtonId: 'async-request-reset-filters-button',
      selectedFiltersId: 'dpr-selected-filters',
      removeSelectedButtonClass: 'interactive-remove-filter-button',
    })

    this.initSelectedFiltersButtons()
  }

  initFormData() {
    const { origin, pathname, search } = window.location
    document.getElementById('async-filters-form-pathname').value = pathname
    document.getElementById('async-filters-form-origin').value = origin
    document.getElementById('async-filters-form-search').value = search

    const params = new URLSearchParams(search)
    const paramsString = params.size > 0 ? `?${params.toString()}` : ''
    document.getElementById('async-filters-form-href').value = `${origin}${pathname}${paramsString}`
    this.initFormValidation(this.formFields)
    this.mainForm.classList.remove('async-filters-form--hidden')
  }

  submitAction() {
    this.mainForm.requestSubmit()
  }

  initSelectedFiltersButtons() {
    if (this.selectedFiltersButtons) {
      this.selectedFiltersButtons.forEach((button) => {
        console.log(JSON.parse(button.dataset.queryParamKey)[0])
      })
    }
  }

  initValues() {
    this.initInputsFromQueryParams()
    this.initQueryParamsFromInputs(this.mainForm.elements)
    this.initInputEvents(this.mainForm.elements)
    this.initSelectedButtonEvent()
    this.initInputSelectedEvents(this.mainForm.elements)
  }

  initInputSelectedEvents(elements) {
    Array.from(elements).forEach((input) => {
      input.addEventListener('change', () => {
        this.queryParams = new URLSearchParams(window.location.search)
        this.selectedFiltersWrapper.innerHTML = ''

        this.queryParams.forEach((value, key) => {
          let displayName = key
          let displayValue = value

          const inputs = document.getElementsByName(key)
          if (inputs.length) {
            displayName = this.getDisplayName(inputs[0])
            displayValue = this.getInputDisplayValue(inputs)

            const selectedItem = this.createSelectedItem(displayName, displayValue, key, value)
            this.selectedFiltersWrapper.appendChild(selectedItem)
            this.initSelectedButtonEvent()
          }
        })
      })
    })
  }

  getInputDisplayValue(inputs) {
    let displayValue

    switch (inputs[0].type) {
      case 'text':
        displayValue = inputs[0].value
        break
      case 'radio': {
        const checkedInput = Array.from(inputs).find((i) => i.checked)
        displayValue = checkedInput.labels[0].innerText
        break
      }
      default:
        break
    }

    return displayValue
  }

  initSelectedButtonEvent() {
    Array.from(this.selectedFiltersWrapper.children).forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault()

        const inputs = document.getElementsByName(button.dataset.dataQueryParamKey)
        if (inputs.length) {
          switch (inputs[0].type) {
            case 'text':
              // eslint-disable-next-line no-param-reassign
              inputs[0].value = ''
              break
            case 'radio':
              inputs.forEach((i) => {
                // eslint-disable-next-line no-param-reassign
                i.checked = false
                const changeEvent = new Event('change')
                i.dispatchEvent(changeEvent)
              })
              break

            default:
              break
          }

          const changeEvent = new Event('change')
          inputs[0].dispatchEvent(changeEvent)
          this.initSelectedButtonEvent()
        }
      })
    })
  }

  createSelectedItem(displayName, displayValue, key, value) {
    // a tag
    const selectedItem = document.createElement('a')
    selectedItem.classList = 'govuk-link govuk-body interactive-remove-filter-button'

    // data
    selectedItem.dataset.dataQueryParamKey = key
    selectedItem.dataset.dataQueryParamValue = `[ "${value}" ]`

    // field name
    const selectedName = document.createElement('span')
    selectedName.classList = 'dpr-selected-filter__field'
    const selectedNameContent = document.createTextNode(`${displayName}: `)
    selectedName.appendChild(selectedNameContent)

    // value
    const selectedValue = document.createElement('span')
    selectedValue.classList = 'dpr-selected-filter__value'
    const selectedValueContent = document.createTextNode(displayValue)
    selectedValue.appendChild(selectedValueContent)

    // merge
    selectedItem.appendChild(selectedName)
    selectedItem.appendChild(selectedValue)

    return selectedItem
  }
}
