import AgentConfig from './agentConfig'

export interface GetRequest {
  path?: string
  query?: object
  headers?: Record<string, string>
  responseType?: string
  raw?: boolean
  token: string
}

export interface ApiConfig {
  url: string
  agent: AgentConfig
}

export interface Count {
  count: number
}

export interface ListWithWarnings {
  data: Array<Dict<string>>
  warnings: Warnings
}

export interface Warnings {
  noDataAvailable?: string
}

export interface FieldValuesRequest {
  token: string
  definitionName: string
  variantName: string
  fieldName: string
  prefix: string
}