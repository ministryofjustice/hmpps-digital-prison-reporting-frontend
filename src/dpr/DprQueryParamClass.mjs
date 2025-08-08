import dayjs from 'dayjs'

/* eslint-disable class-methods-use-this */
import { DprClientClass } from './DprClientClass.mjs'

export default class DprQueryParamClass extends DprClientClass {
  /**
   * initialises the selected values from the query params
   *
   * @memberof AsyncFilters
   */
  initInputsFromQueryParams() {
    this.queryParams = new URLSearchParams(window.location.search)
    this.queryParams.forEach((value, key) => {
      const inputs = document.getElementsByName(key)
      if (inputs.length) {
        const input = inputs[0]
        const { type } = input
        if (type === 'radio' || type === 'checkbox') {
          this.setMultiSelectValue(inputs, value)
        } else if (input.classList.contains('moj-js-datepicker-input')) {
          const formatted = dayjs(value, 'YYYY-MM-DD').format('DD/MM/YYYY')
          input.value = formatted !== 'Invalid Date' ? formatted : ''
        } else {
          input.value = value
        }
      }
    })
  }

  /**
   * Initialises the input event listeners
   *
   * @memberof AsyncFilters
   */
  initInputEvents(elements) {
    Array.from(elements).forEach((input) => {
      input.addEventListener('change', () => {
        this.setQueryParamFromInput(input, true, false)
      })
    })
  }

  /**
   * Initialises the query params from default inputs
   *
   * @param {*} elements
   * @memberof DprQueryParamClass
   */
  initQueryParamsFromInputs(elements) {
    Array.from(elements).forEach((input) => {
      if (input.type !== 'hidden') this.setQueryParamFromInput(input, false, true)
    })
  }

  /**
   * Sets a single query param from an single input
   *
   * @param {*} input
   * @param {*} toggleCheckbox
   * @memberof DprQueryParamClass
   */
  setQueryParamFromInput(input, toggleCheckbox = false, init = false) {
    const { type } = input
    if (type === 'checkbox' || type === 'radio') {
      this.setMultiSelectQueryParam(input, toggleCheckbox, init)
    } else {
      const { name } = input
      let { value } = input

      const { staticOptionNameValue } = input
      const isDateInput = input.classList.contains('moj-js-datepicker-input')
      if (isDateInput) {
        const formatted = dayjs(value, 'D/M/YYYY').format('YYYY-MM-DD')
        value = formatted !== 'Invalid Date' ? formatted : ''
      }
      const valueToUpdate = !isDateInput && staticOptionNameValue ? staticOptionNameValue : value
      if (name) this.updateQueryParam(name, valueToUpdate.trim())
    }
  }

  /**
   * Sets the query params for checkboxes
   *
   * @param {*} input
   * @param {*} toggle - adds the delete step on toggle
   * @memberof DprQueryParamClass
   */
  setMultiSelectQueryParam(input, toggle, init) {
    this.queryParams = new URLSearchParams(window.location.search)
    const { name, value, checked, type } = input
    if (checked && !this.queryParams.has(name, value)) {
      let updateType
      if (type === 'checkbox') {
        updateType = 'append'
        if (!init && name !== 'columns') this.updateQueryParam('preventDefault', true)
      }
      this.updateQueryParam(name, value, updateType)
    } else if (!checked && this.queryParams.has(name, value) && toggle) {
      if (type === 'checkbox') {
        if (!init && name !== 'columns') this.updateQueryParam('preventDefault', true)
      }
      this.updateQueryParam(name, value, 'delete')
    }
  }

  /**
   * Updates the query string and updates the URL
   *
   * @param {*} queryParams
   * @param {*} name
   * @param {*} value
   * @memberof DprQueryParamClass
   */
  updateQueryParam(name, value, type) {
    this.queryParams = new URLSearchParams(window.location.search)
    if (!value && name.length) {
      this.queryParams.delete(name)
    } else {
      switch (type) {
        case 'append':
          this.queryParams.append(name, value)
          break
        case 'delete':
          this.queryParams.delete(name, value)
          break
        default:
          this.queryParams.set(name, value)
          break
      }
    }

    window.history.replaceState(null, null, `?${this.queryParams.toString()}`)
  }

  /**
   * Clears the query params
   *
   * @memberof DprQueryParamClass
   */
  clearQueryParams(type) {
    this.queryParams = new URLSearchParams(window.location.search)
    const params = Array.from(this.queryParams)

    params.forEach((p) => {
      if (type && p[0].includes(type)) {
        this.queryParams.delete(p[0], p[1])
      }
      if (type === 'filters') {
        this.queryParams.delete('preventDefault')
      }
    })
    window.history.replaceState(null, null, `?${this.queryParams.toString()}`)
  }

  /**
   * Given a form element, will extract the formdata
   * as an array of objects and filter out empty values.
   *
   * @param {*} form
   * @return {*}
   * @memberof AsyncFilters
   */
  getFormDataAsObject(form, prefix) {
    const formData = new FormData(form)
    const array = Array.from(formData.entries())
      .filter((entry) => {
        return entry[1] !== ''
      })
      .map((entry) => {
        return { [`${prefix}${entry[0]}`]: entry[1] }
      })

    return Object.assign({}, ...[...array])
  }

  /**
   * Sets the value of a radio button
   *
   * @param {*} inputs
   * @param {*} value
   * @memberof AsyncFilters
   */
  setMultiSelectValue(inputs, value) {
    const input = Array.from(inputs).find((i) => i.getAttribute('value') === value)
    if (input && !input.disabled) input.checked = true
  }

  /**
   * Sets the value of the checkboxes
   *
   * @param {*} inputs
   * @param {*} value
   * @memberof DprQueryParamClass
   */
  setCheckBoxValues(inputs, value) {
    const input = Array.from(inputs).find((i) => i.getAttribute('value') === value)
    if (input) input.checked = true
  }

  removeNoFilterValues() {
    this.queryParams = new URLSearchParams(window.location.search)
    const params = Array.from(this.queryParams)
    params.forEach((p) => {
      if (p[1].includes('no-filter')) this.queryParams.delete(p[0], p[1])
    })
    window.history.replaceState(null, null, `?${this.queryParams.toString()}`)
  }
}
