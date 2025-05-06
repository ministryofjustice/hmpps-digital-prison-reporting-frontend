import { NextFunction, Response, Request } from 'express'
import ReportingService from '../services/reportingService'
import { Services } from '../types/Services'
import * as Middleware from './populateDefinitions'

describe('populateDefinitions middleware', () => {
  let reportingService: ReportingService
  let services: Services
  let res: Response
  let req: Request
  let next: NextFunction

  beforeEach(() => {
    reportingService = {
      getDefinitions: jest.fn(),
    } as unknown as ReportingService

    services = {
      reportingService,
    } as unknown as Services

    res = {
      locals: {
        user: {
          token: 'T0k3n',
        },
      },
    } as unknown as Response

    req = {
      body: {},
      query: {},
    } as unknown as Request

    next = jest.fn().mockImplementation(() => {
      // do nothing
    })
  })

  it('should get the definitions with no DPD path', async () => {
    await Middleware.populateDefinitions(services, {}, req, res, next)

    expect(services.reportingService.getDefinitions).toHaveBeenCalledWith('T0k3n', undefined)
  })

  it('should get the definitions with a DPD path from the config', async () => {
    await Middleware.populateDefinitions(
      services,
      { dprDataProductDefinitionPath: 'dpd/path/from/config' },
      req,
      res,
      next,
    )
    expect(res.locals.dpdPathFromConfig).toBeTruthy()
    expect(res.locals.dpdPathFromQuery).toBeFalsy()
    expect(res.locals.definitionsPath).toEqual('dpd/path/from/config')
    expect(res.locals.pathSuffix).toEqual('?dataProductDefinitionsPath=dpd/path/from/config')
    expect(services.reportingService.getDefinitions).toHaveBeenCalledWith('T0k3n', 'dpd/path/from/config')
  })

  it('should get the definitions and override the config DPD path with DPD path from query', async () => {
    req.query.dataProductDefinitionsPath = 'dpd/path/from/query'

    await Middleware.populateDefinitions(
      services,
      { dprDataProductDefinitionPath: 'dpd/path/from/config' },
      req,
      res,
      next,
    )
    expect(res.locals.dpdPathFromConfig).toBeTruthy()
    expect(res.locals.dpdPathFromQuery).toBeTruthy()
    expect(res.locals.definitionsPath).toEqual('dpd/path/from/query')
    expect(res.locals.pathSuffix).toEqual('?dataProductDefinitionsPath=dpd/path/from/query')
    expect(services.reportingService.getDefinitions).toHaveBeenCalledWith('T0k3n', 'dpd/path/from/query')
  })
})
