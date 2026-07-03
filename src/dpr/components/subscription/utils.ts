import { Request, Response } from 'express'
import { SubscribedReportBuilder } from '../../routes/journeys/my-reports/subscriptions/builder'
import { addMyReport, removeMyReport } from '../../routes/journeys/my-reports/utils'
import { SubscriptionActionConfig } from '../../types/AsyncReportUtils'
import { Services } from '../../types/Services'
import LocalsHelper from '../../utils/localsHelper'

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

  await addMyReport('subscriptions', subscriptionData, services, userId)

  return {
    returnTo,
  }
}

/**
 * Unsubscribes a user to a scheduled report
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Services} services
 * @return {*}
 */
export const unsubscribe = async (req: Request, res: Response, services: Services) => {
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

  // Unsubscribe API here
  await services.reportingService.unsubscribe(token, reportId, id)

  await removeMyReport('subscriptions', { reportId, id }, services, userId)

  return {
    returnTo,
  }
}

/**
 * Setup the subscription config
 *
 * @param {Request} req
 * @param {Response} res
 * @param {(string | undefined)} schedule
 * @return {*}  {(SubscriptionActionConfig | undefined)}
 */
export const setupSubscriptionConfig = async (
  req: Request,
  res: Response,
  reportId: string,
  id: string,
  schedule: string | undefined,
  services: Services,
): Promise<SubscriptionActionConfig | undefined> => {
  const { csrfToken, subscriptionsEnabled, dprUser } = LocalsHelper.getValues(res)

  if (!subscriptionsEnabled || !schedule) return undefined

  let subscribed = false
  let subscriptionUrl

  subscribed = (await services.subscriptionService.isSubscribed(reportId, id, dprUser.id)) || false
  if (subscribed) {
    const subscribedReport = await services.subscriptionService.getSubscription(reportId, id, dprUser.id)
    subscriptionUrl = subscribedReport?.url?.report?.fullUrl
  }

  const { subscribePath } = LocalsHelper.getRouteLocals(res)
  const actonPath = `${subscribePath}/${reportId}/${id}`

  return {
    schedule,
    subscribeAction: `${actonPath}/subscribe`,
    unsubscribeAction: `${actonPath}/unsubscribe`,
    subscribed,
    subscriptionUrl,
    subscriptionsEnabled,
    currentUrl: req.originalUrl || '/',
    csrfToken,
  }
}
