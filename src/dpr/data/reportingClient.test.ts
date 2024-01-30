import nock from 'nock'

import ReportQuery from '../types/ReportQuery'
import ReportingClient from './reportingClient'
import { components } from '../types/api'
import AgentConfig from './agentConfig'

describe('reportingClient', () => {
  let fakeReportingApi: nock.Scope
  let reportingClient: ReportingClient

  const listRequest: ReportQuery = new ReportQuery(
    [
      {
        name: 'original.filter',
        display: 'Original',
        sortable: true,
        defaultsort: false,
        filter: {
          type: 'Radio',
        },
        type: 'string',
      },
    ],
    {
      selectedPage: '1',
      pageSize: '2',
      sortColumn: 'three',
      sortedAsc: 'true',
      'f.original.filter': 'true',
    },
    'one',
    'f.',
  )

  beforeEach(() => {
    const url = 'http://localhost:3010/reports'
    fakeReportingApi = nock(url)
    reportingClient = new ReportingClient({
      url,
      agent: new AgentConfig(),
    })
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('getCount', () => {
    it('should return data from api', async () => {
      const response = { count: 123 }
      const resourceName = 'external-movements'

      fakeReportingApi.get(new RegExp(`\\/${resourceName}\\/count\\?.+`)).reply(200, response)

      const output = await reportingClient.getCount(resourceName, null, listRequest)
      expect(output).toEqual(response.count)
    })
  })

  describe('getList', () => {
    it('should return data from api', async () => {
      const response = [{ test: 'true' }]
      const expectedQuery: Record<string, string> = {
        selectedPage: '1',
        pageSize: '2',
        sortColumn: 'three',
        sortedAsc: 'true',
        'f.original.filter': 'true',
      }
      const resourceName = 'external-movements'

      fakeReportingApi.get(`/${resourceName}`).query(expectedQuery).reply(200, response)

      const output = await reportingClient.getList(resourceName, null, listRequest)
      expect(output).toEqual(response)
    })
  })

  describe('getDefinitions', () => {
    it('should return definitions from api', async () => {
      const response: Array<components['schemas']['ReportDefinitionSummary']> = [
        {
          id: 'test-report',
          name: 'Test report',
          variants: [],
        },
      ]
      const query = {
        renderMethod: 'HTML',
      }

      fakeReportingApi.get(`/definitions`).query(query).reply(200, response)

      const output = await reportingClient.getDefinitions(null)
      expect(output).toEqual(response)
    })
  })

  describe('getDefinition', () => {
    it('should return definition from api', async () => {
      const response: Array<components['schemas']['SingleVariantReportDefinition']> = [
        {
          id: 'test-report',
          name: 'Test report',
          variant: {
            id: 'test-variant',
            name: 'Test variant',
            resourceName: 'reports/test/test',
          },
        },
      ]

      fakeReportingApi.get(`/definitions/test-report/test-variant`).reply(200, response)

      const output = await reportingClient.getDefinition(null, 'test-report', 'test-variant')
      expect(output).toEqual(response)
    })
  })
})
