import { NextFunction, Request, Response } from 'express'
import Dict = NodeJS.Dict
import ReportQuery from '../../types/ReportQuery'
import { ListWithWarnings } from '../../data/types'
import { components } from '../../types/api'

export interface ListDataSources {
  data: Promise<Dict<string>[]> | Promise<ListWithWarnings>
  count: Promise<number>
}

export interface RenderListWithDataInput {
  title: string
  reportName?: string
  variantDefinition: components['schemas']['VariantDefinition']
  request: Request
  response: Response
  next: NextFunction
  getListDataSources: (reportQuery: ReportQuery) => ListDataSources
  otherOptions?: Dict<object>
  layoutTemplate: string
  dynamicAutocompleteEndpoint?: string
}

export interface RenderListWithDefinitionInput {
  definitionName: string
  variantName: string
  request: Request
  response: Response
  next: NextFunction
  apiUrl: string
  layoutTemplate: string
  token: string
  title?: string
  otherOptions?: Dict<object>
  dynamicAutocompleteEndpoint?: string
  apiTimeout: number
  definitionsPath?: string
}

export interface CreateRequestHandlerInput {
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
}
