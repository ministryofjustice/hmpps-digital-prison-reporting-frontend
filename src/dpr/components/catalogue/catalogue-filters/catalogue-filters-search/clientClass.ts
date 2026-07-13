import { DprClientClass } from '../../../../DprClientClass'

/**
 * Client-side search for the reports catalogue.
 *
 * Searches product names, variant names and dashboard names using the
 * rendered text content in the catalogue. Filtering is performed entirely
 * in the browser by applying and removing the `search-hide` CSS class.
 *
 * Search state is persisted in the URL query string so that refreshes and
 * shared links retain the current search term.
 */
export class DprReportsCatalogueSearch extends DprClientClass {
  private searchInput!: HTMLInputElement | null

  private showHideClassName: string = 'dpr-reports-catalogue-search-hide'

  static override getModuleName() {
    return 'dpr-report-catalogue-search'
  }

  override initialise() {
    this.searchInput = this.getElement().querySelector('input[type="text"]')

    if (!this.searchInput) {
      return
    }

    const initialSearch = this.getSearchFromQueryString()

    if (initialSearch) {
      this.searchInput.value = initialSearch
      this.applySearch(initialSearch)
    }

    this.searchInput.addEventListener('input', () => {
      const search = this.searchInput?.value ?? ''

      this.applySearch(search)
      this.updateQueryString(search)
    })
  }

  /**
   * Applies the current search term to all catalogue products.
   *
   * Searching only becomes active once at least three characters have
   * been entered. Shorter values are treated as an empty search.
   */
  private applySearch(search: string): void {
    const searchTerm = this.normaliseSearch(search)

    this.getProducts().forEach(product => {
      this.filterProduct(product, searchTerm)
    })

    document.dispatchEvent(new CustomEvent('dpr-report-catalogue-filter-changed'))
  }

  /**
   * Determines whether a product should be visible.
   *
   * A product remains visible when:
   * - the product itself matches the search term
   * - one or more child variants/dashboards match the search term
   * - the search term is empty
   */
  private filterProduct(product: HTMLElement, searchTerm: string): void {
    const productMatches = this.productMatches(product, searchTerm)

    const matchingVariantCount = this.filterVariants(product, searchTerm, productMatches)

    const showProduct = searchTerm === '' || productMatches || matchingVariantCount > 0

    product.classList.toggle(this.showHideClassName, !showProduct)
  }

  /**
   * Filters all variants and dashboards belonging to a product.
   *
   * If the product name itself matches the search term, all child rows
   * remain visible.
   *
   * Returns the number of matching child rows.
   */
  private filterVariants(product: HTMLElement, searchTerm: string, productMatches: boolean): number {
    return this.getVariants(product).filter(variant => {
      const variantMatches = this.matchesSearch(variant.textContent, searchTerm)

      const showVariant = productMatches || variantMatches

      variant.classList.toggle(this.showHideClassName, !showVariant)

      return variantMatches
    }).length
  }

  /**
   * Determines whether a product heading matches the search term.
   */
  private productMatches(product: HTMLElement, searchTerm: string): boolean {
    const heading = product.querySelector('.dpr-report-catalogue__product-row__name')

    return this.matchesSearch(heading?.textContent, searchTerm)
  }

  /**
   * Performs a case-insensitive text match.
   */
  private matchesSearch(value: string | null | undefined, searchTerm: string): boolean {
    if (searchTerm === '') {
      return true
    }

    return (value ?? '').toLowerCase().includes(searchTerm)
  }

  /**
   * Normalises a search term for matching.
   *
   * Searches with fewer than three characters are treated as empty.
   */
  private normaliseSearch(search: string): string {
    const value = search.trim().toLowerCase()

    return value.length >= 3 ? value : ''
  }

  /**
   * Reads the current search term from the URL query string.
   */
  private getSearchFromQueryString(): string {
    const params = new URLSearchParams(window.location.search)

    return params.get('search') ?? ''
  }

  /**
   * Updates the URL query string with the current search value.
   *
   * The parameter is removed when the search is cleared or contains
   * fewer than three characters.
   */
  private updateQueryString(search: string): void {
    const params = new URLSearchParams(window.location.search)

    const value = search.trim()

    if (value.length >= 3) {
      params.set('search', value)
    } else {
      params.delete('search')
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
  private getVariants(product: HTMLElement): HTMLElement[] {
    return [...product.querySelectorAll<HTMLElement>('.dpr-report-catalogue__variant-row')]
  }
}
