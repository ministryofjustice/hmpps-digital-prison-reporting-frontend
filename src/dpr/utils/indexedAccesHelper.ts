import { Request } from "express";

export const getRequestParam = ({ req, param, error, errorString, defaultValue }: { req: Request, param: string, error?: boolean, errorString?: string, defaultValue?: string}): string => {
  const value = req.params[param]

  if( value === undefined && error ) {
    const errorMessage = errorString || 'Crtitical request parameter is undefined:'
    throw new Error(`${errorMessage}: paramname: ${param}`)
  }

  return value || defaultValue || ''
}
