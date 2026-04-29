// @ts-nocheck
/* eslint-disable class-methods-use-this */
import { DprClientClass } from '../../../DprClientClass'

class Autocomplete extends DprClientClass {
  static getModuleName() {
    return 'autocomplete-text-input'
  }

  constructor(element) {
    super(element)

    const listId = this.getTextInput().getAttribute('aria-owns')
    this.listItemsSelector = `#${listId} li`
    this.listParentSelector = `#${listId} ul`
  }

  initialise() {
    const textInput = this.getTextInput()
    textInput.addEventListener('keyup', (event) => {
      this.onTextInput(event, textInput)
    })

    textInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.stopPropagation()
        e.preventDefault()
      }
    })

    textInput.addEventListener('input', () => {
      const hiddenInput = this.getHiddenInput()

      if (hiddenInput) {
        hiddenInput.value = ''
      }

      delete textInput.dataset.staticOptionNameValue
    })

    this.getElement()
      .querySelectorAll('.autocomplete-text-input-list-button')
      .forEach((button) => {
        button.addEventListener('mousedown', (event) => {
          this.onOptionClick(event, textInput, this.getElement())
        })
      })

    this.initialiseDefaultValue(textInput)
  }

  initialiseDefaultValue(textInput) {
    const hiddenInput = this.getHiddenInput()

    if (hiddenInput?.value) {
      textInput.dataset.staticOptionNameValue = hiddenInput.value
    }
  }

  getTextInput() {
    return this.getElement().querySelector('.autocomplete-text-input-box')
  }

  onTextInput(event, textInput) {
    const minLength = Number(textInput.dataset.minimumLength)
    const { resourceEndpoint } = textInput.dataset
    const searchValue = event.target.value.toLowerCase()

    if (resourceEndpoint) {
      if (searchValue.length >= minLength) {
        this.addItem(this.clearListAndRecreateTemplate(), '<i>Searching...</i>')
        this.populateOptionsDynamically(resourceEndpoint, searchValue, textInput, () =>
          this.clearListAndRecreateTemplate(),
        )
      } else {
        this.clearListAndRecreateTemplate()
      }
    } else {
      this.getElement()
        .querySelectorAll(this.listItemsSelector)
        .forEach((item) => {
          if (
            searchValue.length >= minLength &&
            this.isMatchingStaticOptionNameOrDisplayPrefix(this.getInputListButton(item), searchValue, item)
          ) {
            item.classList.remove('autocomplete-text-input-item-hide')
          } else {
            item.classList.add('autocomplete-text-input-item-hide')
          }
        })
    }

    if (searchValue.length === 0) {
      const changeEvent = new Event('change')
      textInput.dispatchEvent(changeEvent)
    }
  }

  getInputListButton(item) {
    return item.querySelector('.autocomplete-text-input-list-button')
  }

  isMatchingStaticOptionNameOrDisplayPrefix(inputListButton, searchValue, item) {
    return (
      this.isStaticOptionsNamePrefix(inputListButton.dataset.staticOptionNameValue, searchValue) ||
      item.innerText.trim().toLowerCase().startsWith(searchValue)
    )
  }

  isStaticOptionsNamePrefix(staticOptionNameValue, searchValue) {
    return staticOptionNameValue && staticOptionNameValue.trim().toLowerCase().startsWith(searchValue)
  }

  async populateOptionsDynamically(resourceEndpoint, searchValue, textInput, templateProvider) {
    try {
      const response = await fetch(resourceEndpoint.replace('{prefix}', encodeURI(searchValue)))
      const results = await response.json()

      if (searchValue === textInput.value.toLowerCase()) {
        const template = templateProvider()

        results.forEach((r) => {
          this.addItem(template, r, (event) => {
            this.onOptionClick(event, textInput, this.getElement())
          })
        })
      }
    } catch (error) {
      this.addItem(templateProvider(), `Failed to retrieve results: ${error}`)
    }
  }

  onOptionClick(event, textInput, topLevelElement) {
    event.preventDefault()

    const button = event.currentTarget.closest('button')
    const hiddenInput = this.getHiddenInput()

    const displayValue = button.innerText.trim()
    const actualValue = button.dataset.staticOptionNameValue || ''

    // UI Display Value
    textInput.value = displayValue

    // submission value
    if (hiddenInput) {
      hiddenInput.value = actualValue
    }

    textInput.dataset.staticOptionNameValue = actualValue

    topLevelElement.querySelectorAll('li').forEach((item) => {
      item.classList.add('autocomplete-text-input-item-hide')
    })

    textInput.focus()
    textInput.dispatchEvent(new Event('change', { bubbles: true }))
  }

  setValue(textInput, displayValue) {
    textInput.value = displayValue
    textInput.focus()
    textInput.dispatchEvent(new Event('change', { bubbles: true }))
  }

  addItem(template, content, clickEvent) {
    const item = template.cloneNode(true)
    item.querySelector('button').innerHTML = content
    item.classList.remove('autocomplete-text-input-item-hide')
    this.getElement().querySelector(this.listParentSelector).appendChild(item)

    if (clickEvent) {
      item.addEventListener('mousedown', (event) => {
        clickEvent(event)
      })
    }
  }

  clearListAndRecreateTemplate() {
    const template = this.getElement().querySelector(this.listItemsSelector).cloneNode(true)
    template.classList.add('autocomplete-text-input-item-hide')
    this.getElement()
      .querySelectorAll(this.listItemsSelector)
      .forEach((e) => e.remove())
    this.getElement().querySelector(this.listParentSelector).append(template)
    return template
  }

  getHiddenInput() {
    return this.getElement().querySelector('[data-autocomplete-hidden]')
  }
}

export { Autocomplete }
export default Autocomplete
