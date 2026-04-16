import { DprClientClass } from '../../../../../DprClientClass'
import { formatDateOrUnset } from '../../../../../utils/dateHelper'

type FilterControl = HTMLInputElement | HTMLSelectElement

type SelectedFilter = {
  displayName: string
  displayValue: string
  inputs: FilterControl[]
}

export class DprSelectedAsyncFilters extends DprClientClass {
  private container!: HTMLElement

  static override getModuleName() {
    return 'dpr-selected-async-filters'
  }

  override initialise(): void {
    this.container = this.element
    this.renderFromInputs()
    this.bindInputEvents()
  }

  // ----------------------------------
  // Input observation
  // ----------------------------------

  private bindInputEvents(): void {
    this.getAllFilterControls().forEach((control) => {
      control.addEventListener('change', () => {
        this.renderFromInputs()
      })
    })
  }

  // ----------------------------------
  // Rendering
  // ----------------------------------

  private renderFromInputs(): void {
    this.container.innerHTML = ''
    const selectedFilters = this.buildSelectedFilters()
    if (!selectedFilters.length) {
      this.renderEmptyState()
      return
    }

    selectedFilters.forEach((filter) => {
      this.container.appendChild(this.createFilterElement(filter))
    })
  }

  private renderEmptyState(): void {
    const p = document.createElement('p')
    p.className = 'govuk-body-s govuk-!-margin-top-1 govuk-!-margin-bottom-0'
    p.textContent = 'No filters selected'
    this.container.appendChild(p)
  }

  // ----------------------------------
  // Build selected filters from inputs
  // ----------------------------------

  private buildSelectedFilters(): SelectedFilter[] {
    const grouped = this.groupControlsByField()

    return Object.values(grouped)
      .map((controls) => this.buildFilterFromControls(controls))
      .filter(Boolean) as SelectedFilter[]
  }

  private groupControlsByField(): Record<string, FilterControl[]> {
    return this.getAllFilterControls().reduce(
      (acc, control) => {
        const fieldKey = control.name.split('.').slice(0, 2).join('.')
        acc[fieldKey] ??= []
        acc[fieldKey].push(control)
        return acc
      },
      {} as Record<string, FilterControl[]>,
    )
  }

  // ----------------------------------
  // Orchestration
  // ----------------------------------

  private buildFilterFromControls(controls: FilterControl[]): SelectedFilter | null {
    const activeControls = this.getActiveControls(controls)
    if (!activeControls.length) return null

    const displayName = this.getDisplayName(controls)

    if (this.isGranularDateRange(controls)) {
      return this.buildGranularDateRangeFilter(displayName, controls)
    }

    if (this.isDateRange(controls)) {
      return this.buildDateRangeFilter(displayName, controls)
    }

    if (this.isMultiSelect(activeControls)) {
      return this.buildMultiSelectFilter(displayName, activeControls, controls)
    }

    return this.buildSingleValueFilter(displayName, activeControls[0], controls)
  }

  // ----------------------------------
  // Guards
  // ----------------------------------

  private getActiveControls(controls: FilterControl[]): FilterControl[] {
    return controls.filter((control) => {
      if (control instanceof HTMLSelectElement) {
        return Boolean(control.value)
      }

      if (control instanceof HTMLInputElement && (control.type === 'checkbox' || control.type === 'radio')) {
        return control.checked
      }

      return Boolean(control.value)
    })
  }

  private isGranularDateRange(controls: FilterControl[]): boolean {
    return controls.some((c) => c.name.includes('granularity'))
  }

  private isDateRange(controls: FilterControl[]): boolean {
    return controls.some((c) => c.name.endsWith('.start')) || controls.some((c) => c.name.endsWith('.end'))
  }

  private isMultiSelect(active: FilterControl[]): boolean {
    return active.length > 1
  }

  // ----------------------------------
  // Builders
  // ----------------------------------

  private buildDateRangeFilter(displayName: string, controls: FilterControl[]): SelectedFilter {
    const start = controls.find((c) => c.name.endsWith('.start')) as HTMLInputElement | undefined
    const end = controls.find((c) => c.name.endsWith('.end')) as HTMLInputElement | undefined
    const relativeDuration = controls.find((c) => {
      if (!c.name.endsWith('.relative-duration')) return false
      const input = c as HTMLInputElement
      return input.type === 'radio' && input.checked
    }) as HTMLInputElement | undefined

    const rangeDisplay = `${formatDateOrUnset(start?.value)} - ${formatDateOrUnset(end?.value)}`
    const displayValue =
      relativeDuration && relativeDuration.value !== 'none'
        ? `${rangeDisplay} / ${this.getDisplayValue(relativeDuration)}`
        : rangeDisplay

    return {
      displayName,
      displayValue,
      inputs: controls,
    }
  }

  private buildGranularDateRangeFilter(displayName: string, controls: FilterControl[]): SelectedFilter {
    const quick = controls.find((c) => c.name.includes('quick-filter') && (c as HTMLInputElement).value) as
      | HTMLInputElement
      | undefined

    const granularity = controls.find((c) => c.name.includes('granularity')) as HTMLInputElement | undefined

    const start = controls.find((c) => c.name.endsWith('.start') && (c as HTMLInputElement).value) as
      | HTMLInputElement
      | undefined

    const end = controls.find((c) => c.name.endsWith('.end') && (c as HTMLInputElement).value) as
      | HTMLInputElement
      | undefined

    let displayValue = ''

    if (quick && quick.value !== 'None') {
      displayValue = `${this.humanise(quick.value)} / ${granularity?.value ?? 'unset'}`
    } else {
      displayValue =
        `${formatDateOrUnset(start?.value)} - ${formatDateOrUnset(end?.value)}` + ` / ${granularity?.value ?? 'unset'}`
    }

    return {
      displayName,
      displayValue,
      inputs: controls,
    }
  }

  private buildMultiSelectFilter(
    displayName: string,
    active: FilterControl[],
    controls: FilterControl[],
  ): SelectedFilter {
    const values = active.map((c) => this.getDisplayValue(c))

    const displayValue =
      values.length > 3 ? `${values.slice(0, 3).join(', ')} + ${values.length - 3} more` : values.join(', ')

    return { displayName, displayValue, inputs: controls }
  }

  private buildSingleValueFilter(
    displayName: string,
    control: FilterControl,
    controls: FilterControl[],
  ): SelectedFilter {
    return {
      displayName,
      displayValue: this.getDisplayValue(control),
      inputs: controls,
    }
  }

  // ----------------------------------
  // Display helpers
  // ----------------------------------

  private getDisplayName(controls: FilterControl[]): string {
    const legend = controls[0]?.closest('fieldset')?.querySelector('legend')?.textContent

    if (legend) {
      return legend.trim()
    }

    const isDateRange = controls.some((c) => c.name.endsWith('.start')) && controls.some((c) => c.name.endsWith('.end'))

    if (isDateRange) {
      const explicit = controls.map((c) => c.getAttribute('display-name')).find(Boolean)
      if (explicit) {
        return explicit.replace(/\s+(start|end)$/i, '').trim()
      }
    }

    const explicit = controls.map((c) => c.getAttribute('display-name')).find(Boolean)

    if (explicit) {
      return explicit
    }

    const label = controls
      .map((c) => (c instanceof HTMLInputElement ? c.labels?.[0]?.innerText : undefined))
      .find(Boolean)

    if (label) {
      return label
    }

    return controls[0].name
  }

  private getDisplayValue(control: FilterControl): string {
    if (control instanceof HTMLSelectElement) {
      const option = control.options[control.selectedIndex]
      return option?.text ?? ''
    }

    // Autocomplete & text inputs should use their value
    if (control instanceof HTMLInputElement && (control.type === 'search' || control.type === 'text')) {
      return control.value
    }

    // Static option value for radios & checkboxes
    if (control.dataset['staticOptionNameValue']) {
      return control.dataset['staticOptionNameValue']
    }

    if (
      control instanceof HTMLInputElement &&
      (control.type === 'radio' || control.type === 'checkbox') &&
      control.labels?.[0]?.innerText
    ) {
      return control.labels[0].innerText
    }

    return control.value
  }

  // ----------------------------------
  // Chip removal
  // ----------------------------------

  private createFilterElement(filter: SelectedFilter): HTMLElement {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'dpr-clear-button-styles govuk-body dpr-selected-filter'

    const name = document.createElement('strong')
    name.className = 'dpr-selected-filter__name'
    name.textContent = filter.displayName

    const value = document.createTextNode(`: ${filter.displayValue}`)

    button.append(name, value)

    button.addEventListener('click', () => {
      const params = new URLSearchParams(window.location.search)

      // Remove ALL values for this filter from the query string
      filter.inputs.forEach((control) => {
        params.delete(control.name)

        if (control instanceof HTMLSelectElement) {
          control.selectedIndex = 0
        } else if (control instanceof HTMLInputElement) {
          if (control.type === 'checkbox' || control.type === 'radio') {
            control.checked = false
          } else {
            control.value = ''
          }
        }

        control.dispatchEvent(new Event('change', { bubbles: true }))
      })

      const query = params.toString()
      const url = query ? `?${query}` : window.location.pathname
      window.history.replaceState(null, '', url)
    })

    return button
  }

  // ----------------------------------
  // Utilities
  // ----------------------------------

  private getAllFilterControls(): FilterControl[] {
    return Array.from(document.querySelectorAll<FilterControl>('input[name^="filters."], select[name^="filters."]'))
  }

  private humanise(value: string): string {
    return value.replace(/-/g, ' ')
  }
}

export default DprSelectedAsyncFilters
