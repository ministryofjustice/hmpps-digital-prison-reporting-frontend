import { ReportType, RequestStatus, SubscribedReport } from 'src/dpr/types/UserReports'

export const subscribedReport0: SubscribedReport = {
  reportId: 'feature-testing',
  id: 'feature-testing-scheduled',
  tableId: 'tblId_1729766362361',
  reportName: 'Feature testing',
  name: 'Scheduled Report',
  description: 'This is an scheduled report',
  type: ReportType.REPORT,
  status: RequestStatus.READY,
  schedule: 'Weekly at 9:00am',
  url: {
    origin: 'http://localhost:3010',
    report: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/feature-testing/feature-testing-scheduled/request/tblId_1729766362361/report',
      pathname:
        '/embedded/platform/async/report/feature-testing/feature-testing-scheduled/request/tblId_1729766362361/report',
    },
  },
  timestamp: {
    refresh: new Date(Date.now() + 24 * 60 * 60 * 1000), // always tomorrow, ie. in the future
  },
}

export const subscribedReport1 = {
  reportId: 'feature-testing',
  id: 'scheduled-report-ready',
  tableId: 'tblId_1729766362364',
  reportName: 'Scheduled report mock',
  name: 'Scheduled report - ready',
  description: 'This report is ready to view',
  type: ReportType.REPORT,
  status: RequestStatus.READY,
  schedule: 'Weekly at 9:00am',
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
    refresh: '2024-10-24T10:39:32.169Z',
  },
}

export const subscribedReport2 = {
  reportId: 'feature-testing',
  id: 'scheduled-report-ready-to-stale',
  tableId: 'tblId_1729766362365',
  reportName: 'Scheduled report mock',
  name: 'Scheduled report - ready to stale',
  description: 'this report will go from ready to stale',
  type: ReportType.REPORT,
  status: RequestStatus.READY,
  schedule: 'Weekly at 9:00am',
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
    refresh: '2024-10-24T10:39:32.169Z',
  },
}

export const subscribedReport3 = {
  reportId: 'feature-testing',
  id: 'scheduled-report-pending-to-ready',
  reportName: 'Scheduled reports mock',
  name: 'Scheduled report - pending to ready',
  description: 'this report will go from pending to ready',
  type: ReportType.REPORT,
  status: RequestStatus.PENDING,
  schedule: 'Weekly at 9:00am',
  timestamp: {},
}

export const subscribedReport4 = {
  reportId: 'feature-testing',
  id: 'scheduled-report-pending-to-failed',
  tableId: 'tblId_1729766362367',
  reportName: 'Scheduled reports mock',
  name: 'Scheduled report - pending to Failed',
  description: 'this report will go from pending to failed',
  type: ReportType.REPORT,
  status: RequestStatus.PENDING,
  schedule: 'Weekly at 9:00am',
  timestamp: {},
}

export const subscribedReport5 = {
  reportId: 'feature-testing',
  id: 'scheduled-report-pending-to-pending',
  reportName: 'Scheduled reports mock',
  name: 'Scheduled report - pending to pending',
  description: 'this report will stay pending',
  type: ReportType.REPORT,
  status: RequestStatus.PENDING,
  schedule: 'Weekly at 9:00am',
  timestamp: {},
}
