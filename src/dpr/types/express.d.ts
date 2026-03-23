import { ExtraLocals } from './extraLocals'
import 'express-session'
import { ReportType } from './UserReports'

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Locals extends ExtraLocals {}
  }
}

declare module 'express-session' {
  interface SessionData {
    currentReportJourney?: {
      id: string | string[]
      reportId: string | string[]
      tableId?: string | string[]
      executionId?: string | string[]
      type?: ReportType
      currentReportPathname?: string
      currentReportSearch?: string
    }
  }
}
