import { Request, Response } from 'express'

export const safeRedirect = (req: Request, res: Response, value: unknown, fallback = '/') => {
  if (typeof value === 'string') {
    try {
      const base = `${req.protocol}://${req.get('host')}`
      const url = new URL(value, base)

      if (url.origin === base) {
        return res.redirect(url.pathname + url.search + url.hash)
      }
    } catch {}
  }

  return res.redirect(fallback)
}
