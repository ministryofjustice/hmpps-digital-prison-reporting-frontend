const componentsMenuCards = [
  {
    text: 'Search',
    description: 'Search component.',
    href: '/search',
  },
  {
    text: 'Charts',
    description: 'Chart Visualisations',
    href: '/charts',
  },
  {
    text: 'Scorecards',
    description: 'Metric scorecards',
    href: '/scorecards',
  },
]

const componenentsRoutes = (app) => {
  app.get('/components', (req, res) => {
    res.render('views/pages/menu.njk', {
      title: 'Components',
      cards: componentsMenuCards,
      breadCrumbList: [{ text: 'Home', href: '/' }],
    })
  })
}

module.exports = componenentsRoutes
