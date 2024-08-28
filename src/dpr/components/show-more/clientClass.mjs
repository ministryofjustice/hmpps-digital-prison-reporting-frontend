import { DprClientClass } from '../../DprClientClass.mjs'

export default class ShowMore extends DprClientClass {
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
    const shortString = textContent.substring(0, 200)

    if (textContent.length > 200) {
      textContainer.innerHTML = `${shortString}... `
    } else {
      button.style.display = 'none'
    }

    button.addEventListener('click', (event) => {
      event.preventDefault()
      if (button.innerHTML === 'Show more') {
        textContainer.innerHTML = `${textContent}  `
        button.innerHTML = 'Show less'
      } else if (button.innerHTML === 'Show less') {
        textContainer.innerHTML = `${shortString}... `
        button.innerHTML = 'Show more'
      }
    })
  }
}
