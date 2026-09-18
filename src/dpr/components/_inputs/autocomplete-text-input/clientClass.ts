/* eslint-disable class-methods-use-this */
import { DprClientClass } from '../../../DprClientClass'

class Autocomplete extends DprClientClass {
  private listItemsSelector: string
  private listParentSelector: string

  static override getModuleName() {
    return 'autocomplete-text-input'
  }

  constructor(element: HTMLElement) {
    super(element)

    const listId = this.getTextInput()?.getAttribute('aria-owns')
    this.listItemsSelector = `#${listId} li`
    this.listParentSelector = `#${listId} ul`
  }

  override initialise() {
    const textInput = this.getTextInput()

    textInput?.addEventListener('keyup', event => {
      this.onTextInput(event, textInput)
    })

    textInput?.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.stopPropagation()
        e.preventDefault()
      }
    })

    textInput?.addEventListener('input', () => {
      if (textInput.value !== '') {
        return
      }

      const hiddenInput = this.getHiddenInput()

      if (hiddenInput) {
        hiddenInput.value = ''
        hiddenInput.disabled = true
      }

      delete textInput.dataset['staticOptionNameValue']

      textInput.dispatchEvent(new Event('change', { bubbles: true }))
    })

    this.getElement()
      .querySelectorAll('.autocomplete-text-input-list-button')
      .forEach(button => {
        button.addEventListener('mousedown', event => {
          this.onOptionClick(event, textInput, this.getElement())
        })
      })

    this.initialiseDefaultValue(textInput)
  }

  initialiseDefaultValue(textInput: HTMLInputElement | null) {
    const hiddenInput = this.getHiddenInput()

    if (hiddenInput?.value) {
      hiddenInput.disabled = false
      return
    }

    if (textInput) {
      textInput.value = ''
    }

    delete textInput?.dataset['staticOptionNameValue']

    if (hiddenInput) {
      hiddenInput.value = ''
      hiddenInput.disabled = true
    }
  }

  getTextInput(): HTMLInputElement | null {
    return this.getElement().querySelector('.autocomplete-text-input-box')
  }

  onTextInput(event: Event, textInput: HTMLInputElement) {
    const minLength = Number(textInput.dataset['minimumLength'])
    const { resourceEndpoint } = textInput.dataset
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase()

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
        .querySelectorAll<HTMLElement>(this.listItemsSelector)
        .forEach(item => {
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

  getInputListButton(item: HTMLElement): HTMLButtonElement | null {
    return item.querySelector('.autocomplete-text-input-list-button')
  }

  isMatchingStaticOptionNameOrDisplayPrefix(
    inputListButton: HTMLButtonElement | null,
    searchValue: string,
    item: HTMLElement,
  ) {
    return (
      this.isStaticOptionsNamePrefix(inputListButton?.dataset['staticOptionNameValue'], searchValue) ||
      item.innerText.trim().toLowerCase().startsWith(searchValue)
    )
  }

  isStaticOptionsNamePrefix(staticOptionNameValue: string | undefined, searchValue: string) {
    return staticOptionNameValue && staticOptionNameValue.trim().toLowerCase().startsWith(searchValue)
  }

  async populateOptionsDynamically(
    resourceEndpoint: string,
    searchValue: string,
    textInput: HTMLInputElement | null,
    templateProvider: () => HTMLElement | null,
  ) {
    try {
      const response = await fetch(resourceEndpoint.replace('{prefix}', encodeURI(searchValue)))
      const results = await response.json()

      if (searchValue === textInput?.value.toLowerCase()) {
        const template = templateProvider()

        results.forEach((result: string) => {
          this.addItem(template, result, event => {
            this.onOptionClick(event, textInput, this.getElement())
          })
        })
      }
    } catch (error) {
      this.addItem(templateProvider(), `Failed to retrieve results: ${error}`)
    }
  }

  onOptionClick(event: Event, textInput: HTMLInputElement | null, topLevelElement: HTMLElement) {
    event.preventDefault()

    const button = (event.currentTarget as HTMLElement)?.closest('button')
    const hiddenInput = this.getHiddenInput()

    const displayValue = button?.innerText.trim()
    const actualValue = button?.dataset['staticOptionNameValue'] || ''

    // UI Display Value
    if (textInput) {
      this.setValue(textInput, displayValue)
      textInput.dataset['staticOptionNameValue'] = actualValue
    }

    // submission value
    if (hiddenInput) {
      hiddenInput.value = actualValue
      hiddenInput.disabled = false
    }

    topLevelElement.querySelectorAll('li').forEach(item => {
      item.classList.add('autocomplete-text-input-item-hide')
    })
  }

  setValue(textInput: HTMLInputElement, displayValue?: string) {
    if (displayValue) {
      textInput.value = displayValue
    }

    textInput.focus()
    textInput.dispatchEvent(new Event('change', { bubbles: true }))
  }

  addItem(template: HTMLElement | null, content: string, clickEvent?: (event: Event) => void) {
    const item: HTMLElement = template?.cloneNode(true) as HTMLElement
    const button = item?.querySelector('button')
    if (button) {
      button.innerHTML = content
    }

    item.classList.remove('autocomplete-text-input-item-hide')
    this.getElement().querySelector(this.listParentSelector)?.appendChild(item)

    if (clickEvent) {
      item.addEventListener('mousedown', (event: Event) => {
        clickEvent(event)
      })
    }
  }

  clearListAndRecreateTemplate() {
    const template: HTMLElement | null = this.getElement()
      .querySelector(this.listItemsSelector)
      ?.cloneNode(true) as HTMLElement | null
    template?.classList.add('autocomplete-text-input-item-hide')
    this.getElement()
      .querySelectorAll(this.listItemsSelector)
      .forEach(e => e.remove())

    if (template) {
      this.getElement().querySelector(this.listParentSelector)?.append(template)
    }

    return template
  }

  getHiddenInput(): HTMLInputElement | null {
    return this.getElement().querySelector('[data-autocomplete-hidden]')
  }
}

export { Autocomplete }
export default Autocomplete
