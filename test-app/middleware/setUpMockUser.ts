import { RequestHandler } from 'express'
import DprUser from '../../src/dpr/types/DprUser'

export default (): RequestHandler => {
  return async (req, res, next) => {
    try {
      res.locals.user = {
        token: 'eyJ1xwGG(TYXGSTSboyubXBHBHJSX',
        username: 'USERT_GEN',
        authSource: 'nomis',
      }

      const mockManageUsersGetUserResponse = {
        uuid: 'userId',
        activeCaseLoadId: 'KMI',
        token: 'token',
        email: 'test@user.com',
        displayName: 'Test User',
        staffId: 123423423,
      }

      const dprUser = new DprUser()
      dprUser.token = res.locals.user.token
      dprUser.id = mockManageUsersGetUserResponse.uuid
      dprUser.activeCaseLoadId = mockManageUsersGetUserResponse.activeCaseLoadId
      dprUser.emailAddress = mockManageUsersGetUserResponse.email
      dprUser.displayName = mockManageUsersGetUserResponse.displayName
      dprUser.staffId = mockManageUsersGetUserResponse.staffId

      res.locals.dprUser = dprUser

      return next()
    } catch (error) {
      return next(error)
    }
  }
}
