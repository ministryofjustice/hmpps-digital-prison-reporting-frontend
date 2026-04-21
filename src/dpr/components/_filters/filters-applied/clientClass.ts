import { DprClientClass } from '../../../DprClientClass'

type AppliedFilterReset = {
  keys: string[]
}

export class DprAppliedFilters extends DprClientClass {
  static override getModuleName(): string {
    return 'dpr-applied-filters'
  }

  override initialise(): void {
    this.bindRemoveEvents()
  }

  // ----------------------------------
  // Event binding
  // ----------------------------------

  private bindRemoveEvents(): void {
    this.getFilterButtons().forEach((button) => {
      button.addEventListener('click', () => {
        const reset = this.getResetConfig(button)
        if (!reset) return

        this.removeQueryParams(reset)
      })
    })
  }

  // ----------------------------------
  // Query string manipulation
  // ----------------------------------

  private removeQueryParams(reset: AppliedFilterReset): void {
    const url = new URL(window.location.href)

    // Remove filter-related params
    reset.keys.forEach((key) => {
      url.searchParams.delete(key)
    })

    // If no filters remain, prevent default search
    if (!this.hasAnyFilterParams(url)) {
      url.searchParams.set('preventDefault', 'true')
    }

    window.location.assign(url.toString())
  }

  private hasAnyFilterParams(url: URL): boolean {
    return Array.from(url.searchParams.keys()).some((key) => key.startsWith('filters.'))
  }

  // ----------------------------------
  // DOM helpers
  // ----------------------------------

  private getFilterButtons(): HTMLButtonElement[] {
    return Array.from(this.element.querySelectorAll<HTMLButtonElement>('button[data-reset]'))
  }

  private getResetConfig(button: HTMLButtonElement): AppliedFilterReset | null {
    const raw = button.dataset['reset']
    if (!raw) return null

    try {
      return JSON.parse(raw) as AppliedFilterReset
    } catch {
      return null
    }
  }
}

export default DprAppliedFilters
