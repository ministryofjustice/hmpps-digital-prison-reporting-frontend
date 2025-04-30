import CatalogueUtils from '@ministryofjustice/hmpps-digital-prison-reporting-frontend/dpr/components/_catalogue/catalogue/utils'

export default function routes(services) {
  app.get('/catalogue', (req, res, next) => async (req, res) => {
    const catalogue = await CatalogueUtils.init({
      title: 'My reports',
      res,
      services,
    })

    res.render('catalogue.njk', {
      catalogue,
    })
  })
}
