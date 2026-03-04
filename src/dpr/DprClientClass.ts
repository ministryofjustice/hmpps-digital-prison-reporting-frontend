export class DprClientClass {
  element: Element

  constructor(element: Element) {
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
