import { RequestHandler } from 'express'
import { MoJTableHead } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { FilterValue, SelectedFilter } from 'src/dpr/components/_filters/types'
import { ReportAction } from 'src/dpr/components/_reports/report-actions/types'

export default class ParentChildSectionTemplateController {
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
            text: 'Child key',
            value: 'childKey',
            disabled: false,
          },
        ],
        text: 'Select report columns',
        value: ['field1', 'childKey'],
      },
      filterData: {
        filters: <FilterValue[]>[],
        selectedFilters: <SelectedFilter[]>[],
      },
      count: 100,
      csrfToken: 'csrfToken',
      classification: 'OFFICIAL',
      template: 'parent-child-section',
      loadType: 'async',
      type: 'report',
      actions: <ReportAction[]>[],
      canDownload: false,
      printable: true,
      reportName: 'D Test Report',
      name: 'Parent Child Section Template',
      description: 'A report with parent and child datasets in sections',
      requestedTimestamp: '15/05/2025, 13:53:14',
      reportId: 'test-report-4',
      tableId: 'tblId_1747313592802',
      id: 'variantId-27',
      executionId: 'exId_1747313592802',
      querySummary: <Record<string, string>[]>[],
      requestUrl: {
        fullUrl: 'http://localhost:3010/async/report/test-report-4/variantId-27/request',
        pathname: '/async/report/test-report-4/variantId-27/request',
        search: '',
      },
      reportUrl: '/async/report/test-report-4/variantId-27/request/tblId_1747313592802/report',
      reportSearch: '?columns=field1&columns=childKey',
      encodedSearch: '%3Fcolumns%3Dfield1%26columns%3DchildKey',
      search: '?columns=field1&columns=childKey',
      pathname: '/async/report/test-report-4/variantId-27/request/tblId_1747313592802/report',
      dataTable: [
        {
          head: <MoJTableHead[]>null,
          rows: [
            [
              {
                classes: 'dpr-section-header',
                colspan: 2,
                html: '<h2 class="govuk-heading-m">Section 1: Section 1, Section 2: Section 1.1 <span class=\'govuk-caption-m\'>3 results</span></h2>',
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
                text: 'Field 1',
                classes: 'govuk-table__header',
              },
              {
                text: 'Child key',
                classes: 'govuk-table__header',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Parent 1',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
              {
                fieldName: 'childKey',
                text: 'one',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
            ],
            [
              {
                classes: 'dpr-child-report-cell',
                format: 'string',
                html: "<div class='dpr-child-report'><h3 class=\"govuk-heading-s\">Child Report</h3><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Child Field 1</th><th scope='col' class='govuk-table__header'>Child Field 2</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child one - Parent 1</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child two - Parent 1</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr></tbody></table></div></div>",
                colspan: 2,
              },
            ],
            [
              {
                text: 'Field 1',
                classes: 'govuk-table__header',
              },
              {
                text: 'Child key',
                classes: 'govuk-table__header',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Parent 2',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
              {
                fieldName: 'childKey',
                text: 'two',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
            ],
            [
              {
                classes: 'dpr-child-report-cell',
                format: 'string',
                html: "<div class='dpr-child-report'><h3 class=\"govuk-heading-s\">Child Report</h3><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Child Field 1</th><th scope='col' class='govuk-table__header'>Child Field 2</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child one - Parent 2</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child two - Parent 2</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr></tbody></table></div></div>",
                colspan: 2,
              },
            ],
            [
              {
                text: 'Field 1',
                classes: 'govuk-table__header',
              },
              {
                text: 'Child key',
                classes: 'govuk-table__header',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Parent 3',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
              {
                fieldName: 'childKey',
                text: 'three',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
            ],
            [
              {
                classes: 'dpr-child-report-cell',
                format: 'string',
                html: "<div class='dpr-child-report'><h3 class=\"govuk-heading-s\">Child Report</h3><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Child Field 1</th><th scope='col' class='govuk-table__header'>Child Field 2</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child one - Parent 3</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child two - Parent 3</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr></tbody></table></div></div>",
                colspan: 2,
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
                html: '<h2 class="govuk-heading-m">Section 1: Section 1, Section 2: Section 1.2 <span class=\'govuk-caption-m\'>2 results</span></h2>',
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
                text: 'Field 1',
                classes: 'govuk-table__header',
              },
              {
                text: 'Child key',
                classes: 'govuk-table__header',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Parent 4',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
              {
                fieldName: 'childKey',
                text: 'four',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
            ],
            [
              {
                classes: 'dpr-child-report-cell',
                format: 'string',
                html: "<div class='dpr-child-report'><h3 class=\"govuk-heading-s\">Child Report</h3><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Child Field 1</th><th scope='col' class='govuk-table__header'>Child Field 2</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child one - Parent 4</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child two - Parent 4</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr></tbody></table></div></div>",
                colspan: 2,
              },
            ],
            [
              {
                text: 'Field 1',
                classes: 'govuk-table__header',
              },
              {
                text: 'Child key',
                classes: 'govuk-table__header',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Parent 5',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
              {
                fieldName: 'childKey',
                text: 'five',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
            ],
            [
              {
                classes: 'dpr-child-report-cell',
                format: 'string',
                html: "<div class='dpr-child-report'><h3 class=\"govuk-heading-s\">Child Report</h3><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Child Field 1</th><th scope='col' class='govuk-table__header'>Child Field 2</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child one - Parent 5</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child two - Parent 5</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr></tbody></table></div></div>",
                colspan: 2,
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
                html: '<h2 class="govuk-heading-m">Section 1: Section 2, Section 2: Section 2.1 <span class=\'govuk-caption-m\'>1 result</span></h2>',
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
                text: 'Field 1',
                classes: 'govuk-table__header',
              },
              {
                text: 'Child key',
                classes: 'govuk-table__header',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Parent 6',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
              {
                fieldName: 'childKey',
                text: 'six',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
            ],
            [
              {
                classes: 'dpr-child-report-cell',
                format: 'string',
                html: "<div class='dpr-child-report'><h3 class=\"govuk-heading-s\">Child Report</h3><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Child Field 1</th><th scope='col' class='govuk-table__header'>Child Field 2</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child one - Parent 6</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child two - Parent 6</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr></tbody></table></div></div>",
                colspan: 2,
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
                html: '<h2 class="govuk-heading-m">Section 1: Section 2, Section 2: Section 2.2 <span class=\'govuk-caption-m\'>2 results</span></h2>',
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
                text: 'Field 1',
                classes: 'govuk-table__header',
              },
              {
                text: 'Child key',
                classes: 'govuk-table__header',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Parent 7',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
              {
                fieldName: 'childKey',
                text: 'seven',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
            ],
            [
              {
                classes: 'dpr-child-report-cell',
                format: 'string',
                html: "<div class='dpr-child-report'><h3 class=\"govuk-heading-s\">Child Report</h3><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Child Field 1</th><th scope='col' class='govuk-table__header'>Child Field 2</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child one - Parent 7</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child two - Parent 7</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr></tbody></table></div></div>",
                colspan: 2,
              },
            ],
            [
              {
                text: 'Field 1',
                classes: 'govuk-table__header',
              },
              {
                text: 'Child key',
                classes: 'govuk-table__header',
              },
            ],
            [
              {
                fieldName: 'field1',
                text: 'Parent 8',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
              {
                fieldName: 'childKey',
                text: 'eight',
                format: 'string',
                classes: 'dpr-parent-cell',
              },
            ],
            [
              {
                classes: 'dpr-child-report-cell',
                format: 'string',
                html: "<div class='dpr-child-report'><h3 class=\"govuk-heading-s\">Child Report</h3><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Child Field 1</th><th scope='col' class='govuk-table__header'>Child Field 2</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child one - Parent 8</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Child two - Parent 8</td><td class='govuk-table__cell govuk-table__cell--string '>Other value</td></tr></tbody></table></div></div>",
                colspan: 2,
              },
            ],
          ],
          rowCount: 8,
          colCount: 2,
        },
      ],
    }
    res.render('views/pages/report-template/view.njk', {
      title: 'Parent child section template',
      reportData,
    })
  }
}
