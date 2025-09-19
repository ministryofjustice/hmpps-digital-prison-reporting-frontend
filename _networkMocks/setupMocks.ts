import { getMappings } from 'cypress-tests/mockApis/wiremock'
import { mocks as dashboardDefMocks } from './dashboard/dashboardDefinitions/mocks'
import { postNetworkMocks } from './generateNetworkMock'
import { mocks as basicMocks } from './mocks'
import { mocks as dashboardMocks } from './dashboard/mocks'
import { mocks as reportMocks } from './report/mocks'
import { mocks as dashboardResultsMocks } from './dashboard/dashboardResults/mocks'
import { mocks as missingReportMocks } from './report/missingReport/mocks'

const setupMocks = async () => {
  const allMocks = [
    ...basicMocks,
    ...dashboardMocks,
    ...reportMocks,
    ...dashboardDefMocks,
    ...dashboardResultsMocks,
    ...missingReportMocks,
  ]

  await postNetworkMocks(allMocks)
  const mappings = await getMappings()
  if (mappings.meta.total !== allMocks.length) {
    throw Error(`Total wiremock mappings available was ${mappings.meta.total} but should have been ${allMocks.length}`)
  }
}

setupMocks()
