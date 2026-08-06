import { DprReportsCatalogueFiltersClass } from '../../../catalogue-filters/clientClass'

/**
 * Updates product navigation links based on the
 * currently visible products in the catalogue.
 */
export class DprReportsCatalogueNavigation extends DprReportsCatalogueFiltersClass {
  static override getModuleName() {
    return 'dpr-report-catalogue-navigation'
  }

  override initialise(): void {
    this.updateNavigation()

    document.addEventListener('dpr-report-catalogue-filter-changed', () => {
      this.updateNavigation()
    })
  }

  /**
   * Updates previous and next links for all
   * currently visible products.
   */
  private updateNavigation(): void {
    const visibleProducts = this.getProducts().filter(product => this.isVisibleProduct(product))

    visibleProducts.forEach((product, index) => {
      this.updatePreviousLink(product, visibleProducts[index - 1])

      this.updateNextLink(product, visibleProducts[index + 1])
    })
  }

  /**
   * Updates the previous-product link.
   */
  private updatePreviousLink(product: HTMLElement, previous?: HTMLElement): void {
    const link = product.querySelector<HTMLAnchorElement>('[data-previous-product]')

    if (!link) {
      return
    }

    if (!previous) {
      link.hidden = true

      return
    }

    link.hidden = false
    link.href = `#${previous.id}`
  }

  /**
   * Updates the next-product link.
   */
  private updateNextLink(product: HTMLElement, next?: HTMLElement): void {
    const link = product.querySelector<HTMLAnchorElement>('[data-next-product]')

    if (!link) {
      return
    }

    if (!next) {
      link.hidden = true

      return
    }

    link.hidden = false
    link.href = `#${next.id}`
  }
}
