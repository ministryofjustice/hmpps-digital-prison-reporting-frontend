/* eslint-disable no-new */
/* global dayjs */

import Autocomplete from './components/_inputs/autocomplete-text-input/clientClass.mjs'
import CardGroup from './components/card-group/clientClass.mjs'
import Filters from './components/filters/clientClass.mjs'
import Columns from './components/_reports/report-columns-form/clientClass.mjs'
import AsyncFilters from './components/_async/async-filters-form/clientClass.mjs'
import InteractiveFilters from './components/interactive-filters/clientClass.mjs'
import Pagination from './components/_reports/report-pagination/clientClass.mjs'
import ReportActions from './components/_reports/report-actions/clientClass.mjs'
import DataTable from './components/_reports/report-data-table/clientClass.mjs'
import AsyncPolling from './components/_async/async-polling/clientClass.mjs'
import Search from './components/search/clientClass.mjs'
import BookmarkToggle from './components/bookmark-toggle/clientClass.mjs'
import DprLoadingHelper from './DprLoadingHelper.mjs'
import DateInput from './components/_inputs/date-input/clientClass.mjs'
import AsyncRequestList from './components/user-reports/requested/clientClass.mjs'
import RecentlyViewedList from './components/user-reports/viewed/clientClass.mjs'
import DateRange from './components/_inputs/date-range/clientClass.mjs'
import ShowMore from './components/show-more/clientClass.mjs'
import BarChartVisualisation from './components/_charts/chart/bar/clientClass.mjs'
import DoughnutChartVisualisation from './components/_charts/chart/doughnut/clientClass.mjs'
import LineChartVisualisation from './components/_charts/chart/line/clientClass.mjs'
import DownloadFeedbackForm from './components/download-feeback-form/cientClass.mjs'
import LoadDashboard from './DprLoadDashboard.mjs'
import ScoreCard from './components/_dashboards/scorecard/clientClass.mjs'
import DownloadMessage from './components/_reports/report-download-message/clientClass.mjs'
/**
 * Initialise all components
 *
 * Use the `data-dpr-module` attributes to find, instantiate and initialise all the
 * components provided as part of DPR Frontend.
 *
 */
export default function initAll() {
  const loadingHelper = new DprLoadingHelper()

  const components = [
    Autocomplete,
    CardGroup,
    Columns,
    Filters,
    AsyncFilters,
    InteractiveFilters,
    Pagination,
    DataTable,
    AsyncPolling,
    Search,
    BookmarkToggle,
    DateInput,
    AsyncRequestList,
    RecentlyViewedList,
    DateRange,
    ShowMore,
    BarChartVisualisation,
    DoughnutChartVisualisation,
    LineChartVisualisation,
    LoadDashboard,
    DownloadFeedbackForm,
    ScoreCard,
    ReportActions,
    DownloadMessage,
  ]

  const customParseFormat = window.dayjs_plugin_customParseFormat
  dayjs.extend(customParseFormat)

  components.forEach((Component) => {
    const $elements = document.querySelectorAll(`[data-dpr-module="${Component.getModuleName()}"]`)
    $elements.forEach(async ($element) => {
      try {
        new Component($element, loadingHelper).initialise()
      } catch (error) {
        console.log(error)
      }
    })
  })
}
