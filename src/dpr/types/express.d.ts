import { ActiveReportSession } from './ActiveReportSession'
import { ExtraLocals } from './extraLocals'
import 'express-session'

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Locals extends ExtraLocals {}
  }
}

declare module 'express-session' {
  interface SessionData {
    activeReport?: ActiveReportSession
  }
}
