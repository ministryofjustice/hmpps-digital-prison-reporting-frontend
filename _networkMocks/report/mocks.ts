import { setupSimpleMock } from "@networkMocks/generateNetworkMock";
import { createMockData } from "cypress-tests/mockApis/reports/mockAsyncData";
import { requestExampleVariants } from "./mockVariants/request-examples";
import { components } from "src/dpr/types/api";

const generateMocksFromDefs = (reportId: string, defs: components['schemas']['VariantDefinition'][]) => {
  return defs.map(def => setupSimpleMock(`/definitions/${reportId}/${def.id}`, {
    variant: def,
  }))
}

export const mocks = [
  setupSimpleMock(`/async/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+`, {
    executionId: 'exId_238947923',
    tableId: 'tblId_1729765628165',
  }),
  setupSimpleMock(`/reports/[a-zA-Z0-9-_]+/[a-zA-Z0-9-_]+/tables/tblId_[a-zA-Z0-9]+/result`, createMockData(10)),

  ...generateMocksFromDefs('request-examples', requestExampleVariants)
]