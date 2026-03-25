import type { Request } from 'express'

export function getSessionValue(req: Request, sessionKey: string, field: string) {
  if (!req.session) return undefined

  // Convert to unknown first to satisfy TypeScript
  const sessionObj = req.session as unknown as Record<string, unknown>

  const container = sessionObj[sessionKey] as Record<string, unknown> | undefined

  if (!container || typeof container !== 'object') return undefined

  return container[field]
}
