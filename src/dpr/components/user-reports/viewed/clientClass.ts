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
      this.userReportsListHelper.initItemActions()
      this.userReportsListHelper.initPollingIntervals()
    }
  }
}

export { DprRecentlyViewedList }
export default DprRecentlyViewedList
