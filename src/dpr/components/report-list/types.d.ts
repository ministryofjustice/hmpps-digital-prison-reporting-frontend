import { NextFunction, Request, Response } from 'express'
import { FieldDefinition } from '../../types'
import Dict = NodeJS.Dict
import ReportQuery from '../../types/ReportQuery'
import ReportingClient from './data/reportingClient'
import defaultTokenProvider from './defaultTokenProvider'

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

export class CreateRequestHandlerInput {
  title?: string

  definitionName: string

  variantName: string

  apiUrl: string

  apiTimeout

  otherOptions?: Dict<object>

  layoutTemplate: string

  tokenProvider: (request: Request, response: Response, next: NextFunction) => string

  constructor(
    title?: string,
    definitionName: string,
    variantName: string,
    apiUrl: string,
    otherOptions?: Dict<object>,
    layoutTemplate: string,
    apiTimeout = 8000,
    tokenProvider: (request: Request, response: Response, next: NextFunction) => string = defaultTokenProvider,
  ) {
    this.title = title
    this.definitionName = definitionName
    this.variantName = variantName
    this.apiUrl = apiUrl
    this.apiTimeout = apiTimeout
    this.otherOptions = otherOptions
    this.layoutTemplate = layoutTemplate
    this.tokenProvider = tokenProvider
  }
}
