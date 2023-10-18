const data = require('../../../test-app/data')
app.get('/', (req, res, next) => {
  reportListUtils.renderList({
    title: 'Test app',
    fields,
    request: req,
    response: res,
    next,
    getListDataSources: () => ({
      data: Promise.resolve(data),
      count: Promise.resolve(data.length),
    }),
    otherOptions: {
      cards: [
        { text: 'One', description: 'The first card', href: '#one' },
        { text: 'Two', description: 'The second card', href: '#two' },
        { text: 'Three', description: 'The third card', href: '#three' },
      ],
    },
    layoutTemplate: 'page.njk',
  })
})