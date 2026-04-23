import { FilterType } from '../components/_filters/filter-input/enum'
import { appendDateRangeValue, resolveDateRangeDefaults } from '../components/_inputs/date-range/utils'
import {
  appendGranularDateRangeValue,
  resolveGranularDateRangeDefaults,
} from '../components/_inputs/granular-date-range/utils'
import { appendMultiSelectValues } from '../components/_inputs/multi-select/utils'
import {
  mandatoryColumns,
  visibleColumns,
} from '../components/_reports/report-heading/report-columns/report-columns-form/utils'
import ReportingService from '../services/reportingService'
import { components } from '../types/api'
import { Services } from '../types/Services'
import { Template } from '../types/Templates'
import { ReportType } from '../types/UserReports'
import logger from './logger'

/**
 * Gets the definition and fields by reportType
 *
 * @param {ReportType} reportType
 * @param {Services} services
 * @param {string} token
 * @param {string} reportId
 * @param {string} id
 * @param {string} [definitionsPath]
 */
export const getDefinitionByType = async (
  reportType: ReportType,
  services: Services,
  token: string,
  reportId: string,
  id: string,
  definitionsPath?: string,
): Promise<{
  definition: components['schemas']['SingleVariantReportDefinition'] | components['schemas']['DashboardDefinition']
  fields: components['schemas']['FieldDefinition'][]
}> => {
  let definition: components['schemas']['SingleVariantReportDefinition'] | components['schemas']['DashboardDefinition']
  let fields: components['schemas']['FieldDefinition'][]

  if (reportType === ReportType.REPORT) {
    definition = await services.reportingService.getDefinition(token, reportId, id, definitionsPath)
    fields = getFields(definition)
  } else {
    definition = await services.dashboardService.getDefinition(token, reportId, id, definitionsPath)
    fields = getDashboardFields(definition)
  }

  if (!definition) {
    throw Error(`Unable to retrieve definition for ${reportType} with id:${id} & reportId:${reportId}`)
  }

  return {
    definition,
    fields,
  }
}

/**
 * Given a field id, gets its filter object
 *
 * @param {components['schemas']['FieldDefinition'][]} fields
 * @param {string} fieldId
 * @return {*}  {(components['schemas']['FilterDefinition'] | undefined)}
 */
export const getFilter = (
  fields: components['schemas']['FieldDefinition'][],
  fieldId: string,
): components['schemas']['FilterDefinition'] | undefined => {
  return fields.find((f) => f.name === fieldId)?.filter
}

/**
 * Gets the current varaint definition
 *
 * @param {components['schemas']['ReportDefinitionSummary'][]} definitions
 * @param {string} reportId
 * @param {string} variantId
 * @return {*}  {(components['schemas']['VariantDefinition'] | undefined)}
 */
export const getCurrentVariantDefinition = (
  definitions: components['schemas']['ReportDefinitionSummary'][],
  reportId: string,
  variantId: string,
): components['schemas']['VariantDefinition'] | undefined => {
  if (!definitions) {
    logger.info('No definitions')
    return undefined
  }

  let variantDef: components['schemas']['VariantDefinition']
  const reportDef = definitions.find(
    (report: components['schemas']['ReportDefinitionSummary']) => report.id === reportId,
  )

  if (reportDef) {
    // TODO: this needs fixing, we should never be using `as unknown as`, but the types are very mixed up here
    variantDef = reportDef.variants.find(
      (variant) => variantId === variant.id,
    ) as unknown as components['schemas']['VariantDefinition']

    return variantDef
  }

  return undefined
}

/**
 * Gets the display name of a field
 *
 * @param {(components['schemas']['FieldDefinition'][] | components['schemas']['SummaryField'][])} fields
 * @param {string} fieldId
 * @return {*}
 */
export const getFieldDisplayName = (
  fields: components['schemas']['FieldDefinition'][] | components['schemas']['SummaryField'][],
  fieldId: string,
) => {
  const ids = fieldId.split('.')
  const field = fields.find((f) => {
    return f.name === ids[0]
  })
  if (field) {
    return ids[1] ? `${field.display} ${ids[1]}` : field.display
  }
  return fieldId
}

/**
 * Gets a single field by its id/name
 *
 * @param {components['schemas']['FieldDefinition'][]} fields
 * @param {string} fieldId
 * @return {*}
 */
export const getField = (fields: components['schemas']['FieldDefinition'][], fieldId: string) => {
  return fields.find((field) => {
    return field.name === fieldId
  })
}

/**
 * Get all fields from a definition
 *
 * @param {components['schemas']['SingleVariantReportDefinition']} definition
 * @return {*}  {components['schemas']['FieldDefinition'][]}
 */
export const getFields = (
  definition: components['schemas']['SingleVariantReportDefinition'],
): components['schemas']['FieldDefinition'][] => {
  return definition.variant.specification?.fields || []
}

/**
 * Get all fields from a definition
 *
 * @param {components['schemas']['SingleVariantReportDefinition']} definition
 * @return {*}  {components['schemas']['FieldDefinition'][]}
 */
export const getDashboardFields = (
  definition: components['schemas']['DashboardDefinition'],
): components['schemas']['FieldDefinition'][] => {
  return definition.filterFields || []
}

/**
 * Gets only the fields that have filters, from the definition
 *
 * @param {components['schemas']['SingleVariantReportDefinition']} definition
 * @return {*}  {components['schemas']['FieldDefinition'][]}
 */
export const getFieldsWithFiltersFromDefinition = (
  definition: components['schemas']['SingleVariantReportDefinition'],
): components['schemas']['FieldDefinition'][] => {
  const fields = getFields(definition)
  return fields.filter((f) => f.filter !== undefined)
}

type FieldWithFilter = Omit<components['schemas']['FieldDefinition'], 'filter'> & {
  filter: components['schemas']['FilterDefinition']
}

/**
 * Gets only the fields that have filters, from fields
 *
 * @param {components['schemas']['FieldDefinition'][]} fields
 * @return {*}  {FieldWithFilter[]}
 */
export const getFieldsWithFilters = (fields: components['schemas']['FieldDefinition'][]): FieldWithFilter[] => {
  return fields.filter((f): f is FieldWithFilter => f.filter !== undefined)
}

/**
 * Gets the template type
 *
 * @param {components['schemas']['SingleVariantReportDefinition']} definition
 * @return {*}  {Template}
 */
export const getTemplate = (definition: components['schemas']['SingleVariantReportDefinition']): Template => {
  return definition.variant.specification?.template || 'list'
}

/**
 * Gets the filters from a variant
 *
 * @param {components['schemas']['FieldDefinition'][]} fields
 * @return {*}  {components['schemas']['FilterDefinition'][]}
 */
export const getFilters = (
  fields: components['schemas']['FieldDefinition'][],
): components['schemas']['FilterDefinition'][] => {
  const filters: components['schemas']['FilterDefinition'][] = fields
    .filter((field: components['schemas']['FieldDefinition']) => field.filter)
    .map((field: components['schemas']['FieldDefinition']) => <components['schemas']['FilterDefinition']>field.filter)

  return filters.length ? filters : []
}

/**
 * Given an array of string names, will return the relative field types
 *
 * @param {string[]} names
 * @param {components['schemas']['FieldDefinition'][]} fields
 * @return {*}  {components['schemas']['FieldDefinition'][]}
 */
export const getFieldsByName = (
  names: string[],
  fields: components['schemas']['FieldDefinition'][],
): components['schemas']['FieldDefinition'][] => {
  return names.map((s) => fields.find((field) => field.name === s)).filter((field) => field !== undefined)
}

/**
 * Validates the definition
 *
 * @param {components['schemas']['SingleVariantReportDefinition']} definition
 * @return {*}
 */
export const validateDefinition = (definition: components['schemas']['SingleVariantReportDefinition']) => {
  const { variant } = definition
  return validateVariant(variant, definition.id)
}

/**
 * Validates that the variant has a `specification`
 *
 * @param {components['schemas']['VariantDefinition']} variant
 * @return {*}
 */
export const validateVariant = (variant: components['schemas']['VariantDefinition'], defId: string) => {
  const { specification } = variant

  if (!specification) {
    logger.error(`No specification found for definition ID: ${defId} variant ID: ${variant.id}`)
    throw new Error(`No specification found for definition ID: ${defId} variant ID: ${variant.id}`)
  }

  return { variant, specification }
}

/**
 * Determines whether there are any interactive filters
 * defined in the definition
 *
 * @param {components['schemas']['FieldDefinition'][]} fields
 * @return {*}
 */
export const hasInteractiveFilters = (fields: components['schemas']['FieldDefinition'][]) => {
  const filters = getFilters(fields)
  return filters.some((filter) => filter.interactive)
}

export const getReportSummary = (
  reportId: string,
  reportingService: ReportingService,
  token: string,
  definitionPath: string,
) => reportingService.getDefinitionSummary(token, reportId, definitionPath)

// --------------------------------------------------------
// DEFAULT FILTERS & COLUMNS
// --------------------------------------------------------

export type DefaultFilterQueryStrings = Readonly<{
  defaultFiltersSearch: string
  interactiveDefaultFiltersSearch: string
}>

/**
 * Creates a the default filters querystring
 *
 * @param {components['schemas']['FieldDefinition'][]} fields
 * @return {*}  {DefaultFilterQueryStrings}
 */
export const getDefaultFiltersQueryString = (
  fields: components['schemas']['FieldDefinition'][],
): DefaultFilterQueryStrings => {
  const defaultParams = new URLSearchParams()
  const interactiveParams = new URLSearchParams()

  const fieldsWithFilters = getFieldsWithFilters(fields)

  fieldsWithFilters.forEach((field) => {
    const { interactive = false } = field.filter

    appendFilterDefaults(interactive ? interactiveParams : defaultParams, field)
  })

  return {
    defaultFiltersSearch: buildQueryString(defaultParams),
    interactiveDefaultFiltersSearch: buildQueryString(interactiveParams),
  }
}

/**
 * Sets the default sort query string
 *
 * @param {components['schemas']['FieldDefinition'][]} fields
 * @return {*}
 */
export const getDefaultSortQueryString = (fields: components['schemas']['FieldDefinition'][]) => {
  const defaultSortField = fields.find((field) => field.defaultsort)
  if (!defaultSortField) {
    return ''
  }

  const defaultSortParams = new URLSearchParams()
  const isAsc = (defaultSortField.sortDirection ?? 'asc') === 'asc'

  defaultSortParams.set('sortColumn', defaultSortField.name)
  defaultSortParams.set('sortedAsc', String(isAsc))

  return buildQueryString(defaultSortParams)
}

/**
 * Builds the querystring
 *
 * @param {URLSearchParams} params
 * @return {*}  {string}
 */
const buildQueryString = (params: URLSearchParams): string => {
  const qs = params.toString()
  return qs || ''
}

/**
 * Appends the filter value to a query string
 *
 * @param {URLSearchParams} params
 * @param {FieldWithFilter} field
 */
const appendFilterDefaults = (params: URLSearchParams, field: FieldWithFilter) => {
  const { name, filter } = field
  const { type, defaultValue, defaultQuickFilterValue } = filter

  if (!defaultValue && !defaultQuickFilterValue) return

  switch (type.toLowerCase()) {
    case FilterType.radio.toLowerCase():
    case FilterType.select.toLowerCase():
    case FilterType.text.toLowerCase():
    case FilterType.date.toLowerCase():
    case FilterType.autocomplete.toLowerCase(): {
      if (!defaultValue) break
      params.append(`filters.${name}`, defaultValue)
      break
    }

    case FilterType.multiselect.toLowerCase(): {
      if (!defaultValue) break
      appendMultiSelectValues(params, name, defaultValue)
      break
    }

    case FilterType.dateRange.toLowerCase(): {
      const resolved = resolveDateRangeDefaults(filter)
      if (!resolved) break
      appendDateRangeValue(params, name, resolved)
      break
    }

    case FilterType.granularDateRange.toLowerCase(): {
      const resolved = resolveGranularDateRangeDefaults(filter)
      if (!resolved) break
      appendGranularDateRangeValue(params, name, resolved)
      break
    }

    default:
      break
  }
}

/**
 * Get the default columns from the DPD
 * and creates a querystring
 *
 * @param {components['schemas']['FieldDefinition'][]} fields
 * @return {*}
 */
export const getDefaultColumnsQueryString = (fields: components['schemas']['FieldDefinition'][]) => {
  const visibleCols = visibleColumns(fields)
  const mandatoryCols = mandatoryColumns(fields)
  const defaultColumns = Array.from(new Set([...mandatoryCols, ...visibleCols]))

  const params = new URLSearchParams()
  defaultColumns.forEach((column) => {
    params.append('columns', column)
  })

  return buildQueryString(params)
}

export default {
  getCurrentVariantDefinition,
  getFieldDisplayName,
  getField,
  getFields,
  getTemplate,
  getFilter,
  getFilters,
  getReportSummary,
  hasInteractiveFilters,
  getDefaultFiltersQueryString,
  getDefaultColumnsQueryString,
  getDefinitionByType,
}
