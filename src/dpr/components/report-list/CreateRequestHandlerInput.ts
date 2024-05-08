import { NextFunction, Request, Response } from 'express'
import Dict = NodeJS.Dict
import defaultTokenProvider from './defaultTokenProvider'

export default class CreateRequestHandlerInput {
  title?: string

  definitionName: string

  variantName: string

  apiUrl: string

  apiTimeout

  otherOptions?: Dict<object>

  layoutTemplate: string

  tokenProvider: (request: Request, response: Response, next: NextFunction) => string

  dynamicAutocompleteEndpoint?: string

  definitionsPath?: string

  constructor(
    definitionName: string,
    variantName: string,
    apiUrl: string,
    layoutTemplate: string,
    title?: string,
    otherOptions?: Dict<object>,
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
