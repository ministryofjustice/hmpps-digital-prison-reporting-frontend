import { RequestHandler } from 'express'

export default class SummaryTemplateController {
  layoutPath = ''

  GET: RequestHandler = async (req, res, next) => {
    const reportData = {
      filterData: {
        filters: [],
        selectedFilters: [],
      },
      count: 100,
      csrfToken: 'csrfToken',
      classification: 'OFFICIAL',
      template: 'summary',
      loadType: 'async',
      type: 'report',
      actions: [],
      canDownload: false,
      printable: true,
      reportName: 'C Test Report',
      name: 'Summaries template',
      description: 'A report with summaries, but no list.',
      requestedTimestamp: '15/05/2025, 14:00:40',
      reportId: 'test-report-3',
      tableId: 'tblId_1747314039609',
      id: 'variantId-28',
      executionId: 'exId_1747314039609',
      querySummary: [],
      requestUrl: {
        fullUrl: 'http://localhost:3010/async/report/test-report-3/variantId-28/request',
        pathname: '/async/report/test-report-3/variantId-28/request',
        search: '',
      },
      reportUrl: '/async/report/test-report-3/variantId-28/request/tblId_1747314039609/report',
      reportSearch: null,
      search: null,
      pathname: '/async/report/test-report-3/variantId-28/request/tblId_1747314039609/report',
      reportSummaries: {
        'page-header': [
          {
            head: [
              {
                text: 'Total',
                classes: null,
              },
            ],
            rows: [
              [
                {
                  fieldName: 'total',
                  text: 52,
                  format: 'string',
                  classes: '',
                },
              ],
            ],
            rowCount: 1,
            colCount: 1,
          },
          {
            head: [
              {
                text: 'Good (%)',
                classes: null,
              },
              {
                text: 'Bad (%)',
                classes: null,
              },
              {
                text: 'Ugly (%)',
                classes: null,
              },
            ],
            rows: [
              [
                {
                  fieldName: 'percentGood',
                  text: 1,
                  format: 'string',
                  classes: '',
                },
                {
                  fieldName: 'percentBad',
                  text: 10,
                  format: 'string',
                  classes: '',
                },
                {
                  fieldName: 'percentUgly',
                  text: 89,
                  format: 'string',
                  classes: '',
                },
              ],
            ],
            rowCount: 1,
            colCount: 3,
          },
        ],
      },
      dataTable: [
        {
          head: [],
          rows: [],
          rowCount: 20,
          colCount: 0,
        },
      ],
    }
    res.render('views/pages/report-template/view.njk', {
      title: 'Summary template',
      reportData,
    })
  }
}
