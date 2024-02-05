$(function () {
  $('[data-apply-columns-to-querystring=true]').on('click', function () {
    const formSelector = $(this).data('apply-form-selector')
    
    const colsRegExp = new RegExp("columns=[^&]*", "g")
    let url = decodeURI(window.location.href).replaceAll(colsRegExp,"")

    if (url.indexOf("?") === -1) {
      url += "?";
    } else {
      url += "&";
    }

    url += $(formSelector).serialize().replaceAll("filters.","");
    url = url
      .replaceAll("?&","?")
      .replaceAll("&&","&")

    window.location.href = url
  })
})