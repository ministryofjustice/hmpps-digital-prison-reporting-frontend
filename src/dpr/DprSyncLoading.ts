/* eslint-disable class-methods-use-this */
import { DprClientClass } from './DprClientClass'

class DprSyncLoading extends DprClientClass {
  private form: HTMLFormElement | null = null

  static override getModuleName() {
    return 'sync-loading'
  }

  override initialise() {
    this.element = this.getElement()
    this.form = this.element.querySelector('#dpr-sync-loading-form')

    this.load()
  }

  async load() {
    this.form?.submit()
  }
}

export { DprSyncLoading }
export default DprSyncLoading
