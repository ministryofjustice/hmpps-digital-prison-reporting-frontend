import { RequestHandler } from 'express'

export default class RowSectionChildTemplateController {
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
      template: 'row-section-child',
      loadType: 'async',
      type: 'report',
      actions: [],
      canDownload: false,
      printable: true,
      reportName: 'C Test Report',
      name: 'Sectioned Rows + child template',
      description: 'A report with sectioned rows and child report',
      requestedTimestamp: '04/06/2025, 11:47:24',
      reportId: 'test-report-3',
      tableId: 'tblId_1749034042532',
      id: 'variantId-31',
      executionId: 'exId_1749034042532',
      querySummary: [],
      requestUrl: {
        fullUrl: 'http://localhost:3010/async/report/test-report-3/variantId-31/request',
        pathname: '/async/report/test-report-3/variantId-31/request',
        search: '',
      },
      reportUrl: '/async/report/test-report-3/variantId-31/request/tblId_1749034042532/report',
      reportSearch: null,
      search: null,
      pathname: '/async/report/test-report-3/variantId-31/request/tblId_1749034042532/report',
      dataTable: [
        {
          head: [],
          rows: [
            [
              {
                classes: 'dpr-section-header',
                colspan: 2,
                html: '<h2 class="govuk-heading-m">Data columns as rows</h2>',
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
                html: '<h2 class="govuk-heading-m">Child report</h2>',
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
                text: 'Han Solo',
                classes: 'dpr-row-heading',
              },
              {
                text: 'Never tell me the odds.',
                classes: 'dpr-row-heading-data',
              },
            ],
            [
              {
                text: 'Master Yoda',
                classes: 'dpr-row-heading',
              },
              {
                text: 'Do or do not. There is no try',
                classes: 'dpr-row-heading-data',
              },
            ],
            [
              {
                text: 'Obi-wan Kenobi',
                classes: 'dpr-row-heading',
              },
              {
                text: 'Hello there',
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
                html: '<h2 class="govuk-heading-m">Child report 2</h2>',
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
                text: 'Homer Simpson',
                classes: 'dpr-row-heading',
              },
              {
                text: 'Doh!',
                classes: 'dpr-row-heading-data',
              },
            ],
            [
              {
                text: 'Mr Burns',
                classes: 'dpr-row-heading',
              },
              {
                text: 'Excellent!',
                classes: 'dpr-row-heading-data',
              },
            ],
            [
              {
                text: 'Ned Flanders',
                classes: 'dpr-row-heading',
              },
              {
                text: 'Hi-diddly-ho, neighborino',
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
      title: 'Row section child template',
      reportData,
    })
  }
}
