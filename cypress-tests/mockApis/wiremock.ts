import superagent, { SuperAgentRequest, Response } from 'superagent'

const url = 'http://localhost:9091/__admin'

export const stubFor = (mapping: Record<string, unknown>): SuperAgentRequest =>
  superagent.post(`${url}/mappings`).send(mapping)

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

export const getSentAuditEvents = async (): Promise<unknown> => {
  const wiremockApiResponse: Response = await superagent
    .post(`${url}/requests/find`)
    .send({ method: 'POST', urlPath: '/' })
  // Skip first two audit events that come from sign-in
  const responses = (wiremockApiResponse.body || '[]').requests.slice(2)
  return responses.map(parseAuditEventBody)
}

export const resetStubs = (): Promise<Array<Response>> =>
  Promise.all([superagent.delete(`${url}/mappings`), superagent.delete(`${url}/requests`)])

export const createBasicHttpStub = (
  method: string,
  urlPattern: string,
  status: number,
  jsonBody: object | string = {},
) => {
  return createHttpStub(method, urlPattern, undefined, undefined, status, jsonBody)
}

export const createHttpStub = (
  method: string,
  urlPathPattern: string,
  queryParameters: object | undefined,
  bodyPatterns: Array<object> | undefined,
  status: number,
  jsonBody?: object | string,
) => {
  return stubFor({
    request: { method, urlPathPattern, queryParameters, bodyPatterns },
    response: {
      status,
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      jsonBody,
    },
  })
}

export const reportIdRegex = '[a-zA-Z0-9-]+'
