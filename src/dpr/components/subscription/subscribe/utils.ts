import { Request, Response } from 'express'
import { SubscribedReportBuilder } from '../../../routes/journeys/my-reports/subscriptions/builder'
import { addMyReport } from '../../../routes/journeys/my-reports/utils'
import { Services } from '../../../types/Services'
import { captureDprError } from '../../../utils/captureError'
import ErrorHandler from '../../../utils/ErrorHandler/ErrorHandler'
import { GetSubscriptionResponse } from '../../../types/Subscriptions'

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
  const { returnTo, name, reportName } = req.body

  try {
    const { subscribeResponse, subscriptionStatus } = await subscribeAndGetSubscriptionStatus(req, token, services)
    if (!subscribeResponse) {
      return {
        returnTo,
      }
    }

    const subscriptionData = await addToSubscriptionsList(req, res, subscriptionStatus, services, userId)

    const { type, schedule } = subscriptionData

    req.flash(
      'DPR_SUBSCRIBED',
      JSON.stringify({
        message: `<p>You have subscribed to <strong>${reportName} - ${name}</strong> ${type}.</p><p>This report refreshes <strong>${schedule}</strong></p>`,
      }),
    )
  } catch (error) {
    const dprError = new ErrorHandler(error).formatError()

    req.flash(
      'DPR_SUBSCRIPTION_ERROR',
      JSON.stringify({
        message: `<p>Failed to subscribe to <strong>${reportName} - ${name}</strong></p></p>`,
        details: dprError.userMessage,
      }),
    )
    captureDprError(error)
  }

  return {
    returnTo,
  }
}

/**
 * Calls the subscribe API and subscriptions status API
 * returns the subscribe response and the subscription status
 *
 * @param {Request} req
 * @param {string} token
 * @param {Services} services
 * @return {*}
 */
const subscribeAndGetSubscriptionStatus = async (req: Request, token: string, services: Services) => {
  const { reportId, id } = req.params as { reportId: string; id: string }

  const subscribeResponse = await services.subscriptionService.subscribe(token, reportId, id)
  const subscriptionsStatus = await services.subscriptionService.getSubscriptions(token)

  let subscriptionStatus
  if (subscriptionsStatus.length) {
    subscriptionStatus = subscriptionsStatus.find(sub => sub.reportVariantId === id && reportId === sub.reportId)
  }

  return {
    subscribeResponse,
    subscriptionStatus,
  }
}

/**
 * Adds the subscription data to the users reports list
 *
 * @param {Request} req
 * @param {Response} res
 * @param {(GetSubscriptionResponse | undefined)} subscriptionStatus
 * @param {Services} services
 * @param {string} userId
 * @return {*}
 */
const addToSubscriptionsList = async (
  req: Request,
  res: Response,
  subscriptionStatus: GetSubscriptionResponse | undefined,
  services: Services,
  userId: string,
) => {
  let tableId: string | undefined
  let refresh: string | undefined

  if (subscriptionStatus) {
    tableId = subscriptionStatus.tableId
    refresh = subscriptionStatus.reportUpdatedTime
  }

  let subscriptionBuilder = new SubscribedReportBuilder(req, res)

  if (tableId) {
    subscriptionBuilder = subscriptionBuilder.withExecutionData({
      tableId,
    })
  }

  if (refresh) {
    subscriptionBuilder.withTimestamp({
      refresh: new Date(refresh.toString()),
    })
  }

  const subscriptionData = subscriptionBuilder.build()

  await addMyReport('subscriptions', subscriptionData, services, userId)

  return subscriptionData
}
