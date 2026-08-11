import { ReportType, RequestStatus, SubscribedReport } from 'src/dpr/types/UserReports'

export const subscribedReport1: SubscribedReport = {
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

export const subscribedReport2: SubscribedReport = {
  reportId: 'feature-testing',
  id: 'feature-testing-scheduled-2',
  tableId: 'tblId_1729766362362',
  reportName: 'Feature testing',
  name: 'Scheduled Report 2',
  description: 'This is another scheduled report',
  type: ReportType.REPORT,
  status: RequestStatus.READY,
  schedule: 'Weekly at 9:00am',
  url: {
    origin: 'http://localhost:3010',
    report: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/feature-testing/feature-testing-scheduled-2/request/tblId_1729766362362/report',
      pathname:
        '/embedded/platform/async/report/feature-testing/feature-testing-scheduled-2/request/tblId_1729766362362/report',
    },
  },
  timestamp: {
    refresh: new Date('2024-10-24T10:39:32.169Z'),
  },
}

export const subscribedReport3: SubscribedReport = {
  reportId: 'feature-testing',
  id: 'feature-testing-scheduled-3',
  tableId: 'tblId_1729766362363',
  reportName: 'Feature testing',
  name: 'Scheduled Report 3',
  description: 'This is third scheduled report',
  type: ReportType.REPORT,
  status: RequestStatus.READY,
  schedule: 'Weekly at 9:00am',
  url: {
    origin: 'http://localhost:3010',
    report: {
      fullUrl:
        'http://localhost:3010/embedded/platform/async/report/feature-testing/feature-testing-scheduled-3/request/tblId_1729766362363/report',
      pathname:
        '/embedded/platform/async/report/feature-testing/feature-testing-scheduled-3/request/tblId_1729766362363/report',
    },
  },
  timestamp: {
    refresh: new Date('2023-10-24T10:39:32.169Z'),
  },
}
