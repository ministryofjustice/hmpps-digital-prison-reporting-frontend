import DprUserReportListHelper, { ListType } from '../clientClass'
import { DprClientClass } from '../../../DprClientClass'

class DprRecentlyViewedList extends DprClientClass {
  viewedList!: HTMLElement | null

  userReportsListHelper!: DprUserReportListHelper

  static override getModuleName() {
    return 'recently-viewed-list'
  }

  override initialise() {
    this.viewedList = document.getElementById('dpr-recently-viewed-component')
    if (this.viewedList) {
      this.userReportsListHelper = new DprUserReportListHelper(this.viewedList, ListType.VIEWED)

      // Init remove action
      this.userReportsListHelper.initItemActions()

      // Viewed reports should only check expired status as they are already in FINISHED status
      this.userReportsListHelper.initExpiredPollingInterval()
    }
  }
}

export { DprRecentlyViewedList }
export default DprRecentlyViewedList
