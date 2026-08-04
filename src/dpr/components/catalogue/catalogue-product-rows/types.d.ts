import { CatalogueVariantRow } from './catalogue-product-row/catalogue-variant-rows/types'

export type CatalogueProduct = {
  id: string
  name: string
  description: TruncationModel
  variants: CatalogueVariantRow[]
  authorised?: boolean | undefined
}
