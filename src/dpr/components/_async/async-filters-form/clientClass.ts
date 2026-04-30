import dayjs from 'dayjs'
import { DprClientClass } from '../../../DprClientClass'

type FormInput = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export class DprFiltersFormClass extends DprClientClass {
  private form!: HTMLFormElement

  static override getModuleName() {
    return 'filters-form'
  }

  override initialise(): void {
    if (!(this.element instanceof HTMLFormElement)) {
      throw new Error('DprFormQuerySync must be initialised on a form element')
    }

    this.form = this.element
    this.bindInputEvents()
  }

  // ----------------------------------
  // Events
  // ----------------------------------

  private bindInputEvents(): void {
    this.getAllInputs().forEach((input) => {
      input.addEventListener('change', () => {
        const params = new URLSearchParams(window.location.search)

        this.updateQueryFromInput(input, params)
        this.markPreventDefault(params, input.name) // TODO: Check if this is needed ?
        this.resetPagination(params) // TODO: Check if this is needed ?
        this.replaceUrl(params)
      })
    })
  }

  // ----------------------------------
  // Query updates
  // ----------------------------------

  private updateQueryFromInput(input: FormInput, params: URLSearchParams): void {
    const { name } = input
    if (!name) return

    if (input instanceof HTMLInputElement) {
      if (input.type === 'checkbox') {
        this.updateCheckbox(params, input)
      } else if (input.type === 'radio') {
        this.updateRadio(params, input)
      } else {
        this.updateSingle(params, input)
      }
    } else {
      this.updateSingle(params, input)
    }
  }

  private updateCheckbox(params: URLSearchParams, input: HTMLInputElement): void {
    const values = params.getAll(input.name)

    // Remove all existing values for this key
    params.delete(input.name)

    // Re‑add all values except the unchecked one
    values
      .filter((value) => value !== input.value || input.checked)
      .forEach((value) => {
        params.append(input.name, value)
      })

    // Add the newly checked value
    if (input.checked && !values.includes(input.value)) {
      params.append(input.name, input.value)
    }
  }

  private updateRadio(params: URLSearchParams, input: HTMLInputElement): void {
    if (input.checked) {
      params.set(input.name, input.value)
    }
  }

  private updateSingle(
    params: URLSearchParams,
    input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  ): void {
    const name = this.normaliseFilterName(input.name)
    let value = input.value

    if (input instanceof HTMLInputElement && input.dataset['staticOptionNameValue']) {
      value = input.dataset['staticOptionNameValue']
    }

    const isDateInput = input instanceof HTMLInputElement && input.classList.contains('moj-js-datepicker-input')

    if (isDateInput) {
      const formatted = dayjs(value, 'D/M/YYYY').format('YYYY-MM-DD')
      value = formatted !== 'Invalid Date' ? formatted : ''
    }

    const trimmed = value.trim()

    if (trimmed) {
      params.set(name, trimmed)
    } else {
      params.delete(name)
    }
  }

  // ----------------------------------
  // Behaviour flags
  // ----------------------------------

  /**
   * Signals to the server that defaults
   */
  private markPreventDefault(params: URLSearchParams, changedName: string): void {
    if (changedName !== 'columns') {
      params.set('preventDefault', 'true')
    }
  }

  /**
   * Reset pagination when filters change
   */
  private resetPagination(params: URLSearchParams): void {
    if (params.has('selectedPage')) {
      params.set('selectedPage', '1')
    }
  }

  private replaceUrl(params: URLSearchParams): void {
    const query = params.toString()
    const url = query ? `?${query}` : window.location.pathname
    window.history.replaceState(null, '', url)
  }

  // ----------------------------------
  // DOM helpers
  // ----------------------------------

  private getAllInputs(): FormInput[] {
    return Array.from(this.form.querySelectorAll<FormInput>('input, select, textarea')).filter((el) => el.name)
  }

  private normaliseFilterName(name: string): string {
    return name.startsWith('label.') ? name.replace(/^label\./, '') : name
  }
}

export default DprFiltersFormClass
