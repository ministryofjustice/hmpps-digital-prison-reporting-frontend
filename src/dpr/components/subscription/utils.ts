import { Request, Response } from 'express'
import { SubscribedReportBuilder } from '../../routes/journeys/my-reports/subscriptions/builder'
import { addMyReport, removeMyReport } from '../../routes/journeys/my-reports/utils'
import { SubscriptionActionConfig } from '../../types/AsyncReportUtils'
import { Services } from '../../types/Services'
import { getActiveJourneyValue } from '../../utils/sessionHelper'
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
export const setupSubscriptionConfig = (
  req: Request,
  res: Response,
  schedule: string | undefined,
): SubscriptionActionConfig | undefined => {
  const { csrfToken, subscriptionsEnabled } = LocalsHelper.getValues(res)

  if (!subscriptionsEnabled || !schedule) return undefined

  const { id, reportId } = req.params as {
    id: string
    reportId: string
  }
  const subscribed = Boolean(getActiveJourneyValue(req, { id, reportId }, 'subscribed'))
  const subscriptionUrl = getActiveJourneyValue(req, { id, reportId }, 'subscriptionUrl')

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
