import { FiltersType } from '../components/_filters/filtersTypeEnum'
import ReportingService from '../services/reportingService'
import { components } from '../types/api'
import { Template } from '../types/Templates'
import { ReportType } from '../types/UserReports'
import logger from './logger'

export const getFilter = (
  fields: components['schemas']['FieldDefinition'][],
  fieldId: string,
): components['schemas']['FilterDefinition'] | undefined => {
  return fields.find((f) => f.name === fieldId)?.filter
}

export const getFiltersDefaultsValues = (fields: components['schemas']['FieldDefinition'][]) => {
  return fields
    .filter((field) => field.filter)
    .map((field) => {
      const { name, display } = field

      const defaultValue = field.filter?.defaultValue
      const defaultGranularity = field.filter?.defaultGranularity
      const defaultQuickFilterValue = field.filter?.defaultQuickFilterValue
      const type = field.filter?.type || ReportType.REPORT
      const interactive = field.filter?.interactive || FiltersType.REQUEST

      return {
        name,
        display,
        type,
        interactive,
        ...(defaultValue && { defaultValue }),
        ...(defaultGranularity && { defaultGranularity }),
        ...(defaultQuickFilterValue && { defaultQuickFilterValue }),
      }
    })
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

export const getFieldDisplayName = (fields: components['schemas']['FieldDefinition'][], fieldId: string) => {
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

export const getReportSummary = (
  reportId: string,
  reportingService: ReportingService,
  token: string,
  definitionPath: string,
) => reportingService.getDefinitionSummary(token, reportId, definitionPath)

export default {
  getCurrentVariantDefinition,
  getFieldDisplayName,
  getField,
  getFields,
  getTemplate,
  getFilter,
  getFilters,
  getFiltersDefaultsValues,
  getReportSummary,
}
