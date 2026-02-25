import { NextFunction, Request, Response } from 'express'

import ReportQuery from '../../types/ReportQuery'
import { ListDataSources } from './types'
import { ListWithWarnings, Warnings } from '../../data/types'
import { components } from '../../types/api'
import ReportActionsUtils from '../_reports/report-heading/report-actions/utils'
import { SyncReportUtils } from '../../utils'
import { ReportType } from '../../types/UserReports'
import { FiltersType } from '../_filters/filtersTypeEnum'

function isListWithWarnings(data: Record<string, string>[] | ListWithWarnings): data is ListWithWarnings {
  return (data as ListWithWarnings).data !== undefined
}

export async function renderList(
  listData: ListDataSources,
  variantDefinition: components['schemas']['VariantDefinition'],
  definition: components['schemas']['SingleVariantReportDefinition'],
  reportQuery: ReportQuery,
  req: Request,
  response: Response,
  next: NextFunction,
  title: string,
  layoutTemplate: string,
  otherOptions?: NodeJS.Dict<object>,
  reportName?: string,
) {
  await Promise.all([listData.data, listData.count])
    .then(async (resolvedData) => {
      let data
      let warnings: Warnings = {}
      const { specification, classification, printable, description, name: variantName } = variantDefinition
      if (specification) {
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

        const reportRenderData = await SyncReportUtils.getReportRenderData({
          req,
          count,
          specification,
          reportQuery,
          data,
          filtersType: FiltersType.REQUEST,
          definition,
        })

        const actions = ReportActionsUtils.getActions({
          print: {
            enabled: Boolean(variantDefinition.printable),
          },
          share: {
            reportName: reportName || 'Product',
            name: variantDefinition.name,
            url: reportRenderData.fullUrl,
          },
          copy: {
            url: reportRenderData.fullUrl,
          },
        })

        const renderData = {
          renderData: {
            ...reportRenderData,
            reportName,
            name: title || variantName,
            description,
            count,
            classification,
            printable,
            actions,
            template,
            warnings,
            type: ReportType.REPORT,
            ...otherOptions,
          },
          layoutTemplate,
        }

        response.render(`dpr/components/report-list/list`, renderData)
      } else {
        throw new Error('No specification in definition')
      }
    })
    .catch((err) => next(err))
}
