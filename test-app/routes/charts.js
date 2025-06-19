const mockBarChartData = require('../mocks/mockChartData/mockBarChartData')
const mockPieChartData = require('../mocks/mockChartData/mockPieChartData')
const mockLineChartData = require('../mocks/mockChartData/mockLineChartData')
const mockMulitChartData = require('../mocks/mockChartData/mockMultiChartData')
const mockScoreCards = require('../mocks/mockScoreCards/mockScorecards')

const chartsRoutes = (app) => {
  app.get('/charts', (req, res) => {
    res.render('views/pages/charts.njk', {
      title: 'Charts',
      barCharts: mockBarChartData,
      pieCharts: mockPieChartData,
      lineCharts: mockLineChartData,
      multiCharts: mockMulitChartData,
    })
  })

  app.get('/charts/bar', (req, res) => {
    res.render('views/pages/charts.njk', {
      title: 'Charts',
      barCharts: mockBarChartData,
    })
  })

  app.get('/charts/donut', (req, res) => {
    res.render('views/pages/charts.njk', {
      title: 'Charts',
      pieCharts: mockPieChartData,
    })
  })

  app.get('/charts/line', (req, res) => {
    res.render('views/pages/charts.njk', {
      title: 'Charts',
      lineCharts: mockLineChartData,
    })
  })

  app.get('/charts/multi', (req, res) => {
    res.render('views/pages/charts.njk', {
      title: 'Charts',
      multiCharts: mockMulitChartData,
    })
  })

  app.get('/scorecards', (req, res) => {
    res.render('views/pages/scorecards.njk', {
      title: 'Score Cards',
      scorecards: mockScoreCards,
    })
  })
}

module.exports = chartsRoutes
