/* eslint-disable class-methods-use-this */
import DprFiltersFormClass from '../filters-form/clientClass.mjs'

export default class SelectedFilters extends DprFiltersFormClass {
  static getModuleName() {
    return 'selected-filters'
  }

  initInteractiveFilterButtons() {
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

  initInputSelectedEvents(elements) {
    Array.from(elements).forEach((input) => {
      input.addEventListener('change', () => {
        this.initSelectedFiltersButtons()
      })
    })
  }

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
