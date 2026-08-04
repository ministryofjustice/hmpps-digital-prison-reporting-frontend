import { DprClientClass } from '../../../../DprClientClass'

/**
 * Controls catalogue visibility filters.
 *
 * Supported filters:
 * - Show unauthorised products
 * - Show missing variants
 * - Hide live variants
 */
export class DprReportsCatalogueShowHide extends DprClientClass {
  private showHideCheckboxes!: NodeListOf<HTMLInputElement>

  private showHideClassPrefix = 'dpr-reports-catalogue-'

  static override getModuleName() {
    return 'dpr-report-catalogue-show-hide'
  }

  override initialise() {
    this.showHideCheckboxes = this.getElement().querySelectorAll<HTMLInputElement>('input[type="checkbox"]')

    if (this.showHideCheckboxes.length === 0) {
      return
    }

    this.initialiseFromQueryString()

    this.applyFilters()

    this.showHideCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updateQueryString()
        this.applyFilters()
      })
    })
  }

  /**
   * Applies all visibility filters.
   */
  private applyFilters(): void {
    this.applyUnauthorisedFilter()
    this.applyHideMissingFilter()
    this.applyHideLiveFilter()

    this.updateProductVisibility()

    document.dispatchEvent(new CustomEvent('dpr-report-catalogue-filter-changed'))
  }

  /**
   * Hides unauthorised products unless explicitly enabled.
   */
  private applyUnauthorisedFilter(): void {
    const showUnauthorised = this.isFilterEnabled('unauthorised')

    this.getProducts().forEach(product => {
      const authorised = product.dataset['authorised'] === 'true'

      product.classList.toggle(this.showHideClassPrefix + 'unauthorised-hide', !showUnauthorised && !authorised)
    })
  }

  /**
   * Hides missing variants when enabled.
   *
   * A missing variant is represented by data-live="false".
   */
  private applyHideMissingFilter(): void {
    const hideMissing = this.isFilterEnabled('missing')

    this.getVariantRows().forEach(row => {
      const isLive = row.dataset['live'] === 'true'

      row.classList.toggle(this.showHideClassPrefix + 'missing-hide', hideMissing && !isLive)
    })
  }

  /**
   * Hides live variants when enabled.
   */
  private applyHideLiveFilter(): void {
    const hideLive = this.isFilterEnabled('live')

    this.getVariantRows().forEach(row => {
      const isLive = row.dataset['live'] === 'true'

      row.classList.toggle(this.showHideClassPrefix + 'live-hide', hideLive && isLive)
    })
  }

  /**
   * Returns true when a filter checkbox is checked.
   */
  private isFilterEnabled(filterName: string): boolean {
    return [...this.showHideCheckboxes]
      .filter(checkbox => checkbox.dataset['filter'] === filterName)
      .some(checkbox => checkbox.checked)
  }

  /**
   * Restores filter state from the query string.
   */
  private initialiseFromQueryString(): void {
    const params = new URLSearchParams(window.location.search)

    this.showHideCheckboxes.forEach(checkbox => {
      const filterName = checkbox.dataset['filter']

      checkbox.checked = params.get(filterName ?? '') === 'true'
    })
  }

  /**
   * Updates the query string with the current filter state.
   */
  private updateQueryString(): void {
    const params = new URLSearchParams(window.location.search)

    this.showHideCheckboxes.forEach(checkbox => {
      const filterName = checkbox.dataset['filter']

      if (!filterName) {
        return
      }

      if (checkbox.checked) {
        params.set(filterName, 'true')
      } else {
        params.delete(filterName)
      }
    })

    const queryString = params.toString()

    window.history.replaceState(
      {},
      '',
      queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname,
    )
  }

  private updateProductVisibility(): void {
    this.getProducts().forEach(product => {
      const visibleVariants = [...product.querySelectorAll<HTMLElement>('.dpr-report-catalogue__variant-row')].filter(
        variant => {
          return ![
            this.showHideClassPrefix + 'search-hide',
            this.showHideClassPrefix + 'type-hide',
            this.showHideClassPrefix + 'missing-hide',
            this.showHideClassPrefix + 'live-hide',
          ].some(className => variant.classList.contains(className))
        },
      )

      product.classList.toggle(this.showHideClassPrefix + 'product-hide', visibleVariants.length === 0)
    })
  }

  private getProducts(): HTMLElement[] {
    return [...document.querySelectorAll<HTMLElement>('.dpr-report-catalogue__product-row')]
  }

  private getVariantRows(): HTMLElement[] {
    return [...document.querySelectorAll<HTMLElement>('.dpr-report-catalogue__variant-row')]
  }
}
