/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */

export class DprClientClass {
  constructor(element, loadingHelper) {
    this.element = element
    this.loadingHelper = loadingHelper
  }

  static getModuleName() {
    throw new Error('Module name not set')
  }

  getElement() {
    return this.element
  }

  initialise() {
    throw new Error('Initialisation not configured')
  }
}
