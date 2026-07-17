import { DprClientClass } from '../../../DprClientClass'

/**
 * Updates catalogue totals whenever filters change.
 *
 * Counts only visible products and variants.
 */
export class DprReportsCatalogueTotals extends DprClientClass {
  private productsTotal!: HTMLElement | null

  private variantsTotal!: HTMLElement | null

  static override getModuleName() {
    return 'dpr-report-catalogue-totals'
  }

  override initialise() {
    this.productsTotal = this.getElement().querySelector('[data-products-total]')

    this.variantsTotal = this.getElement().querySelector('[data-products-variants]')

    this.updateTotals()

    document.addEventListener('dpr-report-catalogue-filter-changed', () => {
      this.updateTotals()
    })
  }

  /**
   * Updates visible product and variant counts.
   */
  private updateTotals(): void {
    if (!this.productsTotal || !this.variantsTotal) {
      return
    }

    const variantCount = this.getVisibleVariants().length
    this.variantsTotal.innerHTML = `<strong>${variantCount}</strong> ${this.pluralise(variantCount, 'report', 'reports')}`

    const productCount = this.getVisibleProducts().length
    this.productsTotal.innerHTML = `<strong>${productCount}</strong> ${this.pluralise(productCount, 'product', 'products')}`
  }

  /**
   * Returns all visible products.
   */
  private getVisibleProducts(): HTMLElement[] {
    return [...document.querySelectorAll<HTMLElement>('.dpr-report-catalogue__product-row')].filter(product =>
      this.isVisible(product),
    )
  }

  /**
   * Returns all visible variants.
   */
  private getVisibleVariants(): HTMLElement[] {
    return [...document.querySelectorAll<HTMLElement>('.dpr-report-catalogue__variant-row')].filter(variant =>
      this.isVisible(variant),
    )
  }

  /**
   * Determines whether an element is currently visible.
   */
  private isVisible(element: HTMLElement): boolean {
    return element.offsetParent !== null
  }

  private pluralise(count: number, singular: string, plural: string): string {
    return count === 1 ? singular : plural
  }
}
