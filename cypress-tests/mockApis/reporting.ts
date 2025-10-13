import { createBasicHttpStub } from './wiremock'
import { requestExampleSuccess } from '@networkMocks/report/mockVariants/request-examples/success'
import { requestExampleFailStatus } from '@networkMocks/report/mockVariants/request-examples/fail-status'
import { createMockData } from '@networkMocks/report/mockVariants/mockAsyncData'
import { variant35Interactive } from '@networkMocks/report/mockVariants/mock-report/interactive-async'
import { featureTestingInteractive } from '@networkMocks/report/mockVariants/feature-testing/interactiveFilters'
import { featureTestingMissingDescription } from '@networkMocks/report/mockVariants/feature-testing/missingDescription'
import { featureTestingMissing1 } from '@networkMocks/report/mockVariants/feature-testing/missing1'
import { variant15 as relativeDateRange } from '@networkMocks/report/mockVariants/filter-input-examples/relativeDateRange'
import { variant15 as relativeDateRangeWithDefaults } from '@networkMocks/report/mockVariants/filter-input-examples/relativeDateRangeWithDefaults'
import { cancelAsyncRequestMock, getAsyncInteractiveCountMock, getAsyncReportResultMock, getAsyncReportResultMockMissingData, getReportResultCountMock, getReportStatusMock, reportsAbortedStatusMock, reportsExpiredStatusMock, reportsFailedStatusMock, reportsFinishedStatusMock, reportsPickedStatusMock, reportsReadyStatusMock, reportsStartedStatusMock, reportsSubmittedStatusMock, requestAsyncReportMock, setupSimpleReportDefinitionResponseMock } from '@networkMocks/report/mocks'
import { generateIndividualDefinitionSummaries, getDefinitionSummaries, pollingEndpoint } from '@networkMocks/mocks'
import { generateNetworkMock, stubFor } from '@networkMocks/generateNetworkMock'
import { missingReportSubmitFailMock, missingReportSubmitSuccessMock } from '@networkMocks/report/missingReport/mocks'
import { featureTestingUnprintable } from '@networkMocks/report/mockVariants/feature-testing/unprintable'
import { featureTestingEmptyQuery } from '@networkMocks/report/mockVariants/feature-testing/emptyQuery'
import { featureTestingSync } from '@networkMocks/report/mockVariants/feature-testing/sync'
import { getListWithWarnings, getListWithWarningsCount } from '@networkMocks/report/sync/mocks'

const stubs = {
  stubGetFeatureTestingMissing: () => stubFor(setupSimpleReportDefinitionResponseMock('feature-testing', featureTestingMissing1)),
  stubFilterInputsVariant15Def: () => stubFor(setupSimpleReportDefinitionResponseMock('filter-inputs', relativeDateRange)),
  stubFilterInputsRelDateDef: () => stubFor(setupSimpleReportDefinitionResponseMock('filter-inputs', relativeDateRangeWithDefaults)),
  stubGenericDefinitionRequest: () => createBasicHttpStub('GET', '/definitions/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+', 200, {
    id: 'request-examples',
    name: 'Request examples',
    dashboards: [],
    variant: requestExampleSuccess,
  }),
  stubDefinitions: () => stubFor(getDefinitionSummaries),
  stubPollingReportEndpoint: () => stubFor(pollingEndpoint),
  stubReportStatusMock: () => stubFor(getReportStatusMock),
  stubCancelAsyncRequest: () => stubFor(cancelAsyncRequestMock),
  stubDefinitionRequestExamplesSuccess: () => stubFor(setupSimpleReportDefinitionResponseMock(`request-examples`, requestExampleSuccess)),
  stubDefinitionRequestExamplesFail: () => stubFor(setupSimpleReportDefinitionResponseMock('request-examples', requestExampleFailStatus)),
  stubDefinitionFeatureTestingInteractive: () => stubFor(setupSimpleReportDefinitionResponseMock('feature-testing', featureTestingInteractive)),
  stubDefinitionFeatureTestingMissingDesc: () => stubFor(setupSimpleReportDefinitionResponseMock('feature-testing', featureTestingMissingDescription)),
  stubDefinitionMockReportVariant35: () => stubFor(setupSimpleReportDefinitionResponseMock('mock-report', variant35Interactive)),
  stubReportsFinishedStatus: () => stubFor(reportsFinishedStatusMock),
  stubReportsPickedStatus: () => stubFor(reportsPickedStatusMock),
  stubReportsStartedStatus: () => stubFor(reportsStartedStatusMock),
  stubReportsSubmittedStatus: () => stubFor(reportsSubmittedStatusMock),
  stubReportsAbortedStatus: () => stubFor(reportsAbortedStatusMock),
  stubReportsExpiredStatus: () => stubFor(reportsExpiredStatusMock),
  stubReportsFailedStatus: () => stubFor(reportsFailedStatusMock),
  stubReportsReadyStatus: () => stubFor(reportsReadyStatusMock),
  stubViewAsyncReportingResults: () => stubFor(generateNetworkMock({
    ...requestAsyncReportMock,
    response: {
      ...requestAsyncReportMock.response,
      fixedDelayMilliseconds: 500,
    }
  })),
  stubRequestSuccessResult10: () => stubFor(generateNetworkMock({
    ...getAsyncReportResultMock,
    request: {
      ...getAsyncReportResultMock.request,
      queryParameters: {
        pageSize: {
          matches: '10'
        }
      }
    }
  })),
  stubRequestSuccessResult20: () => stubFor(generateNetworkMock({
    ...getAsyncReportResultMock,
    request: {
      ...getAsyncReportResultMock.request,
      queryParameters: {
        pageSize: {
          matches: '20'
        }
      }
    },
    response: {
      ...getAsyncReportResultMock.response,
      jsonBody: createMockData(20),
    }
  })),
  stubRequestSuccessResult20WithDelay: () => stubFor(generateNetworkMock({
    ...getAsyncReportResultMock,
    request: {
      ...getAsyncReportResultMock.request,
      queryParameters: {
        pageSize: {
          matches: '20'
        }
      }
    },
    response: {
      ...getAsyncReportResultMock.response,
      fixedDelayMilliseconds: 500,
      jsonBody: createMockData(20),
    }
  })),
  stubRequestSuccessResult100: () => stubFor(generateNetworkMock({
    ...getAsyncReportResultMock,
    request: {
      ...getAsyncReportResultMock.request,
      queryParameters: {
        pageSize: {
          matches: '100'
        }
      }
    },
    response: {
      ...getAsyncReportResultMock.response,
      jsonBody: createMockData(100),
    }
  })),
  stubRequestSuccessReportTablesCount: () => stubFor(generateNetworkMock({
    ...getReportResultCountMock,
    response: {
      ...getReportResultCountMock.response,
      fixedDelayMilliseconds: 500,
    }
  })),
  stubAsyncRequestSuccessReportTablesCount: () => stubFor(generateNetworkMock({
    ...getAsyncInteractiveCountMock,
    response: {
      ...getAsyncInteractiveCountMock.response,
      fixedDelayMilliseconds: 500,
    }
  })),
  stubMissingRequestSubmitSuccess: () => stubFor(missingReportSubmitSuccessMock),
  stubMissingRequestSubmitFail: () => stubFor(missingReportSubmitFailMock),
  stubRequestSuccessResult10MissingFirstRow: () => stubFor(getAsyncReportResultMockMissingData),
  stubDefinitionUnprintable: () => stubFor(setupSimpleReportDefinitionResponseMock(`feature-testing`, featureTestingUnprintable)),
  stubDefinitionEmptyReport: () => stubFor(setupSimpleReportDefinitionResponseMock(`feature-testing`, featureTestingEmptyQuery)),
  stubDefinitionSyncReport: () => stubFor(setupSimpleReportDefinitionResponseMock('feature-testing', featureTestingSync)),
  stubSyncRequestDataSuccess: () => stubFor(getListWithWarnings),
  stubSyncRequestDataSuccessCount: () => stubFor(getListWithWarningsCount),
  stubSingleSummaries: () => Promise.all(generateIndividualDefinitionSummaries.map(stubFor)),
}

export default stubs
