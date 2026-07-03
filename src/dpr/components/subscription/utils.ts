import { Request, Response } from 'express'
import { SubscriptionActionConfig } from '../../types/AsyncReportUtils'
import { Services } from '../../types/Services'
import LocalsHelper from '../../utils/localsHelper'

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
