import Dict = NodeJS.Dict
import { FilterType } from '../filter-input/enum'
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

const setMinMax = (filter: components['schemas']['FilterDefinition'], startValue: string, endValue: string) => {
  const { min, max } = filter
  let start
  if (min) {
    const minDate = new Date(min)
    const startDate = new Date(startValue)
    start = startDate < minDate ? min : startValue
  } else {
    start = startValue
  }

  let end
  if (max) {
    const maxDate = new Date(max)
    const endDate = new Date(endValue)
    end = endDate > maxDate ? max : endValue
  } else {
    end = endValue
  }

  return {
    start,
    end,
  }
}

const getSelectedFilters = (
  format: Array<components['schemas']['FieldDefinition']>,
  reportQuery: ReportQuery,
  createUrlForParameters: (currentQueryParams: Dict<string | Array<string>>, updateQueryParams: Dict<string>) => string,
) =>
  format
    .filter((f) => f.filter)
    .filter((f) =>
      f.filter.type === FilterType.dateRange.toLowerCase()
        ? filterHasValue(reportQuery.filters[`${f.name}.start`]) || filterHasValue(reportQuery.filters[`${f.name}.end`])
        : filterHasValue(reportQuery.filters[f.name]),
    )
    .map((f) => {
      let filterValueText = getFilterValue(reportQuery.filters, f.name)

      if (f.filter.type === FilterType.dateRange.toLowerCase()) {
        const startValue = getFilterValue(reportQuery.filters, `${f.name}.start`)
        const endValue = getFilterValue(reportQuery.filters, `${f.name}.end`)
        const { start, end } = setMinMax(f.filter, startValue, endValue)
        const localeStart = toLocaleDate(start)
        const localeEnd = toLocaleDate(end)

        if (localeStart && localeEnd) {
          filterValueText = `${localeStart} - ${localeEnd}`
        } else if (localeStart) {
          filterValueText = `From ${localeStart}`
        } else {
          filterValueText = `Until ${localeEnd}`
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
        attributes: {
          'aria-label': `Selected Filter: ${f.display}: ${filterValueText}. Click to clear this filter`,
        },
      }
    })

const getFilters = (
  variantDefinition: components['schemas']['VariantDefinition'],
  filterValues: Dict<string>,
  dynamicAutocompleteEndpoint: string = null,
) => {
  return variantDefinition.specification.fields
    .filter((field) => field.filter)
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
        pattern: f.filter.pattern,
        mandatory: f.filter.mandatory,
      }

      if (f.filter.type === FilterType.dateRange.toLowerCase()) {
        const startValue = getFilterValue(filterValues, `${f.name}.start`)
        const endValue = getFilterValue(filterValues, `${f.name}.end`)
        const { start, end } = setMinMax(f.filter, startValue, endValue)

        filter = filter as unknown as DateFilterValue
        filter = {
          ...filter,
          value: {
            start,
            end,
          },
          min: f.filter.min,
          max: f.filter.max,
        }
      }

      return filter
    })
}

export default {
  getFilters,
  getSelectedFilters,
  getFilterOptions: (
    variantDefinition: components['schemas']['VariantDefinition'],
    filterValues: NodeJS.Dict<string>,
    reportQuery: ReportQuery,
    createUrlForParameters: (
      currentQueryParams: NodeJS.Dict<string | Array<string>>,
      updateQueryParams: NodeJS.Dict<string>,
    ) => string,
    dynamicAutocompleteEndpoint: string = null,
  ) => ({
    filters: getFilters(variantDefinition, reportQuery.filters, dynamicAutocompleteEndpoint),
    selectedFilters: getSelectedFilters(variantDefinition.specification.fields, reportQuery, createUrlForParameters),
    urlWithNoFilters: createUrlForParameters(reportQuery.toRecordWithFilterPrefix(), null),
  }),
  setMinMax,
}
