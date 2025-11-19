import { dashboardApiFailures } from "@networkMocks/dashboard/dashboardApiFailures";
import { stubFor } from "@networkMocks/generateNetworkMock";
import { reportingApiFailures } from "@networkMocks/mocks";
import request from "superagent";

export const reportingFailureStubs = Object.fromEntries(
  Object.entries(reportingApiFailures).map(([key, mockRequest]) => {
    return [key, () => stubFor(mockRequest)]
  })
) as Record<keyof typeof reportingApiFailures, () => request.Request>

export const dashboardFailureStubs = Object.fromEntries(
  Object.entries(dashboardApiFailures).map(([key, mockRequest]) => {
    return [key, () => stubFor(mockRequest)]
  })
) as Record<keyof typeof dashboardApiFailures, () => request.Request>