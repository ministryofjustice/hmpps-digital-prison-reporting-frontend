import { DprClientClass } from '../../../DprClientClass'

class Scorecard extends DprClientClass {
  scorecard: HTMLElement | null = null
  value: HTMLElement | null = null
  ragStatus: HTMLElement | null = null

  static override getModuleName() {
    return 'scorecard'
  }

  override initialise() {
    this.scorecard = this.getElement()
    this.value = this.scorecard.querySelector('.dpr-scorecard__value')
    this.ragStatus = this.scorecard.querySelector('.dpr-scorecard__value-description')
    if (this.ragStatus) this.initHover()
  }

  initHover() {
    this.value?.addEventListener('mouseover', async () => {
      this.ragStatus?.classList.add('dpr-scorecard__value-description--active')
    })
    this.value?.addEventListener('mouseout', async () => {
      this.ragStatus?.classList.remove('dpr-scorecard__value-description--active')
    })
  }
}

export { Scorecard }
export default Scorecard
