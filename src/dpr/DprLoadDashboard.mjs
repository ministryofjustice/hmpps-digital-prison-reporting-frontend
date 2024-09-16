/* eslint-disable class-methods-use-this */
import { DprClientClass } from './DprClientClass.mjs'

export default class DprAsyncRequestList extends DprClientClass {
  static getModuleName() {
    return 'load-dashboard'
  }

  initialise() {
    this.element = this.getElement()
    this.form = this.element.querySelector('#dpr-dashboard-loading-form')

    this.load()
  }

  async load() {
    this.form.submit()
  }
}
