class Pagination {
  private pageSizeSelect!: HTMLInputElement

  static getModuleName() {
    return 'pagination'
  }

  initialise() {
    this.pageSizeSelect = document.getElementById('page-size-select') as HTMLInputElement
    this.initPageSizeSelectEvent()
  }

  initPageSizeSelectEvent() {
    this.pageSizeSelect.addEventListener('change', () => {
      const { name, value } = this.pageSizeSelect

      const queryParams = new URLSearchParams(window.location.search)
      queryParams.set(name, value)
      queryParams.set('selectedPage', '1')

      window.history.replaceState(null, '', `?${queryParams.toString()}`)
      window.location.reload()
    })
  }
}

export { Pagination }
export default Pagination
