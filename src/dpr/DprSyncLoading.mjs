/* eslint-disable class-methods-use-this */
import { DprClientClass } from './DprClientClass.mjs'

export default class DprSyncLoading extends DprClientClass {
  static getModuleName() {
    return 'sync-loading'
  }

  initialise() {
    this.element = this.getElement()
    this.form = this.element.querySelector('#dpr-sync-loading-form')

    this.load()
  }

  async load() {
    console.log('DprSyncLoading submit')
    this.form.submit()
  }
}
