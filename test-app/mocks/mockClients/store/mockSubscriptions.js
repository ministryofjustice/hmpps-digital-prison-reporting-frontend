// @ts-nocheck
const subscribedReport1 = {
  reportId: 'feature-testing',
  id: 'scheduled-report-ready',
  tableId: 'tblId_1729766362364',
  reportName: 'Scheduled report mock',
  name: 'Scheduled report - ready',
  description: 'This report is ready to view',
  type: 'report',
  status: 'READY',
  schedule: "Weekly at 9:00am",
  url: {
    origin: 'http://localhost:3010',
    report: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/feature-testing/scheduled-report-ready/request/tblId_1729766362364/report',
      pathname:
        '/embedded/platform/async/report/feature-testing/scheduled-report-ready/request/tblId_1729766362364/report',
    },
  },
  timestamp: {
    refresh: '2024-10-24T10:39:32.169Z'
  },
}

const subscribedReport2 = {
  reportId: 'feature-testing',
  id: 'scheduled-report-ready-to-stale',
  tableId: 'tblId_1729766362365',
  reportName: 'Scheduled report mock',
  name: 'Scheduled report - ready to stale',
  description: 'this report will go from ready to stale',
  type: 'report',
  status: 'READY',
  schedule: "Weekly at 9:00am",
  url: {
    origin: 'http://localhost:3010',
    report: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/feature-testing/scheduled-report-ready-to-stale/request/tblId_1729766362365/report',
      pathname:
        '/embedded/platform/async/report/feature-testing/scheduled-report-ready-to-stale/request/tblId_1729766362365/report',
    },
  },
  timestamp: {
    refresh: '2024-10-24T10:39:32.169Z'
  },
}

const subscribedReport3 = {
  reportId: 'feature-testing',
  id: 'scheduled-report-pending-to-ready',
  reportName: 'Scheduled reports mock',
  name: 'Scheduled report - pending to ready',
  description: 'this report will go from pending to ready',
  type: 'report',
  status: 'PENDING',
  schedule: "Weekly at 9:00am",
  timestamp: {},
}

const subscribedReport4 = {
  reportId: 'feature-testing',
  id: 'scheduled-report-pending-to-failed',
  tableId: 'tblId_1729766362367',
  reportName: 'Scheduled reports mock',
  name: 'Scheduled report - pending to Failed',
  description: 'this report will go from pending to failed',
  type: 'report',
  status: 'PENDING',
  schedule: "Weekly at 9:00am",
  timestamp: {},
}

const subscribedReport5 = {
  reportId: 'feature-testing',
  id: 'scheduled-report-pending-to-pending',
  reportName: 'Scheduled reports mock',
  name: 'Scheduled report - pending to pending',
  description: 'this report will stay pending',
  type: 'report',
  status: 'PENDING',
  schedule: "Weekly at 9:00am",
  timestamp: {},
}


module.exports = {
  subscribedReport1,
  subscribedReport2,
  subscribedReport3,
  subscribedReport4,
  subscribedReport5
}
