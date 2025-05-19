const syncReportsMenuCards = [
  {
    text: 'Test report',
    description: 'Test sync report',
    href: '/sync/report/test-report-3/variantId-1/report',
  },
]

const syncRoutes = (app) => {
  app.get('/sync-reports', (req, res) => {
    res.render('menu.njk', {
      title: 'DPR Sync reports',
      cards: syncReportsMenuCards,
      breadCrumbList: [{ text: 'Home', href: '/' }],
    })
  })
}

module.exports = syncRoutes
