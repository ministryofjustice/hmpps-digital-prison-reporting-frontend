import { NextFunction, Request, RequestHandler, Response } from 'express'
import type { FieldDefinition } from '../../types'
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

const filtersQueryParameterPrefix = 'filters.'

function getDefaultSortColumn(fields: FieldDefinition[]) {
  const defaultSortColumn = fields.find((f) => f.defaultSortColumn)
  return defaultSortColumn ? defaultSortColumn.name : fields.find((f) => f.sortable).name
}

function renderList(
  listData: ListDataSources,
  fields: FieldDefinition[],
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
  reportingClient.getDefinitions(token).then((definitions) => {
    const reportDefinition = definitions.find((d) => d.id === definitionName)
    if (!reportDefinition) next(`Could not find report definition: ${definitionName}`)

    const variantDefinition = reportDefinition.variants.find((v) => v.id === variantName)
    if (!variantDefinition) next(`Could not find variant definition: ${definitionName}`)

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
      title ?? `${reportDefinition.name} - ${variantDefinition.name}`,
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
