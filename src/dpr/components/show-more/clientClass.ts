import { DprClientClass } from '../../DprClientClass'

class ShowMore extends DprClientClass {
  static getModuleName() {
    return 'show-more'
  }

  initialise() {
    this.initShowMore()
  }

  initShowMore() {
    const element = this.getElement()
    const textContainer = element.querySelector('.dpr-show-more-content')
    const button = element.querySelector('.dpr-show-hide-button')
    const textContent = element.getAttribute('data-content')
    const length = +element.getAttribute('data-length') || 200
    const shortString = textContent.replaceAll(/<[^>]+>/g, '').substring(0, length)

    if (textContent.length > length) {
      textContainer.innerHTML = `${shortString}... `
    } else {
      textContainer.innerHTML = `${textContent}`
      button.style.display = 'none'
    }

    button.addEventListener('click', (event) => {
      event.preventDefault()
      if (button.innerHTML === 'show more') {
        textContainer.innerHTML = `${textContent}  `
        button.innerHTML = 'show less'
      } else if (button.innerHTML === 'show less') {
        textContainer.innerHTML = `${shortString}... `
        button.innerHTML = 'show more'
      }
    })
  }
}

export { ShowMore }
export default ShowMore
