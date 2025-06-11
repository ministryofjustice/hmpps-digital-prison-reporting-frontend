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

          Array.from(elements).forEach((i) => {
            if (i.name === key) {
              ;({ displayName, displayValue } = this.setDisplayNameAndValues(i, key, value))
            }
          })

          const selectedItem = this.createSelectedItem(displayName, displayValue, key, value)
          this.selectedFiltersWrapper.appendChild(selectedItem)
          this.initSelectedButtonEvent()
        })
      })
    })
  }

  setDisplayNameAndValues(input, key, value) {
    const { type } = input
    let displayName = key
    let displayValue = value

    console.log({ type })

    switch (type) {
      case 'text':
        displayName = input.labels[0].innerText
        displayValue = value
        break

      default:
        break
    }

    return {
      displayName,
      displayValue,
    }
  }

  initSelectedButtonEvent() {
    Array.from(this.selectedFiltersWrapper.children).forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault()

        Array.from(this.mainForm.elements).forEach((input) => {
          if (input.name === button.dataset.dataQueryParamKey) {
            // eslint-disable-next-line no-param-reassign
            input.value = ''
            const changeEvent = new Event('change')
            input.dispatchEvent(changeEvent)
          }
        })
      })
    })
  }

  initInputSelectedEventsw(elements) {
    Array.from(elements).forEach((input) => {
      input.addEventListener('change', () => {
        const { type, name, value, staticOptionNameValue } = input
        console.log({ type, name, value, staticOptionNameValue })

        let displayValue = value
        if (type === 'radio') {
          displayValue = input.labels[0].innerText
        }

        const selectedFilterButton = Array.from(this.selectedFiltersButtons).find((button) => {
          const key = JSON.parse(button.dataset.queryParamKey)[0]
          return key === name
        })

        if (selectedFilterButton) {
          selectedFilterButton.children[1].innerText = displayValue
        } else if (type !== 'fieldset') {
          const selectedItem = this.createSelectedItem('name', displayValue, name, value)
          this.selectedFiltersWrapper.appendChild(selectedItem)
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
