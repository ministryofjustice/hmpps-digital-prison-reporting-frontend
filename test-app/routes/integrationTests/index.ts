import { Express } from 'express'

// Set up routes
const components = [
  {
    text: 'Async filters form',
    description: 'Async filters form',
    href: '/asyncFiltersForm',
  },
]

export const routes = (app: Express) => {
  app.get('/', (_, res) => {
    res.render('routes/integrationTests/components.njk', {
      title: 'Components links for integration testing',
      cards: components,
    })
  })
}
