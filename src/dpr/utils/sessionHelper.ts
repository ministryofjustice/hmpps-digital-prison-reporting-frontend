import type { Request } from 'express'

export function getSessionValue(req: Request, sessionKey: string, field: string) {
  if (!req.session) return undefined
  const container = (req.session as any)[sessionKey]
  if (!container) return undefined
  return container[field]
}
