import { Request, Response } from 'express'
import { removeMyReport } from '../../../routes/journeys/my-reports/utils'
import { Services } from '../../../types/Services'
import ErrorHandler from '../../../utils/ErrorHandler/ErrorHandler'
import { captureDprError } from '../../../utils/captureError'

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
  const subscriptionData = await services.subscriptionStoreService.getSubscription(reportId, id, userId)

  if (subscriptionData) {
    const { reportName, name, type } = subscriptionData

    try {
      await services.subscriptionService.unsubscribe(token, reportId, id)

      await removeMyReport('subscriptions', { reportId, id }, services, userId)

      req.flash(
        'DPR_UNSUBSCRIBED',
        JSON.stringify({
          message: `<p>You have unsubscribed from <strong>${reportName} - ${name}</strong> ${type}</p><p>You will no longer recieve refreshed versions of this report</p>`,
        }),
      )
    } catch (error) {
      const dprError = new ErrorHandler(error).formatError()

      req.flash(
        'DPR_SUBSCRIPTION_ERROR',
        JSON.stringify({
          message: `<p>Failed to unsubscribe from <strong>${reportName} - ${name}</strong></p></p>`,
          details: dprError.userMessage,
        }),
      )
      captureDprError(error)
    }
  }

  return {
    returnTo,
  }
}
