import { Request, Response } from 'express'
import { SubscribedReportBuilder } from '../../../routes/journeys/my-reports/subscriptions/builder'
import { addMyReport } from '../../../routes/journeys/my-reports/utils'
import { Services } from '../../../types/Services'

/**
 * Subscribes a user to a scheduled report
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Services} services
 * @return {*}
 */
export const subscribe = async (req: Request, res: Response, services: Services) => {
  const { dprUser } = res.locals
  if (!dprUser) {
    throw new Error('No Dpr User')
  }

  if (!req.body) {
    throw new Error('No body in request')
  }

  const { token, id: userId } = dprUser
  const { reportId, id } = req.params as { reportId: string; id: string }
  const { returnTo } = req.body

  const { tableId } = await services.reportingService.subscribe(token, reportId, id)

  const subscriptionData = new SubscribedReportBuilder(req, res).withExecutionData({ tableId }).build()
  const { schedule } = subscriptionData

  await addMyReport('subscriptions', subscriptionData, services, userId)

  req.flash(
    'DPR_SUBSCRIBED',
    JSON.stringify({
      message: `You have subscribed to this report. This report refreshes ${schedule}`,
    }),
  )

  return {
    returnTo,
  }
}
