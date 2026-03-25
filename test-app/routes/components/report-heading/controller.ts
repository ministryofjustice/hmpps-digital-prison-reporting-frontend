import { RequestHandler } from 'express'
import { getActions } from 'src/dpr/components/_reports/report-heading/report-actions/utils'
import { LoadType, ReportType } from 'src/dpr/types/UserReports'

export class ReportHeadingController {
  GET: RequestHandler = async (_req, res) => {
    const { name, reportName, reportId, csrfToken, columns } = {
      name: 'A report',
      reportName: 'A report',
      reportId: '123',
      csrfToken: 'abc123',
      columns: [],
    }
    res.render('views/pages/components/report-heading/view.njk', {
      currentDate: new Date(-(60 * 60 * 1000)).toTimeString(),
      reportData: {
        name,
        reportName,
        reportId,
        type: ReportType.REPORT,
        actions: getActions({
          copy: { url: '/copyme' },
          download: {
            enabled: true,
            name,
            reportName,
            csrfToken,
            reportId,
            id: '111',
            tableId: 'tblId_23432',
            columns,
            definitionPath: '',
            loadType: LoadType.ASYNC,
            formAction: '/downloadme',
            canDownload: true,
          },
          print: { enabled: true },
          refresh: { executionId: 'exId_234234', url: '/refreshme' },
          share: { name: 'asd', reportName, url: '/shareme' },
        }),
        detailsOpen: false,
        columns: [],
        defaultQuery: '',
        filterData: {},
        count: 5,
        bookmarkConfig: {
          bookmarkActionEndoint: '/',
          showBookmark: true,
          linkText: 'Add bookmark',
          linkType: 'add',
        },
        nestedBaseUrl: res.locals.nestedBaseUrl,
        csrfToken,
        bookmarkingEnabled: true,
      },
    })
  }
}
