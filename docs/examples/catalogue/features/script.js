import { initCatalogue } from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/catalogueUtils'

export function routes(services) {
  app.get('/catalogue', (req, res, next) => async (req, res) => {
    const catalogue = await initCatalogue({
      res,
      services,
      features: {
        bookmarkingEnabled: true,
        unauthorisedToggleEnabled: false,
      },
    })

    res.render('catalogue.njk', {
      catalogue,
    })
  })
}

export default routes