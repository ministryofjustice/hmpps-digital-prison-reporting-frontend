import { RequestHandler } from 'express'
import { MoJTableHead } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { FilterValue, SelectedFilter } from 'src/dpr/components/_filters/types'
import { ReportAction } from 'src/dpr/components/_reports/report-heading/report-actions/types'

export default class ListSectionTemplateController {
  layoutPath = ''

  GET: RequestHandler = async (_req, res) => {
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
        filters: <FilterValue[]>[],
        selectedFilters: <SelectedFilter[]>[],
      },
      count: 100,
      csrfToken: 'csrfToken',
      classification: 'OFFICIAL',
      template: 'list-section',
      loadType: 'async',
      type: 'report',
      actions: <ReportAction[]>[],
      canDownload: false,
      printable: true,
      reportName: 'Example Report',
      name: 'List-section template',
      description: 'A sectioned report.',
      requestedTimestamp: '15/05/2025, 14:20:33',
      reportId: 'test-report-2',
      tableId: 'tblId_1747315232874',
      id: 'variantId-8',
      executionId: 'exId_1747315232874',
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
          'http://localhost:3010/async/report/test-report-2/variantId-8/request?filters.field3.start=2003-02-01&filters.field3.end=2007-05-04&sortColumn=field1&sortedAsc=true',
        pathname: '/async/report/test-report-2/variantId-8/request',
        search: '?filters.field3.start=2003-02-01&filters.field3.end=2007-05-04&sortColumn=field1&sortedAsc=true',
      },
      reportUrl: '/async/report/test-report-2/variantId-8/request/tblId_1747315232874/report',
      pathname: '/async/report/test-report-2/variantId-8/request/tblId_1747315232874/report',
      dataTable: [
        {
          head: <MoJTableHead[] | null>null,
          rows: [
            [
              {
                classes: 'dpr-section-header',
                colspan: 4,
                html: '<h2 class="govuk-heading-m">First: Section 1, Second: Section 1.1 <span class=\'govuk-caption-m\'>3 results</span></h2>',
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
                classes: 'dpr-section-header-spacer',
                colspan: 4,
                text: '',
              },
            ],
            [
              {
                classes: 'dpr-section-header',
                colspan: 4,
                html: '<h2 class="govuk-heading-m">First: Section 1, Second: Section 1.2 <span class=\'govuk-caption-m\'>4 results</span></h2>',
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
                classes: 'dpr-section-header-spacer',
                colspan: 4,
                text: '',
              },
            ],
            [
              {
                classes: 'dpr-section-header',
                colspan: 4,
                html: '<h2 class="govuk-heading-m">First: Section 2, Second: Section 2.1 <span class=\'govuk-caption-m\'>2 results</span></h2>',
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
                classes: 'dpr-section-header-spacer',
                colspan: 4,
                text: '',
              },
            ],
            [
              {
                classes: 'dpr-section-header',
                colspan: 4,
                html: '<h2 class="govuk-heading-m">First: Section 2, Second: Section 2.2 <span class=\'govuk-caption-m\'>3 results</span></h2>',
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
          ],
          rowCount: 12,
          colCount: 4,
        },
      ],
    }

    res.render('views/pages/report-template/view.njk', {
      title: 'list section template',
      reportData,
    })
  }
}
