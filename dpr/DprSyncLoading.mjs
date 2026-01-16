/* eslint-disable class-methods-use-this */
import { DprClientClass } from './DprClientClass.mjs'

class DprSyncLoading extends DprClientClass {
  static getModuleName() {
    return 'sync-loading'
  }

  initialise() {
    this.element = this.getElement()
    this.form = this.element.querySelector('#dpr-sync-loading-form')

    this.load()
  }

  async load() {
    this.form.submit()
  }
}

export { DprSyncLoading }
export default DprSyncLoading
