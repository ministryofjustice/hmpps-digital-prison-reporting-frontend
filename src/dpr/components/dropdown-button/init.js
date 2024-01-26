/* global $ */

$(function () {
  $('[data-toggle-target]').each((index, element) => {
    $(element).on('click', (event) => {
      event.stopPropagation()

      if ($(element).attr('aria-expanded') !== 'true') {
        $($(element).data('toggle-target')).css('display', '')
        $(element).attr('aria-expanded', 'true')
      } else {
        $($(element).data('toggle-target')).css('display', 'none')
        $(element).attr('aria-expanded', 'false')
      }
    })

    $('body').on('click', () => {
      $($(element).data('toggle-target')).css('display', 'none')
      $(element).attr('aria-expanded', 'false')
    })
  })
})
