import { RequestHandler } from 'express'

export default class InternalLinkingController {
  GET: RequestHandler = async (_req, res) => {
    const links = [
      {
        ids: 'request-examples/request-example-success',
        internalId: 'uniqueInternalRequestId1',
        params: '',
        title: 'No filters applied',
      },
      {
        ids: 'request-examples/request-example-success',
        internalId: 'uniqueInternalRequestId2',
        params:
          '?filters.field1=value1.1&filters.field3.start=2004-02-01&filters.field3.end=2005-05-04&filters.field7=2005-02-02&filters.field8=value8.1&filters.field8=value8.4&sortColumn=field2&sortedAsc=false',
        title: 'Pre-request filters applied',
      },
    ]

    res.render('views/pages/platform/internalLinking.njk', { links })
  }
}
