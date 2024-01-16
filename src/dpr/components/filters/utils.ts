import Dict = NodeJS.Dict
import { FilterType } from './enum'
import { FilterValue } from './types'
import ReportQuery from '../../types/ReportQuery'
import { components } from '../../types/api'

const LOCALE = 'en-GB'

const toLocaleDate = (isoDate?: string) => (isoDate ? new Date(isoDate).toLocaleDateString(LOCALE) : null)

export default {
  getFilters: (variantDefinition: components['schemas']['VariantDefinition'], filterValues: Dict<string>) =>
    variantDefinition.specification.fields
      .filter((f) => f.filter)
      .map((f) => {
        const filter: FilterValue = {
          text: f.display,
          name: f.name,
          type: f.filter.type,
          options: f.filter.staticOptions
            ? f.filter.staticOptions.map((o) => ({ value: o.name, text: o.display }))
            : null,
          value: filterValues[f.name],
          dynamicOptions: f.filter.dynamicOptions
            ? {
                minimumLength: f.filter.dynamicOptions.minimumLength,
                resourceEndpoint: f.filter.dynamicOptions.returnAsStaticOptions ? null : `${variantDefinition.resourceName}/${f.name}?prefix=`
              }
            : null,
        }

        if (f.filter.type === FilterType.dateRange.toLowerCase()) {
          filter.value = {
            start: filterValues[`${f.name}.start`],
            end: filterValues[`${f.name}.end`],
          }
        }

        return filter
      }),

  getSelectedFilters: (
    format: Array<components['schemas']['FieldDefinition']>,
    reportQuery: ReportQuery,
    createUrlForParameters: (currentQueryParams: Dict<string>, updateQueryParams: Dict<string>) => string,
  ) =>
    format
      .filter((f) => f.filter)
      .filter((f) =>
        f.filter.type === FilterType.dateRange.toLowerCase()
          ? reportQuery.filters[`${f.name}.start`] || reportQuery.filters[`${f.name}.end`]
          : reportQuery.filters[f.name],
      )
      .map((f) => {
        let filterValueText = reportQuery.filters[f.name]
        if (f.filter.type === FilterType.dateRange.toLowerCase()) {
          const start = toLocaleDate(reportQuery.filters[`${f.name}.start`])
          const end = toLocaleDate(reportQuery.filters[`${f.name}.end`])

          if (start && end) {
            filterValueText = `${start} - ${end}`
          } else if (start) {
            filterValueText = `From ${start}`
          } else {
            filterValueText = `Until ${end}`
          }
        } else if (f.filter.staticOptions) {
          filterValueText = f.filter.staticOptions.find((o) => o.name === reportQuery.filters[f.name]).display
        }

        return {
          text: `${f.display}: ${filterValueText}`,
          href: createUrlForParameters(reportQuery.toRecordWithFilterPrefix(), {
            [`${reportQuery.filtersPrefix}${f.name}`]: '',
            selectedPage: '1',
          }),
          classes: 'filter-summary-remove-button govuk-button--secondary',
        }
      }),
}
