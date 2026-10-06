import { DprClientClass } from '../../../DprClientClass'

class Autocomplete extends DprClientClass {
  private activeIndex = -1

  static override getModuleName() {
    return 'autocomplete-text-input'
  }

  override initialise() {
    const textInput = this.getTextInput()

    if (!textInput) {
      return
    }

    this.initialiseDefaultValue()

    textInput.addEventListener('input', () => {
      this.onInput()
    })

    textInput.addEventListener('keydown', event => {
      this.onKeyDown(event)
    })

    textInput.addEventListener('blur', () => {
      window.setTimeout(() => {
        this.closeList()
      }, 100)
    })

    this.getAllOptions().forEach(option => {
      option.addEventListener('mousedown', event => {
        event.preventDefault()
        this.selectOption(option)
      })
    })

    textInput.addEventListener('focus', () => {
      const minimumLength = Number(textInput.dataset['minimumLength'] || 0)

      if (minimumLength === 0) {
        this.filterOptions('')
      }
    })
  }

  private getTextInput(): HTMLInputElement | null {
    return this.getElement().querySelector('.autocomplete-text-input-box')
  }

  private getHiddenInput(): HTMLInputElement | null {
    return this.getElement().querySelector('[data-autocomplete-hidden]')
  }

  private getAllOptions(): HTMLElement[] {
    return Array.from(this.getElement().querySelectorAll<HTMLElement>('.autocomplete-option'))
  }

  private getVisibleOptions(): HTMLElement[] {
    return this.getAllOptions().filter(option => !option.classList.contains('autocomplete-text-input-item-hide'))
  }

  private initialiseDefaultValue() {
    const hiddenInput = this.getHiddenInput()
    const textInput = this.getTextInput()

    if (!hiddenInput || !textInput) {
      return
    }

    const selectedValue = hiddenInput.value

    if (!selectedValue) {
      hiddenInput.disabled = true
      return
    }

    hiddenInput.disabled = false

    const matchingOption = this.getAllOptions().find(option => option.dataset['value'] === selectedValue)

    if (!matchingOption) {
      return
    }

    textInput.value = matchingOption.dataset['display'] ?? matchingOption.textContent?.trim() ?? ''

    textInput.dataset['selectedValue'] = selectedValue
  }

  private onInput() {
    const textInput = this.getTextInput()

    if (!textInput) {
      return
    }

    this.clearSelection()

    const searchValue = textInput.value.trim().toLowerCase()

    if (!searchValue) {
      this.closeList()
      return
    }

    this.filterOptions(searchValue)
  }

  private filterOptions(searchValue: string) {
    const minimumLength = Number(this.getTextInput()?.dataset['minimumLength'] || 0)

    let visibleCount = 0

    this.getAllOptions().forEach(option => {
      const display = option.dataset['display']?.toLowerCase() ?? ''

      const value = option.dataset['value']?.toLowerCase() ?? ''

      const matches =
        searchValue.length === 0
          ? true
          : searchValue.length >= minimumLength && (display.includes(searchValue) || value.includes(searchValue))

      option.classList.toggle('autocomplete-text-input-item-hide', !matches)

      option.classList.remove('autocomplete-option-selected')

      option.setAttribute('aria-selected', 'false')

      if (matches) {
        visibleCount += 1
      }
    })

    this.activeIndex = -1

    if (visibleCount > 0) {
      this.openList()
    } else {
      this.closeList()
    }
  }

  private onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        this.moveNext()
        break

      case 'ArrowUp':
        event.preventDefault()
        this.movePrevious()
        break

      case 'Enter':
        this.selectActiveOption(event)
        break

      case 'Escape':
        event.preventDefault()
        this.closeList()
        break

      default:
        break
    }
  }

  private moveNext() {
    const options = this.getVisibleOptions()

    if (!options.length) {
      return
    }

    const nextIndex = this.activeIndex < options.length - 1 ? this.activeIndex + 1 : 0

    this.highlightOption(nextIndex)
  }

  private movePrevious() {
    const options = this.getVisibleOptions()

    if (!options.length) {
      return
    }

    const previousIndex = this.activeIndex > 0 ? this.activeIndex - 1 : options.length - 1

    this.highlightOption(previousIndex)
  }

  private highlightOption(index: number) {
    const textInput = this.getTextInput()
    const options = this.getVisibleOptions()

    if (!textInput || !options.length) {
      return
    }

    this.activeIndex = index

    options.forEach((option, optionIndex) => {
      const selected = optionIndex === index

      option.classList.toggle('autocomplete-option-selected', selected)

      option.setAttribute('aria-selected', String(selected))
    })

    const activeOption = options[index]

    textInput.setAttribute('aria-activedescendant', activeOption.id)

    activeOption.scrollIntoView({
      block: 'nearest',
    })
  }

  private selectActiveOption(event: KeyboardEvent) {
    const options = this.getVisibleOptions()

    if (this.activeIndex < 0 || !options[this.activeIndex]) {
      return
    }

    event.preventDefault()

    this.selectOption(options[this.activeIndex])
  }

  private selectOption(option: HTMLElement) {
    const textInput = this.getTextInput()
    const hiddenInput = this.getHiddenInput()

    const display = option.dataset['display'] ?? option.textContent?.trim() ?? ''

    const value = option.dataset['value'] ?? ''

    if (textInput) {
      textInput.value = display
      textInput.dataset['selectedValue'] = value
    }

    if (hiddenInput) {
      hiddenInput.value = value
      hiddenInput.disabled = false
    }

    this.closeList()

    textInput?.dispatchEvent(
      new Event('change', {
        bubbles: true,
      }),
    )
  }

  private openList() {
    const textInput = this.getTextInput()

    textInput?.setAttribute('aria-expanded', 'true')

    this.getListbox()?.classList.remove('autocomplete-text-input-list--hidden')
  }

  private closeList() {
    const textInput = this.getTextInput()

    textInput?.setAttribute('aria-expanded', 'false')

    textInput?.removeAttribute('aria-activedescendant')

    this.activeIndex = -1

    this.getAllOptions().forEach(option => {
      option.classList.add('autocomplete-text-input-item-hide')

      option.classList.remove('autocomplete-option-selected')

      option.setAttribute('aria-selected', 'false')
    })

    this.getListbox()?.classList.add('autocomplete-text-input-list--hidden')
  }

  private clearSelection() {
    const hiddenInput = this.getHiddenInput()
    const textInput = this.getTextInput()

    if (hiddenInput) {
      hiddenInput.value = ''
      hiddenInput.disabled = true
    }

    if (textInput) {
      delete textInput.dataset['selectedValue']
    }
  }

  private getListbox(): HTMLElement | null {
    const textInput = this.getTextInput()

    if (!textInput) {
      return null
    }

    const listId = textInput.getAttribute('aria-controls')

    return listId ? document.getElementById(listId) : null
  }
}

export { Autocomplete }
export default Autocomplete
