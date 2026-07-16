import { Response, Request } from 'express'
import { ReportType } from 'src/dpr/types/UserReports'
import { Services } from 'src/dpr/types/Services'
import LocalsHelper from '../../utils/localsHelper'
import { components } from '../../types/api'
import { CatalogueVariantRow } from './catalogue-product-rows/catalogue-product-row/catalogue-variant-rows/types'
import { Catalogue } from './types'
import { CatalogueProduct } from './catalogue-product-rows/types'
import { initialiseTruncation } from '../truncate/utils'
import { intitialiseCatalogueActions } from './catalogue-product-rows/catalogue-product-row/catalogue-variant-rows/catalogue-variant-row/catalogure-row-variant-actions/utils'
import { initCatalogueFilters } from './catalogue-filters/utilts'

const sortByName = (a: { name: string }, b: { name: string }): number => a.name.localeCompare(b.name)

/**
 * Initilialises the catalogue
 *
 * @param {Response} res
 * @return {*}
 */
export const initCatalogue = async (res: Response, req: Request, services: Services) => {
  const { definitions } = LocalsHelper.getValues(res)

  // sort
  const sortedDefinitions = sortDefinitionSummaries(definitions)

  // transform
  const catalogueConfig = await mapCatalogue(sortedDefinitions, res, req, services)

  // filters config
  const filtersConfig = await initCatalogueFilters(req, res, services)

  // return
  return {
    catalogueConfig,
    filtersConfig,
  }
}

/**
 * Sort definition summaries
 * - product sorted alphabetically
 * - then variants sorted alphabetically within the product
 * - the dashboards sorted alphabetically within the product
 *
 * @param {components['schemas']['ReportDefinitionSummary'][]} definitions
 * @return {*}  {components['schemas']['ReportDefinitionSummary'][]}
 */
const sortDefinitionSummaries = (
  definitions: components['schemas']['ReportDefinitionSummary'][],
): components['schemas']['ReportDefinitionSummary'][] => {
  return [...definitions].sort(sortByName).map(definition => ({
    ...definition,
    variants: [...definition.variants].sort(sortByName),
    dashboards: [...(definition.dashboards ?? [])].sort(sortByName),
  }))
}

/**
 * Tranforms the definition into catalogue row configuration
 *
 * @param {components['schemas']['ReportDefinitionSummary'][]} definitions
 * @return {*}  {Catalogue}
 */
const mapCatalogue = async (
  definitions: components['schemas']['ReportDefinitionSummary'][],
  res: Response,
  req: Request,
  services: Services,
): Promise<Catalogue> => {
  const products: CatalogueProduct[] = await Promise.all(
    definitions.map(async definition => {
      const { id, name, authorised } = definition

      const variants = await Promise.all(
        (definition.variants ?? []).map(variant => mapVariantRow(variant, definition, res, req, services, authorised)),
      )

      const dashboards = await Promise.all(
        (definition.dashboards ?? []).map(dashboard =>
          mapDashboardRow(dashboard, definition, res, req, services, authorised),
        ),
      )

      return {
        id,
        name,
        authorised,
        variants: [...variants, ...dashboards],
      }
    }),
  )

  return {
    headings: mapHeadings(),
    products,
    totals: mapTotals(products),
  }
}

/**
 * Map the variant to a row structure
 *
 * @param {components['schemas']['VariantDefinitionSummary']} variant
 * @return {*}  {CatalogueVariantRow}
 */
const mapVariantRow = async (
  variant: components['schemas']['VariantDefinitionSummary'],
  definition: components['schemas']['ReportDefinitionSummary'],
  res: Response,
  req: Request,
  services: Services,
  authorised: boolean,
): Promise<CatalogueVariantRow> => {
  const { id, name, description, isMissing } = variant
  const { id: productId, description: productDescription } = definition
  const desc = description || productDescription

  const trucatedDescription = initialiseTruncation({ stringValue: desc ?? '', classes: 'govuk-body-s' })

  let actions
  if (authorised) {
    actions = await intitialiseCatalogueActions(res, req, services, productId, variant, ReportType.REPORT, authorised)
  }

  return {
    id,
    heading: {
      name,
      type: ReportType.REPORT,
    },
    description: trucatedDescription,
    missing: Boolean(isMissing),
    actions,
  }
}

/**
 * Map the variant to a row structure
 *
 * @param {components['schemas']['DashboardDefinitionSummary']} dashboard
 * @return {*}  {CatalogueVariantRow}
 */
const mapDashboardRow = async (
  dashboard: components['schemas']['DashboardDefinitionSummary'],
  definition: components['schemas']['ReportDefinitionSummary'],
  res: Response,
  req: Request,
  services: Services,
  authorised: boolean,
): Promise<CatalogueVariantRow> => {
  const { id, name, description } = dashboard
  const { id: productId, description: productDescription } = definition

  const desc = description || productDescription
  const trucatedDescription = initialiseTruncation({ stringValue: desc ?? '', classes: 'govuk-body-s' })

  let actions
  if (authorised) {
    actions = await intitialiseCatalogueActions(
      res,
      req,
      services,
      productId,
      dashboard,
      ReportType.DASHBOARD,
      authorised,
    )
  }

  return {
    id,
    heading: {
      name,
      type: ReportType.DASHBOARD,
    },
    description: trucatedDescription,
    missing: false,
    actions,
  }
}

const mapHeadings = () => [
  {
    name: 'Name',
    classes: '',
  },
  {
    name: 'Description',
    classes: '',
  },
  {
    name: 'Actions',
    classes: '',
  },
]

/**
 * Map the totals
 *
 * @param {CatalogueProduct[]} products
 */
const mapTotals = (products: CatalogueProduct[]) => ({
  products: products.length,
  variants: products.reduce((total, product) => total + product.variants.length, 0),
})
