import { appendDateRangeValue } from '../components/_inputs/date-range/utils'
import {
  appendGranularDateRangeValue,
  resolveGranularDateRangeDefaults,
} from '../components/_inputs/granular-date-range/utils'
import { appendMultiSelectValues } from '../components/_inputs/multi-select/utils'
import ReportingService from '../services/reportingService'
import { components } from '../types/api'
import { Template } from '../types/Templates'
import logger from './logger'

export const getFilter = (
  fields: components['schemas']['FieldDefinition'][],
  fieldId: string,
): components['schemas']['FilterDefinition'] | undefined => {
  return fields.find((f) => f.name === fieldId)?.filter
}

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

export const getField = (fields: components['schemas']['FieldDefinition'][], fieldId: string) => {
  return fields.find((field) => {
    return field.name === fieldId
  })
}

export const getFields = (
  definition: components['schemas']['SingleVariantReportDefinition'],
): components['schemas']['FieldDefinition'][] => {
  return definition.variant.specification?.fields || []
}

export const getFieldsWithFiltersFromDefinition = (
  definition: components['schemas']['SingleVariantReportDefinition'],
): components['schemas']['FieldDefinition'][] => {
  const fields = getFields(definition)
  return fields.filter((f) => f.filter !== undefined)
}

type FieldWithFilter = Omit<components['schemas']['FieldDefinition'], 'filter'> & {
  filter: components['schemas']['FilterDefinition']
}

export const getFieldsWithFilters = (fields: components['schemas']['FieldDefinition'][]): FieldWithFilter[] => {
  return fields.filter((f): f is FieldWithFilter => f.filter !== undefined)
}

export const getTemplate = (definition: components['schemas']['SingleVariantReportDefinition']): Template => {
  return definition.variant.specification?.template || 'list'
}

export const getFilters = (
  fields: components['schemas']['FieldDefinition'][],
): components['schemas']['FilterDefinition'][] => {
  const filters: components['schemas']['FilterDefinition'][] = fields
    .filter((field: components['schemas']['FieldDefinition']) => field.filter)
    .map((field: components['schemas']['FieldDefinition']) => <components['schemas']['FilterDefinition']>field.filter)

  return filters.length ? filters : []
}

export const getFieldsByName = (
  names: string[],
  fields: components['schemas']['FieldDefinition'][],
): components['schemas']['FieldDefinition'][] => {
  return names.map((s) => fields.find((field) => field.name === s)).filter((field) => field !== undefined)
}

export const validateDefinition = (definition: components['schemas']['SingleVariantReportDefinition']) => {
  const { variant } = definition
  return validateVariant(variant)
}

export const validateVariant = (variant: components['schemas']['VariantDefinition']) => {
  const { specification } = variant

  if (!specification) {
    throw new Error('No specification in definition')
  }

  return { variant, specification }
}

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

// ---------------------------------------------------------------------------------------------

export type DefaultFilterQueryStrings = Readonly<{
  defaultFiltersSearch: string
  interactiveDefaultFiltersSearch: string
}>

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

  const buildQueryString = (params: URLSearchParams): string => {
    const qs = params.toString()
    return qs || ''
  }

  return {
    defaultFiltersSearch: buildQueryString(defaultParams),
    interactiveDefaultFiltersSearch: buildQueryString(interactiveParams),
  }
}

const appendFilterDefaults = (params: URLSearchParams, field: FieldWithFilter) => {
  const { name, filter } = field
  const { type, defaultValue } = filter

  if (!defaultValue) return

  switch (type) {
    case 'Radio':
    case 'Select':
    case 'text':
    case 'date':
    case 'autocomplete': {
      params.append(`filters.${name}`, defaultValue)
      break
    }

    case 'multiselect': {
      appendMultiSelectValues(params, name, defaultValue)
      break
    }

    case 'daterange': {
      appendDateRangeValue(params, name, defaultValue)
      break
    }

    case 'granulardaterange': {
      const resolved = resolveGranularDateRangeDefaults(filter)
      if (!resolved) break
      appendGranularDateRangeValue(params, name, resolved)
      break
    }
  }
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
}
