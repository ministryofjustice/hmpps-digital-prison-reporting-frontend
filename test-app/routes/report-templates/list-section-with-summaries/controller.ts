import { RequestHandler } from 'express'

export default class ListSectionTemplateController {
  layoutPath = ''

  GET: RequestHandler = async (req, res, next) => {
    const reportData = {
      columns: {
        name: 'columns',
        options: [
          {
            text: 'Field 1',
            value: 'field1',
            disabled: false,
          },
          {
            text: 'Field 2',
            value: 'field2',
            disabled: false,
          },
          {
            text: 'Field 3',
            value: 'field3',
            disabled: false,
          },
          {
            text: 'Field 4',
            value: 'field4',
          },
          {
            text: 'Field 6',
            value: 'field6',
            disabled: false,
          },
        ],
        text: 'Select report columns',
        value: ['field1', 'field2', 'field3', 'field4'],
      },
      filterData: {
        filters: [],
        selectedFilters: [],
      },
      count: 100,
      csrfToken: 'csrfToken',
      classification: 'OFFICIAL',
      template: 'list-section',
      loadType: 'async',
      type: 'report',
      actions: [],
      canDownload: false,
      printable: true,
      reportName: 'B Test Report',
      name: 'Page Summaries and Sections',
      description: 'A report with summaries and sections.',
      requestedTimestamp: '15/05/2025, 14:10:58',
      reportId: 'test-report-2',
      tableId: 'tblId_1747314657029',
      id: 'variantId-10',
      executionId: 'exId_1747314657029',
      querySummary: [
        {
          name: 'Field 3 start',
          value: '01/02/2003',
        },
        {
          name: 'Field 3 end',
          value: '04/05/2007',
        },
        {
          name: 'Sort Column',
          value: 'Field 1',
        },
        {
          name: 'Sort Direction',
          value: 'Ascending',
        },
      ],
      requestUrl: {
        fullUrl:
          'http://localhost:3010/async/report/test-report-2/variantId-10/request?filters.field3.start=2003-02-01&filters.field3.end=2007-05-04&sortColumn=field1&sortedAsc=true',
        pathname: '/async/report/test-report-2/variantId-10/request',
        search: '?filters.field3.start=2003-02-01&filters.field3.end=2007-05-04&sortColumn=field1&sortedAsc=true',
      },
      reportUrl: '/async/report/test-report-2/variantId-10/request/tblId_1747314657029/report',
      reportSearch: null,
      search: null,
      pathname: '/async/report/test-report-2/variantId-10/request/tblId_1747314657029/report',
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
        ],
        'page-footer': [
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
          head: null,
          rows: [
            [
              {
                classes: 'dpr-section-header',
                colspan: 4,
                html: '<h2 class="govuk-heading-m">First: One, Second: A <span class=\'govuk-caption-m\'>17 results</span></h2>',
              },
            ],
            [
              {
                classes: 'dpr-section-header-spacer-bottom',
                colspan: 4,
                text: '',
              },
            ],
            [
              {
                text: 'Field 1',
                classes: 'govuk-table__header',
              },
              {
                text: 'Field 2',
                classes: 'govuk-table__header',
              },
              {
                text: 'Field 3',
                classes: 'govuk-table__header',
              },
              {
                text: 'Field 4',
                classes: 'govuk-table__header',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Section One A Header',
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
              },
              {
                fieldName: 'field2',
                text: 1,
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
              },
              {
                fieldName: 'field3',
                text: 12219380923,
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
              },
              {
                fieldName: 'field4',
                text: '4 Freds',
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Section One A Footer',
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
              },
              {
                fieldName: 'field2',
                text: 1,
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
              },
              {
                fieldName: 'field3',
                text: 12219380923,
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
              },
              {
                fieldName: 'field4',
                text: '6 Freds',
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
              },
            ],
            [
              {
                classes: 'dpr-section-header-spacer',
                colspan: 4,
                text: '',
              },
            ],
            [
              {
                classes: 'dpr-section-header',
                colspan: 4,
                html: '<h2 class="govuk-heading-m">First: One, Second: B <span class=\'govuk-caption-m\'>33 results</span></h2>',
              },
            ],
            [
              {
                classes: 'dpr-section-header-spacer-bottom',
                colspan: 4,
                text: '',
              },
            ],
            [
              {
                text: 'Field 1',
                classes: 'govuk-table__header',
              },
              {
                text: 'Field 2',
                classes: 'govuk-table__header',
              },
              {
                text: 'Field 3',
                classes: 'govuk-table__header',
              },
              {
                text: 'Field 4',
                classes: 'govuk-table__header',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Section One B Footer',
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
              },
              {
                fieldName: 'field2',
                text: 1,
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
              },
              {
                fieldName: 'field3',
                text: 12219380923,
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
              },
              {
                fieldName: 'field4',
                text: '7 Freds',
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer',
              },
            ],
            [
              {
                classes: 'dpr-section-header-spacer',
                colspan: 4,
                text: '',
              },
            ],
            [
              {
                classes: 'dpr-section-header',
                colspan: 4,
                html: '<h2 class="govuk-heading-m">First: Two, Second: A <span class=\'govuk-caption-m\'>17 results</span></h2>',
              },
            ],
            [
              {
                classes: 'dpr-section-header-spacer-bottom',
                colspan: 4,
                text: '',
              },
            ],
            [
              {
                text: 'Field 1',
                classes: 'govuk-table__header',
              },
              {
                text: 'Field 2',
                classes: 'govuk-table__header',
              },
              {
                text: 'Field 3',
                classes: 'govuk-table__header',
              },
              {
                text: 'Field 4',
                classes: 'govuk-table__header',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Section Two A Header',
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
              },
              {
                fieldName: 'field2',
                text: 1,
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
              },
              {
                fieldName: 'field3',
                text: 12219380923,
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
              },
              {
                fieldName: 'field4',
                text: '5 Freds',
                format: 'string',
                classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                classes: 'dpr-section-header-spacer',
                colspan: 4,
                text: '',
              },
            ],
            [
              {
                classes: 'dpr-section-header',
                colspan: 4,
                html: '<h2 class="govuk-heading-m">First: Two, Second: B <span class=\'govuk-caption-m\'>33 results</span></h2>',
              },
            ],
            [
              {
                classes: 'dpr-section-header-spacer-bottom',
                colspan: 4,
                text: '',
              },
            ],
            [
              {
                text: 'Field 1',
                classes: 'govuk-table__header',
              },
              {
                text: 'Field 2',
                classes: 'govuk-table__header',
              },
              {
                text: 'Field 3',
                classes: 'govuk-table__header',
              },
              {
                text: 'Field 4',
                classes: 'govuk-table__header',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field2',
                text: 'Value 2',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field3',
                text: '01/02/03 01:00',
                format: 'string',
                classes: '',
              },
              {
                fieldName: 'field4',
                text: 'Value 4',
                format: 'string',
                classes: '',
              },
            ],
          ],
          rowCount: 100,
          colCount: 4,
        },
      ],
    }

    res.render('views/pages/report-template/view.njk', {
      title: 'list-section with summaries template',
      reportData,
    })
  }
}
