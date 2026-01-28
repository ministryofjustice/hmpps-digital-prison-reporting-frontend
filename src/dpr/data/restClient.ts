import superagent, { ResponseError } from 'superagent'
import Agent, { HttpsAgent } from 'agentkeepalive'
import http from 'http'
import https from 'https'
import { URL } from 'url'
import { pipeline } from 'stream'
import { Response as ExpressResponse } from 'express'

import logger from '../utils/logger'
import sanitiseError from '../utils/sanitisedError'
import { ApiConfig, GetRequest } from './types'
import Dict = NodeJS.Dict

export interface ResultWithHeaders<T> {
  data: T
  headers: Dict<string>
}

interface Request {
  path: string
  query?: object | string
  headers?: Record<string, string>
  responseType?: string
  raw?: boolean
}
interface RequestWithBody extends Request {
  data?: Record<string, unknown> | string
  retry?: boolean
}

class RestClient {
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

  async getStream({ path = '', query = {}, headers = {}, token }: GetRequest, res: ExpressResponse): Promise<void> {
    const url = new URL(`${this.apiUrl()}${path}`)

    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined) return
      if (Array.isArray(value)) {
        value.forEach((v) => url.searchParams.append(key, String(v)))
      } else {
        url.searchParams.append(key, String(value))
      }
    })

    const client = url.protocol === 'https:' ? https : http

    const req = client.request(
      url,
      {
        method: 'GET',
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        agent: this.agent,
      },
      (upstream) => {
        // Forward status
        res.status(upstream.statusCode || 500)

        // Forward headers
        Object.entries(upstream.headers).forEach(([key, value]) => {
          if (value !== undefined) {
            res.setHeader(key, value as string)
          }
        })

        res.flushHeaders()

        res.on('close', () => {
          req.destroy()
        })

        pipeline(upstream, res, (err) => {
          if (err) {
            res.destroy(err)
          }
        })
      },
    )

    req.setTimeout(this.timeoutConfig(), () => {
      req.destroy(new Error('Upstream request timed out.'))
    })

    req.on('error', (err) => {
      logger.warn({ err }, `Error streaming from ${this.name}, path: '${path}'`)
      if (!res.headersSent) {
        res.status(502).end('Download request failed')
      } else {
        res.destroy(err)
      }
    })

    req.end()
  }

  private async requestWithBody<Response = unknown>(
    method: 'patch' | 'post' | 'put',
    { path, query = {}, headers = {}, responseType = '', data = {}, raw = false, retry = false }: RequestWithBody,
    token: string,
  ): Promise<Response> {
    logger.info(`${this.name} ${method.toUpperCase()}: ${path}`)
    logger.info(`info about request: ${method} | ${path} | ${JSON.stringify(data)} | ${query}`)
    try {
      const result = await superagent[method](`${this.apiUrl()}${path}`)
        .query(query)
        .send(data)
        .agent(this.agent)
        .retry(2, (err) => {
          if (retry === false) {
            return false
          }
          if (err) logger.info(`Retry handler found API error with ${err.code} ${err.message}`)
          return undefined // retry handler only for logging retries, not to influence retry logic
        })
        .auth(token, { type: 'bearer' })
        .set(headers)
        .responseType(responseType)
        .timeout(this.timeoutConfig())

      return raw ? (result as Response) : result.body
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error
      }
      const sanitisedError = sanitiseError(error)
      logger.warn({ ...sanitisedError }, `Error calling ${this.name}, path: '${path}', verb: '${method.toUpperCase()}'`)
      throw sanitisedError
    }
  }

  async post<Response = unknown>(request: RequestWithBody, token: string): Promise<Response> {
    return this.requestWithBody('post', request, token)
  }

  async getWithHeaders<T>({
    path = '',
    query = {},
    headers = {},
    responseType = '',
    raw = false,
    token,
  }: GetRequest): Promise<ResultWithHeaders<T>> {
    const loggerData = {
      path: `${this.config.url}${path}`,
      query,
    }
    logger.info(`${this.name}: ${JSON.stringify(loggerData, null, 2)}`)
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
      const sanitisedError = sanitiseError(<ResponseError>error)
      logger.warn({ ...sanitisedError, query }, `Error calling ${this.name}, path: '${path}', verb: 'GET'`)
      throw sanitisedError
    }
  }

  async deleteWithHeaders<T>({
    path = '',
    query = {},
    headers = {},
    responseType = '',
    raw = false,
    token,
  }: GetRequest): Promise<ResultWithHeaders<T>> {
    const loggerData = {
      path: `${this.config.url}${path}`,
      query,
    }
    logger.info(`${this.name}: ${JSON.stringify(loggerData, null, 2)}`)
    try {
      const result = await superagent
        .delete(`${this.apiUrl()}${path}`)
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
      const sanitisedError = sanitiseError(<ResponseError>error)
      logger.warn({ ...sanitisedError, query }, `Error calling ${this.name}, path: '${path}', verb: 'GET'`)
      throw sanitisedError
    }
  }

  async delete<T>(request: GetRequest): Promise<T> {
    return this.deleteWithHeaders<T>(request).then((result) => result.data)
  }
}

export { RestClient }
export default RestClient
