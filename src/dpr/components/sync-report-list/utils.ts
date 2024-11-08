import parseUrl from 'parseurl'
import { Request } from 'express'
import PaginationUtils from '../pagination/utils'
import TotalsUtils from '../report-totals/utils'
import { components } from '../../types/api'
import Dict = NodeJS.Dict
import DataTableBuilder from '../../utils/DataTableBuilder/DataTableBuilder'
import { DataTable } from '../../utils/DataTableBuilder/types'
import ColumnUtils from '../columns/utils'
import ReportQuery from '../../types/ReportQuery'
import { DateRange, FilterValue } from '../filters/types'
import { ListWithWarnings } from '../../data/types'
import { LoadType, ReportType } from '../../types/UserReports'
import { Columns } from '../columns/types'
import ReportActionsUtils from '../report-actions/utils'
import { SyncReportOptions } from '../../types/SyncReportUtils'
import { RenderFiltersReturnValue } from '../async-filters/types'
import AsyncFiltersUtils from '../async-filters/utils'
import { FilterType } from '../filter-input/enum'
import { DateFilterValue } from '../filter-input/types'

const setActions = (
  csrfToken: string,
  reportDefinition: components['schemas']['SingleVariantReportDefinition'],
  columns: Columns,
  url: string,
  options: SyncReportOptions = {},
) => {
  const { name: reportName, variant, id: reportId } = reportDefinition
  const { name, id, printable } = variant

  return ReportActionsUtils.getActions({
    ...(options.download && {
      download: {
        enabled: true,
        name,
        reportName,
        csrfToken,
        reportId,
        id,
        type: ReportType.REPORT,
        columns: columns.value,
        loadType: LoadType.SYNC,
      },
    }),
    print: {
      enabled: printable,
    },
    share: {
      reportName,
      name,
      url,
    },
    copy: {
      url,
    },
  })
}

const getSelectedFilters = (filters: FilterValue[], req: Request, prefix: string) => {
  return filters
    .filter((f) => f.value)
    .map((f) => {
      let value = []
      let key: string[] = []
      let displayValue = f.value
      if (f.type === 'daterange') {
        displayValue = `${(<DateRange>f.value).start} - ${(<DateRange>f.value).start}`
        value = [(<DateRange>f.value).start, (<DateRange>f.value).end]
      } else {
        key = [`${prefix}${f.name}`]
        value = [displayValue]
      }

      return {
        text: `${f.text}: ${displayValue}`,
        key: JSON.stringify(key),
        value: JSON.stringify(value),
        classes: 'govuk-button--inverse accordion-summary-remove-button govuk-!-margin-0',
        attributes: {
          'aria-label': `Selected Filter: ${f.text}: ${value}. Click to clear this filter`,
        },
      }
    })
}

const setFilterValuesFromRequest = (filters: FilterValue[], req: Request, prefix = 'filters.'): FilterValue[] => {
  const { preventDefault } = req.query

  return filters.map((filter) => {
    let requestfilterValue
    if (filter.type === FilterType.dateRange) {
      const start = <string>req.query[`${prefix}${filter.name}.start`]
      const end = <string>req.query[`${prefix}${filter.name}.end`]

      if (start || end)
        requestfilterValue = {
          start: start || (<DateRange>filter.value).start,
          end: end || (<DateRange>filter.value).end,
        } as DateRange
    } else {
      requestfilterValue = <string>req.query[`${prefix}${filter.name}`]
    }

    let value: string | DateRange
    if (requestfilterValue) {
      value = requestfilterValue
    } else if (preventDefault) {
      value = null
    } else {
      value = filter.value
    }

    return {
      ...filter,
      value,
    }
  })
}

export default {
  getRenderData: async ({
    req,
    reportDefinition,
    reportQuery,
    reportData,
    count,
    dynamicAutocompleteEndpoint,
    querySummary,
    csrfToken,
    options,
  }: {
    req: Request
    reportDefinition: components['schemas']['SingleVariantReportDefinition']
    reportQuery: ReportQuery
    reportData: ListWithWarnings
    csrfToken: string
    count: number
    dynamicAutocompleteEndpoint?: string
    querySummary?: Array<Dict<string>>
    options: SyncReportOptions
  }) => {
    const { name: reportName, description: reportDescription } = reportDefinition
    const { specification, name, description, classification, printable } = reportDefinition.variant
    const { data } = reportData

    const url = parseUrl(req)
    const pagination = PaginationUtils.getPaginationData(url, count)

    const dataTable: DataTable = new DataTableBuilder(specification.fields)
      .withHeaderSortOptions(reportQuery)
      .buildTable(data)

    const totals = TotalsUtils.getTotals(
      pagination.pageSize,
      pagination.currentPage,
      pagination.totalRows,
      dataTable.rowCount,
    )

    const { fields } = specification
    // Get filters data from definition
    const defaultFilterData = <RenderFiltersReturnValue>await AsyncFiltersUtils.renderFilters(fields)

    console.log(JSON.stringify(defaultFilterData, null, 2))
    const filtersWithRequestedValues = setFilterValuesFromRequest(defaultFilterData.filters, req)
    const selectedFilters = getSelectedFilters(filtersWithRequestedValues, req, 'filters.')

    const filters = {
      selectedFilters,
      filters: filtersWithRequestedValues,
    }

    const columns = ColumnUtils.getColumns(specification, reportQuery.columns)

    const actions = setActions(
      csrfToken,
      reportDefinition,
      columns,
      `${req.protocol}://${req.get('host')}${req.originalUrl}`,
      options,
    )

    return {
      reportName,
      name,
      description: description || reportDescription,
      ...dataTable,
      count,
      type: ReportType.REPORT,
      columns,
      filters,
      pagination,
      querySummary,
      totals,
      classification,
      printable,
      actions,
      warnings: reportData.warnings,
    }
  },
}
