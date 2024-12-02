import type { Response, Request } from 'express'

const getValues = (res: Response) => {
  const csrfToken = (res.locals.csrfToken as unknown as string) || 'csrfToken'
  const userId = res.locals.user?.uuid ? res.locals.user.uuid : 'userId'
  const token = res.locals.user?.token ? res.locals.user.token : 'token'

  return {
    csrfToken,
    userId,
    token,
  }
}

const setDdpPathToReqQuery = (req: Request, value: string) => {
  if (value) {
    req.query = {
      ...req.query,
      dataProductDefinitionsPath: value,
    }
  }

  return req
}

export default {
  getValues,
  setDdpPathToReqQuery,
}
