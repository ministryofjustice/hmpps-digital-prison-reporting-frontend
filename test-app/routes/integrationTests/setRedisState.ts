import { ReportStoreConfig } from "../../../src/dpr/types/ReportStore";

export const setRedisState = (userStore: ReportStoreConfig, userId: string = 'userId') => {
  cy.request('POST', `/embedded/platform/setRedisState`, {
    userId,
    data: userStore
  })
  cy.reload()
}
