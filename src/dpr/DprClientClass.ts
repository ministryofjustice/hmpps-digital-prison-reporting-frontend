// @ts-nocheck
export class DprClientClass {
  constructor(element) {
    this.element = element
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
