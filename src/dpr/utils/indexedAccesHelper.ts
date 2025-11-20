import { Request } from 'express'

export const getRequestParam = ({
  req,
  param,
  defaultValue,
  error,
  errorString,
}: {
  req: Request
  param: string
  defaultValue?: string
  error?: boolean
  errorString?: string
}): string => {
  const value = req.params[param]

  if (value === undefined && error) {
    const errorMessage = errorString || 'Crtitical request parameter is undefined:'
    throw new Error(`${errorMessage}: paramname: ${param}`)
  }

  return value || defaultValue || ''
}
