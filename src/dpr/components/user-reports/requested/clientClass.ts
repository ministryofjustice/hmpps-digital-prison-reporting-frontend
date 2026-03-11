import { DprClientClass } from '../../../DprClientClass'
import DprUserReportListHelper, { ListType } from '../clientClass'

class DprAsyncRequestList extends DprClientClass {
  requestList!: HTMLElement | null

  userReportsListHelper!: DprUserReportListHelper

  static override getModuleName() {
    return 'async-request-list'
  }

  override initialise(): void {
    this.requestList = document.getElementById('dpr-async-request-component')
    if (this.requestList) {
      this.userReportsListHelper = new DprUserReportListHelper(this.requestList, ListType.REQUESTED)
      this.userReportsListHelper.initItemActions()
      this.userReportsListHelper.initPollingIntervals()
    }
  }
}

export { DprAsyncRequestList }
export default DprAsyncRequestList
