import { getMappings } from 'cypress-tests/mockApis/wiremock'
import { postNetworkMocks } from './generateNetworkMock'
import { mocks as basicMocks } from './mocks'
import { mocks as dashboardRequestMocks } from './dashboard/mocks'
import { mocks as reportMocks } from './report/mocks'
import { mocks as missingReportMocks } from './report/missingReport/mocks'
import { mocks as syncMocks } from './report/sync/mocks'
import { mocks as productCollectionMocks } from './productCollections/mocks'
import { mocks as featureFlagMocks } from './featureFlags/mocks'
import { mocks as dashboardDefinitionMocks } from './dashboard/definitions/visualisations/mocks'
import { mocks as dashbordFeatureTestingMocks } from './dashboard/definitions/feature-testing/mocks'
import { mocks as dashboardResultCompleteDataMock } from './dashboard/data/complete-data/mocks'
import { mocks as dashboardResultPartialDataMocks } from './dashboard/data/partial-data/mocks'
import { mocks as dashboardResultBoxPlotDataMocks } from './dashboard/data/box-plot-data/mocks'
import { mocks as dashboardResultBadDataMocks } from './dashboard/data/bad-data/mocks'
import { mocks as dashboardResultEmptyDataMocks } from './dashboard/data/empty-data/mocks'

const setupMocks = async () => {
  const allMocks = [
    ...basicMocks,
    ...reportMocks,
    ...dashboardDefinitionMocks,
    ...missingReportMocks,
    ...syncMocks,
    ...productCollectionMocks,
    ...featureFlagMocks,

    // Dashboard data
    ...dashboardRequestMocks,
    ...dashbordFeatureTestingMocks,
    ...dashboardResultCompleteDataMock,
    ...dashboardResultPartialDataMocks,
    ...dashboardResultBoxPlotDataMocks,
    ...dashboardResultBadDataMocks,
    ...dashboardResultEmptyDataMocks,
  ]

  await postNetworkMocks(allMocks)
  const mappings = await getMappings()
  if (mappings.meta.total !== allMocks.length) {
    throw Error(`Total wiremock mappings available was ${mappings.meta.total} but should have been ${allMocks.length}`)
  }
}

setupMocks()
