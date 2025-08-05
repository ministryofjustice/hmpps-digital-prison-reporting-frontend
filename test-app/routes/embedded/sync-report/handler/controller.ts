import { RequestHandler } from 'express'
import ReportListUtils from '../../../../../dist/dpr/components/report-list/utils'
import { CreateRequestHandlerInput } from '../../../../../dist-docs/dpr/components/report-list/types'

export default class SyncReportByHandlerController {
  GET: RequestHandler = ReportListUtils.createReportListRequestHandler({
    title: 'Handler',
    definitionName: 'test-report',
    variantName: 'test-variant',
    apiUrl: `http://localhost:${Number(process.env.PORT) || 3010}`,
    layoutTemplate: 'views/page.njk',
    tokenProvider: () => 'token',
    otherOptions: {
      breadCrumbList: [
        { text: 'Home', href: '/' },
        { text: 'Embedded reports', href: '/embedded' },
        { text: 'Synchronous reports', href: '/embedded/sync' },
      ],
    },
  } as unknown as CreateRequestHandlerInput)
}
