import { DprClientClass } from '../../../DprClientClass'
import { uiDateToApi } from '../../../utils/dateHelper'
import { calcDatesForUI, CalculableRelativeDateRange } from 'src/dpr/utils/durationCalculator'
import RelativeDateRange from './types'

class DateRangeInput extends DprClientClass {
  static override getModuleName(): string {
    return 'date-range-input'
  }

  private startName!: string

  private endName!: string

  private durationName!: string

  private startInput!: HTMLInputElement

  private endInput!: HTMLInputElement

  private radios!: HTMLInputElement[]

  override initialise(): void {
    const root = document.getElementById('dpr-date-range')
    if (!root) return

    const fieldName = root.getAttribute('data-field-name')
    if (!fieldName) return

    // ------------------------------
    // Elements
    // ------------------------------

    this.startName = `filters.${fieldName}.start`
    this.endName = `filters.${fieldName}.end`
    this.durationName = `filters.${fieldName}.relative-duration`

    this.startInput = root.querySelector(`input[name='${this.startName}']`) as HTMLInputElement
    this.endInput = root.querySelector(`input[name='${this.endName}']`) as HTMLInputElement
    this.radios = Array.from(document.querySelectorAll<HTMLInputElement>(`input[name='${this.durationName}']`))

    this.bindEvents()
  }

  // ------------------------------
  // Events
  // ------------------------------

  private bindEvents(): void {
    // Relative radios
    this.radios.forEach((radio) => {
      radio.addEventListener('change', () => {
        if (!radio.checked) return
        if (radio.value === RelativeDateRange.NONE) {
          return
        }
        const dates = calcDatesForUI(radio.value as CalculableRelativeDateRange)
        if (dates) {
          const { start, end } = dates
          this.startInput.value = start
          this.endInput.value = end
          this.setDateRangeQueryString(start, end)
        }
      })
    })

    // Date inputs (manual changes)
    ;[this.startInput, this.endInput].forEach((input) => {
      input.addEventListener('change', () => {
        this.radios.forEach((radio) => {
          radio.checked = false
        })
        this.removeQueryParam(this.durationName)
      })
    })
  }

  // ------------------------------
  // Query string helpers
  // ------------------------------

  private setDateRangeQueryString(startUi: string, endUi: string): void {
    const params = new URLSearchParams(window.location.search)

    const startApi = uiDateToApi(startUi)
    const endApi = uiDateToApi(endUi)

    if (startApi) {
      params.set(this.startName, startApi)
    }

    if (endApi) {
      params.set(this.endName, endApi)
    }

    // Also keep the relative-range param in the URL
    const checkedRadio = this.radios.find((r) => r.checked)
    if (checkedRadio) {
      params.set(this.durationName, checkedRadio.value)
    }

    window.history.replaceState(null, '', `?${params.toString()}`)
  }

  private removeQueryParam(name: string): void {
    const params = new URLSearchParams(window.location.search)
    params.delete(name)
    window.history.replaceState(null, '', `?${params.toString()}`)
  }
}

export default DateRangeInput
