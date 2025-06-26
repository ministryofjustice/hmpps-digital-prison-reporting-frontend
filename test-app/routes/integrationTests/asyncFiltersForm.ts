import { Express } from "express"

const chartsRoutes = (app: Express) => {
  app.get('/charts', (_, res) => {
    res.render('../src/dpr/components/_async/async-filters-form/view.njk', {
      title: 'Async filter form',
    })
  })
}