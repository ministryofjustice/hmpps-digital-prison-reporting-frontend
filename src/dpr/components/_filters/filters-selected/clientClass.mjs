/* eslint-disable class-methods-use-this */
import DprFiltersFormClass from '../filters-form/clientClass.mjs'

export default class SelectedFilters extends DprFiltersFormClass {
  static getModuleName() {
    return 'selected-filters'
  }

  /**
   * Initialises the Interactive selected filter button events
   *
   * - Updates the query parameter in the url
   * - Reloads the page to create the selected filter data server side
   * - selected filter data is passed to the render function
   *
   * @memberof SelectedFilters
   */
  initInteractiveSelectedFilterButtonsEvents() {
    if (this.selectedFiltersButtons) {
      this.selectedFiltersButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
          e.preventDefault()
          const target = e.target.matches('.interactive-remove-filter-button')
            ? e.target
            : e.target.closest('.interactive-remove-filter-button')

          const keys = JSON.parse(target.getAttribute('data-query-param-key')) || []
          const values = JSON.parse(target.getAttribute('data-query-param-value')) || []

          let constraints = target.getAttribute('data-query-constraint-values')
          constraints = constraints ? JSON.parse(target.getAttribute('data-query-constraint-values')) : undefined

          keys.forEach((key) => {
            values.forEach((value) => {
              this.updateQueryParam(key, value, 'delete')
            })
            if (constraints) {
              const constraint = constraints.find((con) => con.key === key)
              if (constraint) {
                this.updateQueryParam(key, constraint.value)
              }
            }
          })

          this.updateQueryParam('preventDefault', true)
          window.location.reload()
        })
      })
    }
  }

  initSelectedFiltersButtons() {
    // init data from query params
    let selectedFilterData = this.getSelectedFilterData()

    // handle edgecases with specific input types
    selectedFilterData = this.setPresetDateRangeSelectedFilter(selectedFilterData)
    selectedFilterData = this.setMultiselectSelectedFilterValue(selectedFilterData)

    // builds the elements and render
    this.createSelectedFilterElements(selectedFilterData)
  }

  /**
   * Initialises the input change event
   *
   * @param {NodeList} elements
   * @memberof SelectedFilters
   */
  initInputEventsForSelectedFilters(elements) {
    Array.from(elements).forEach((input) => {
      input.addEventListener('change', () => {
        this.initSelectedFiltersButtons()
      })
    })
  }

  /**
   * Creates the selected filter data and buttons
   *
   * @memberof SelectedFilters
   */
  getSelectedFilterData() {
    this.queryParams = new URLSearchParams(window.location.search)
    this.selectedFiltersWrapper.innerHTML = ''

    const selectedFilterData = []
    this.queryParams.forEach((value, key) => {
      let displayName = key
      let displayValue = value

      if (key.includes('filters.')) {
        const inputs = document.getElementsByName(key)

        if (inputs.length) {
          displayName = this.getDisplayName(inputs[0])
          displayValue = this.getInputDisplayValue(inputs)

          const index = selectedFilterData.findIndex((s) => s.key === key)
          if (index === -1) {
            if (displayValue) {
              selectedFilterData.push({
                displayName,
                displayValue,
                key,
                value: [value],
                type: inputs[0],
              })
            }
          } else {
            selectedFilterData[index] = {
              ...selectedFilterData[index],
              displayValue: selectedFilterData[index].displayValue,
              value: selectedFilterData[index].value,
            }
          }
        }
      }
    })

    return selectedFilterData
  }

  /**
   * Creates the selected filters
   *
   * @param {NodeList} selectedFilters
   * @memberof SelectedFilters
   */
  createSelectedFilterElements(selectedFilters) {
    if (selectedFilters.length) {
      selectedFilters.forEach((selectedFilterData) => {
        this.createSelectedFilterElement(selectedFilterData)
        this.initSelectedButtonEvent()
      })
    } else {
      this.createNoFiltersSelectedMessageEl()
    }
    this.createResetButtonEl()
  }

  /**
   * Gets the display value for a selected input
   *
   * @param {*} inputs
   * @return {string} the input diap
   * @memberof SelectedFilters
   */
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

      case 'select-one':
        displayValue = inputs[0].options[inputs[0].selectedIndex].text
        break

      case 'checkbox': {
        const checkedInputs = Array.from(inputs).filter((i) => i.checked)
        displayValue = checkedInputs.map((i) => {
          return ` ${i.labels[0].innerText}`
        })
        break
      }

      default:
        displayValue = inputs[0].value
        break
    }

    return displayValue
  }

  /**
   * Initialises the request selected filter button events
   *
   * - Updates the corresponding input value to null
   * - Dispatches an input change event to update to update the corresponding url search param
   *
   * @memberof SelectedFilters
   */
  initSelectedButtonEvent() {
    Array.from(this.selectedFiltersWrapper.children).forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault()

        const inputs = document.getElementsByName(button.dataset.dataQueryParamKey)
        if (inputs.length) {
          switch (inputs[0].type) {
            case 'checkbox':
            case 'radio':
              inputs.forEach((i) => {
                // eslint-disable-next-line no-param-reassign
                i.checked = false
                const changeEvent = new Event('change')
                i.dispatchEvent(changeEvent)
              })
              break

            case 'search':
              inputs[0].value = ''
              inputs[0].staticOptionNameValue = ''
              break

            default:
              inputs[0].value = ''
              break
          }

          const changeEvent = new Event('change')
          inputs[0].dispatchEvent(changeEvent)
        }
      })
    })
  }

  /**
   * Creates the selected input element
   *
   * @param {string} displayName
   * @param {string} displayValue
   * @param {string} key
   * @param {string} value
   * @return {element}
   * @memberof SelectedFilters
   */
  createSelectedFilterElement(selectedData) {
    const { displayName, displayValue, key, value } = selectedData
    const selectedItem = document.createElement('a')
    selectedItem.classList = 'govuk-link govuk-body interactive-remove-filter-button'
    selectedItem.dataset.dataQueryParamKey = key
    selectedItem.dataset.dataQueryParamValue = `[ "${value}" ]`

    const contentField = document.createTextNode(`${displayName}: `)
    selectedItem.appendChild(contentField)

    const selectedItemValue = document.createElement('span')
    selectedItemValue.classList = 'dpr-selected-filter__value'
    const contentValue = document.createTextNode(displayValue)
    selectedItemValue.appendChild(contentValue)
    selectedItem.appendChild(selectedItemValue)

    this.selectedFiltersWrapper.appendChild(selectedItem)
  }

  createNoFiltersSelectedMessageEl() {
    const noneSelectedMessage = document.createElement('p')
    noneSelectedMessage.classList = 'govuk-body-s govuk-!-margin-top-2 govuk-!-margin-bottom-0'
    const content = document.createTextNode('No filters selected')
    noneSelectedMessage.appendChild(content)
    this.selectedFiltersWrapper.appendChild(noneSelectedMessage)
  }

  createResetButtonEl() {
    const resetLink = document.createElement('a')
    resetLink.classList =
      'govuk-body-s govuk-link govuk-link--no-visited-state dpr-reset-filters-button govuk-!-margin-bottom-0'
    const content = document.createTextNode('Reset filters')
    resetLink.appendChild(content)
    resetLink.setAttribute('href', '#')
    resetLink.setAttribute('id', 'async-request-reset-filters-button')
    this.selectedFiltersWrapper.appendChild(resetLink)
    this.initResetButton('async-request-reset-filters-button')
  }

  // Specfic input type edge cases 👇🏽

  /**
   * Daterange
   * Filters the selected filters buttons to include valid preset date range buttons
   *
   * @param {*} selectedFilters
   * @return {*}
   * @memberof SelectedFilters
   */
  setPresetDateRangeSelectedFilter(selectedFilters) {
    let updatedSelectedFilters = selectedFilters
    const presetRangeFilter = selectedFilters.find((sf) => sf.displayName === 'Preset date range')
    if (presetRangeFilter) {
      updatedSelectedFilters = selectedFilters.filter((sf) => {
        const key = sf.key.split('.')
        return !sf.key.includes(`${key[0]}.${key[1]}`) || sf.key === presetRangeFilter.key
      })
    }
    return updatedSelectedFilters
  }

  /**
   * Multiselect
   *
   * @param {*} selectedFilters
   * @return {*}
   * @memberof SelectedFilters
   */
  setMultiselectSelectedFilterValue(selectedFilters) {
    let updatedSelectedFilters = selectedFilters
    updatedSelectedFilters = selectedFilters.map((sf) => {
      if (Array.isArray(sf.displayValue) && sf.displayValue.length > 3) {
        const dv = `${sf.displayValue[0]}, ${sf.displayValue[1]}, ${sf.displayValue[2]} + ${
          sf.displayValue.length - 3
        } more`
        return {
          ...sf,
          displayValue: dv,
        }
      }
      return sf
    })
    return updatedSelectedFilters
  }
}
