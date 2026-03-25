import type { Request } from 'express'

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
