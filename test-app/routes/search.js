const searchRoutes = (app) => {
  app.get('/search', (req, res) => {
    res.render('views/pages/search.njk', {
      title: 'Search',
      head: [{ text: 'Product' }, { text: 'Name' }],
      rows: [
        [{ text: 'Product one' }, { text: 'Report one' }],
        [{ text: 'Product one' }, { text: 'Report two' }],
        [{ text: 'Product two' }, { text: 'Report three' }],
        [{ text: 'Product two' }, { text: 'Report four' }],
        [{ text: 'Product three' }, { text: 'Report five' }],
        [{ text: 'Product three' }, { text: 'Report six' }],
      ],
    })
  })
}

module.exports = searchRoutes
