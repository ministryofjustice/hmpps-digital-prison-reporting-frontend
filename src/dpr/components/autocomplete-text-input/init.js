$('.autocomplete-text-input-box').each((index, element) => {
  $(element).on('keyup', (event) => {
    const listId = $(element).attr('aria-owns')
    const minLength = Number($(element).data('minimum-length'))
    const searchValue = event.target.value.toLowerCase()

    $(`#${listId} li`).each((itemIndex, item) => {
      if (searchValue.length >= minLength && $(item).text().trim().toLowerCase().startsWith(searchValue)) {
        $(item).css('display', '')
      } else {
        $(item).css('display', 'none')
      }
    })
  })
})

$('.autocomplete-text-input-list-button').each((index, element) => {
  $(element).on('click', () => {
    const parentSelector = '#' + $(element).data('parent-input').replaceAll('.', '\\\.')
    const parent = $(parentSelector)
    const listId = parent.attr('aria-owns')

    parent.val($(element).text().trim())
    parent.trigger('focus')

    $(`#${listId} li`).each((itemIndex, item) => {
      $(item).css('display', 'none')
    })
  })
})
