/* global $ */

$(function () {
  $('[data-apply-columns-to-querystring=true]').on('click', function () {
    const formSelector = $(this).data('apply-form-selector')
    const columnsFormInputs = $(formSelector)
    const columnsForm = $(`${formSelector} input`)
    const colsRegExp = /columns=[^&]*/g
    const ampRexEx = /([&])\1+/g

    // get all disabled/mandatorty columns and enable temporarily
    const disabled = columnsFormInputs.find("input[type='checkbox']:disabled").removeAttr('disabled')
    // Then serialize to get all checkbox values
    const serializedFormData = columnsForm.serialize()
    // Then re-disable
    disabled.attr('disabled', true)

    let url = decodeURI(window.location.href).replaceAll(colsRegExp, '')
    url += url.indexOf('?') === -1 ? '?' : '&'
    url += serializedFormData
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
