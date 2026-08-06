import { DprClientClass } from '../../../DprClientClass'

export abstract class DprReportsCatalogueFiltersClass extends DprClientClass {
  private static products?: HTMLElement[]

  private static variants?: HTMLElement[]

  private static productVariants = new Map<HTMLElement, HTMLElement[]>()

  private static searchableText = new Map<HTMLElement, string>()

  protected getProducts(): HTMLElement[] {
    if (!DprReportsCatalogueFiltersClass.products) {
      DprReportsCatalogueFiltersClass.products = [
        ...document.querySelectorAll<HTMLElement>('.dpr-report-catalogue__product-row'),
      ]
    }

    return DprReportsCatalogueFiltersClass.products
  }

  protected getVariants(): HTMLElement[] {
    if (!DprReportsCatalogueFiltersClass.variants) {
      DprReportsCatalogueFiltersClass.variants = [
        ...document.querySelectorAll<HTMLElement>('.dpr-report-catalogue__variant-row'),
      ]
    }

    return DprReportsCatalogueFiltersClass.variants
  }

  protected isVisibleProduct(product: HTMLElement): boolean {
    return ![
      'dpr-reports-catalogue-search-hide',
      'dpr-reports-catalogue-type-hide',
      'dpr-reports-catalogue-unauthorised-hide',
      'dpr-reports-catalogue-product-hide',
    ].some(className => product.classList.contains(className))
  }

  protected isVisibleVariant(variant: HTMLElement): boolean {
    const product = variant.closest<HTMLElement>('.dpr-report-catalogue__product-row')

    return (
      !!product &&
      this.isVisibleProduct(product) &&
      ![
        'dpr-reports-catalogue-search-hide',
        'dpr-reports-catalogue-type-hide',
        'dpr-reports-catalogue-missing-hide',
        'dpr-reports-catalogue-live-hide',
      ].some(className => variant.classList.contains(className))
    )
  }

  protected getProductVariants(product: HTMLElement): HTMLElement[] {
    const existing = DprReportsCatalogueFiltersClass.productVariants.get(product)

    if (existing) {
      return existing
    }

    const variants = [...product.querySelectorAll<HTMLElement>('.dpr-report-catalogue__variant-row')]

    DprReportsCatalogueFiltersClass.productVariants.set(product, variants)

    return variants
  }

  protected getSearchText(element: HTMLElement): string {
    const existing = DprReportsCatalogueFiltersClass.searchableText.get(element)

    if (existing) {
      return existing
    }

    const text = element.textContent?.toLowerCase() ?? ''

    DprReportsCatalogueFiltersClass.searchableText.set(element, text)

    return text
  }
}
