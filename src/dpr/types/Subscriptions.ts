export interface GetSubscriptionResponse {
  userId: string
  reportId: string
  reportVariantId: string
  tableId?: string | undefined
  reportStatus: string
  reportUpdatedTime?: string | undefined
}
