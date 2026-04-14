import { RequestHandler, Request } from 'express'
import { components } from '../types/api'
import { getFields, getDashboardFields, getFieldsWithFilters } from '../utils/definitionUtils'
import { buildFilterSchemaFromFields } from './buildFilterSchema'
import { extractFiltersFromBody } from '../utils/request/extractFiltersFromBody'
import { formBodyToQs, joinQueryStrings } from '../utils/urlHelper'
import { getActiveJourneyValue } from '../utils/sessionHelper'
import { LoadType } from '../types/UserReports'

/**
 * Type guard: determines whether a definition is a report definition
 *
 * Adjust the property check if your schema differs.
 */
const isReportDefinition = (
  definition: components['schemas']['SingleVariantReportDefinition'] | components['schemas']['DashboardDefinition'],
): definition is components['schemas']['SingleVariantReportDefinition'] => {
  return 'variant' in definition
}

/**
 * Middleware to validate a report or dashboard filter request
 *
 * - creates a schema dynamically from the filter definitions
 * - checks the form data against it
 * - sets errors in req.flash if there are errors
 * - and redirects back to current page
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
export const validateFilters =
  ({ interactive, loadType = LoadType.ASYNC }: { interactive: boolean; loadType?: LoadType }): RequestHandler =>
  (req, res, next) => {
    const definition = res.locals.definition as
      | components['schemas']['SingleVariantReportDefinition']
      | components['schemas']['DashboardDefinition']
      | undefined

    if (!definition) {
      next(new Error('Definition missing from res.locals'))
    } else {
      // Normalise the filters
      const rawBody = req.body
      const normalisedFilters =
        rawBody && typeof rawBody === 'object' ? extractFiltersFromBody(rawBody as Record<string, unknown>) : {}

      // Get the fields
      const fields = isReportDefinition(definition) ? getFields(definition) : getDashboardFields(definition)

      // Get only the relevant applicable fields for the form type
      const applicableFields = getFieldsWithFilters(fields).filter((field) => {
        const isInteractive = field.filter?.interactive === true
        return interactive ? isInteractive : !isInteractive
      })

      // Build the schema based on the fields filters and check it
      const schema = buildFilterSchemaFromFields(applicableFields)
      const result = schema.safeParse(normalisedFilters)

      if (result.success) {
        // All good - go to request the report middleware
        res.locals.validatedFilters = result.data
        next()
      } else {
        const errors = result.error.issues.map((issue) => ({
          href: `#filters.${issue.path.join('.')}`,
          text: issue.message,
        }))

        req.flash('DPR_ERRORS', JSON.stringify(errors))

        let redirect = req.originalUrl
        if (interactive) {
          const currentParams = buildRedirectParams(req, rawBody, loadType)
          redirect = `${req.baseUrl}?${currentParams}`
        }

        res.redirect(redirect)
      }
    }
  }

/**
 * Builds the redirect params from the form body
 * - used for interactive report filters
 *
 * @param {Request} req
 * @param {Record<string, unknown>} rawBody
 * @param {LoadType} loadType
 * @return {*}
 */
const buildRedirectParams = (req: Request, rawBody: Record<string, unknown>, loadType: LoadType) => {
  const { tableId, id, reportId } = <{ id: string; reportId: string; tableId: string }>req.params

  // Create the qs from the form body
  const filtersQs = formBodyToQs(rawBody)

  // Get the current query string params
  const sessionKey = loadType === LoadType.ASYNC ? { id, tableId, reportId } : { id, reportId }
  const currentColumnsSearch = getActiveJourneyValue(req, sessionKey, 'currentReportColumnsSearch')
  const currentSortSearch = getActiveJourneyValue(req, sessionKey, 'currentSortSearch')
  const currentPageSizeSearch = getActiveJourneyValue(req, sessionKey, 'currentPageSizeSearch')

  return joinQueryStrings(
    filtersQs,
    currentColumnsSearch,
    currentSortSearch,
    currentPageSizeSearch,
    'preventDefault=true',
  )
}
