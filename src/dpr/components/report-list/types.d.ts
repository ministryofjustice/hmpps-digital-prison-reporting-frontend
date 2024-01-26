import { NextFunction, Request, Response } from 'express'
import Dict = NodeJS.Dict
import ReportQuery from '../../types/ReportQuery'
import { ListWithWarnings } from '../../data/types'
import defaultTokenProvider from './defaultTokenProvider'
import { components } from '../../types/api'

export interface ListDataSources {
  data: Promise<Dict<string>[]> | Promise<ListWithWarnings>
  count: Promise<number>
}

export interface RenderListWithDataInput {
  title: string
  variantDefinition: components['schemas']['VariantDefinition']
  request: Request
  response: Response
  next: NextFunction
  getListDataSources: (reportQuery: ReportQuery) => ListDataSources
  otherOptions?: Dict<object>
  layoutTemplate: string
  dynamicAutocompleteEndpoint?: string
}

export class RenderListWithDefinitionInput {
  title?: string
  definitionName: string
  variantName: string
  request: Request
  response: Response
  next: NextFunction
  otherOptions?: Dict<object>
  layoutTemplate: string
  token: string
  apiUrl: string
  apiTimeout: number
  dynamicAutocompleteEndpoint?: string

  constructor(
    title?: string,
    definitionName: string,
    variantName: string,
    request: Request,
    response: Response,
    next: NextFunction,
    apiUrl: string,
    otherOptions?: Dict<object>,
    layoutTemplate: string,
    dynamicAutocompleteEndpoint?: string,
    apiTimeout = 8000,
    token: string,
  ) {
    this.title = title
    this.definitionName = definitionName
    this.variantName = variantName
    this.request = request
    this.response = response
    this.next = next
    this.apiUrl = apiUrl
    this.apiTimeout = apiTimeout
    this.otherOptions = otherOptions
    this.layoutTemplate = layoutTemplate
    this.token = token
    this.dynamicAutocompleteEndpoint = dynamicAutocompleteEndpoint
  }
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
  dynamicAutocompleteEndpoint?: string

  constructor(
    title?: string,
    definitionName: string,
    variantName: string,
    apiUrl: string,
    otherOptions?: Dict<object>,
    layoutTemplate: string,
    dynamicAutocompleteEndpoint?: string,
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
    this.dynamicAutocompleteEndpoint = dynamicAutocompleteEndpoint
  }
}
