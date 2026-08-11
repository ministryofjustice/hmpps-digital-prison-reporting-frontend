import { type Response } from 'express'
import { buildReportPageAction } from 'src/dpr/components/my-reports/my-reports-list-item/my-reports-list-item-actions/utils'
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

  console.log(JSON.stringify({ timestampData }, null, 2))

  const refreshedSubscriptions = subscriptions
    .filter(sub => {
      if (!sub.tableId) {
        return false
      }

      const subData = timestampData.find(tsData => tsData.tableId === sub.tableId)

      if (!subData || !sub.timestamp.refresh) {
        return false
      }

      console.log(JSON.stringify({ subData }, null, 2))

      // Compare the timestamps to see if the data has been refreshed
      return wasSubscribedReportRefreshed(subData.reportUpdatedTime, sub.timestamp.refresh)
    })
    .map(sub => {
      const { reportName, name } = sub
      const { href, reportType } = buildReportPageAction(res, res.req, sub)

      return {
        reportName,
        name,
        href,
        reportType,
      }
    })
    .map(sub => {
      return `${sub.reportName} - ${sub.name}. <a href="${sub.href}" target="_blank" class="govuk-link govuk-link--no-visited-state">View ${sub.reportType}</a>`
    })

  console.log(JSON.stringify({ refreshedSubscriptions }, null, 2))

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
        message: `<p>${message}</p>`,
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
