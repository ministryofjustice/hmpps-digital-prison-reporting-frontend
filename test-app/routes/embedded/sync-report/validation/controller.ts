import { RequestHandler } from 'express'
import ReportListUtils from '../../../../../dist/dpr/components/report-list/utils'

export default class SyncReportValidationController {
  GET: RequestHandler = ReportListUtils.createReportListRequestHandler({
    title: 'Handler',
    definitionName: 'test-report',
    variantName: 'test-validation-variant',
    apiUrl: `http://localhost:${Number(process.env['PORT']) || 3010}`,
    layoutTemplate: 'views/page.njk',
    tokenProvider: () => 'token',
    apiTimeout: 0,
    dynamicAutocompleteEndpoint: '/dynamic-values/{fieldName}?prefix={prefix}',
    otherOptions: {
      breadCrumbList: [
        { text: 'Home', href: '/' },
        { text: 'Embedded reports', href: '/embedded' },
        { text: 'Synchronous reports', href: '/embedded/sync' },
      ],
    },
  })
}
