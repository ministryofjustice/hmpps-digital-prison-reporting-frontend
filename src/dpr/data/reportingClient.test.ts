import nock from 'nock'

import ReportQuery from '../types/ReportQuery'
import ReportingClient from './reportingClient'
import { components } from '../types/api'
import AgentConfig from './agentConfig'

describe('reportingClient', () => {
  let fakeReportingApi: nock.Scope
  let reportingClient: ReportingClient

  const listRequest: ReportQuery = new ReportQuery({
      template: 'list',
      sections: [],
      fields: [
        {
          name: 'original.filter',
          display: 'Original',
          sortable: true,
          defaultsort: false,
          filter: {
            type: 'Radio',
            mandatory: false,
          },
          type: 'string',
          mandatory: false,
          visible: true,
          calculated: false,
        },
      ]
    },
    {
      selectedPage: '1',
      pageSize: '2',
      sortColumn: 'three',
      sortedAsc: 'true',
      'f.original.filter': 'true',
      dataProductDefinitionsPath: 'test-definition-path',
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
        dataProductDefinitionsPath: 'test-definition-path',
        columns: 'original.filter',
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

    it('should return definitions from api with definitions path', async () => {
      const response: Array<components['schemas']['ReportDefinitionSummary']> = [
        {
          id: 'test-report',
          name: 'Test report',
          variants: [],
        },
      ]
      const query = {
        renderMethod: 'HTML',
        dataProductDefinitionsPath: 'test-definition-path',
      }

      fakeReportingApi.get(`/definitions`).query(query).reply(200, response)

      const output = await reportingClient.getDefinitions(null, 'test-definition-path')
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
            classification: 'OFFICIAL',
            printable: false,
          },
        },
      ]

      fakeReportingApi.get(`/definitions/test-report/test-variant`).reply(200, response)

      const output = await reportingClient.getDefinition(null, 'test-report', 'test-variant')
      expect(output).toEqual(response)
    })

    it('should return definition from api with definitions path', async () => {
      const response: Array<components['schemas']['SingleVariantReportDefinition']> = [
        {
          id: 'test-report',
          name: 'Test report',
          variant: {
            id: 'test-variant',
            name: 'Test variant',
            resourceName: 'reports/test/test',
            classification: 'OFFICIAL',
            printable: false,
          },
        },
      ]
      const query = {
        dataProductDefinitionsPath: 'test-definition-path',
      }

      fakeReportingApi.get(`/definitions/test-report/test-variant`).query(query).reply(200, response)

      const output = await reportingClient.getDefinition(null, 'test-report', 'test-variant', 'test-definition-path')
      expect(output).toEqual(response)
    })
  })

  describe('requestAsyncReport', () => {
    it('should request the async report', async () => {
      const response = [{ test: 'true' }]
      const expectedQuery: Record<string, string | boolean> = {
        sortedAsc: true,
        sortColumn: 'sort-column',
        'f.original.filter': 'true',
        dataProductDefinitionsPath: 'test-definition-path',
      }
      const reportId = 'report-id'
      const variantId = 'variant-id'

      fakeReportingApi.get(`/async/reports/${reportId}/${variantId}`).query(expectedQuery).reply(200, response)

      const output = await reportingClient.requestAsyncReport(null, reportId, variantId, expectedQuery)
      expect(output).toEqual(response)
    })
  })

  describe('getAsyncReport', () => {
    it('should return data from api', async () => {
      const response = [{ test: 'true' }]
      const expectedQuery: Record<string, string> = {
        selectedPage: '1',
        pageSize: '2',
        dataProductDefinitionsPath: 'test-definition-path',
      }
      const reportId = 'report-id'
      const variantId = 'variant-id'
      const tableId = 'table-id'

      fakeReportingApi
        .get(`/reports/${reportId}/${variantId}/tables/${tableId}/result`)
        .query(expectedQuery)
        .reply(200, response)

      const output = await reportingClient.getAsyncReport(null, reportId, variantId, tableId, expectedQuery)
      expect(output).toEqual(response)
    })
  })

  describe('getAsyncReportStatus', () => {
    it('should return the request status', async () => {
      const response = { status: 'STARTED' }
      const reportId = 'report-id'
      const variantId = 'variant-id'
      const executionId = 'execution-id'
      const resource = `/reports/${reportId}/${variantId}/statements/${executionId}/status`

      fakeReportingApi.get(resource).reply(200, response)

      const output = await reportingClient.getAsyncReportStatus(null, reportId, variantId, executionId)
      expect(output).toEqual(response)
    })
  })

  describe('getAsyncCount', () => {
    it('should return data from api', async () => {
      const response = { count: 123 }
      const tableId = 'table-id'
      const resource = `/report/tables/${tableId}/count`

      fakeReportingApi.get(resource).reply(200, response)

      const output = await reportingClient.getAsyncCount(null, tableId)
      expect(output).toEqual(response.count)
    })
  })
})
