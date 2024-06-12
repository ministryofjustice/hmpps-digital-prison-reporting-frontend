import { components } from '../../types/api'
import { createQuerystringFromObject } from '../../utils/urlHelper'

const addAdditionalQueryParams = (path: string, additionalQueryParams?: NodeJS.Dict<string>) => {
  if (additionalQueryParams && Object.keys(additionalQueryParams).length > 0) {
    return `${path}${createQuerystringFromObject(additionalQueryParams)}`
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
    let suffix = ''
    if (pathPrefix === '/async-reports') suffix = '/request'

    return reportDefinition.variants.map((v: components['schemas']['VariantDefinitionSummary']) => ({
      text: v.name,
      href: addAdditionalQueryParams(`${pathPrefix}/${reportDefinition.id}/${v.id}${suffix}`, additionalQueryParams),
      description: v.description,
    }))
  },
}
