import { type Response } from 'express'
import { buildReportPageAction } from 'src/dpr/components/my-reports/my-reports-list-item/my-reports-list-item-actions/utils'
import { Services } from '../../types/Services'
import { AsyncReportsTimestamp, RequestStatus, StoredReportData } from '../../types/UserReports'

/**
 * Gets the subscriptions data from the BE and checks if the data has updated
 * - Sets a flash message if any updates
 * - Updates the subscriptions timestamps and status in redis
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

  const subscriptionsStatus = await services.subscriptionService.getSubscriptions(token)

  const statusLookup = new Map(
    subscriptionsStatus.map(subscription => [`${subscription.reportId}-${subscription.reportVariantId}`, subscription]),
  )

  let stateHasChanged = false

  const { refreshed, failed, stale } = subscriptions.reduce(
    (result, sub) => {
      const subStatusData = statusLookup.get(`${sub.reportId}-${sub.id}`)

      if (!subStatusData) {
        return result
      }

      if (hasStatusChanged(sub.status, subStatusData.reportStatus)) {
        stateHasChanged = true
      }

      switch (subStatusData.reportStatus) {
        case 'READY': {
          const hasRefreshed =
            subStatusData.reportUpdatedTime &&
            wasSubscribedReportRefreshed(subStatusData.reportUpdatedTime, sub.timestamp)

          if (hasRefreshed) {
            const { href, reportType } = buildReportPageAction(res, res.req, sub)
            const htmlLink = `<a href="${href}" target="_blank" class="govuk-link govuk-link--no-visited-state">View ${reportType}</a>`
            const reportMessage = `${sub.reportName} - ${sub.name}. ${htmlLink}`

            result.refreshed.push(reportMessage)
            stateHasChanged = true
          }

          break
        }

        case 'FAILED': {
          const reportFailedMessage = `${sub.reportName} - ${sub.name}.`
          result.failed.push(reportFailedMessage)
          break
        }

        case 'STALE': {
          const { href, reportType } = buildReportPageAction(res, res.req, sub)
          const htmlLink = `<a href="${href}" target="_blank" class="govuk-link govuk-link--no-visited-state">View ${reportType}</a>`
          const reportStaleMessage = `${sub.reportName} - ${sub.name}. ${htmlLink}`
          result.stale.push(reportStaleMessage)
          break
        }

        case 'PENDING':
        default:
          break
      }

      return result
    },
    {
      refreshed: [] as string[],
      failed: [] as string[],
      stale: [] as string[],
    },
  )

  if (refreshed.length || failed.length || stale.length) {
    const count = refreshed.length + failed.length + stale.length
    const message =
      count === 1 ? '1 of your subscribed reports has updated' : `${count} of your subscribed reports were updated`

    res.req?.flash(
      'DPR_SUBSCRIPTION_STATUS',
      JSON.stringify({
        message: `<p>${message}</p>`,
        details: {
          refreshed,
          failed,
          stale,
        },
      }),
    )
  }

  if (stateHasChanged) {
    return services.subscriptionStoreService.updateSubscriptions(subscriptionsStatus, dprUser.id)
  }

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
const wasSubscribedReportRefreshed = (apiTimestamp: string | Date, storedTimestamp: AsyncReportsTimestamp): boolean => {
  const { refresh } = storedTimestamp

  if (!refresh) {
    return true
  }

  // storedTimestamp: string | Date
  const apiTime = Date.parse(String(apiTimestamp))
  const storedTime = Date.parse(String(refresh))

  return !Number.isNaN(apiTime) && !Number.isNaN(storedTime) && apiTime > storedTime
}

const hasStatusChanged = (currentStatus: RequestStatus | undefined, apiStatus: string | undefined): boolean => {
  // Undefined from the API means "no status update"
  if (!apiStatus) {
    return false
  }

  return currentStatus !== apiStatus
}
