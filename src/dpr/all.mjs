/* eslint-disable no-new */
/* global dayjs */

import Autocomplete from './components/autocomplete-text-input/clientClass.mjs'
import CardGroup from './components/card-group/clientClass.mjs'
import Filters from './components/filters/clientClass.mjs'
import Columns from './components/columns/clientClass.mjs'
import ToggleButton from './components/toggle-button/clientClass.mjs'
import AsyncFilters from './components/async-filters/clientClass.mjs'
import Pagination from './components/pagination/clientClass.mjs'
import IconButtonList from './components/icon-button-list/clientClass.mjs'
import DataTable from './components/data-table/clientClass.mjs'
import AsyncPolling from './components/async-polling/clientClass.mjs'
import Search from './components/search/clientClass.mjs'
import BookmarkToggle from './components/bookmark-toggle/clientClass.mjs'
import DprLoadingHelper from './DprLoadingHelper.mjs'
import DateInput from './components/date-input/clientClass.mjs'
import AsyncRequestList from './components/async-request-list/clientClass.mjs'
import RecentlyViewedList from './components/recently-viewed-list/clientClass.mjs'
import DateRange from './components/date-range/clientClass.mjs'
import ShowMore from './components/show-more/clientClass.mjs'
import BarChartVisualisation from './components/chart/bar/clientClass.mjs'
import DoughnutChartVisualisation from './components/chart/doughnut/clientClass.mjs'
import LineChartVisualisation from './components/chart/line/clientClass.mjs'
import DownloadFeedbackForm from './components/download-feeback-form/cientClass.mjs'
import LoadDashboard from './DprLoadDashboard.mjs'
import ScoreCard from './components/scorecard/clientClass.mjs'
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
    ToggleButton,
    AsyncFilters,
    Pagination,
    IconButtonList,
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
