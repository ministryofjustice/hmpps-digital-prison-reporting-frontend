export class DprClientClass {
  element: HTMLElement

  constructor(element: HTMLElement) {
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
