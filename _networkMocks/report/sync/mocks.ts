import { setupSimpleMock } from "@networkMocks/generateNetworkMock";
import { ListWithWarnings } from "src/dpr/data/types";
import { createMockData } from "../mockVariants/mockAsyncData";

export const getListWithWarnings = setupSimpleMock(`/reports/list`, createMockData(20))

export const getListWithWarningsCount = setupSimpleMock(`/reports/list/count`, { count: 20 })

export const mocks = [
  getListWithWarnings,
  getListWithWarningsCount,
]