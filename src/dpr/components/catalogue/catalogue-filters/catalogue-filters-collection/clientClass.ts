import { DprClientClass } from '../../../../DprClientClass'

export class DprReportsCatalogueCollections extends DprClientClass {
  static override getModuleName() {
    return 'dpr-reports-catalogue-collections'
  }

  override initialise() {
    this.initProductCollectionSelect()
  }

  initProductCollectionSelect() {
    const productCollections = this.getElement().querySelector('#productCollection')
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
