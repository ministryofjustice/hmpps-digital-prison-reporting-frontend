import { components } from '../../types/api'
import qs from 'querystringify'


const addAdditionalQueryParams = (path: string, additionalQueryParams?: NodeJS.Dict<string>) => {
  if (additionalQueryParams && Object.keys(additionalQueryParams).length > 0) {
    return `${path}${qs.stringify(additionalQueryParams, true)}`
  }

  return path
}

export default {
  reportDefinitionsToCards: (
    reportDefinitions: Array<components['schemas']['ReportDefinitionSummary']>,
    pathPrefix: string,
    additionalQueryParams?: NodeJS.Dict<string>,
  ) => {
    return reportDefinitions.map((d: components['schemas']['ReportDefinitionSummary']) => ({
      text: d.name,
      href: addAdditionalQueryParams(`${pathPrefix}/${d.id}`, additionalQueryParams),
      description: d.description,
    }))
  },

  variantDefinitionsToCards: (
    reportDefinition: components['schemas']['ReportDefinitionSummary'],
    pathPrefix: string,
    additionalQueryParams?: NodeJS.Dict<string>,
  ) => {
    return reportDefinition.variants.map((v: components['schemas']['VariantDefinitionSummary']) => ({
      text: v.name,
      href: addAdditionalQueryParams(`${pathPrefix}/${reportDefinition.id}/${v.id}`, additionalQueryParams),
      description: v.description,
    }))
  }
}
