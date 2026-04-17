import type { Request } from 'express'
import logger from './logger'
import { AcitveReportSessionData } from '../types/ActiveReportSession'

/**
 * Gets the field value for a specific session key
 *
 * @export
 * @param {Request} req
 * @param {string} sessionKey
 * @param {string} field
 * @return {*}
 */
export function getSessionValue(req: Request, sessionKey: string, field: string) {
  if (!req.session) return undefined

  const container = (req.session as unknown as Record<string, unknown>)[sessionKey]

  if (!container || typeof container !== 'object') {
    return undefined
  }

  return (container as Record<string, unknown>)[field]
}

interface ActiveJourneyKey {
  id: string
  reportId: string
  type?: string
  executionId?: string
  tableId?: string
}

export function getActiveJourneyValue<F extends keyof AcitveReportSessionData>(
  req: Request,
  keyParts: ActiveJourneyKey, // { reportId, id, tableId?, executionId? }
  field: F,
): AcitveReportSessionData[F] | undefined {
  const store = req.session?.activeReport
  if (!store) return undefined

  logger.info('getActiveJourneyValue', keyParts, field)

  const { reportId, id, executionId, tableId } = keyParts

  const baseKey = buildJourneyKey({ reportId, id })
  const execKey = executionId ? buildJourneyKey({ reportId, id, executionId }) : undefined
  const tableKey = tableId ? buildJourneyKey({ reportId, id, tableId }) : undefined

  // 1. Table key takes highest priority (final async stage)
  if (tableKey && store[tableKey]) {
    const value = store[tableKey][field]
    logger.info('getActiveJourneyValue: tableKey', { field, value })
    return value
  }

  // 2. Execution key is next (loading async stage)
  if (execKey && store[execKey]) {
    const value = store[execKey][field]
    logger.info('getActiveJourneyValue: execKey', { field, value })
    return value
  }

  // 3. Fall back to base key (sync or start of async)
  const value = store[baseKey]?.[field]
  logger.info('getActiveJourneyValue: base', { field, value })
  return value
}

/**
 * Builds the active journey key
 *
 * @export
 * @param {ActiveJourneyKey} { reportId, id, type, executionId, tableId }
 * @return {*}  {string}
 */
export function buildJourneyKey({ reportId, id, executionId, tableId }: ActiveJourneyKey): string {
  const parts = [reportId, id]

  if (executionId) parts.push(`exec:${executionId}`)
  if (tableId) parts.push(`table:${tableId}`)

  return parts.join(':')
}
