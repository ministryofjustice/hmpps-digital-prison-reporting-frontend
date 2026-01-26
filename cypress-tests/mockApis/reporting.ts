import { createBasicHttpStub } from './wiremock'
import { requestExampleSuccess } from '@networkMocks/report/mockVariants/request-examples/success'
import { requestExampleFailStatus } from '@networkMocks/report/mockVariants/request-examples/fail-status'
import { createMockData } from '@networkMocks/report/mockVariants/mockAsyncData'
import { variant35Interactive } from '@networkMocks/report/mockVariants/mock-report/interactive-async'
import { featureTestingInteractive } from '@networkMocks/report/mockVariants/feature-testing/interactiveFilters'
import { establishmentAutocomplete } from '@networkMocks/report/mockVariants/filter-input-examples/autocomplete'
import { featureTestingMissingDescription } from '@networkMocks/report/mockVariants/feature-testing/missingDescription'
import { featureTestingMissing1 } from '@networkMocks/report/mockVariants/feature-testing/missing1'
import { variant15 as relativeDateRange } from '@networkMocks/report/mockVariants/filter-input-examples/relativeDateRange'
import { variant15 as relativeDateRangeWithDefaults } from '@networkMocks/report/mockVariants/filter-input-examples/relativeDateRangeWithDefaults'
import {
  cancelAsyncRequestMock,
  getAsyncInteractiveCountMock,
  getAsyncReportResultMock,
  getAsyncReportResultMockMissingData,
  getReportResultCountMock,
  reportsAbortedStatusMock,
  reportsExpiredStatusMock,
  reportsFailedStatusMock,
  reportsFinishedStatusMock,
  reportsPickedStatusMock,
  reportsReadyStatusMock,
  reportsStartedStatusMock,
  reportsSubmittedStatusMock,
  requestAsyncReportMock,
  requestAsyncReportBadDataMock,
  setupSimpleReportDefinitionResponseMock,
  getAsyncSummaryReport,
} from '@networkMocks/report/mocks'
import { generateIndividualDefinitionSummaries, getDefinitionSummaries, pollingEndpoint } from '@networkMocks/mocks'
import { generateNetworkMock, stubFor } from '@networkMocks/generateNetworkMock'
import { missingReportSubmitFailMock, missingReportSubmitSuccessMock } from '@networkMocks/report/missingReport/mocks'
import { featureTestingUnprintable } from '@networkMocks/report/mockVariants/feature-testing/unprintable'
import { featureTestingEmptyQuery } from '@networkMocks/report/mockVariants/feature-testing/emptyQuery'
import { featureTestingSync } from '@networkMocks/report/mockVariants/feature-testing/sync'
import { getListWithWarnings, getListWithWarningsCount } from '@networkMocks/report/sync/mocks'
import { featureTestingOrderFilters } from '@networkMocks/report/mockVariants/feature-testing/orderFilters'
import {
  getProductCollection1,
  getProductCollection2,
  getProductCollections,
} from '@networkMocks/productCollections/mocks'
import { reportingFailureStubs } from './failures'
import reportTemplateExampleListSection from '@networkMocks/report/mockVariants/report-templates/list-section'
import reportTemplateExampleParentChild from '@networkMocks/report/mockVariants/report-templates/parent-child'
import reportTemplateExampleParentChildSection from '@networkMocks/report/mockVariants/report-templates/parent-child-section'
import reportTemplateExampleSummarySection from '@networkMocks/report/mockVariants/report-templates/summary-section'
import { getFlagsMockDisabled, getFlagsMockEmpty, getFlagsMockEnabled } from '@networkMocks/featureFlags/mocks'

export const stubs = {
  stubGetFeatureTestingMissing: () =>
    stubFor(setupSimpleReportDefinitionResponseMock('feature-testing', featureTestingMissing1)),
  stubFilterInputsVariant15Def: () =>
    stubFor(setupSimpleReportDefinitionResponseMock('filter-inputs', relativeDateRange)),
  stubFilterInputsRelDateDef: () =>
    stubFor(setupSimpleReportDefinitionResponseMock('filter-inputs', relativeDateRangeWithDefaults)),
  stubGenericDefinitionRequest: () =>
    createBasicHttpStub('GET', '/definitions/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+', 200, {
      id: 'request-examples',
      name: 'Request examples',
      dashboards: [],
      variant: requestExampleSuccess,
    }),
  stubListSectionDefinitionRequest: () =>
    createBasicHttpStub('GET', '/definitions/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+', 200, {
      id: 'request-examples',
      name: 'Request examples',
      dashboards: [],
      variant: reportTemplateExampleListSection,
    }),
  stubParentChildDefinitionRequest: () =>
    createBasicHttpStub('GET', '/definitions/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+', 200, {
      id: 'request-examples',
      name: 'Request examples',
      dashboards: [],
      variant: reportTemplateExampleParentChild,
    }),
  stubSummarySectionDefinitionRequest: () =>
    createBasicHttpStub('GET', '/definitions/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+', 200, {
      id: 'request-examples',
      name: 'Request examples',
      dashboards: [],
      variant: reportTemplateExampleSummarySection,
    }),
  stubParentChildSectionDefinitionRequest: () =>
    createBasicHttpStub('GET', '/definitions/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+', 200, {
      id: 'request-examples',
      name: 'Request examples',
      dashboards: [],
      variant: reportTemplateExampleParentChildSection,
    }),
  stubAsyncSummaryReport: () => stubFor(getAsyncSummaryReport),
  stubDefinitions: () => stubFor(getDefinitionSummaries),
  stubPollingReportEndpoint: () => stubFor(pollingEndpoint),
  stubCancelAsyncRequest: () => stubFor(cancelAsyncRequestMock),
  stubDefinitionRequestExamplesSuccess: () =>
    stubFor(setupSimpleReportDefinitionResponseMock(`request-examples`, requestExampleSuccess)),
  stubDefinitionRequestExamplesFail: () =>
    stubFor(setupSimpleReportDefinitionResponseMock('request-examples', requestExampleFailStatus)),
  stubDefinitionFeatureTestingInteractive: () =>
    stubFor(setupSimpleReportDefinitionResponseMock('feature-testing', featureTestingInteractive)),
  stubDefinitionFeatureTestingMissingDesc: () =>
    stubFor(setupSimpleReportDefinitionResponseMock('feature-testing', featureTestingMissingDescription)),
  stubDefinitionMockReportVariant35: () =>
    stubFor(setupSimpleReportDefinitionResponseMock('mock-report', variant35Interactive)),
  stubReportsFinishedStatus: () => stubFor(reportsFinishedStatusMock),
  stubReportsPickedStatus: () => stubFor(reportsPickedStatusMock),
  stubReportsStartedStatus: () => stubFor(reportsStartedStatusMock),
  stubReportsSubmittedStatus: () => stubFor(reportsSubmittedStatusMock),
  stubReportsAbortedStatus: () => stubFor(reportsAbortedStatusMock),
  stubReportsExpiredStatus: () => stubFor(reportsExpiredStatusMock),
  stubReportsFailedStatus: () => stubFor(reportsFailedStatusMock),
  stubReportsReadyStatus: () => stubFor(reportsReadyStatusMock),
  stubViewAsyncReportingResults: () =>
    stubFor(
      generateNetworkMock({
        ...requestAsyncReportMock,
        response: {
          ...requestAsyncReportMock.response,
          fixedDelayMilliseconds: 500,
        },
      }),
    ),
  stubViewAsyncReportingResultsBadData: () =>
    stubFor(
      generateNetworkMock({
        ...requestAsyncReportBadDataMock,
        response: {
          ...requestAsyncReportBadDataMock.response,
          fixedDelayMilliseconds: 500,
        },
      }),
    ),
  stubRequestSuccessResult10: () =>
    stubFor(
      generateNetworkMock({
        ...getAsyncReportResultMock,
        request: {
          ...getAsyncReportResultMock.request,
          queryParameters: {
            pageSize: {
              matches: '10',
            },
          },
        },
      }),
    ),
  stubRequestSuccessResult20: () =>
    stubFor(
      generateNetworkMock({
        ...getAsyncReportResultMock,
        request: {
          ...getAsyncReportResultMock.request,
          queryParameters: {
            pageSize: {
              matches: '20',
            },
          },
        },
        response: {
          ...getAsyncReportResultMock.response,
          jsonBody: createMockData(20),
        },
      }),
    ),
  stubResultSuccessResult: () =>
    stubFor(
      generateNetworkMock({
        ...getAsyncReportResultMock,
        request: {
          ...getAsyncReportResultMock.request,
        },
        response: {
          ...getAsyncReportResultMock.response,
          jsonBody: createMockData(20),
        },
      }),
    ),
  stubResultSuccessResultDifferentValues: () =>
    stubFor(
      generateNetworkMock({
        ...getAsyncReportResultMock,
        request: {
          ...getAsyncReportResultMock.request,
        },
        response: {
          ...getAsyncReportResultMock.response,
          jsonBody: [
            {
              section1: 'One',
              section2: 'A',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val40',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'One',
              section2: 'B',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val41',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'One',
              section2: 'A',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val42',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'One',
              section2: 'A',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val43',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'One',
              section2: 'B',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val44',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'One',
              section2: 'A',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val45',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'One',
              section2: 'A',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val46',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'Two',
              section2: 'B',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val30',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'Two',
              section2: 'A',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val31',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'Two',
              section2: 'A',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val32',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'Two',
              section2: 'B',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val33',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'Two',
              section2: 'A',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val34',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'Two',
              section2: 'A',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val35',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'Two',
              section2: 'B',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val36',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'Two',
              section2: 'A',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val37',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'Two',
              section2: 'A',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val38',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'Two',
              section2: 'B',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val39',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'Two',
              section2: 'A',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val330',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'Two',
              section2: 'A',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val331',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
            {
              section1: 'Two',
              section2: 'B',
              section3: 'C',
              field1: 'val1',
              field2: 'val2',
              field3: 'val332',
              field4: 'val4',
              field5: '',
              field6: '',
              field7: '',
              field8: '',
              field9: '',
              field10: '',
              field11: '',
              field12: '',
              field13: '',
              field14: '',
            },
          ],
        },
      }),
    ),
  stubRequestSuccessResult20WithDelay: () =>
    stubFor(
      generateNetworkMock({
        ...getAsyncReportResultMock,
        request: {
          ...getAsyncReportResultMock.request,
          queryParameters: {
            pageSize: {
              matches: '20',
            },
          },
        },
        response: {
          ...getAsyncReportResultMock.response,
          fixedDelayMilliseconds: 500,
          jsonBody: createMockData(20),
        },
      }),
    ),
  stubRequestSuccessResult100: () =>
    stubFor(
      generateNetworkMock({
        ...getAsyncReportResultMock,
        request: {
          ...getAsyncReportResultMock.request,
          queryParameters: {
            pageSize: {
              matches: '100',
            },
          },
        },
        response: {
          ...getAsyncReportResultMock.response,
          jsonBody: createMockData(100),
        },
      }),
    ),
  stubRequestSuccessReportTablesCount: () =>
    stubFor(
      generateNetworkMock({
        ...getReportResultCountMock,
        response: {
          ...getReportResultCountMock.response,
          fixedDelayMilliseconds: 500,
        },
      }),
    ),
  stubAsyncRequestSuccessReportTablesCount: () =>
    stubFor(
      generateNetworkMock({
        ...getAsyncInteractiveCountMock,
        response: {
          ...getAsyncInteractiveCountMock.response,
          fixedDelayMilliseconds: 500,
        },
      }),
    ),
  stubMissingRequestSubmitSuccess: () => stubFor(missingReportSubmitSuccessMock),
  stubMissingRequestSubmitFail: () => stubFor(missingReportSubmitFailMock),
  stubRequestSuccessResult10MissingFirstRow: () => stubFor(getAsyncReportResultMockMissingData),
  stubDefinitionUnprintable: () =>
    stubFor(setupSimpleReportDefinitionResponseMock(`feature-testing`, featureTestingUnprintable)),
  stubDefinitionEmptyReport: () =>
    stubFor(setupSimpleReportDefinitionResponseMock(`feature-testing`, featureTestingEmptyQuery)),
  stubDefinitionSyncReport: () =>
    stubFor(setupSimpleReportDefinitionResponseMock('feature-testing', featureTestingSync)),
  stubDefinitionOrderFilters: () =>
    stubFor(setupSimpleReportDefinitionResponseMock('feature-testing', featureTestingOrderFilters)),
  stubDefinitionAutocomplete: () =>
    stubFor(setupSimpleReportDefinitionResponseMock('filter-inputs', establishmentAutocomplete)),
  stubSyncRequestDataSuccess: () => stubFor(getListWithWarnings),
  stubSyncRequestDataSuccessCount: () => stubFor(getListWithWarningsCount),
  stubSingleSummaries: () => Promise.all(generateIndividualDefinitionSummaries.map(stubFor)),
  stubGetProductCollections: () => stubFor(getProductCollections),
  getProductCollection1: () => stubFor(getProductCollection1),
  getProductCollection2: () => stubFor(getProductCollection2),
  stubFeatureFlags: () => stubFor(getFlagsMockEnabled),
  stubFeatureFlagsEmpty: () => stubFor(getFlagsMockEmpty),
  stubFeatureFlagsDisabled: () => stubFor(getFlagsMockDisabled),
  ...reportingFailureStubs,
} as const

export type ReportingStubsKeys = keyof typeof stubs

export default stubs
