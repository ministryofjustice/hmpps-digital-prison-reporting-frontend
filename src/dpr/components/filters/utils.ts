import Dict = NodeJS.Dict
import { FilterType } from './enum'
import { FilterValue } from './types'
import { FieldDefinition } from '../../types'
import ReportQuery from '../../types/ReportQuery'

const LOCALE = 'en-GB'

const toLocaleDate = (isoDate?: string) => (isoDate ? new Date(isoDate).toLocaleDateString(LOCALE) : null)

export default {
  getFilters: (format: Array<FieldDefinition>, filterValues: Dict<string>) =>
    format
      .filter((f) => f.filter)
      .map((f) => {
        const filter: FilterValue = {
          text: f.displayName,
          name: f.name,
          type: f.filter.type,
          options: f.filter.staticOptions
            ? f.filter.staticOptions.map((o) => ({ value: o.name, text: o.displayName }))
            : null,
          value: filterValues[f.name],
        }

        if (f.filter.type === FilterType.dateRange) {
          filter.value = {
            start: filterValues[`${f.name}.start`],
            end: filterValues[`${f.name}.end`],
          }
        }

        return filter
      }),

  getSelectedFilters: (
    format: Array<FieldDefinition>,
    reportQuery: ReportQuery,
    createUrlForParameters: (currentQueryParams: Dict<string>, updateQueryParams: Dict<string>) => string,
  ) =>
    format
      .filter((f) => f.filter)
      .filter((f) =>
        f.filter.type === FilterType.dateRange
          ? reportQuery.filters[`${f.name}.start`] || reportQuery.filters[`${f.name}.end`]
          : reportQuery.filters[f.name],
      )
      .map((f) => {
        let filterValueText = reportQuery.filters[f.name]
        if (f.filter.type === FilterType.dateRange) {
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
          filterValueText = f.filter.staticOptions.find((o) => o.name === reportQuery.filters[f.name]).displayName
        }

        return {
          text: `${f.displayName}: ${filterValueText}`,
          href: createUrlForParameters(reportQuery.toRecordWithFilterPrefix(), {
            [`${reportQuery.filtersPrefix}${f.name}`]: '',
            selectedPage: '1',
          }),
          classes: 'filter-summary-remove-button govuk-button--secondary',
        }
      }),

  getTodayIsoDate: () => {
    const date = new Date()
    return date.toISOString().substring(0, 10)
  },
}
