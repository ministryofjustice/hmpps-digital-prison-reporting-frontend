import superagent, { SuperAgentRequest, Response } from 'superagent'
import { createClient } from 'redis'

const url = 'http://localhost:9091/__admin'

export const stubFor = (mapping: Record<string, unknown>): SuperAgentRequest =>
  superagent.post(`${url}/mappings`).send(mapping)

export const deleteStub = (uuid: string): SuperAgentRequest => superagent.delete(`${url}/mappings/${uuid}`).send()

export const getMatchingRequests = (body: string | object | undefined) =>
  superagent.post(`${url}/requests/find`).send(body)

const parseAuditEventBody = (itm: { body?: string }) => {
  if (!itm.body || !itm.body.includes('MessageBody')) {
    return undefined
  }
  const eventJson = JSON.parse(JSON.parse(itm.body).MessageBody)
  delete eventJson.correlationId
  delete eventJson.when
  return eventJson
}

export const resetRedis = async () => {
  const client = createClient({
    password: '',
    socket: {
      host: '127.0.0.1',
      port: 6379,
      tls: false,
      reconnectStrategy: (attempts) => {
        // Exponential back off: 20ms, 40ms, 80ms..., capped to retry every 30 seconds
        const nextDelay = Math.min(2 ** attempts * 20, 30000)
        console.log(`Retry Redis connection attempt: ${attempts}, next attempt in: ${nextDelay}ms`)
        return nextDelay
      },
    },
  })
  await client.connect()
  await client.flushAll()
  await client.disconnect()
  return true
}

export const getSentAuditEvents = async (): Promise<unknown> => {
  const wiremockApiResponse: Response = await superagent
    .post(`${url}/requests/find`)
    .send({ method: 'POST', urlPath: '/' })
  // Skip first two audit events that come from sign-in
  const responses = (wiremockApiResponse.body || '[]').requests.slice(2)
  return responses.map(parseAuditEventBody)
}

export const getMappings = async () => {
  const response = (await fetch(`${url}/mappings?limit=10000`))
  return (await response.json()) as { mappings: Record<string, unknown>[], meta: { total: number } }
}

export const resetStubs = (): Promise<Array<Response>> =>
  Promise.all([superagent.delete(`${url}/mappings`), superagent.delete(`${url}/requests`)])

export const createBasicHttpStub = (
  method: string,
  urlPattern: string,
  status: number,
  jsonBody: object | string = {},
  fixedDelayMilliseconds = 0,
) => {
  return createHttpStub(method, urlPattern, undefined, undefined, status, jsonBody, fixedDelayMilliseconds)
}

export const createHttpStub = (
  method: string,
  urlPathPattern: string,
  queryParameters: object | undefined,
  bodyPatterns: Array<object> | undefined,
  status: number,
  jsonBody?: object | string,
  fixedDelayMilliseconds = 0,
) => {
  return stubFor({
    request: { method, urlPathPattern, queryParameters, bodyPatterns },
    response: {
      status,
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      jsonBody,
      fixedDelayMilliseconds,
    },
  })
}

export const reportIdRegex = '[a-zA-Z0-9-]+'
