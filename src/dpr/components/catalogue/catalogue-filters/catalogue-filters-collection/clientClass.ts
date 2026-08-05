import { DprClientClass } from '../../../../DprClientClass'

export class DprReportsCatalogueCollections extends DprClientClass {
  static override getModuleName() {
    return 'dpr-reports-catalogue-collections'
  }

  override initialise() {
    this.initProductCollectionSelect()
  }

  initProductCollectionSelect() {
    const element = this.getElement()
    if (element) {
      const productCollections = element.querySelector('#productCollection')
      if (productCollections) {
        productCollections.addEventListener('change', e => {
          e.preventDefault()
          const form = productCollections.closest('form')

          if (!form) return

          form.submit()
        })
      }
    }
  }
}
