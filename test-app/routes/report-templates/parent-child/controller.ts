import { RequestHandler } from 'express'
import { MoJTableHead } from '../../../../src/dpr/components/_dashboards/dashboard-visualisation/types'
import { FilterValue, SelectedFilter } from '../../../../src/dpr/components/_filters/types'
import { ReportAction } from '../../../../src/dpr/components/_reports/report-heading/report-actions/types'

export default class ParentChildTemplateController {
  layoutPath = ''

  GET: RequestHandler = async (_req, res) => {
    const reportData = {
      columns: {
        name: 'columns',
        options: [
          {
            text: 'First',
            value: 'section1',
            disabled: false,
          },
          {
            text: 'Second',
            value: 'field1',
            disabled: false,
          },
        ],
        text: 'Select report columns',
        value: ['section1', 'field1'],
      },
      filterData: {
        filters: <FilterValue[]>[],
        selectedFilters: <SelectedFilter[]>[],
      },
      count: 100,
      csrfToken: 'csrfToken',
      classification: 'OFFICIAL',
      template: 'parent-child',
      loadType: 'async',
      type: 'report',
      actions: <ReportAction[]>[],
      canDownload: false,
      printable: true,
      reportName: 'A Test Report',
      name: 'Parent Child Template',
      description: 'A report with parent and child datasets',
      requestedTimestamp: '15/05/2025, 13:57:32',
      reportId: 'test-report-1',
      tableId: 'tblId_1747313850286',
      id: 'variantId-26',
      executionId: 'exId_1747313850286',
      querySummary: <Record<string, string>[]>[],
      requestUrl: {
        fullUrl: 'http://localhost:3010/async/report/test-report-1/variantId-26/request',
        pathname: '/async/report/test-report-1/variantId-26/request',
        search: '',
      },
      reportUrl: '/async/report/test-report-1/variantId-26/request/tblId_1747313850286/report',
      pathname: '/async/report/test-report-1/variantId-26/request/tblId_1747313850286/report',
      dataTable: [
        {
          head: <MoJTableHead[] | null>null,
          rows: [
            [
              {
                text: 'First',
                classes: 'govuk-table__header',
              },
              {
                text: 'Second',
                classes: 'govuk-table__header',
              },
            ],
            [
              {
                fieldName: 'section1',
                text: 'one',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
              {
                fieldName: 'field1',
                text: 'Parent row 1',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
            ],
            [
              {
                classes: 'dpr-child-report-cell',
                format: 'string',
                html: "<div class='dpr-child-report'><h2 class=\"govuk-heading-s\">Child Report</h2><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Field2</th><th scope='col' class='govuk-table__header'>Field3</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child one - parent 1</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child three - parent 1</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child two - parent 1</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr></tbody></table></div></div>",
                colspan: 2,
              },
            ],
            [
              {
                text: 'First',
                classes: 'govuk-table__header',
              },
              {
                text: 'Second',
                classes: 'govuk-table__header',
              },
            ],
            [
              {
                fieldName: 'section1',
                text: 'two',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
              {
                fieldName: 'field1',
                text: 'Parent row 2',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
            ],
            [
              {
                classes: 'dpr-child-report-cell',
                format: 'string',
                html: "<div class='dpr-child-report'><h2 class=\"govuk-heading-s\">Child Report</h2><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Field2</th><th scope='col' class='govuk-table__header'>Field3</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child one - parent 2</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child three - parent 2</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child two - parent 2</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr></tbody></table></div></div>",
                colspan: 2,
              },
            ],
            [
              {
                text: 'First',
                classes: 'govuk-table__header',
              },
              {
                text: 'Second',
                classes: 'govuk-table__header',
              },
            ],
            [
              {
                fieldName: 'section1',
                text: 'three',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
              {
                fieldName: 'field1',
                text: 'Parent row 3',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
            ],
            [
              {
                classes: 'dpr-child-report-cell',
                format: 'string',
                html: "<div class='dpr-child-report'><h2 class=\"govuk-heading-s\">Child Report</h2><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Field2</th><th scope='col' class='govuk-table__header'>Field3</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child one - parent 3</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child three - parent 3</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child two - parent 3</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr></tbody></table></div></div>",
                colspan: 2,
              },
            ],
          ],
          rowCount: 3,
          colCount: 2,
        },
      ],
    }
    res.render('views/pages/report-template/view.njk', {
      title: 'Parent child template',
      reportData,
    })
  }
}
