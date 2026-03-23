import type { Request, Response, NextFunction, RequestHandler } from 'express'
import { ReportType } from '../types/UserReports'

interface CurrentReportJourneySessionData {
  id: string
  reportId: string
  tableId?: string
  executionId?: string
  type?: ReportType
  currentReportPathname?: string
  currentReportSearch: string
}

export const storeJourneySessionParams = (): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { id, reportId, type, tableId, executionId } = req.params

    if (!req.session) {
      next(new Error('Session not initialized'))
    }

    let currentReportPathname
    let currentReportSearch
    if (req.originalUrl.includes('view-report') && type === ReportType.REPORT) {
      const url = new URL(req.originalUrl, `${req.protocol}://${req.get('host')}`)
      currentReportPathname = url.pathname
      currentReportSearch = url.search
    }

    const existing = req.session.currentReportJourney as CurrentReportJourneySessionData | undefined

    const idChanged = !existing || [existing.id !== id, existing.reportId !== reportId].some((v) => v)

    const optionalParams = {
      ...(type && { type: type as ReportType }),
      ...(tableId && { tableId }),
      ...(executionId && { executionId }),
      ...(currentReportPathname && { currentReportPathname }),
      ...(currentReportSearch && { currentReportSearch }),
    }

    if (idChanged) {
      // Completely replace the journey object
      req.session.currentReportJourney = {
        id,
        reportId,
        ...optionalParams,
      }
    } else {
      req.session.currentReportJourney = {
        ...existing,
        ...optionalParams,
      }
    }

    console.log({
      currentReportJourney: req.session.currentReportJourney,
    })

    next()
  }
}
