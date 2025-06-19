// Set up routes
const homepageMenuCards = [
  {
    text: 'DPR Service',
    description: 'Reports that are requested and displayed separately.',
    href: '/dpr-service',
  },
  {
    text: 'DPR Sync reports',
    description: 'DPR service reports that return immediately.',
    href: '/sync-reports',
  },
  {
    text: 'Embedded reports',
    description: 'Embedded reports solutions',
    href: '/embedded-reports',
  },
  {
    text: 'Components',
    description: 'Component testing',
    href: '/components',
  },
]

const homepageRoutes = (app) => {
  app.get('/', (req, res) => {
    res.render('views/pages/menu.njk', {
      title: 'DPR test site',
      cards: homepageMenuCards,
    })
  })
}

module.exports = homepageRoutes
