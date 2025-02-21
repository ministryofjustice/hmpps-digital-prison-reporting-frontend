const { dietTotals } = require('./charts-diet-totals')
const { flexibleDietTotals } = require('./charts-diet-totals-flexible')
const { historicDietTotals } = require('./charts-diet-totals-historic')
const { historicFlexibleDietTotals } = require('./charts-diet-totals-historic-flexible')
const { dataQuality } = require('./charts-data-quality')
const { dataQualityHistoric } = require('./charts-data-quality-historic')

module.exports = {
  historicDietTotals,
  dietTotals,
  flexibleDietTotals,
  historicFlexibleDietTotals,
  dataQuality,
  dataQualityHistoric,
}
