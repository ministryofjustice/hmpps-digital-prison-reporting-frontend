import Dict = NodeJS.Dict
import { FilterType } from './enum'
import { DateFilterValue, FilterValue } from './types'
import ReportQuery from '../../types/ReportQuery'
import { components } from '../../types/api'
import { clearFilterValue } from '../../utils/urlHelper'

const LOCALE = 'en-GB'

const toLocaleDate = (isoDate?: string) => (isoDate ? new Date(isoDate).toLocaleDateString(LOCALE) : null)

const filterHasValue = (value: string) => {
  return value ? value !== clearFilterValue : false
}

const getFilterValue = (filterValues: Dict<string>, name: string) => {
  return filterHasValue(filterValues[name]) ? filterValues[name] : null
}

export default {
  getFilters: (
    variantDefinition: components['schemas']['VariantDefinition'],
    filterValues: Dict<string>,
    dynamicAutocompleteEndpoint: string = null,
  ) =>
    variantDefinition.specification.fields
      .filter((f) => f.filter)
      .map((f) => {
        let filter: FilterValue = {
          text: f.display,
          name: f.name,
          type: f.filter.type as FilterType,
          options: f.filter.staticOptions
            ? f.filter.staticOptions.map((o) => ({ value: o.name, text: o.display }))
            : null,
          value: getFilterValue(filterValues, f.name),
          minimumLength: f.filter.dynamicOptions ? f.filter.dynamicOptions.minimumLength : null,
          dynamicResourceEndpoint:
            (f.filter.dynamicOptions && f.filter.dynamicOptions.returnAsStaticOptions) || !dynamicAutocompleteEndpoint
              ? null
              : dynamicAutocompleteEndpoint.replace('{fieldName}', f.name),
        }

        if (f.filter.type === FilterType.dateRange.toLowerCase()) {
          filter = filter as unknown as DateFilterValue
          filter = {
            ...filter,
            value: {
              start: getFilterValue(filterValues, `${f.name}.start`),
              end: getFilterValue(filterValues, `${f.name}.end`),
            },
            min: f.filter.min,
            max: f.filter.max,
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
          ? filterHasValue(reportQuery.filters[`${f.name}.start`]) ||
            filterHasValue(reportQuery.filters[`${f.name}.end`])
          : filterHasValue(reportQuery.filters[f.name]),
      )
      .map((f) => {
        let filterValueText = getFilterValue(reportQuery.filters, f.name)
        if (f.filter.type === FilterType.dateRange.toLowerCase()) {
          const start = toLocaleDate(getFilterValue(reportQuery.filters, `${f.name}.start`))
          const end = toLocaleDate(getFilterValue(reportQuery.filters, `${f.name}.end`))

          if (start && end) {
            filterValueText = `${start} - ${end}`
          } else if (start) {
            filterValueText = `From ${start}`
          } else {
            filterValueText = `Until ${end}`
          }
        } else if (f.filter.staticOptions) {
          filterValueText = f.filter.staticOptions.find((o) => o.name === filterValueText).display
        }

        return {
          text: `${f.display}: ${filterValueText}`,
          href: createUrlForParameters(reportQuery.toRecordWithFilterPrefix(), {
            [`${reportQuery.filtersPrefix}${f.name}`]: '',
            selectedPage: '1',
          }),
          classes: 'govuk-button--inverse accordion-summary-remove-button govuk-!-margin-0',
        }
      }),
}
