import { Response } from 'express'
import ReportingService from '../services/reportingService'
import { components } from '../types/api'
import { Template } from '../types/Templates'
import logger from './logger'

const getFilter = (
  fields: components['schemas']['FieldDefinition'][],
  fieldId: string,
): components['schemas']['FilterDefinition'] | undefined => {
  return fields.find((f) => f.name === fieldId)?.filter
}

const getFiltersDefaultsValues = (fields: components['schemas']['FieldDefinition'][]) => {
  return fields
    .filter((field) => field.filter)
    .map((field) => {
      const { name, display } = field
      const { type, interactive, defaultValue, defaultGranularity, defaultQuickFilterValue } = field.filter

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

export default {
  getCurrentVariantDefinition: (
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
  },

  getFieldDisplayName: (fields: components['schemas']['FieldDefinition'][], fieldId: string) => {
    const ids = fieldId.split('.')
    const field = fields.find((f) => {
      return f.name === ids[0]
    })
    if (field) {
      return ids[1] ? `${field.display} ${ids[1]}` : field.display
    }
    return fieldId
  },

  getField: (fields: components['schemas']['FieldDefinition'][], fieldId: string) => {
    return fields.find((field) => {
      return field.name === fieldId
    })
  },

  getFields: (
    definition: components['schemas']['SingleVariantReportDefinition'],
  ): components['schemas']['FieldDefinition'][] => {
    return definition.variant.specification?.fields || []
  },

  getTemplate: (definition: components['schemas']['SingleVariantReportDefinition']): Template => {
    return definition.variant.specification?.template
  },

  getFilter,

  getFilters: (fields: components['schemas']['FieldDefinition'][]): components['schemas']['FilterDefinition'][] => {
    return fields.filter((field) => field.filter).map((field) => field.filter)
  },

  getFiltersDefaultsValues,

  getReportSummary: async (
    reportId: string,
    reportingService: ReportingService,
    token: string,
    definitionPath: string,
    res: Response,
  ) => {
    logger.info(
      `Started getting defs in getReportSummary for user: ${res.locals.dprUser && JSON.stringify(res.locals.dprUser)}`,
    )
    const definitions = await reportingService.getDefinitions(token, definitionPath)
    logger.info(
      `Finished getting defs in getReportSummary for user: ${res.locals.dprUser && JSON.stringify(res.locals.dprUser)}`,
    )
    return definitions.find((def) => def.id === reportId)
  },
}
