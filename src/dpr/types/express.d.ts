import { ActiveReportSessionData } from './ActiveReportSession'
import { components } from './api'
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
    activeReport?: Record<string, Partial<ActiveReportSessionData>>

    // Time in ms of the last expirey check
    lastExpiredReportsCheckAt: number

    // The ID of the currently selected collection
    currentCollectionId?: string | undefined

    currentCollection?: components['schemas']['ProductCollectionDTO'] | undefined

    // Time in ms of the last definitions check
    lastDefinitionsCheck: number

    // All definitions
    allDefinitions: components['schemas']['ReportDefinitionSummary'][]
  }
}
