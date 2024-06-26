import { NextFunction, Request, Response } from 'express'
import Dict = NodeJS.Dict

export default class RenderListWithDefinitionInput {
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

  definitionsPath?: string

  constructor(
    definitionName: string,
    variantName: string,
    request: Request,
    response: Response,
    next: NextFunction,
    apiUrl: string,
    layoutTemplate: string,
    token: string,
    title?: string,
    otherOptions?: Dict<object>,
    dynamicAutocompleteEndpoint?: string,
    apiTimeout = 8000,
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
