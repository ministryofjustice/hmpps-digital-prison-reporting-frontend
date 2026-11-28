import { NextFunction, Request, Response } from 'express'

// Utils
import { setupSubscriptionConfig } from '../../../../components/subscription/utils'
import { buildMasterSections } from '../../../../components/_dashboards/dashboard-section/utils'
import { getRequestFilters } from '../../../../components/_filters/utils'
import LocalsHelper from '../../../../utils/localsHelper'

// Types
import type { components } from '../../../../types/api'
import type { RequestDataResult, RequestReportData } from '../../../../types/AsyncReportUtils'

import type { Services } from '../../../../types/Services'
import { ReportType } from '../../../../types/UserReports'
import { getFields } from '../../../../utils/definitionUtils'
import { getActiveJourneyValue } from '../../../../utils/sessionHelper'
import { joinQueryStrings } from '../../../../utils/urlHelper'

// ----------------------------------------------------------------------
// ERROR
// ----------------------------------------------------------------------

export const getFiltersFromReqBody = (req: Request) => {
  return Object.keys(req.body)
    .filter(attr => attr.includes('filters.'))
    .filter(attr => !!req.body[attr])
    .map(attr => {
      return { name: attr, value: req.body[attr] }
    })
}

// ----------------------------------------------------------------------
// GET
// ----------------------------------------------------------------------

/**
 * Returns the data required for rendering the async filters component
 *
 * @param {AsyncReportUtilsParams} { req, res, dataSources }
 * @return {*}
 */
export const renderRequest = async ({
  req,
  res,
  services,
  next,
}: {
  req: Request
  res: Response
  next: NextFunction
  services: Services
}): Promise<RequestDataResult | boolean> => {
  try {
    const { reportId, type, id } = req.params as { reportId: string; type: ReportType; id: string }
    const { token, csrfToken, dprUser, saveDefaultsEnabled } = LocalsHelper.getValues(res)

    const definition = res.locals['definition'] as
      components['schemas']['SingleVariantReportDefinition'] | components['schemas']['DashboardDefinition']

    const summary = <components['schemas']['ReportDefinitionSummary']>res.locals['reportDefinitionSummary']

    let name: string = ''
    let reportName: string = ''
    let description: string = ''
    let fields: components['schemas']['FieldDefinition'][] = []
    let sections: components['schemas']['DashboardDefinition']['sections'] = []
    let subscriptionConfig
    let children: Array<string> = []

    if (type === ReportType.REPORT) {
      const reportData = await renderReportRequestData(
        definition as components['schemas']['SingleVariantReportDefinition'],
        summary,
      )

      name = reportData.name
      reportName = reportData.reportName
      description = reportData.description
      fields = reportData.fields

      subscriptionConfig = await setupSubscriptionConfig(req, res, reportId, id, reportData.schedule, services)
    }

    if (type === ReportType.DASHBOARD) {
      const dashboardData = await renderDashboardRequestData({
        req,
        token,
        reportId: reportId as string,
        services,
        definition: definition as components['schemas']['DashboardDefinition'],
      })

      name = dashboardData.name
      reportName = dashboardData.reportName
      description = dashboardData.description
      fields = dashboardData.fields
      sections = dashboardData.sections
      children = dashboardData.children
    }

    const filtersData = await getRequestFilters(req, res, fields)

    const hasDefaults = await services.defaultFilterValuesService.hasDefaults(dprUser.id, reportId, id)

    const reportData: RequestReportData = {
      reportName,
      name,
      description,
      reportId,
      id,
      csrfToken,
      sections,
      hasDefaults,
      type,
      saveDefaultsEnabled,
      children,
    }

    return {
      title: `Request ${type}`,
      filtersDescription: `Customise your ${type} using the filters below and submit your request.`,
      filtersData,
      reportData,
      subscriptionConfig,
    }
  } catch (error) {
    next(error)
    return false
  }
}

const renderDashboardRequestData = async ({
  req,
  token,
  reportId,
  services,
  definition,
}: {
  req: Request
  token: string
  reportId: string
  services: Services
  definition: components['schemas']['DashboardDefinition']
}) => {
  const productDefinitions = req.session['allDefinitions'] ?? (await services.reportingService.getDefinitions(token))

  const productDefinition = productDefinitions.find(
    (def: components['schemas']['ReportDefinitionSummary']) => def.id === reportId,
  )

  const { childVariants } = definition

  let children = <Array<string>>[]
  const masterDefinition = { ...definition }
  if (childVariants?.length) {
    masterDefinition.sections = buildMasterSections(definition)
    children = childVariants.map(child => child.name)
  }

  const { name, description, sections, filterFields: fields } = masterDefinition

  return {
    reportName: productDefinition?.name || '',
    name: name || '',
    description: description || productDefinition?.description || '',
    sections: sections || [],
    fields: fields || [],
    children,
  }
}

const renderReportRequestData = async (
  definition: components['schemas']['SingleVariantReportDefinition'],
  summary: components['schemas']['ReportDefinitionSummary'],
) => {
  const fields = getFields(definition)
  const { variant, description: productDescription } = definition
  const { name, specification, description } = variant
  const variantSummary = summary.variants.find(v => v.id === variant.id)
  const schedule = variantSummary?.schedule

  return {
    definition,
    reportName: definition.name,
    name,
    description: description || productDescription || '',
    template: specification?.template,
    fields,
    schedule,
  }
}

/**
 * Ensures that the request will always contain the correct qs on first render
 *
 * @param {Response} res
 * @param {Request} req
 * @return {*}
 */
export const redirectWithDefaults = (res: Response, req: Request) => {
  const effectiveQueryString = setDefaultQueryString(req)

  if (effectiveQueryString && Object.keys(req.query).length === 0) {
    const baseUrl = req.originalUrl.split('?')[0].replace(/\/$/, '')
    res.redirect(`${baseUrl}?${effectiveQueryString}`)
    return true
  }
  return false
}

/**
 * Sets the defaults query string for pre-filters
 *
 * @param {Request} req
 * @return {*}
 */
export const setDefaultQueryString = (req: Request) => {
  const { id, reportId } = req.params as {
    id: string
    reportId: string
  }
  const sessionKey = { id, reportId }
  const defaultFiltersSearch = getActiveJourneyValue(req, sessionKey, 'defaultFiltersSearch')
  const savedRequestDefaultsSearch = getActiveJourneyValue(req, sessionKey, 'savedRequestDefaultsSearch')
  const defaultSortQueryString = getActiveJourneyValue(req, sessionKey, 'defaultSortQueryString')

  // If DPD defaults, use those unless there are saved defaults
  const effectiveQueryString =
    savedRequestDefaultsSearch && savedRequestDefaultsSearch.length > 0
      ? savedRequestDefaultsSearch
      : defaultFiltersSearch

  if (defaultSortQueryString && defaultSortQueryString.length > 0) {
    return joinQueryStrings(effectiveQueryString, defaultSortQueryString)
  }

  return effectiveQueryString
}

export default {
  renderRequest,
  getFiltersFromReqBody,
}
