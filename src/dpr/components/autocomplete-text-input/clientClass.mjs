import { DprClientClass } from '../../DprClientClass.mjs'

export default class Autocomplete extends DprClientClass {
  static getModuleName () {
    return 'autocomplete-text-input'
  }

  constructor(element) {
    super(element)

    const listId = this.getTextInput().getAttribute('aria-owns')
    this.listItemsSelector = `#${listId} li`
    this.listParentSelector = `#${listId} ul`
  }

  initialise () {
    const textInput = this.getTextInput()
    textInput.addEventListener('keyup', (event) => {
      this.onTextInput(event, textInput)
    })

    this.getElement()
      .querySelectorAll('.autocomplete-text-input-list-button')
      .forEach((button) => {
        button.addEventListener('click', (event) => {
          this.onOptionClick(event, textInput, this.getElement())
        })
      })
  }

  getTextInput () {
    return this.getElement().querySelector('.autocomplete-text-input-box')
  }

  onTextInput (event, textInput) {
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
          if (searchValue.length >= minLength && item.innerText.trim().toLowerCase().startsWith(searchValue)) {
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

  async populateOptionsDynamically (resourceEndpoint, searchValue, textInput, templateProvider) {
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

  onOptionClick (event, textInput, topLevelElement) {
    event.preventDefault()
    // eslint-disable-next-line no-param-reassign
    textInput.value = event.target.innerText.trim()
    textInput.focus()
    const changeEvent = new Event('change')
    textInput.dispatchEvent(changeEvent)

    topLevelElement.querySelectorAll('li').forEach((item) => {
      item.classList.add('autocomplete-text-input-item-hide')
    })
  }

  addItem (template, content, clickEvent) {
    const item = template.cloneNode(true)
    item.querySelector('button').innerHTML = content
    item.classList.remove('autocomplete-text-input-item-hide')
    this.getElement().querySelector(this.listParentSelector).appendChild(item)

    if (clickEvent) {
      item.addEventListener('click', (event) => {
        clickEvent(event)
      })
    }
  }

  clearListAndRecreateTemplate () {
    const template = this.getElement().querySelector(this.listItemsSelector).cloneNode(true)
    template.classList.add('autocomplete-text-input-item-hide')
    this.getElement()
      .querySelectorAll(this.listItemsSelector)
      .forEach((e) => e.remove())
    this.getElement().querySelector(this.listParentSelector).append(template)
    return template
  }
}
