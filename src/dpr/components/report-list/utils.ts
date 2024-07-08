import { NextFunction, Request, RequestHandler, Response } from 'express'
import ReportQuery from '../../types/ReportQuery'
import { DEFAULT_FILTERS_PREFIX } from '../../types/ReportQuery'
import createUrlForParameters from '../../utils/urlHelper'
import { DataTableOptions } from '../data-table/types'
import FilterUtils from '../filters/utils'
import ColumnUtils from '../columns/utils'
import { ListDataSources, RenderListWithDataInput } from './types'
import ReportingClient from '../../data/reportingClient'
import { ListWithWarnings, Warnings } from '../../data/types'
import { components } from '../../types/api'
import Dict = NodeJS.Dict
import RenderListWithDefinitionInput from './RenderListWithDefinitionInput'
import CreateRequestHandlerInput from './CreateRequestHandlerInput'
import ReportActionsUtils from '../icon-button-list/utils'
import { DataTableBuilder } from '../../utils/DataTableBuilder/DataTableBuilder'
import { DataTable } from '../../utils/DataTableBuilder/types'
import PaginationUtils from '../pagination/utils'
import parseUrl from 'parseurl'
import { FilterOptions } from '../filters/types'

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
        const { specification } = variantDefinition
        const { template } = specification
        const { classification, printable } = variantDefinition
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

        const dataTable: DataTable = new DataTableBuilder(specification)
          .withHeaderSortOptions(reportQuery)
          .buildTable(data)

        const dataTableOptions: DataTableOptions = {
          ...dataTable,
          classification,
          printable,
          pagination: PaginationUtils.getPaginationData(url, count, reportQuery.pageSize, reportQuery.selectedPage)
        }

        const filterOptions: FilterOptions = FilterUtils.getFilterOptions(
          variantDefinition,
          reportQuery.filters,
          dynamicAutocompleteEndpoint,
          reportQuery,
          createUrlForParameters
        )

        const actions = ReportActionsUtils.initReportActions(
          reportName,
          variantDefinition.name,
          variantDefinition.printable,
          `${request.protocol}://${request.get('host')}${request.originalUrl}`,
        )

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

      const reportQuery = new ReportQuery(
        variantDefinition.specification,
        request.query,
        definitionsPath,
      )

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
    const reportQuery = new ReportQuery(
      specification,
      request.query,
    )
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
