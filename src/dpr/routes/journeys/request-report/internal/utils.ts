import { Request, Response } from 'express'
import { Services } from 'src/dpr/types/Services'
import { RequestStatus } from 'src/dpr/types/UserReports'

export const checkStore = async (req: Request, res: Response, services: Services) => {
  const userId = res.locals['dprUser'].id
  const { internalRequestId } = req.params as { internalRequestId: string }

  // 1. check if report exists in recently viewed reports - if not return undefined
  const existingReport = await services.recentlyViewedService.getReportByInternalRequestId(internalRequestId, userId)
  if (!existingReport) return undefined

  // Report exists in state
  // 1. check its status is not expired - otherwise return undefined
  const { status } = existingReport

  if (status !== RequestStatus.READY) return undefined

  // 2. return data needed for viewing report
  return existingReport
}
