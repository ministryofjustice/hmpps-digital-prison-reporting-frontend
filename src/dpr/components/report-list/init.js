$(function () {
  $('#filter-bar').each(function (index, element) {
    // eslint-disable-next-line no-new
    // @ts-ignore
    new MOJFrontend.FilterToggleButton({
      startHidden: true,
      toggleButton: {
        container: $(element),
        showText: 'Show filter',
        hideText: 'Hide filter',
        classes: 'govuk-button--primary filter-summary-show-filter-button',
      },
      filter: {
        container: $('.moj-filter'),
      },
    })
  })
})
