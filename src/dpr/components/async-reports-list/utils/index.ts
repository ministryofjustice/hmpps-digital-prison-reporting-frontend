import { AsyncReportUtilsParams } from '../../../types/AsyncReportUtils'
import AsyncCardGroupUtils from './asyncReportsUtils'
import RecentlyViewedCardGroupUtils from './recentlyViewedUtils'

export { AsyncCardGroupUtils, RecentlyViewedCardGroupUtils }

export default {
  renderList: async ({ asyncReportsStore, recentlyViewedStoreService, dataSources, res }: AsyncReportUtilsParams) => {
    return {
      requestedReports: {
        ...(await AsyncCardGroupUtils.renderAsyncReportsList({ asyncReportsStore, dataSources, res })),
      },
      viewedReports: {
        ...(await RecentlyViewedCardGroupUtils.renderRecentlyViewedList({
          recentlyViewedStoreService,
          asyncReportsStore,
          dataSources,
          res,
        })),
      },
    }
  },
}
