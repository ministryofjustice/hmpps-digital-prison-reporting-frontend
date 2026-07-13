import { DprClientClass } from '../../../../DprClientClass'

/**
 * Client-side report type filter for the reports catalogue.
 *
 * Filters variant/dashboard rows by report type using the
 * `data-report-type` attribute and applies the `type-hide`
 * CSS class to rows that should not be visible.
 *
 * The selected filter is persisted in the URL query string
 * so that refreshes and shared links retain the current state.
 */
export class DprReportsCatalogueTypeFilter extends DprClientClass {
  private reportTypeRadios!: HTMLInputElement[]

  private showHideClassName: string = 'dpr-reports-catalogue-type-hide'

  static override getModuleName() {
    return 'dpr-report-catalogue-type-filter'
  }

  override initialise() {
    this.reportTypeRadios = [...this.getElement().querySelectorAll<HTMLInputElement>('input[type="radio"]')]

    if (this.reportTypeRadios.length === 0) {
      return
    }

    const selectedType = this.getReportTypeFromQueryString()

    const selectedRadio = this.reportTypeRadios.find(radio => radio.value === selectedType)

    if (selectedRadio) {
      selectedRadio.checked = true
    }

    this.applyFilter(selectedType)

    this.reportTypeRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        this.updateQueryString(radio.value)
        this.applyFilter(radio.value)
      })
    })
  }

  /**
   * Applies the selected report type filter to all products.
   */
  private applyFilter(reportType: string): void {
    this.getProducts().forEach(product => {
      this.filterProduct(product, reportType)
    })

    document.dispatchEvent(new CustomEvent('dpr-report-catalogue-filter-changed'))
  }

  /**
   * Filters all rows belonging to a product and determines
   * whether the product itself should remain visible.
   */
  private filterProduct(product: HTMLElement, reportType: string): void {
    const visibleRows = this.getVariantRows(product).filter(row => {
      const rowType = row.dataset['reportType']

      const showRow = reportType === '' || reportType === 'all' || rowType === reportType

      row.classList.toggle(this.showHideClassName, !showRow)

      return showRow
    })

    product.classList.toggle(this.showHideClassName, visibleRows.length === 0)
  }

  /**
   * Reads the selected report type from the URL query string.
   */
  private getReportTypeFromQueryString(): string {
    const params = new URLSearchParams(window.location.search)

    return params.get('report-type') ?? 'all'
  }

  /**
   * Updates the URL query string with the currently
   * selected report type.
   */
  private updateQueryString(reportType: string): void {
    const params = new URLSearchParams(window.location.search)

    if (reportType && reportType !== 'all') {
      params.set('report-type', reportType)
    } else {
      params.delete('report-type')
    }

    const queryString = params.toString()

    window.history.replaceState(
      {},
      '',
      queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname,
    )
  }

  /**
   * Returns all product rows in the catalogue.
   */
  private getProducts(): HTMLElement[] {
    return [...document.querySelectorAll<HTMLElement>('.dpr-report-catalogue__product-row')]
  }

  /**
   * Returns all variant and dashboard rows belonging to a product.
   */
  private getVariantRows(product: HTMLElement): HTMLElement[] {
    return [...product.querySelectorAll<HTMLElement>('.dpr-report-catalogue__variant-row')]
  }
}
