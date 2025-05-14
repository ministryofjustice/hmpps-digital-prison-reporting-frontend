import ReportingService from '../services/reportingService'
import { components } from '../types/api'
import logger from './logger'

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
      variantDef = (<components['schemas']['VariantDefinition'][]>reportDef.variants).find(
        (variant: components['schemas']['VariantDefinition']) => variantId === variant.id,
      )
    }

    return variantDef || undefined
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

  getReportSummary: async (
    reportId: string,
    reportingService: ReportingService,
    token: string,
    definitionPath: string,
  ) => {
    const definitions = await reportingService.getDefinitions(token, definitionPath)
    return definitions.find((def) => def.id === reportId)
  },
}
