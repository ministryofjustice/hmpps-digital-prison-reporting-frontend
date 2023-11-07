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
