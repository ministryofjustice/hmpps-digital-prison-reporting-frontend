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

          const keys = JSON.parse(e.target.getAttribute('data-query-param-key')) || []
          const values = JSON.parse(e.target.getAttribute('data-query-param-value')) || []

          let constraints = e.target.getAttribute('data-query-constraint-values')
          constraints = constraints ? JSON.parse(e.target.getAttribute('data-query-constraint-values')) : undefined

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

  /**
   * Creates the selected filter data and buttons
   *
   * @memberof SelectedFilters
   */
  initSelectedFiltersButtons() {
    this.queryParams = new URLSearchParams(window.location.search)
    this.selectedFiltersWrapper.innerHTML = ''

    const selectedFilters = []
    this.queryParams.forEach((value, key) => {
      let displayName = key
      let displayValue = value

      if (key.includes('filters.')) {
        const inputs = document.getElementsByName(key)

        if (inputs.length) {
          displayName = this.getDisplayName(inputs[0])
          displayValue = this.getInputDisplayValue(inputs)

          const index = selectedFilters.findIndex((s) => s.key === key)
          if (index === -1) {
            selectedFilters.push({
              displayName,
              displayValue,
              key,
              value: [value],
              type: inputs[0],
            })
          } else {
            selectedFilters[index] = {
              ...selectedFilters[index],
              displayValue: selectedFilters[index].displayValue,
              value: selectedFilters[index].value,
            }
          }
        }
      }
    })

    this.createSelectedFilters(selectedFilters)
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
   * Creates the selected filters
   *
   * @param {NodeList} selectedFilters
   * @memberof SelectedFilters
   */
  createSelectedFilters(selectedFilters) {
    selectedFilters.forEach((selected) => {
      const { displayName, displayValue, key, value } = selected

      let parsedDisplayValue = displayValue
      if (Array.isArray(displayValue) && displayValue.length > 3) {
        parsedDisplayValue = `${displayValue[0]}, ${displayValue[1]}, ${displayValue[2]} + ${
          displayValue.length - 3
        } more`
      }
      const selectedItem = this.createSelectedItem(displayName, parsedDisplayValue, key, value)
      this.selectedFiltersWrapper.appendChild(selectedItem)

      this.initSelectedButtonEvent()
    })
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
  createSelectedItem(displayName, displayValue, key, value) {
    // tag
    const selectedItem = document.createElement('a')
    selectedItem.classList = 'govuk-link govuk-body interactive-remove-filter-button'

    // data
    selectedItem.dataset.dataQueryParamKey = key
    selectedItem.dataset.dataQueryParamValue = `[ "${value}" ]`

    // content
    const content = document.createTextNode(`${displayName}: ${displayValue}`)

    // merge
    selectedItem.appendChild(content)

    return selectedItem
  }
}
