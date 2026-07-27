import { Request, Response } from 'express'
import nunjucks from 'nunjucks'
import { setupSubscriptionConfig } from '../utils'
import { Services } from '../../../types/Services'

type ReportConfig = {
  reportId: string
  id: string
  name: string
  reportName: string
  description: string
  type: string
}

export const renderSubscriptionToggleAsHtml = async (
  req: Request,
  res: Response,
  schedule: string,
  reportConfig: ReportConfig,
  services: Services,
): Promise<string> => {
  const { reportId, id } = reportConfig

  return nunjucks.render('components/subscription/subscription-toggle/render.njk', {
    subscriptionConfig: await setupSubscriptionConfig(req, res, reportId, id, schedule, services),
    reportConfig,
  })
}
