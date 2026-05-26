import { DprClientClass } from '../../DprClientClass'

class ShowMore extends DprClientClass {
  static override getModuleName() {
    return 'show-more'
  }

  override initialise() {
    this.initShowMore()
  }

  initShowMore() {
    const element = this.getElement()
    const textContainer = element.querySelector('.dpr-show-more-content')
    const button = element.querySelector<HTMLElement>('.dpr-show-hide-button')
    const textContent = element.getAttribute('data-content') ?? ''
    const length = Number(element.getAttribute('data-length')) || 200
    const shortString = textContent.replaceAll(/<[^>]+>/g, '').substring(0, length)

    if (textContent.length > length) {
      if (textContainer) {
        textContainer.innerHTML = `${shortString}... `
      }
    } else {
      if (textContainer) {
        textContainer.innerHTML = `${textContent}`
      }

      if (button) {
        button.style.display = 'none'
      }

    }

    button?.addEventListener('click', (event) => {
      event.preventDefault()
      if (button.innerHTML === 'show more') {
        if(textContainer) {
          textContainer.innerHTML = `${textContent}  `
        }

        button.innerHTML = 'show less'
      } else if (button.innerHTML === 'show less') {
          if (textContainer) {
            textContainer.innerHTML = `${shortString}... `
          }

        button.innerHTML = 'show more'
      }
    })
  }
}

export { ShowMore }
export default ShowMore
