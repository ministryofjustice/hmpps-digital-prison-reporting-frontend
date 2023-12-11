import querystring from 'querystring'
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
    filterPrefix: string,
  ) => {
    return reportDefinition.variants.map((v: components['schemas']['VariantDefinition']) => {
      const defaultFilters: Record<string, string> = {}

      v.specification.fields
        .filter((f) => f.filter && f.filter.defaultValue)
        .forEach((f) => {
          if (f.filter.type === 'daterange') {
            const dates = f.filter.defaultValue.split(' - ')

            if (dates.length >= 1) {
              // eslint-disable-next-line prefer-destructuring
              defaultFilters[`${filterPrefix}${f.name}.start`] = dates[0]

              if (dates.length >= 2) {
                // eslint-disable-next-line prefer-destructuring
                defaultFilters[`${filterPrefix}${f.name}.end`] = dates[1]
              }
            }
          } else {
            defaultFilters[`${filterPrefix}${f.name}`] = f.filter.defaultValue
          }
        })

      const path = `${pathPrefix}/${reportDefinition.id}/${v.id}`
      const query = querystring.stringify(defaultFilters)

      return {
        text: v.name,
        href: query.length === 0 ? path : `${path}?${query}`,
        description: v.description,
      }
    })
  },
}
