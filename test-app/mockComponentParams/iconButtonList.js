const ReportActionsUtils = require('../../package/dpr/components/icon-button-list/utils').default
const definitions = require('../mockAsyncData/mockReportDefinition')

module.exports = ReportActionsUtils.initAsyncReportActions(definitions.report.variants[0], {
  executionId: 'executionId',
  reportName: definitions.report.name,
  name: definitions.report.variants[0].name,
  url: { request: { fullUrl: 'fullUrl' } },
})
