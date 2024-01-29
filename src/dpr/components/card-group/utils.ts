import { components } from '../../types/api'

export default {
  reportDefinitionsToCards: (
    reportDefinitions: Array<components['schemas']['ReportDefinitionSummary']>,
    pathPrefix: string,
  ) => {
    return reportDefinitions.map((d: components['schemas']['ReportDefinitionSummary']) => ({
      text: d.name,
      href: `${pathPrefix}/${d.id}`,
      description: d.description,
    }))
  },

  variantDefinitionsToCards: (reportDefinition: components['schemas']['ReportDefinitionSummary'], pathPrefix: string) => {
    return reportDefinition.variants.map((v: components['schemas']['VariantDefinitionSummary']) => ({
      text: v.name,
      href: `${pathPrefix}/${reportDefinition.id}/${v.id}`,
      description: v.description,
    }))
  },
}
