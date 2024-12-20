import { NextFunction, Request, RequestHandler, Response } from 'express'
import parseUrl from 'parseurl'
import ReportQuery, { DEFAULT_FILTERS_PREFIX } from '../../types/ReportQuery'
import createUrlForParameters from '../../utils/urlHelper'
import { DataTableOptions } from '../_reports/report-data-table/types'

import TotalsUtils from '../_reports/report-totals/utils'
import FilterUtils from '../filters/utils'
import ColumnUtils from '../_reports/report-columns-form/utils'
import { ListDataSources, RenderListWithDataInput } from './types'
import ReportingClient from '../../data/reportingClient'
import { ListWithWarnings, Warnings } from '../../data/types'
import { components } from '../../types/api'
import Dict = NodeJS.Dict
import RenderListWithDefinitionInput from './RenderListWithDefinitionInput'
import CreateRequestHandlerInput from './CreateRequestHandlerInput'
import ReportActionsUtils from '../_reports/report-actions/utils'
import DataTableBuilder from '../../utils/DataTableBuilder/DataTableBuilder'
import { DataTable } from '../../utils/DataTableBuilder/types'
import PaginationUtils from '../_reports/report-pagination/utils'
import { FilterOptions } from '../_filters/types'
import { Template } from '../../types/Templates'

function isListWithWarnings(data: Dict<string>[] | ListWithWarnings): data is ListWithWarnings {
  return (data as ListWithWarnings).data !== undefined
}

function redirectWithDefaultFilters(
  reportQuery: ReportQuery,
  variantDefinition: {
    id: string
    name: string
    resourceName: string
    description?: string
    specification?: components['schemas']['Specification']
  },
  response: Response,
  request: Request,
) {
  const defaultFilters: Record<string, string> = {}

  if (Object.keys(reportQuery.filters).length === 0) {
    variantDefinition.specification.fields
      .filter((f) => f.filter && f.filter.defaultValue)
      .forEach((f) => {
        if (f.filter.type === 'daterange') {
          const dates = f.filter.defaultValue.split(' - ')

          if (dates.length >= 1) {
            // eslint-disable-next-line prefer-destructuring
            defaultFilters[`${DEFAULT_FILTERS_PREFIX}${f.name}.start`] = dates[0]

            if (dates.length >= 2) {
              // eslint-disable-next-line prefer-destructuring
              defaultFilters[`${DEFAULT_FILTERS_PREFIX}${f.name}.end`] = dates[1]
            }
          }
        } else {
          defaultFilters[`${DEFAULT_FILTERS_PREFIX}${f.name}`] = f.filter.defaultValue
        }
      })
  }

  if (Object.keys(defaultFilters).length > 0) {
    const querystring = createUrlForParameters(reportQuery.toRecordWithFilterPrefix(), defaultFilters)
    response.redirect(`${request.baseUrl}${request.path}${querystring}`)
    return true
  }

  return false
}

function renderList(
  listData: ListDataSources,
  variantDefinition: components['schemas']['VariantDefinition'],
  reportQuery: ReportQuery,
  request: Request,
  response: Response,
  next: NextFunction,
  title: string,
  layoutTemplate: string,
  dynamicAutocompleteEndpoint?: string,
  otherOptions?: NodeJS.Dict<object>,
  reportName?: string,
) {
  if (!redirectWithDefaultFilters(reportQuery, variantDefinition, response, request)) {
    Promise.all([listData.data, listData.count])
      .then((resolvedData) => {
        let data
        let warnings: Warnings = {}
        const { specification, classification, printable } = variantDefinition
        const { template } = specification
        const url = parseUrl(request)
        const count = resolvedData[1]

        if (isListWithWarnings(resolvedData[0])) {
          // eslint-disable-next-line prefer-destructuring
          data = resolvedData[0].data
          warnings = resolvedData[0].warnings
        } else {
          // eslint-disable-next-line prefer-destructuring
          data = resolvedData[0]
        }

        const dataTable: DataTable = new DataTableBuilder(specification.fields)
          .withHeaderSortOptions(reportQuery)
          .buildTable(data)

        const pagination = PaginationUtils.getPaginationData(url, count)
        const dataTableOptions: DataTableOptions = {
          dataTable,
          classification,
          printable,
          pagination,
          totals: TotalsUtils.getTotals(
            pagination.pageSize,
            pagination.currentPage,
            pagination.totalRows,
            dataTable.rowCount,
          ),
        }

        const filterOptions: FilterOptions = FilterUtils.getFilterOptions(
          variantDefinition,
          reportQuery,
          createUrlForParameters,
          dynamicAutocompleteEndpoint,
        )

        const reportUrl = `${request.protocol}://${request.get('host')}${request.originalUrl}`
        const actions = ReportActionsUtils.getActions({
          print: {
            enabled: variantDefinition.printable,
          },
          share: {
            reportName,
            name: variantDefinition.name,
            url: reportUrl,
          },
          copy: {
            url: reportUrl,
          },
        })

        response.render(`dpr/components/report-list/list`, {
          title,
          reportName,
          dataTableOptions,
          filterOptions,
          columns: ColumnUtils.getColumns(variantDefinition.specification, reportQuery.columns),
          layoutTemplate,
          ...otherOptions,
          warnings,
          actions,
          template,
        })
      })
      .catch((err) => next(err))
  }
}

const renderListWithDefinition = ({
  title,
  definitionName,
  variantName,
  request,
  response,
  next,
  otherOptions,
  layoutTemplate,
  token,
  apiUrl,
  apiTimeout,
  dynamicAutocompleteEndpoint,
  definitionsPath,
}: RenderListWithDefinitionInput) => {
  const reportingClient = new ReportingClient({
    url: apiUrl,
    agent: {
      timeout: apiTimeout,
    },
  })

  reportingClient
    .getDefinition(token, definitionName, variantName, definitionsPath)
    .then((reportDefinition) => {
      const reportName: string = reportDefinition.name
      const variantDefinition = reportDefinition.variant

      const reportQuery = new ReportQuery({
        fields: variantDefinition.specification.fields,
        template: variantDefinition.specification.template as Template,
        queryParams: request.query,
        definitionsPath: <string>request.query.dataProductDefinitionsPath,
      })

      const getListData: ListDataSources = {
        data: reportingClient.getListWithWarnings(variantDefinition.resourceName, token, reportQuery),
        count: reportingClient.getCount(variantDefinition.resourceName, token, reportQuery),
      }
      renderList(
        getListData,
        variantDefinition,
        reportQuery,
        request,
        response,
        next,
        title ?? `${reportName} - ${variantDefinition.name}`,
        layoutTemplate,
        dynamicAutocompleteEndpoint,
        otherOptions,
        reportName,
      )
    })
    .catch((error) => {
      next(error)
    })
}

export default {
  renderListWithData: ({
    title,
    reportName,
    variantDefinition,
    request,
    response,
    next,
    getListDataSources,
    otherOptions,
    layoutTemplate,
    dynamicAutocompleteEndpoint,
  }: RenderListWithDataInput) => {
    const { specification } = variantDefinition
    const reportQuery = new ReportQuery({
      fields: specification.fields,
      template: specification.template as Template,
      queryParams: request.query,
      definitionsPath: <string>request.query.dataProductDefinitionsPath,
    })
    const listData = getListDataSources(reportQuery)

    renderList(
      listData,
      variantDefinition,
      reportQuery,
      request,
      response,
      next,
      title,
      layoutTemplate,
      dynamicAutocompleteEndpoint,
      otherOptions,
      reportName,
    )
  },

  createReportListRequestHandler: ({
    title,
    definitionName,
    variantName,
    apiUrl,
    apiTimeout,
    otherOptions,
    layoutTemplate,
    tokenProvider,
    dynamicAutocompleteEndpoint,
    definitionsPath,
  }: CreateRequestHandlerInput): RequestHandler => {
    return (request: Request, response: Response, next: NextFunction) => {
      renderListWithDefinition({
        title,
        definitionName,
        variantName,
        request,
        response,
        next,
        otherOptions,
        layoutTemplate,
        token: tokenProvider(request, response, next),
        apiUrl,
        apiTimeout,
        dynamicAutocompleteEndpoint,
        definitionsPath,
      })
    }
  },

  renderListWithDefinition,
}
