import { type Response } from 'express'
import { Services } from '../../types/Services'
import { StoredReportData } from '../../types/UserReports'

/**
 * Gets the subscriptions data from the BE and checks if the data has been refreshed
 * - Sets a flash message for all refreshed subscriptions
 * - Updates the subscriptions timestamps in redis
 * - Return the updated subscriptions
 *
 * @param {Response} res
 * @param {Services} services
 * @param {StoredReportData[]} subscriptions
 * @return {*}
 */
export const getRefreshedSubscriptionsAndUpdateTimestamp = async (
  res: Response,
  services: Services,
  subscriptions: StoredReportData[],
) => {
  const { token, dprUser } = res.locals

  // Get the users subscriptions data from the BE
  const timestampData = await services.subscriptionService.getSubscriptions(token)

  const refreshedSubscriptions = subscriptions
    .filter(sub => {
      if (!sub.tableId) {
        return false
      }

      const subData = timestampData.find(tsData => tsData.tableId === sub.tableId)

      if (!subData || !sub.timestamp.refresh) {
        return false
      }

      // Compare the timestamps to see if the data has been refreshed
      return wasSubscribedReportRefreshed(subData.reportUpdatedTime, sub.timestamp.refresh)
    })
    .map(sub => {
      const { tableId, reportName, name } = sub
      return {
        reportName,
        name,
        tableId: tableId ?? '',
      }
    })

  // If there are refreshed timestamps then show an in-app notification
  // and update the timestamps in redis
  if (refreshedSubscriptions.length) {
    const count = refreshedSubscriptions.length
    const message =
      count === 1 ? '1 of your subscribed reports was refreshed' : `${count} of your subscribed reports were refreshed`

    const { req } = res
    req?.flash(
      'DPR_REFRESHED_SUBSCRIPTIONS',
      JSON.stringify({
        message,
        details: refreshedSubscriptions,
      }),
    )

    return services.subscriptionStoreService.updateTimestamps(timestampData, dprUser.id)
  }

  // Otherwise return the subscriptions unchanged
  return subscriptions
}

/**
 * Compares the refreshed date from the FE sub state to the BE subs state
 * - if the apiTime is later than the stored time then the data has been refreshed
 *
 * @param {(string | Date)} apiTimestamp
 * @param {(string | Date)} storedTimestamp
 * @return {*}  {boolean}
 */
const wasSubscribedReportRefreshed = (apiTimestamp: string | Date, storedTimestamp: string | Date): boolean => {
  const apiTime = Date.parse(String(apiTimestamp))
  const storedTime = Date.parse(String(storedTimestamp))

  return !Number.isNaN(apiTime) && !Number.isNaN(storedTime) && apiTime > storedTime
}
