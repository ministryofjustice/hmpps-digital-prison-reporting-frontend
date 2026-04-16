import { RequestHandler } from 'express'
import z from 'zod'

export const validate =
  (schema: z.ZodType): RequestHandler =>
  (req, res, next) => {
    console.log(`
      ###################################################
      `)

    console.log(req.body)

    const result = schema.safeParse(req.body)
    if (result.success) {
      return next()
    }

    const errors = Object.entries(z.flattenError(result.error).fieldErrors).map(
      ([fieldName, err]: [string, unknown]) => ({
        href: `#${fieldName}`,
        text: Array.isArray(err) ? err[0] : err,
      }),
    )
    console.log(result)
    console.log(errors)
    console.log(`
      ###################################################
      `)

    req.flash(`DPR_ERRORS`, JSON.stringify(errors))
    return res.redirect(`${req.baseUrl}#`)
  }
