import { RequestHandler } from 'express'

export default class RowSectionTemplateController {
  layoutPath: string

  GET: RequestHandler = async (req, res, next) => {
    const reportData = {
      filterData: {
        filters: [],
        selectedFilters: [],
      },
      count: 100,
      csrfToken: 'csrfToken',
      classification: 'OFFICIAL',
      template: 'row-section',
      loadType: 'async',
      type: 'report',
      actions: [],
      canDownload: false,
      printable: true,
      reportName: 'C Test Report',
      name: 'Sectioned Rows template',
      description: 'A report with sectioned rows',
      requestedTimestamp: '04/06/2025, 11:46:00',
      reportId: 'test-report-3',
      tableId: 'tblId_1749033959282',
      id: 'variantId-30-row-section',
      executionId: 'exId_1749033959282',
      querySummary: [],
      requestUrl: {
        fullUrl: 'http://localhost:3010/async/report/test-report-3/variantId-30-row-section/request',
        pathname: '/async/report/test-report-3/variantId-30-row-section/request',
        search: '',
      },
      reportUrl: '/async/report/test-report-3/variantId-30-row-section/request/tblId_1749033959282/report',
      reportSearch: null,
      search: null,
      pathname: '/async/report/test-report-3/variantId-30-row-section/request/tblId_1749033959282/report',
      dataTable: [
        {
          head: [],
          rows: [
            [
              {
                classes: 'dpr-section-header',
                colspan: 2,
                html: '<h2 class="govuk-heading-m">Section 1 title</h2>',
              },
            ],
            [
              {
                classes: 'dpr-section-header-spacer-bottom',
                colspan: 2,
                text: '',
              },
            ],
            [
              {
                text: 'Field One',
                classes: 'dpr-row-heading',
              },
              {
                text: 'Value 1',
                classes: 'dpr-row-heading-data',
              },
            ],
            [
              {
                text: 'Field Two',
                classes: 'dpr-row-heading',
              },
              {
                text: 'Value 2',
                classes: 'dpr-row-heading-data',
              },
            ],
            [
              {
                classes: 'dpr-section-header-spacer',
                colspan: 2,
                text: '',
              },
            ],
            [
              {
                classes: 'dpr-section-header',
                colspan: 2,
                html: '<h2 class="govuk-heading-m">Second 2 title</h2>',
              },
            ],
            [
              {
                classes: 'dpr-section-header-spacer-bottom',
                colspan: 2,
                text: '',
              },
            ],
            [
              {
                text: 'Field Three',
                classes: 'dpr-row-heading',
              },
              {
                text: 'Value 3',
                classes: 'dpr-row-heading-data',
              },
            ],
            [
              {
                text: 'Field Four',
                classes: 'dpr-row-heading',
              },
              {
                text: 'Value 4',
                classes: 'dpr-row-heading-data',
              },
            ],
            [
              {
                classes: 'dpr-section-header-spacer',
                colspan: 2,
                text: '',
              },
            ],
            [
              {
                classes: 'dpr-section-header',
                colspan: 2,
                html: '<h2 class="govuk-heading-m">Section 3 title</h2>',
              },
            ],
            [
              {
                classes: 'dpr-section-header-spacer-bottom',
                colspan: 2,
                text: '',
              },
            ],
            [
              {
                text: 'Field Five',
                classes: 'dpr-row-heading',
              },
              {
                text: 'Value 5',
                classes: 'dpr-row-heading-data',
              },
            ],
            [
              {
                text: 'Field Six',
                classes: 'dpr-row-heading',
              },
              {
                text: 'Value 6',
                classes: 'dpr-row-heading-data',
              },
            ],
          ],
          rowCount: 1,
          colCount: 2,
        },
      ],
    }

    res.render('views/pages/report-template/view.njk', {
      title: 'Row section template',
      reportData,
    })
  }
}
