import nock from 'nock'

import { Request } from 'express'
import ReportQuery from '../types/ReportQuery'
import ReportingClient from './reportingClient'
import { components } from '../types/api'
import AgentConfig from './agentConfig'
import { Template } from '../types/Templates'

describe('reportingClient', () => {
  let fakeReportingApi: nock.Scope
  let reportingClient: ReportingClient
  const specification = {
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
    ],
  } as components['schemas']['Specification']

  const req = {
    query: {
      selectedPage: '1',
      pageSize: '2',
      sortColumn: 'three',
      sortedAsc: 'true',
      'f.original.filter': 'true',
    },
  } as unknown as Request

  const listRequest: ReportQuery = new ReportQuery({
    fields: specification.fields,
    template: specification.template as Template,
    queryParams: req.query,
    definitionsPath: 'test-definition-path',
    filtersPrefix: 'f.',
  })

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

  describe('getAsyncSummaryReport', () => {
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
      const summaryId = 'summary-id'

      fakeReportingApi
        .get(`/reports/${reportId}/${variantId}/tables/${tableId}/result/summary/${summaryId}`)
        .query(expectedQuery)
        .reply(200, response)

      const output = await reportingClient.getAsyncSummaryReport(
        null,
        reportId,
        variantId,
        tableId,
        summaryId,
        expectedQuery,
      )
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

  describe('getFieldValues', () => {
    it('should get the field values', async () => {
      const variantName = 'variantName'
      const fieldName = 'fieldName'
      const definitionName = 'definitionName'
      const definitionsPath = 'definitionsPath'
      const prefix = 'prefix'

      fakeReportingApi
        .get(
          `/reports/${definitionName}/${variantName}/${fieldName}?dataProductDefinitionsPath=${definitionsPath}&prefix=${prefix}`,
        )
        .reply(200, {})

      const output = await reportingClient.getFieldValues({
        token: 'null',
        definitionName,
        variantName,
        fieldName,
        definitionsPath,
        prefix,
      })
      expect(output).toEqual({})
    })
  })

  describe('cancelAsyncRequest', () => {
    it('should cancel the request', async () => {
      fakeReportingApi.delete(`/reports/dpd-id/test-variant-id/statements/exId`).reply(200, {
        cancellationSucceeded: 'true',
      })

      const output = await reportingClient.cancelAsyncRequest(null, 'dpd-id', 'test-variant-id', 'exId')
      expect(output).toEqual({
        cancellationSucceeded: 'true',
      })
    })
  })
})
