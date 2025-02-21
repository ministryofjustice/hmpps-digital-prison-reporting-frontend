const { fallBackKeysDashboard } = require('./lists-fallback-keys')
const { dietTotals } = require('./lists-diet-totals')
const { historicDietTotals } = require('./lists-diet-totals-historic')
const { dataQuality } = require('./lists-data-quality')
const { dataQualityHistoric } = require('./lists-data-quality-historic')
const { dataQualityFullDataset } = require('./lists-data-quality-full')
const { dietTotalsFullDataset } = require('./lists-diet-totals-full')

module.exports = {
  fallBackKeysDashboard,
  dietTotals,
  historicDietTotals,
  dataQuality,
  dataQualityHistoric,
  dietTotalsFullDataset,
  dataQualityFullDataset,
}
