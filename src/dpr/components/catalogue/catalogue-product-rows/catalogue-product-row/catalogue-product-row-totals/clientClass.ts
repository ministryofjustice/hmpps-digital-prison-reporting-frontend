import { DprClientClass } from '../../../../../DprClientClass'

export class DprReportsCatalogueProductCounts extends DprClientClass {
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
    return `${count} variant${count === 1 ? '' : 's'}`
  }

  private getVisibleVariantCount(product: HTMLElement): number {
    return [...product.querySelectorAll<HTMLElement>('.dpr-report-catalogue__variant-row')].filter(
      row => row.offsetParent !== null,
    ).length
  }

  private getProducts(): HTMLElement[] {
    return [...document.querySelectorAll<HTMLElement>('.dpr-report-catalogue__product-row')]
  }
}
