class DprUser {
  // Auth token
  token: string

  // Nomis user uuid
  id: string

  // e.g. John Smith
  displayName?: string

  // e.g. MDI
  activeCaseLoadId?: string

  // Prison staff id in Nomis
  staffId?: number

  // Email address
  emailAddress?: string
}

export { DprUser }
export default DprUser
