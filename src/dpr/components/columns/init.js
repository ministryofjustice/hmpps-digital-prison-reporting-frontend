/* global $ */

$(function () {
  $('[data-apply-columns-to-querystring=true]').on('click', function () {
    const formSelector = $(this).data('apply-form-selector')
    const colsRegExp = /columns=[^&]*/g
    const ampRexEx = /([&])\1+/g

    let url = decodeURI(window.location.href).replaceAll(colsRegExp, '')
    url += url.indexOf('?') === -1 ? '?' : '&'
    url += $(formSelector).serialize()
    url = url.replaceAll('columns.', '').replaceAll('?&', '?').replaceAll(ampRexEx, '&')

    window.location.href = url
  })

  $('[data-reset-columns=true]').on('click', function () {
    const resetColsRegExp = /&?columns=[^&]*/g
    let url = decodeURI(window.location.href).replaceAll(resetColsRegExp, '')
    url += url.indexOf('?') === -1 ? '?' : '&'
    window.location.href = url
  })
})
