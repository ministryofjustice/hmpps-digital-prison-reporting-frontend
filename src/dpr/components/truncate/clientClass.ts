import { DprClientClass } from '../../DprClientClass'

export class dprTruncate extends DprClientClass {
  static override getModuleName() {
    return 'dpr-truncate'
  }

  override initialise() {
    this.initShowMore()
  }

  initShowMore() {
    const container = this.getElement()

    const content = container.querySelector<HTMLElement>('.js-content')
    const button = container.querySelector<HTMLButtonElement>('.js-show-more')

    if (!content || !button) {
      return
    }

    const fullHtml = content.dataset['fullHtml'] ?? ''
    const truncatedHtml = content.dataset['truncatedHtml'] ?? ''

    button.addEventListener('click', () => {
      const expanded = container.dataset['expanded'] === 'true'

      if (expanded) {
        content.innerHTML = truncatedHtml
        button.textContent = 'Show more'
      } else {
        content.innerHTML = fullHtml
        button.textContent = 'Show less'
      }

      container.dataset['expanded'] = String(!expanded)
    })
  }
}
