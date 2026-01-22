// @ts-nocheck
/* eslint-disable no-new */
/* global dayjs */
import jquery from 'jquery'
import dayjs from 'dayjs'
import customParse from 'dayjs/plugin/customParseFormat'

// Helper
import DprLoadingHelper from './DprLoadingHelper'

// General Components
import CardGroup from './components/card-group/clientClass'
import BookmarkToggle from './components/bookmark-toggle/clientClass'
import ShowMore from './components/show-more/clientClass'

// Catalogue
import Search from './components/_catalogue/catalogue-search/clientClass'
import UnauthorisedReportsFilter from './components/_catalogue/catalogue-unauthorised-toggle/clientClass'
import ReportTypeFilter from './components/_catalogue/catalogue-filter-by-type/clientClass'

// Reports
import Pagination from './components/_reports/report-pagination/clientClass'
import ReportActions from './components/_reports/report-actions/clientClass'
import DataTable from './components/_reports/report-data-table/clientClass'
import Columns from './components/_reports/report-columns-form/clientClass'
import DownloadMessage from './components/_reports/report-download-message/clientClass'

// Filters
import InteractiveFilters from './components/_filters/filters-interactive/clientClass'

// Async
import AsyncPolling from './components/_async/async-polling/clientClass'
import AsyncFilters from './components/_async/async-filters-form/clientClass'

// Sync
import SyncLoading from './DprSyncLoading'

// Inputs
import DateInput from './components/_inputs/date-input/clientClass'
import DateRange from './components/_inputs/date-range/clientClass'
import Autocomplete from './components/_inputs/autocomplete-text-input/clientClass'
import GranularDateRange from './components/_inputs/granular-date-range/clientClass'

// User repoorts
import RequestedReportsList from './components/user-reports/requested/clientClass'
import RecentlyViewedList from './components/user-reports/viewed/clientClass'

// Charts
import BarChartVisualisation from './components/_charts/chart/bar/clientClass'
import DoughnutChartVisualisation from './components/_charts/chart/doughnut/clientClass'
import LineChartVisualisation from './components/_charts/chart/line/clientClass'
import MatrixChartVisualisation from './components/_charts/chart/heatmap/clientClass'

// Dashboards
import ScoreCard from './components/_dashboards/scorecard/clientClass'

// Forms
import GenericForm from './DprGenericFormClass'

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
