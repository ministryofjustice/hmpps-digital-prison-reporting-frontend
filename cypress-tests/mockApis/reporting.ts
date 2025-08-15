import type { components } from '../../src/dpr/types/api'
import { createHttpStub, reportIdRegex } from './wiremock'
import mockReports from '../../test-app/mocks/mockClients/reports/mockVariants/mock-report'

const stubs = {
  stubGetDefinition: () =>
    createHttpStub('GET', `/definitions/${reportIdRegex}/${reportIdRegex}`, undefined, undefined, 200, {
      id: 'mock-report',
      name: 'Mock reports',
      variant: mockReports[0],
      dashboards: [],
    } as components['schemas']['SingleVariantReportDefinition']),
}

export default stubs
