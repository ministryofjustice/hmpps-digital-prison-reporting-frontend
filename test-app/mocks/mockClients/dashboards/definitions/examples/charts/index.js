const { historicDietTotals } = require('./charts-diet-totals-historic')
const { dietTotals } = require('./charts-diet-totals')
const { flexibleDietTotals } = require('./charts-diet-totals-flexible')
const { dataQuality } = require('./charts-data-quality')
const { dataQualityHistoric } = require('./charts-data-quality-historic')

module.exports = {
  historicDietTotals,
  dietTotals,
  flexibleDietTotals,
  dataQuality,
  dataQualityHistoric,
}
