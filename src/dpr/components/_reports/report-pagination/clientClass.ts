import DprQueryParamClass from '../../../DprQueryParamClass'

class Pagination extends DprQueryParamClass {
  static getModuleName() {
    return 'pagination'
  }

  initialise() {
    this.pageSizeSelect = document.getElementById('page-size-select')

    this.initInputsFromQueryParams()
    this.initSelectEvent()
  }

  initSelectEvent() {
    this.pageSizeSelect.addEventListener('change', () => {
      this.queryParams = new URLSearchParams(window.location.search)
      const { name, value } = this.pageSizeSelect
      this.queryParams.set(name, value)
      this.queryParams.set('selectedPage', '1')
      window.history.replaceState(null, null, `?${this.queryParams.toString()}`)
      window.location.reload()
    })
  }
}

export { Pagination }
export default Pagination
