/* eslint-disable class-methods-use-this */
import DprPollingHelper from 'src/dpr/DprPollingClass'
import type { meta } from '../../types/UserReports'
import { setNestedPath } from 'src/dpr/utils/urlHelper'

export enum ListType {
  REQUESTED = 'requested',
  VIEWED = 'viewed',
}

class DprUserReportListHelper {
  listElement!: HTMLElement | null

  listType: ListType

  requestData: meta[] = []

  csrfToken = ''

  removeActions!: NodeListOf<Element> | null

  expiredInterval!: NodeJS.Timeout

  pollingInterval!: NodeJS.Timeout

  pollingHelper!: DprPollingHelper

  path!: string

  constructor(ListElement: HTMLElement, listType: ListType) {
    this.listElement = ListElement
    this.listType = listType

    if (this.listElement) {
      const requestData = this.listElement.getAttribute('data-request-data')
      this.requestData = requestData ? JSON.parse(requestData) : undefined
      this.csrfToken = this.listElement.getAttribute('data-csrf-token') || ''
      this.removeActions = document.querySelectorAll(`.dpr-remove-${this.listType}-report-button`)
      this.pollingHelper = new DprPollingHelper()
      this.path = this.listType === ListType.REQUESTED ? 'requested-reports' : 'recently-viewed'
    }
  }

  async initExpiredPollingInterval() {
    await this.checkExpiredStatus()
    if (this.requestData && !this.allHaveInvalidIds()) {
      if (this.pollingHelper.shouldPollExpired(this.requestData)) {
        this.expiredInterval = setInterval(async () => {
          await this.checkExpiredStatus()
        }, this.pollingHelper.POLLING_EXPIRED_FREQUENCY)
      }
    }
  }

  async initRequestPollingInterval() {
    if (this.requestData && !this.allHaveInvalidIds()) {
      if (this.pollingHelper.shouldPollStatus(this.requestData)) {
        this.pollingInterval = setInterval(async () => {
          await this.checkRequestStatus()
        }, this.pollingHelper.POLLING_FREQUENCY)
      }
    }
  }

  async initPollingIntervals() {
    this.initExpiredPollingInterval()
    this.initRequestPollingInterval()
  }

  hasValidIds(metaData: meta) {
    const { id, reportId, executionId, tableId } = metaData
    return id !== undefined && reportId !== undefined && executionId !== undefined && tableId !== undefined
  }

  allHaveInvalidIds() {
    return this.requestData.every((meta) => {
      return !this.hasValidIds(meta)
    })
  }

  async checkExpiredStatus() {
    await Promise.all(
      this.requestData.map(async (metaData: meta) => {
        const { status, reportUrl } = metaData
        if (
          reportUrl &&
          status &&
          this.hasValidIds(metaData) &&
          !this.pollingHelper.EXPIRED_END_STATUSES.includes(status)
        ) {
          const response = await this.pollingHelper.getExpiredStatus(reportUrl, metaData, this.csrfToken)

          if (response && response.isExpired) {
            clearInterval(this.expiredInterval)
            window.location.reload()
          }
        }
      }),
    )
  }

  async checkRequestStatus() {
    await Promise.all(
      this.requestData.map(async (metaData) => {
        const { status } = metaData
        // Don't poll if current state is an end state
        if (status && this.hasValidIds(metaData) && !this.pollingHelper.END_STATUSES.includes(status)) {
          const response = await this.pollingHelper.getRequestStatus(metaData, this.csrfToken)

          // Reload if new status is an end state
          if (response?.status && this.pollingHelper.END_STATUSES.includes(response.status)) {
            clearInterval(this.pollingInterval)
            window.location.reload()
          }
        }
      }),
    )
  }

  initItemActions() {
    if (this.removeActions) {
      this.removeActions.forEach((button) => {
        const id = button.getAttribute('data-execution-id') || ''
        button.addEventListener('click', async (e) => {
          e.preventDefault()
          await this.removeItemFromList(id)
        })
      })
    }
  }

  async removeItemFromList(executionId: string) {
    const itemMeta = this.requestData.find((d) => d.executionId === executionId)
    if (itemMeta) {
      let response
      await fetch(itemMeta.endpoint, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'CSRF-Token': this.csrfToken,
        },
      })
        .then(() => {
          window.location.reload()
        })
        .catch((error) => console.error('Error:', error))

      return response
    } else {
      console.warn(`User Reports List: Remove failed for execution ID: ${executionId}`)
    }
  }
}

export { DprUserReportListHelper }
export default DprUserReportListHelper
