import { DprClientClass } from '../../../DprClientClass.mjs'

class Pagination extends DprClientClass {
  static getModuleName() {
    return 'scorecard'
  }

  initialise() {
    this.scorecard = this.getElement()
    this.value = this.scorecard.querySelector('.dpr-scorecard__value')
    this.ragStatus = this.scorecard.querySelector('.dpr-scorecard__value-description')
    this.initHover()
  }

  initHover() {
    this.value.addEventListener('mouseover', async () => {
      this.ragStatus.classList.add('dpr-scorecard__value-description--active')
    })
    this.value.addEventListener('mouseout', async () => {
      this.ragStatus.classList.remove('dpr-scorecard__value-description--active')
    })
  }
}

export { Pagination }
export default Pagination
