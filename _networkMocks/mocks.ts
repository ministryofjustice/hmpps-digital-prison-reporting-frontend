import defs from './mockReportDefinition'
import { setupSimpleMock } from "./generateNetworkMock";

export const mocks = [
  setupSimpleMock("/definitions", defs.reports),
]