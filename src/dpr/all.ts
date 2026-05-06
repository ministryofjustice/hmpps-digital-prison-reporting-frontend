// @ts-nocheck
/* eslint-disable no-new */
/* global dayjs */
import dayjs from 'dayjs'
import customParse from 'dayjs/plugin/customParseFormat'

// General Components
import CardGroup from './components/card-group/clientClass'
import BookmarkButton from './components/bookmark/clientClass'
import ShowMore from './components/show-more/clientClass'

// Catalogue
import Search from './components/_catalogue/catalogue-search/clientClass'
import UnauthorisedReportsFilter from './components/_catalogue/catalogue-unauthorised-toggle/clientClass'
import ReportTypeFilter from './components/_catalogue/catalogue-filter-by-type/clientClass'

// Reports
import Pagination from './components/_reports/report-page/report-template/report-pagination/clientClass'
import ReportActions from './components/_reports/report-heading/report-actions/clientClass'
import DataTable from './components/_reports/report-page/report-template/report-section/report-data-table/clientClass'
import DownloadMessage from './components/_reports/report-heading/report-download-message/clientClass'

// Filters
import DprFiltersFormClass from './components/_async/async-filters-form/clientClass'
import DprSelectedAsyncFilters from './components/_async/async-filters-form/actions/selected-filters/clientClass'
import DprAppliedFilters from './components/_filters/filters-applied/clientClass'

// Async
import AsyncPolling from './components/_async/async-polling/clientClass'

// Sync
import SyncLoading from './DprSyncLoading'

// Inputs
import DateInput from './components/_inputs/date-input/clientClass'
import DateRange from './components/_inputs/date-range/clientClass'
import Autocomplete from './components/_inputs/autocomplete-text-input/clientClass'
import { GranularDateRange } from './components/_inputs/granular-date-range/clientClass'
import MultiselectInput from './components/_inputs/multi-select/clientClass'

// My Reports
import DprMyReports from './components/my-reports/my-reports-list/clientClass'

// Charts
import BarChartVisualisation from './components/_charts/chart/bar/clientClass'
import DoughnutChartVisualisation from './components/_charts/chart/doughnut/clientClass'
import LineChartVisualisation from './components/_charts/chart/line/clientClass'
import MatrixChartVisualisation from './components/_charts/chart/heatmap/clientClass'

// Dashboards
import ScoreCard from './components/_dashboards/scorecard/clientClass'

/**
 * Initialise all components
 *
 * Use the `data-dpr-module` attributes to find, instantiate and initialise all the
 * components provided as part of DPR Frontend.
 *
 */
function initAll() {
  const components = [
    Autocomplete,
    CardGroup,
    Pagination,
    DataTable,
    AsyncPolling,
    Search,
    UnauthorisedReportsFilter,
    ReportTypeFilter,
    BookmarkButton,
    DateInput,
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
    MultiselectInput,
    DprFiltersFormClass,
    DprSelectedAsyncFilters,
    DprAppliedFilters,
    DprMyReports,
  ]

  dayjs.extend(customParse)

  components.forEach((Component) => {
    const $elements = document.querySelectorAll(`[data-dpr-module="${Component.getModuleName()}"]`)
    $elements.forEach(async ($element) => {
      try {
        new Component($element).initialise()
      } catch (error) {
        console.log(error)
      }
    })
  })
}

export { initAll }
