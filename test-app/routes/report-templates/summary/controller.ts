import { RequestHandler } from 'express'
import { MoJTableHead, MoJTableRow } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { FilterValue, SelectedFilter } from 'src/dpr/components/_filters/types'
import { ReportAction } from 'src/dpr/components/_reports/report-heading/report-actions/types'

export default class SummaryTemplateController {
  layoutPath = ''

  GET: RequestHandler = async (_req, res) => {
    const reportData = {
      filterData: {
        filters: <FilterValue[]>[],
        selectedFilters: <SelectedFilter[]>[],
      },
      count: 100,
      csrfToken: 'csrfToken',
      classification: 'OFFICIAL',
      template: 'summary',
      loadType: 'async',
      type: 'report',
      actions: <ReportAction[]>[],
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
      querySummary: <Record<string, string>[]>[],
      requestUrl: {
        fullUrl: 'http://localhost:3010/async/report/test-report-3/variantId-28/request',
        pathname: '/async/report/test-report-3/variantId-28/request',
        search: '',
      },
      reportUrl: '/async/report/test-report-3/variantId-28/request/tblId_1747314039609/report',
      pathname: '/async/report/test-report-3/variantId-28/request/tblId_1747314039609/report',
      reportSummaries: {
        'page-header': [
          {
            head: [
              {
                text: 'Total',
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
              },
              {
                text: 'Bad (%)',
              },
              {
                text: 'Ugly (%)',
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
          head: <MoJTableHead[]>[],
          rows: <MoJTableRow[]>[],
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
