import { RequestHandler } from 'express'
import { renderListWithDefinition } from '../../../../../dist/dpr/components/report-list/utils'
import { RenderListWithDefinitionInput } from '../../../../../dist-docs/dpr/components/report-list/types'

export default class SyncReportByMethodController {
  GET: RequestHandler = async (req, res, next) => {
    renderListWithDefinition({
      title: 'Method',
      definitionName: 'test-report',
      variantName: 'test-variant',
      apiUrl: `http://localhost:${Number(process.env.PORT) || 3010}`,
      layoutTemplate: 'views/page.njk',
      dynamicAutocompleteEndpoint: '/dynamic-values/{fieldName}?prefix={prefix}',
      otherOptions: {
        breadCrumbList: [
          { text: 'Home', href: '/' },
          { text: 'Embedded reports', href: '/embedded' },
          { text: 'Synchronous reports', href: '/embedded/sync' },
        ],
      },
      request: req,
      response: res,
      next,
    } as unknown as RenderListWithDefinitionInput)
  }
}
