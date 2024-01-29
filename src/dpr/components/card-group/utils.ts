import { components } from '../../types/api'

export default {
  reportDefinitionsToCards: (
    reportDefinitions: Array<components['schemas']['ReportDefinition']>,
    pathPrefix: string,
  ) => {
    return reportDefinitions.map((d: components['schemas']['ReportDefinition']) => ({
      text: d.name,
      href: `${pathPrefix}/${d.id}`,
      description: d.description,
    }))
  },

  variantDefinitionsToCards: (
    reportDefinition: components['schemas']['ReportDefinition'],
    pathPrefix: string,
  ) => {
    return reportDefinition.variants.map((v: components['schemas']['VariantDefinition']) => ({
        text: v.name,
        href: `${pathPrefix}/${reportDefinition.id}/${v.id}`,
        description: v.description,
      }))
  },
}
