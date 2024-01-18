import superagent from 'superagent'
import Agent, { HttpsAgent } from 'agentkeepalive'

import logger from '../utils/logger'
import sanitiseError from '../utils/sanitisedError'
import { ApiConfig, GetRequest } from './types'
import Dict = NodeJS.Dict

export interface ResultWithHeaders<T> {
  data: T
  headers: Dict<string>
}

export default class RestClient {
  agent: Agent

  constructor(private readonly name: string, private readonly config: ApiConfig) {
    this.agent = config.url.startsWith('https') ? new HttpsAgent(config.agent) : new Agent(config.agent)
  }

  private apiUrl() {
    return this.config.url
  }

  private timeoutConfig() {
    return this.config.agent.timeout
  }

  async get<T>(request: GetRequest): Promise<T> {
    return this.getWithHeaders<T>(request).then((result) => result.data)
  }

  async getWithHeaders<T>({
    path = null,
    query = {},
    headers = {},
    responseType = '',
    raw = false,
    token,
  }: GetRequest): Promise<ResultWithHeaders<T>> {
    logger.info(`Get using user credentials: calling ${this.name}: ${this.config.url}${path} ${JSON.stringify(query)}`)
    try {
      const result = await superagent
        .get(`${this.apiUrl()}${path}`)
        .agent(this.agent)
        .retry(2, (err) => {
          if (err) logger.info(`Retry handler found API error with ${err.code} ${err.message}`)
          return undefined // retry handler only for logging retries, not to influence retry logic
        })
        .query(query)
        .auth(token, { type: 'bearer' })
        .set(headers)
        .responseType(responseType)
        .timeout(this.timeoutConfig())

      return {
        data: raw ? result : result.body,
        headers: result.headers,
      }
    } catch (error) {
      const sanitisedError = sanitiseError(error)
      logger.warn({ ...sanitisedError, query }, `Error calling ${this.name}, path: '${path}', verb: 'GET'`)
      throw sanitisedError
    }
  }
}
