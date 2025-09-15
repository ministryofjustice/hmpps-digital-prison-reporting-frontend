import { setupSimpleMock } from "./generateNetworkMock";
import { summaries } from './definitionSummaries';

export const getDefinitionSummaries = setupSimpleMock("/definitions", summaries)

export const mocks = [getDefinitionSummaries]