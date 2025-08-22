export default class DprUser {
  // Auth token
  token: string

  // Nomis user uuid
  userId: string

  // e.g. John Smith
  displayName?: string

  // e.g. MDI
  activeCaseLoadId?: string

  // Prison staff id in Nomis
  staffId?: number

  // Email address
  emailAddress?: string
}
