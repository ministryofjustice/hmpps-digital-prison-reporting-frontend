import CatalogueUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/_catalogue/catalogue/utils'

export function routes(services) {
  app.get('/catalogue', (req, res, next) => async (req, res) => {
    const catalogue = await CatalogueUtils.init({
      res,
      services,
      features: {
        filteringEnabled: false,
        unauthorisedToggleEnabled: false,
        howToUseEnabled: false,
      },
    })

    res.render('catalogue.njk', {
      catalogue,
    })
  })
}

export default routes