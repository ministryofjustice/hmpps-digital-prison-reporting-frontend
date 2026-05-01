export class DprUser {
  // Auth token
  token = ''

  // Nomis user uuid
  id = ''

  // e.g. John Smith
  displayName?: string

  // e.g. MDI
  activeCaseLoadId?: ActiveCaseLoadId

  // Prison staff id in Nomis
  staffId?: number

  // Email address
  emailAddress?: string
}

type ActiveCaseLoadId = {
  id: string
  name: string
  function: string
}

export default DprUser
