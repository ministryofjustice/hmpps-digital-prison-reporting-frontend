app.get('/', (req, res, next) => {
  reportListUtils.renderList({
    title: 'Test app',
    fields: [
      {

      }
    ],
    request: req,
    response: res,
    next,
    getListDataSources: () => ({
      data: Promise.resolve(data),
      count: Promise.resolve(data.length),
    }),
    otherOptions: {
      hiddenFooter: true,
    },
    layoutTemplate: 'page.njk',
  })
})