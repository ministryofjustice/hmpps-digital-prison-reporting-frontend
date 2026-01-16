/* eslint-disable no-new */
/* global dayjs */
import jquery from 'jquery'
import dayjs from 'dayjs'
import customParse from 'dayjs/plugin/customParseFormat'

// Helper
import DprLoadingHelper from './DprLoadingHelper.mjs'

// General Components
import CardGroup from './components/card-group/clientClass.mjs'
import BookmarkToggle from './components/bookmark-toggle/clientClass.mjs'
import ShowMore from './components/show-more/clientClass.mjs'

// Catalogue
import Search from './components/_catalogue/catalogue-search/clientClass.mjs'
import UnauthorisedReportsFilter from './components/_catalogue/catalogue-unauthorised-toggle/clientClass.mjs'
import ReportTypeFilter from './components/_catalogue/catalogue-filter-by-type/clientClass.mjs'

// Reports
import Pagination from './components/_reports/report-pagination/clientClass.mjs'
import ReportActions from './components/_reports/report-actions/clientClass.mjs'
import DataTable from './components/_reports/report-data-table/clientClass.mjs'
import Columns from './components/_reports/report-columns-form/clientClass.mjs'
import DownloadMessage from './components/_reports/report-download-message/clientClass.mjs'

// Filters
import InteractiveFilters from './components/_filters/filters-interactive/clientClass.mjs'

// Async
import AsyncPolling from './components/_async/async-polling/clientClass.mjs'
import AsyncFilters from './components/_async/async-filters-form/clientClass.mjs'

// Sync
import SyncLoading from './DprSyncLoading.mjs'

// Inputs
import DateInput from './components/_inputs/date-input/clientClass.mjs'
import DateRange from './components/_inputs/date-range/clientClass.mjs'
import Autocomplete from './components/_inputs/autocomplete-text-input/clientClass.mjs'
import GranularDateRange from './components/_inputs/granular-date-range/clientClass.mjs'

// User repoorts
import RequestedReportsList from './components/user-reports/requested/clientClass.mjs'
import RecentlyViewedList from './components/user-reports/viewed/clientClass.mjs'

// Charts
import BarChartVisualisation from './components/_charts/chart/bar/clientClass.mjs'
import DoughnutChartVisualisation from './components/_charts/chart/doughnut/clientClass.mjs'
import LineChartVisualisation from './components/_charts/chart/line/clientClass.mjs'
import MatrixChartVisualisation from './components/_charts/chart/heatmap/clientClass.mjs'

// Dashboards
import ScoreCard from './components/_dashboards/scorecard/clientClass.mjs'

// Forms
import GenericForm from './DprGenericFormClass.mjs'

/**
 * Initialise all components
 *
 * Use the `data-dpr-module` attributes to find, instantiate and initialise all the
 * components provided as part of DPR Frontend.
 *
 */
function initAll() {
  const loadingHelper = new DprLoadingHelper()

  const components = [
    Autocomplete,
    CardGroup,
    Columns,
    AsyncFilters,
    InteractiveFilters,
    Pagination,
    DataTable,
    AsyncPolling,
    Search,
    UnauthorisedReportsFilter,
    ReportTypeFilter,
    BookmarkToggle,
    DateInput,
    RequestedReportsList,
    RecentlyViewedList,
    DateRange,
    ShowMore,
    BarChartVisualisation,
    DoughnutChartVisualisation,
    LineChartVisualisation,
    MatrixChartVisualisation,
    ScoreCard,
    ReportActions,
    DownloadMessage,
    SyncLoading,
    GranularDateRange,
    GenericForm,
  ]

  dayjs.extend(customParse)

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

export { initAll }
