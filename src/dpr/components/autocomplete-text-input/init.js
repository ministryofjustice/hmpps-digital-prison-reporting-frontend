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
      // template.css('display', 'none')
      $(listItemsSelector).remove()
      $(listParentSelector).append(template)
      return template
    }

    function addItem(template, keepEvents, content) {
      const item = template.clone(keepEvents, true)
      item.children('button').html(content)
      item.css('display', '')
      $(listParentSelector).append(item)
    }

    if (resourceEndpoint) {
      if (searchValue.length >= minLength) {
        addItem(clearListAndRecreateTemplate(), false, '<i>Searching...</i>')

        $.get(resourceEndpoint.replace('{prefix}', encodeURI(searchValue)))
          .done( (results) => {
            const template = clearListAndRecreateTemplate()

            results.forEach(r => {
              addItem(template, true, r)
            })
        })
        .fail( (data, status, statusText) => {
          addItem(clearListAndRecreateTemplate(), false, 'Failed to retrieve results: ' + statusText)
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
