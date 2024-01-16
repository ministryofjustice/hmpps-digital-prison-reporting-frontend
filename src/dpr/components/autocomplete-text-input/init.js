$('.autocomplete-text-input-box').each((index, element) => {
  $(element).on('keyup', (event) => {
    const listId = $(element).attr('aria-owns')
    const minLength = Number($(element).data('minimum-length'))
    const resourceEndpoint = $(element).data('resource-endpoint')
    const searchValue = event.target.value.toLowerCase()
    const listItemsSelector = `#${listId} li`
    const listParentSelector = `#${listId} ul`

    function clearListAndRecreateTemplate() {
      const template = $(listItemsSelector).first().clone(true, true)
      $(listItemsSelector).remove()
      $(listParentSelector).append(template)
      return template
    }

    if (resourceEndpoint) {
      if (searchValue.length >= minLength) {
        $.get(resourceEndpoint + encodeURI(searchValue))
          .done( (results) => {
            const template = clearListAndRecreateTemplate()

            results.forEach(r => {
              const item = template.clone(true, true)
              item.children('button').text(r)
              item.css('display', '')
              $(listParentSelector).append(item)
            })
        })
        .fail( (data, status, statusText) => {
          const item = clearListAndRecreateTemplate().clone(false, true)
          item.children('button').text('Failed to retrieve results: ' + statusText)
          item.css('display', '')
          $(listParentSelector).append(item)
        })
      } else {
        clearListAndRecreateTemplate()
      }
    } else {
      $(listItemsSelector).each((itemIndex, item) => {
        if (searchValue.length >= minLength && $(item).text().trim().toLowerCase().startsWith(searchValue)) {
          $(item).css('display', '')
        } else {
          $(item).css('display', 'none')
        }
      })
    }
  })
})

$('.autocomplete-text-input-list-button').each((index, element) => {
  $(element).on('click', (event) => {
    const parentSelector = '#' + $(event.target).data('parent-input').replaceAll('.', '\\\.')
    const parent = $(parentSelector)
    const listId = parent.attr('aria-owns')

    parent.val($(event.target).text().trim())
    parent.trigger('focus')

    $(`#${listId} li`).each((itemIndex, item) => {
      $(item).css('display', 'none')
    })
  })
})
