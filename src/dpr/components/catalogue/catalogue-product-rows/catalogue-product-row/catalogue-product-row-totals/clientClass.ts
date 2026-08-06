import { DprReportsCatalogueFiltersClass } from '../../../catalogue-filters/clientClass'

export class DprReportsCatalogueProductCounts extends DprReportsCatalogueFiltersClass {
  static override getModuleName() {
    return 'dpr-report-catalogue-product-counts'
  }

  override initialise() {
    this.updateCounts()

    document.addEventListener('dpr-report-catalogue-filter-changed', () => {
      this.updateCounts()
    })
  }

  private updateCounts(): void {
    this.getProducts().forEach(product => {
      const count = this.getVisibleVariantCount(product)

      const totalElement = product.querySelector<HTMLElement>('[data-product-variants-total]')

      if (totalElement) {
        totalElement.textContent = `(${this.getVariantLabel(count)})`
      }
    })
  }

  private getVariantLabel(count: number): string {
    return `${count} report${count === 1 ? '' : 's'}`
  }

  private getVisibleVariantCount(product: HTMLElement): number {
    if (!this.isVisibleProduct(product)) {
      return 0
    }

    return [...product.querySelectorAll<HTMLElement>('.dpr-report-catalogue__variant-row')].filter(row =>
      this.isVisibleVariant(row),
    ).length
  }
}
