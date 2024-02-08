/* global $ */

$(function () {
  $('[data-apply-form-to-querystring=true]').on('click', function () {
    const formSelector = $(this).data('apply-form-selector')
    const filtersRegExp = /filters[.\w]+=[^&]*/g
    const pagingRegExp = /paging\.selectedPage=\d+/
    const ampRexExp = /([&])\1+/g

    let url = decodeURI(window.location.href)
      .replaceAll(filtersRegExp, '')
      .replace(pagingRegExp, 'paging.selectedPage=1')

    url += url.indexOf('?') === -1 ? '?' : '&'
    url += $(formSelector).serialize()
    url = url.replaceAll('?&', '?').replaceAll(ampRexExp, '&')

    window.location.href = url
  })

  $('[data-reset-filters=true]').on('click', function () {
    const resetColsRegExp = /&?columns=[^&]*/g
    const columnsQuery = window.location.href.match(resetColsRegExp)
    const baseUrl = $(this).data('apply-base-url')

    let url = baseUrl
    if (columnsQuery) url += columnsQuery.join('')
    window.location.href = url
  })
})
