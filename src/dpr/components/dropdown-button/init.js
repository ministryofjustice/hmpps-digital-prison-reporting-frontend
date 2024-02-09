/* global $ */

$(function () {
  $('[data-toggle-target]').each((index, element) => {
    $(element).on('click', (event) => {
      event.stopPropagation()

      if ($(element).getAttribute('aria-expanded') !== 'true') {
        $($(element).dataset.toggleTarget).css('display', 'inline-block')
        $(element).setAttribute('aria-expanded', 'true')
      } else {
        $($(element).dataset.toggleTarget).css('display', 'none')
        $(element).setAttribute('aria-expanded', 'false')
      }
    })

    $('body').on('click', () => {
      $($(element).dataset.toggleTarget).css('display', 'none')
      $(element).setAttribute('aria-expanded', 'false')
    })
  })
})
