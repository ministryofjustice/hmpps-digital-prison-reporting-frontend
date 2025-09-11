import defs from './report/mockReportDefinition'
import { setupSimpleMock } from "./generateNetworkMock";

export const mocks = [
  setupSimpleMock("/definitions", defs.reports),
]