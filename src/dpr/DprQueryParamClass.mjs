/* eslint-disable class-methods-use-this */
import { DprClientClass } from './DprClientClass.mjs'

export default class DprQueryParamClass extends DprClientClass {
  /**
   * initialises the selected values from the query params
   *
   * @memberof AsyncFilters
   */
  initInputsFromQueryParams () {
    this.queryParams = new URLSearchParams(window.location.search)
    this.queryParams.forEach((value, key) => {
      const input = document.getElementsByName(key)
      if (input.length) {
        const { type } = input[0]
        if (type === 'radio' || type === 'checkbox') {
          this.setMultiSelectValue(input, value)
        } else {
          input[0].value = value
        }
      }
    })
  }

  /**
   * Initialises the input event listeners
   *
   * @memberof AsyncFilters
   */
  initInputEvents (elements) {
    Array.from(elements).forEach((input) => {
      input.addEventListener('change', () => {
        this.setQueryParamFromInput(input, true)
      })
    })
  }

  /**
   * Initialises the query params from default inputs
   *
   * @param {*} elements
   * @memberof DprQueryParamClass
   */
  initQueryParamsFromInputs (elements) {
    Array.from(elements).forEach((input) => {
      this.setQueryParamFromInput(input)
    })
  }

  /**
   * Sets a single query param from an single input
   *
   * @param {*} input
   * @param {*} toggleCheckbox
   * @memberof DprQueryParamClass
   */
  setQueryParamFromInput (input, toggleCheckbox = false) {
    const { type } = input
    if (type === 'checkbox' || type === 'radio') {
      this.setMultiSelectQueryParam(input, toggleCheckbox)
    } else {
      const { name, value } = input
      if (value) this.updateQueryParam(name, value)
    }
  }

  /**
   * Sets the query params for checkboxes
   *
   * @param {*} input
   * @param {*} toggle - adds the delete step on toggle
   * @memberof DprQueryParamClass
   */
  setMultiSelectQueryParam (input, toggle) {
    this.queryParams = new URLSearchParams(window.location.search)
    const { name, value, checked, type } = input
    if (checked && !this.queryParams.has(name, value)) {
      let updateType
      if (type === 'checkbox') updateType = 'append'
      this.updateQueryParam(name, value, updateType)
    } else if (!checked && this.queryParams.has(name, value) && toggle) {
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
  updateQueryParam (name, value, type) {
    this.queryParams = new URLSearchParams(window.location.search)
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
    window.history.replaceState(null, null, `?${this.queryParams.toString()}`)
  }

  /**
   * Clears the query params
   *
   * @memberof DprQueryParamClass
   */
  clearQueryParams () {
    this.queryParams = new URLSearchParams(window.location.search)
    const params = Array.from(this.queryParams)
    params.forEach((p) => {
      if (p[0] !== 'dataProductDefinitionsPath') {
        this.queryParams.delete(p[0], p[1])
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
  getFormDataAsObject (form, prefix) {
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
  setMultiSelectValue (inputs, value) {
    const input = Array.from(inputs).find((i) => i.getAttribute('value') === value)
    if (input) input.checked = true
  }

  /**
   * Sets the value of the checkboxes
   *
   * @param {*} inputs
   * @param {*} value
   * @memberof DprQueryParamClass
   */
  setCheckBoxValues (inputs, value) {
    const input = Array.from(inputs).find((i) => i.getAttribute('value') === value)
    if (input) input.checked = true
  }
}
