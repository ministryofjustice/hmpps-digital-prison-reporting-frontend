import { ReportStoreConfig } from "../../../src/dpr/types/ReportStore";

export const setRedisState = (userStore: ReportStoreConfig, userId: string = 'userId') => {
  cy.request('POST', `/embedded/platform/setRedisState`, {
    userId,
    data: userStore
  })
  cy.reload()
}

export const getRedisState = (userId: string = 'userId') => {
  return cy.request<ReportStoreConfig>('GET', `/embedded/platform/getRedisState/${userId}`)
}

export const updateRedisState = (userStoreKey: keyof ReportStoreConfig, userStoreValue: ReportStoreConfig[typeof userStoreKey], userId: string = 'userId', ) => {
  cy.request('POST', `/embedded/platform/updateRedisState`, {
    userId,
    userStoreKey,
    userStoreValue
  })
  cy.reload()
}

export const resetFeatureFlags = () => {
  cy.request('POST', `/embedded/platform/resetFeatureFlags`, {})
  cy.reload()
}