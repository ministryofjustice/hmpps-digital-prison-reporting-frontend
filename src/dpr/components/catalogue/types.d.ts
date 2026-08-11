import { CatalogueProduct } from './catalogue-product-rows/types'

export type Catalogue = {
  headings: CatalogueHeading[]
  products: CatalogueProduct[]
  totals: CatalogueTotals
}

type CatalogueHeading = {
  name: string
  classes: string
}

type CatalogueTotals = {
  products: number
  variants: number
}

// TODO:
export type TempVariantDefinitionSummary = components['schemas']['VariantDefinitionSummary'] & { schedule: string }
