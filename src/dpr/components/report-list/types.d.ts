import { NextFunction, Request, Response } from 'express'
import { FieldDefinition } from '../../types'
import Dict = NodeJS.Dict
import ReportQuery from '../../types/ReportQuery'
import ReportingClient from './data/reportingClient'

export interface ListDataSources {
  data: Promise<Dict<string>[]>
  count: Promise<number>
}

export interface RenderListWithDataInput {
  title: string
  fields: FieldDefinition[]
  request: Request
  response: Response
  next: NextFunction
  getListDataSources: (reportQuery: ReportQuery) => ListDataSources
  otherOptions?: Dict<object>
  layoutTemplate: string
}

export interface RenderListWithDefinitionInput {
  title?: string
  definitionName: string
  variantName: string
  request: Request
  response: Response
  next: NextFunction
  otherOptions?: Dict<object>
  layoutTemplate: string
  token: string
  reportingClient: ReportingClient
}

const defaultTokenProvider = (request: Request, response: Response, next: NextFunction): string => {
  if (response.locals.user && response.locals.user.token) {
    return response.locals.user.token
  }
  next('Could not find user token in response.locals.user.token')
  return null
}

export class CreateRequestHandlerInput {
  title?: string

  definitionName: string

  variantName: string

  apiUrl: string

  apiTimeout = 8000

  otherOptions?: Dict<object>

  layoutTemplate: string

  tokenProvider: (request: Request, response: Response, next: NextFunction) => string = defaultTokenProvider
}
