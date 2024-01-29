import { NextFunction, Request, RequestHandler, Response } from 'express'
import ReportQuery from '../../types/ReportQuery'
import createUrlForParameters from '../../utils/urlHelper'
import { DataTableOptions } from '../data-table/types'
import DataTableUtils from '../data-table/utils'
import FilterUtils from '../filters/utils'
import { ListDataSources, RenderListWithDataInput } from './types'
import ReportingClient from '../../data/reportingClient'
import { ListWithWarnings, Warnings } from '../../data/types'
import { components } from '../../types/api'
import Dict = NodeJS.Dict
import RenderListWithDefinitionInput from './RenderListWithDefinitionInput'
import CreateRequestHandlerInput from './CreateRequestHandlerInput'

const filtersQueryParameterPrefix = 'filters.'

function getDefaultSortColumn(fields: components['schemas']['FieldDefinition'][]) {
  const defaultSortColumn = fields.find((f) => f.defaultsort)
  return defaultSortColumn ? defaultSortColumn.name : fields.find((f) => f.sortable)?.name
}

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
  if (Object.keys(reportQuery.filters).length === 0) {
    const defaultFilters: Record<string, string> = {}

    variantDefinition.specification.fields
      .filter((f) => f.filter && f.filter.defaultValue)
      .forEach((f) => {
        if (f.filter.type === 'daterange') {
          const dates = f.filter.defaultValue.split(' - ')

          if (dates.length >= 1) {
            // eslint-disable-next-line prefer-destructuring
            defaultFilters[`${filtersQueryParameterPrefix}${f.name}.start`] = dates[0]

            if (dates.length >= 2) {
              // eslint-disable-next-line prefer-destructuring
              defaultFilters[`${filtersQueryParameterPrefix}${f.name}.end`] = dates[1]
            }
          }
        } else {
          defaultFilters[`${filtersQueryParameterPrefix}${f.name}`] = f.filter.defaultValue
        }
      })

    if (Object.keys(defaultFilters).length > 0) {
      const querystring = createUrlForParameters(reportQuery.toRecordWithFilterPrefix(), defaultFilters)
      response.redirect(`${request.baseUrl}${request.path}${querystring}`)
      return true
    }
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
) {
<<<<<<< HEAD
  Promise.all([listData.data, listData.count])
    .then((resolvedData) => {
      let data
      let warnings: Warnings = {}
      const { fields } = variantDefinition.specification
      const { classification, printable } = variantDefinition
=======
  if (!redirectWithDefaultFilters(reportQuery, variantDefinition, response, request)) {
    Promise.all([listData.data, listData.count])
      .then((resolvedData) => {
        let data
        let warnings: Warnings = {}
        const { fields } = variantDefinition.specification
>>>>>>> main

        if (isListWithWarnings(resolvedData[0])) {
          // eslint-disable-next-line prefer-destructuring
          data = resolvedData[0].data
          warnings = resolvedData[0].warnings
        } else {
          // eslint-disable-next-line prefer-destructuring
          data = resolvedData[0]
        }

<<<<<<< HEAD
      const dataTableOptions: DataTableOptions = {
        head: DataTableUtils.mapHeader(fields, reportQuery, createUrlForParameters),
        rows: DataTableUtils.mapData(data, fields),
        count: resolvedData[1],
        currentQueryParams: reportQuery.toRecordWithFilterPrefix(),
        classification,
        printable,
      }
=======
        const dataTableOptions: DataTableOptions = {
          head: DataTableUtils.mapHeader(fields, reportQuery, createUrlForParameters),
          rows: DataTableUtils.mapData(data, fields),
          count: resolvedData[1],
          currentQueryParams: reportQuery.toRecordWithFilterPrefix(),
        }
>>>>>>> main

        const filterOptions = {
          filters: FilterUtils.getFilters(variantDefinition, reportQuery.filters, dynamicAutocompleteEndpoint),
          selectedFilters: FilterUtils.getSelectedFilters(fields, reportQuery, createUrlForParameters),
        }

        response.render('dpr/components/report-list/list', {
          title,
          dataTableOptions,
          filterOptions,
          layoutTemplate,
          ...otherOptions,
          warnings,
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
}: RenderListWithDefinitionInput) => {
  const reportingClient = new ReportingClient({
    url: apiUrl,
    agent: {
      timeout: apiTimeout,
    },
  })

  reportingClient.getDefinition(token, definitionName, variantName).then((reportDefinition) => {
    const reportName: string = reportDefinition.name
    const variantDefinition = reportDefinition.variant

    const reportQuery = new ReportQuery(
      variantDefinition.specification.fields,
      request.query,
      getDefaultSortColumn(variantDefinition.specification.fields),
      filtersQueryParameterPrefix,
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
    )
  })
}

export default {
  filtersQueryParameterPrefix,

  renderListWithData: ({
    title,
    variantDefinition,
    request,
    response,
    next,
    getListDataSources,
    otherOptions,
    layoutTemplate,
    dynamicAutocompleteEndpoint,
  }: RenderListWithDataInput) => {
    const { fields } = variantDefinition.specification
    const reportQuery = new ReportQuery(
      fields,
      request.query,
      getDefaultSortColumn(fields),
      filtersQueryParameterPrefix,
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
      })
    }
  },

  renderListWithDefinition,
}
