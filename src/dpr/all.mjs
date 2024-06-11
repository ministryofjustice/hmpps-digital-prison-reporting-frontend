/* eslint-disable no-new */

import Autocomplete from './components/autocomplete-text-input/clientClass.mjs'
import CardGroup from './components/card-group/clientClass.mjs'
import DataTable from './components/data-table/clientClass.mjs'
import DropDownButton from './components/dropdown-button/clientClass.mjs'
import Filters from './components/filters/clientClass.mjs'
import Columns from './components/columns/clientClass.mjs'
import Daterange from './components/date-range/clientClass.mjs'
import PrintButton from './components/print-button/clientClass.mjs'
import CopyUrlButton from './components/copy-url-button/clientClass.mjs'
import ToggleButton from './components/toggle-button/clientClass.mjs'
import AsyncFilters from './components/async-filters/clientClass.mjs'
import AsyncColumns from './components/async-columns/clientClass.mjs'
import Pagination from './components/pagination/clientClass.mjs'
import IconButtonList from './components/icon-button-list/clientClass.mjs'
import AsyncDataTable from './components/async-data-table/clientClass.mjs'
import AsyncPolling from './components/async-polling/clientClass.mjs'

/**
 * Initialise all components
 *
 * Use the `data-dpr-module` attributes to find, instantiate and initialise all the
 * components provided as part of DPR Frontend.
 *
 */
export default function initAll () {
  const components = [
    Autocomplete,
    CardGroup,
    Columns,
    DataTable,
    DropDownButton,
    Filters,
    Daterange,
    PrintButton,
    CopyUrlButton,
    ToggleButton,
    AsyncFilters,
    AsyncColumns,
    Pagination,
    IconButtonList,
    AsyncDataTable,
    AsyncPolling,
  ]

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
