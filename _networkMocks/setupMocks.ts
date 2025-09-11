import { mocks as dashboardDefMocks } from "./dashboard/dashboardDefinitions/mocks"
import { postNetworkMocks } from "./generateNetworkMock"
import { mocks as basicMocks } from "./mocks"
import { mocks as dashboardMocks } from "./dashboard/mocks"
import { mocks as reportMocks } from "./report/mocks"
import { mocks as dashboardResultsMocks } from "./dashboard/dashboardResults/mocks"
import { getMappings, resetStubs } from "cypress-tests/mockApis/wiremock"

export const setupMocks = async () => {
  const allMocks = [
    ...basicMocks,
    ...dashboardMocks,
    ...reportMocks,
    ...dashboardDefMocks,
    ...dashboardResultsMocks,
  ]
  await resetStubs()

  // We unfortunately need this as wiremock doesn't seem to be ensuring that the operation completes as part of the request
  let retries = 3
  let resetDone = false
  while (retries > 0 || !resetDone) {
    const mappings = await getMappings()
    if (mappings.meta.total === 0) {
      resetDone = true
    }
    retries--
  }
  if (!resetDone) {
    throw Error("Wiremock did not reset correctly")
  }
  
  await postNetworkMocks(allMocks)
  const mappings = await getMappings()
  if (mappings.meta.total !== allMocks.length) {
    throw Error(`Total wiremock mappings available was ${mappings.meta.total} but should have been ${allMocks.length}`)
  }
}