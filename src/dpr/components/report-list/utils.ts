import { NextFunction, Request, RequestHandler, Response } from 'express'

import ReportQuery from '../../types/ReportQuery'

import {
  ListDataSources,
  RenderListWithDataInput,
  RenderListWithDefinitionInput,
  CreateRequestHandlerInput,
} from './types'
import ReportingClient from '../../data/reportingClient'
import { ListWithWarnings, Warnings } from '../../data/types'
import { components } from '../../types/api'
import Dict = NodeJS.Dict
import ReportActionsUtils from '../_reports/report-actions/utils'
import { Template } from '../../types/Templates'
import SyncReportUtils from '../_sync/sync-report/utils'
import { ReportType } from '../../types/UserReports'

function isListWithWarnings(data: Dict<string>[] | ListWithWarnings): data is ListWithWarnings {
  return (data as ListWithWarnings).data !== undefined
}

export async function renderList(
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
  await Promise.all([listData.data, listData.count])
    .then(async (resolvedData) => {
      let data
      let warnings: Warnings = {}
      const { specification, classification, printable, description, name: variantName } = variantDefinition
      const { template } = specification
      const count = resolvedData[1]

      if (isListWithWarnings(resolvedData[0])) {
        // eslint-disable-next-line prefer-destructuring
        data = resolvedData[0].data
        warnings = resolvedData[0].warnings
      } else {
        // eslint-disable-next-line prefer-destructuring
        data = resolvedData[0]
      }

      const reportRenderData = await SyncReportUtils.getReportRenderData(
        request,
        count,
        specification,
        reportQuery,
        data,
      )

      const actions = ReportActionsUtils.getActions({
        print: {
          enabled: variantDefinition.printable,
        },
        share: {
          reportName,
          name: variantDefinition.name,
          url: reportRenderData.reportUrl,
        },
        copy: {
          url: reportRenderData.reportUrl,
        },
      })

      const renderData = {
        renderData: {
          ...reportRenderData,
          reportName,
          name: variantName,
          description,
          count,
          classification,
          printable,
          actions,
          template,
          warnings,
          type: ReportType.REPORT,
          ...otherOptions,
          removeBookmark: true,
        },
        layoutTemplate,
      }

      response.render(`dpr/components/report-list/list`, renderData)
    })
    .catch((err) => next(err))
}

export const renderListWithDefinition = async ({
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

  const { dataProductDefinitionsPath } = request.query
  const defPath = <string>dataProductDefinitionsPath || definitionsPath

  try {
    const reportDefinition = await reportingClient.getDefinition(token, definitionName, variantName, defPath)
    const reportName: string = reportDefinition.name
    const variantDefinition = reportDefinition.variant

    const reportQuery = new ReportQuery({
      fields: variantDefinition.specification.fields,
      template: variantDefinition.specification.template as Template,
      queryParams: request.query,
      definitionsPath: defPath,
    })

    const getListData: ListDataSources = {
      data: reportingClient.getListWithWarnings(variantDefinition.resourceName, token, reportQuery),
      count: reportingClient.getCount(variantDefinition.resourceName, token, reportQuery),
    }

    await renderList(
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
  } catch (error) {
    next(error)
  }
}

export default {
  renderListWithData: async ({
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
    await renderList(
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
