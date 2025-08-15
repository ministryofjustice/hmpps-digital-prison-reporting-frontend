import { createBasicHttpStub, createHttpStub, reportIdRegex } from './wiremock'

const stubs = {
  stubSubmitMissingRequest: () => createBasicHttpStub('POST', `/missingRequest/${reportIdRegex}/${reportIdRegex}`, 200),
}

export default stubs
