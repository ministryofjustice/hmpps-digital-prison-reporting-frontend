import { NextFunction, Request, RequestHandler, Response } from 'express'
import ReportQuery from '../../types/ReportQuery'
import createUrlForParameters from '../../utils/urlHelper'
import { DataTableOptions } from '../data-table/types'
import DataTableUtils from '../data-table/utils'
import FilterUtils from '../filters/utils'
import {
  CreateRequestHandlerInput,
  ListDataSources,
  RenderListWithDataInput,
  RenderListWithDefinitionInput,
} from './types'
import ReportingClient from './data/reportingClient'
import { components } from '../../types/api'

const filtersQueryParameterPrefix = 'filters.'

function getDefaultSortColumn(fields: components['schemas']['FieldDefinition'][]) {
  const defaultSortColumn = fields.find((f) => f.defaultsort)
  return defaultSortColumn ? defaultSortColumn.name : fields.find((f) => f.sortable).name
}

function renderList(
  listData: ListDataSources,
  fields: components['schemas']['FieldDefinition'][],
  reportQuery: ReportQuery,
  response: Response,
  next: NextFunction,
  title: string,
  layoutTemplate: string,
  otherOptions: NodeJS.Dict<object>,
) {
  Promise.all([listData.data, listData.count])
    .then((resolvedData) => {
      const dataTableOptions: DataTableOptions = {
        head: DataTableUtils.mapHeader(fields, reportQuery, createUrlForParameters),
        rows: DataTableUtils.mapData(resolvedData[0], fields),
        count: resolvedData[1],
        currentQueryParams: reportQuery.toRecordWithFilterPrefix(),
      }

      const filterOptions = {
        filters: FilterUtils.getFilters(fields, reportQuery.filters),
        selectedFilters: FilterUtils.getSelectedFilters(fields, reportQuery, createUrlForParameters),
      }

      response.render('dpr/components/report-list/list', {
        title,
        dataTableOptions,
        filterOptions,
        layoutTemplate,
        ...otherOptions,
      })
    })
    .catch((err) => next(err))
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
  reportingClient,
}: RenderListWithDefinitionInput) => {
  reportingClient.getDefinition(token, definitionName, variantName).then((reportDefinition) => {
    // eslint-disable-next-line dot-notation
    const reportName = reportDefinition['name']
    // eslint-disable-next-line dot-notation
    const variantDefinition = reportDefinition['variant']

    const reportQuery = new ReportQuery(
      variantDefinition.specification.fields,
      request.query,
      getDefaultSortColumn(variantDefinition.specification.fields),
      filtersQueryParameterPrefix,
    )

    const getListData: ListDataSources = {
      data: reportingClient.getList(variantDefinition.resourceName, token, reportQuery),
      count: reportingClient.getCount(variantDefinition.resourceName, token, reportQuery),
    }
    renderList(
      getListData,
      variantDefinition.specification.fields,
      reportQuery,
      response,
      next,
      title ?? `${reportName} - ${variantDefinition.name}`,
      layoutTemplate,
      otherOptions,
    )
  })
}

export default {
  filtersQueryParameterPrefix,

  renderListWithData: ({
    title,
    fields,
    request,
    response,
    next,
    getListDataSources,
    otherOptions,
    layoutTemplate,
  }: RenderListWithDataInput) => {
    const reportQuery = new ReportQuery(
      fields,
      request.query,
      getDefaultSortColumn(fields),
      filtersQueryParameterPrefix,
    )
    const listData = getListDataSources(reportQuery)

    renderList(listData, fields, reportQuery, response, next, title, layoutTemplate, otherOptions)
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
  }: CreateRequestHandlerInput): RequestHandler => {
    const reportingClient = new ReportingClient({
      url: apiUrl,
      agent: {
        timeout: apiTimeout,
      },
    })

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
        reportingClient,
      })
    }
  },
}
