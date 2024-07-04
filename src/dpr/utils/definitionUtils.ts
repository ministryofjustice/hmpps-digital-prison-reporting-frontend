import { components } from '../types/api'

export default {
  getCurrentVariantDefinition: (
    definitions: components['schemas']['ReportDefinitionSummary'][],
    reportId: string,
    variantId: string,
  ): components['schemas']['VariantDefinition'] | undefined => {
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
    return ids[1] ? `${field.display} ${ids[1]}` : field.display
  },

  getField: (fields: components['schemas']['FieldDefinition'][], fieldId: string) => {
    return fields.find((field) => {
      return field.name === fieldId
    })
  },
}
