$('[data-click-navigate-to]').each((index, element) => {
  const jElement = $(element)
  jElement.on('click', () => {
    window.location.href = jElement.attr('data-click-navigate-to')
  })
})
