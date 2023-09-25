$(function () {
  $('[data-apply-form-to-querystring=true]').on('click', function () {
    const formSelector = $(this).data('apply-form-selector')
    let url = $(this).data('apply-base-url')

    if (url.indexOf('?') === -1) {
      url += '?'
    } else {
      url += '&'
    }

    url += $(formSelector).serialize()
    url = url.replaceAll('?&', '?').replaceAll('&&', '&')

    window.location.href = url
  })
})
