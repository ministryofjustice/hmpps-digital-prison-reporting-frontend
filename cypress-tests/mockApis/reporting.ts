import { createBasicHttpStub, createHttpStub, reportIdRegex, stubFor } from './wiremock'
import defs from './reports/mockReportDefinition'
import { requestExampleSuccess } from './reports/mockVariants/request-examples/success'
import { createMockData } from './reports/mockAsyncData'
import { variant35Interactive } from './reports/mockVariants/mock-report/interactive-async'
import { featureTestingInteractive } from './reports/mockVariants/feature-testing/interactiveFilters'
import { featureTestingMissingDescription } from './reports/mockVariants/feature-testing/missingDescription'
import { featureTestingMissing1 } from './reports/mockVariants/feature-testing/missing1'
import { RequestStatus } from '../../src/dpr/types/UserReports'

const stubs = {
  stubGetFeatureTestingMissing: () =>
    createBasicHttpStub('GET', `/definitions/feature-testing/feature-testing-missing-1`, 200, {
      id: 'feature-testing',
      name: 'Missing report 1',
      description: 'Description for missing report 1',
      variant: featureTestingMissing1,
      dashboards: [],
    }),
  stubGetTestReport3Fail: () =>
    createHttpStub('GET', '/definitions/test-report-3/request-example-fail-status', undefined, undefined, 200, {
      id: 'request-example-fail-status',
      name: 'Failed report',
      description: 'this will fail with returned Status: FAILED',
      resourceName: 'reports/list',
      classification: 'OFFICIAL',
      printable: true,
      specification: {
        template: 'list',
        fields: [
          {
            name: 'field1',
            display: 'Field 1',
            sortable: true,
            defaultsort: true,
            type: 'string',
            mandatory: false,
            visible: true,
            filter: {
              type: 'Radio',
              staticOptions: [
                { name: 'value1.1', display: 'Value 1.1' },
                { name: 'value1.2', display: 'Value 1.2' },
                { name: 'value1.3', display: 'Value 1.3' },
              ],
              defaultValue: 'value1.2',
              interactive: false,
            },
          },
          {
            name: 'field2',
            display: 'Field 2',
            sortable: true,
            type: 'string',
            mandatory: true,
            visible: true,
            filter: {
              type: 'Select',
              staticOptions: [
                { name: 'value2.1', display: 'Value 2.1' },
                { name: 'value2.2', display: 'Value 2.2' },
                { name: 'value2.3', display: 'Value 2.3' },
              ],
              interactive: false,
            },
          },
          {
            name: 'field3',
            display: 'Field 3',
            sortable: false,
            visible: true,
            type: 'date',
            mandatory: false,
            filter: {
              type: 'daterange',
              defaultValue: '2003-02-01 - 2006-05-04',
              interactive: false,
            },
          },
          {
            name: 'field4',
            display: 'Field 4',
            visible: false,
            sortable: false,
            type: 'string',
            filter: {
              type: 'autocomplete',
              dynamicOptions: {
                minimumLength: 3,
                returnAsStaticOptions: true,
              },
              staticOptions: [
                { name: 'Fezzick', display: 'Fezzick' },
                { name: 'Inigo Montoya', display: 'Inigo Montoya' },
                { name: 'Prince Humperdink', display: 'Prince Humperdink' },
                { name: 'Princess Buttercup', display: 'Princess Buttercup' },
                { name: 'Westley', display: 'Westley' },
              ],
              interactive: false,
            },
          },
          {
            name: 'field5',
            display: 'Field 5',
            sortable: false,
            type: 'string',
            mandatory: false,
            visible: false,
            filter: {
              type: 'autocomplete',
              dynamicOptions: {
                minimumLength: 3,
                returnAsStaticOptions: false,
              },
              interactive: false,
            },
          },
          {
            name: 'field6',
            display: 'Field 6',
            sortable: false,
            type: 'HTML',
            mandatory: false,
            visible: true,
          },
        ],
      },
    }),
  stubDefinitions: () => createBasicHttpStub(`GET`, `/definitions`, 200, defs.reports),
  stubMockReportVariant35: () =>
    createBasicHttpStub(`GET`, `/reports/mock-report/variantId-35/statements/[a-zA-Z0-9_]+/status`, 200, {
      status: 'FINISHED',
    }),
  // stubRequestExamplesSuccess: () => createBasicHttpStub(`GET`, `/reports/request-examples/request-example-success`, 200, requestExampleSuccess),
  stubRequestExamplesSuccessStatus: () =>
    createBasicHttpStub(
      `GET`,
      `/reports/request-examples/request-example-success/statements/[a-zA-Z0-9_]+/status`,
      200,
      {
        status: 'FINISHED',
      },
    ),
  stubDefinitionRequestExamplesSuccess: () =>
    createBasicHttpStub(`GET`, `/definitions/request-examples/request-example-success`, 200, {
      id: 'request-examples',
      name: 'Request examples',
      dashboards: [],
      variant: requestExampleSuccess,
    }),
  stubDefinitionFeatureTestingInteractive: () =>
    createBasicHttpStub(`GET`, `/definitions/feature-testing/feature-testing-interactive`, 200, {
      id: 'feature-testing-interactive',
      name: 'Interactive Report',
      dashboards: [],
      variant: featureTestingInteractive,
    }),
  stubDefinitionFeatureTestingMissingDesc: () =>
    createBasicHttpStub(`GET`, `/definitions/feature-testing/feature-testing-missing-description`, 200, {
      id: 'feature-testing-missing-description',
      name: 'Feature testing',
      dashboards: [],
      variant: featureTestingMissingDescription,
    }),
  stubDefinitionMockReportVariant35: () =>
    createBasicHttpStub(`GET`, `/definitions/mock-report/variantId-35`, 200, {
      id: 'mock-report',
      name: 'Mock reports',
      dashboards: [],
      variant: variant35Interactive,
    }),
  stubReportsFinishedStatus: () =>
    createBasicHttpStub(`GET`, `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`, 200, {
      status: RequestStatus.FINISHED,
    }),
  stubReportsPickedStatus: () =>
    createBasicHttpStub(`GET`, `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`, 200, {
      status: RequestStatus.PICKED,
    }),
  stubReportsStartedStatus: () =>
    createBasicHttpStub(`GET`, `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`, 200, {
      status: RequestStatus.STARTED,
    }),
  stubReportsSubmittedStatus: () =>
    createBasicHttpStub(`GET`, `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`, 200, {
      status: RequestStatus.SUBMITTED,
    }),
  stubReportsAbortedStatus: () =>
    createBasicHttpStub(`GET`, `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`, 200, {
      status: RequestStatus.ABORTED,
    }),
  stubReportsExpiredStatus: () =>
    createBasicHttpStub(`GET`, `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`, 200, {
      status: RequestStatus.EXPIRED,
    }),
  stubReportsFailedStatus: () =>
    createBasicHttpStub(`GET`, `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`, 200, {
      error: {
        developerMessage: 'a developer message goes here',
      },
      status: RequestStatus.FAILED,
    }),
  stubReportsReadyStatus: () =>
    createBasicHttpStub(`GET`, `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/statements/[a-zA-Z0-9_]+/status`, 200, {
      status: RequestStatus.READY,
    }),
  stubFeatureTestingInteractive: () =>
    createBasicHttpStub(
      `GET`,
      `/reports/feature-testing/feature-testing-interactive/statements/[a-zA-Z0-9_]+/status`,
      200,
      {
        status: 'FINISHED',
      },
    ),
  stubFeatureTestingMissingDesc: () =>
    createBasicHttpStub(
      `GET`,
      `/reports/feature-testing/feature-testing-missing-description/statements/[a-zA-Z0-9_]+/status`,
      200,
      {
        status: 'FINISHED',
      },
    ),
  stubViewAsyncReportingResults: () =>
    createBasicHttpStub(
      `GET`,
      `/async/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+`,
      200,
      {
        executionId: 'exId_238947923',
        tableId: 'tblId_1729765628165',
      },
      500,
    ),
  stubRequestSuccessResult10: () =>
    createHttpStub(
      `GET`,
      `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/tables/tblId_[a-zA-Z0-9]+/result`,
      {
        pageSize: {
          matches: '10',
        },
      },
      undefined,
      200,
      createMockData(10),
    ),
  stubRequestSuccessResult20: () =>
    createHttpStub(
      `GET`,
      `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/tables/tblId_[a-zA-Z0-9]+/result`,
      {
        pageSize: {
          matches: '20',
        },
      },
      undefined,
      200,
      createMockData(20),
    ),
  stubRequestSuccessResult20WithDelay: () =>
    createHttpStub(
      `GET`,
      `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/tables/tblId_[a-zA-Z0-9]+/result`,
      {
        pageSize: {
          matches: '20',
        },
      },
      undefined,
      200,
      createMockData(20),
      500,
    ),
  stubRequestSuccessResult100: () =>
    createHttpStub(
      `GET`,
      `/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/tables/tblId_[a-zA-Z0-9]+/result`,
      {
        pageSize: {
          matches: '100',
        },
      },
      undefined,
      200,
      createMockData(100),
    ),
  stubRequestSuccessReportTablesCount: () =>
    createBasicHttpStub(
      `GET`,
      `/report/tables/tblId_[a-zA-Z0-9]+/count`,
      200,
      {
        count: 100,
      },
      500,
    ),
  stubMissingRequestSubmitSuccess: () =>
    createBasicHttpStub(`POST`, `/missingRequest/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+`, 200, {
      userId: 'userId',
      reportId: 'feature-testing',
      reportVariantId: 'feature-testing-missing-1',
      reason: 'a reason',
      id: '123abc',
    }),
}

export default stubs
