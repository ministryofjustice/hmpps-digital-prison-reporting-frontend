import { setupSimpleMock } from "@networkMocks/generateNetworkMock";
import { mockTimeSeriesDataLastSixMonths } from "cypress-tests/mockApis/dashboards/data/data-quality-metrics/data";

export const mocks = [
  setupSimpleMock(`/reports/[a-zA-Z0-9-_]+/dashboards/age-breakdown-dashboard-[1-2]/tables/tblId_[a-zA-Z0-9]+/result`, mockTimeSeriesDataLastSixMonths)
]