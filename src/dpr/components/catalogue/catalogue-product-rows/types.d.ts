import { CatalogueVariantRow } from './catalogue-product-row/catalogue-variant-rows/types'

export type CatalogueProduct = {
  id: string
  name: string
  variants: CatalogueVariantRow[]
  authorised?: boolean | undefined
}
