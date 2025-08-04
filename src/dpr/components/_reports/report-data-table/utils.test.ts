import { Url } from 'url'
import Dict = NodeJS.Dict

// types
import ReportQuery from '../../../types/ReportQuery'
import type { components } from '../../../types/api'
import type { AsyncSummary } from '../../../types/UserReports'
import type { Columns } from '../report-columns-form/types'
import type { Template } from '../../../types/Templates'

// Utils
import ReportDataTableUtils from './utils'

// Mocked
import createMockData from '../../../../../test-app/mocks/mockClients/reports/mockAsyncData'

// Services
import variant2 = require('../../../../../test-app/mocks/mockClients/reports/mockVariants/request-examples/fail-status')
import variant26 = require('../../../../../test-app/mocks/mockClients/reports/mockVariants/report-templates/parent-child')
import { ChildData } from '../../../utils/ParentChildDataTableBuilder/types'
import variant10 = require('../../../../../test-app/mocks/mockClients/reports/mockVariants/report-templates/list-section-wtih-summaries')

jest.mock('parseurl', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({ pathname: 'pathname', search: 'search' } as Url)),
}))

describe('AsyncReportListUtils', () => {
  describe('getTableData', () => {
    let definition: components['schemas']['SingleVariantReportDefinition']
    let columns: Columns
    let reportData: Dict<string>[]
    let childData: ChildData[]
    let summariesData: AsyncSummary[]
    let reportQuery: ReportQuery

    beforeEach(() => {
      columns = {
        name: 'columns',
        options: [
          {
            text: 'Field 1',
            value: 'field1',
            disabled: false,
          },
        ],
        text: 'Select report columns',
        value: ['field1'],
      }

      reportData = createMockData(5)
    })

    it('should get the table data for a list table', () => {
      definition = {
        id: 'test-report-3',
        name: 'C Test Report',
        variant: variant2,
      } as unknown as components['schemas']['SingleVariantReportDefinition']

      reportQuery = new ReportQuery({
        fields: definition.variant.specification.fields,
        template: definition.variant.specification.template as Template,
        queryParams: {},
        definitionsPath: 'dataProductDefinitionsPath',
      })

      const expectedTable = [
        {
          colCount: 1,
          head: [{ classes: null, text: 'Field 1' }],
          rowCount: 5,
          rows: [
            [
              {
                classes: '',
                fieldName: 'field1',
                format: 'string',
                text: 'Value 1',
              },
            ],
            [
              {
                classes: '',
                fieldName: 'field1',
                format: 'string',
                text: 'Value 1',
              },
            ],
            [
              {
                classes: '',
                fieldName: 'field1',
                format: 'string',
                text: 'Value 1',
              },
            ],
            [
              {
                classes: '',
                fieldName: 'field1',
                format: 'string',
                text: 'Value 1',
              },
            ],
            [
              {
                classes: '',
                fieldName: 'field1',
                format: 'string',
                text: 'Value 1',
              },
            ],
          ],
        },
      ]

      const dataTable = ReportDataTableUtils.createDataTable(definition, columns, reportData, [], [], reportQuery)
      expect(dataTable).toEqual(expectedTable)
    })

    it('should get the table data for a summary table', () => {
      definition = {
        id: 'test-report-2',
        name: 'B Test Report',
        variant: variant10,
      } as unknown as components['schemas']['SingleVariantReportDefinition']

      reportQuery = new ReportQuery({
        fields: definition.variant.specification.fields,
        template: definition.variant.specification.template as Template,
        queryParams: {},
        definitionsPath: 'dataProductDefinitionsPath',
      })

      summariesData = [
        {
          id: 'summary1',
          template: 'page-header',
          fields: [
            {
              name: 'total',
              display: 'Total',
            },
          ],
          data: [
            {
              total: '52',
            },
          ],
        },
        {
          id: 'summary3',
          template: 'page-footer',
          fields: [
            {
              name: 'percentGood',
              display: 'Good (%)',
            },
            {
              name: 'percentBad',
              display: 'Bad (%)',
            },
            {
              name: 'percentUgly',
              display: 'Ugly (%)',
            },
          ],
          data: [
            {
              percentGood: '1',
              percentBad: '10',
              percentUgly: '98',
            },
          ],
        },
        {
          id: 'summary6',
          template: 'table-header',
          fields: [
            {
              name: 'field1',
              display: 'Field 1',
              type: 'string',
            },
            {
              name: 'field2',
              display: 'Field 1',
              type: 'string',
            },
            {
              name: 'field3',
              display: 'Field 1',
              type: 'string',
            },
            {
              name: 'field4',
              display: 'Field 1',
              type: 'string',
            },
          ],
          data: [
            {
              section1: 'One',
              section2: 'A',
              field1: 'Section One A Header',
              field2: '1',
              field3: '12219380923',
              field4: '4 Freds',
            },
            {
              section1: 'Two',
              section2: 'A',
              field1: 'Section Two A Header',
              field2: '1',
              field3: '12219380923',
              field4: '5 Freds',
            },
          ],
        },
        {
          id: 'summary7',
          template: 'table-footer',
          fields: [
            {
              name: 'field1',
              display: 'Field 1',
              type: 'string',
            },
            {
              name: 'field2',
              display: 'Field 1',
              type: 'string',
            },
            {
              name: 'field3',
              display: 'Field 1',
              type: 'string',
            },
            {
              name: 'field4',
              display: 'Field 1',
              type: 'string',
            },
          ],
          data: [
            {
              section1: 'One',
              section2: 'A',
              field1: 'Section One A Footer',
              field2: '1',
              field3: '12219380923',
              field4: '6 Freds',
            },
            {
              section1: 'One',
              section2: 'B',
              field1: 'Section One B Footer',
              field2: '1',
              field3: '12219380923',
              field4: '7 Freds',
            },
          ],
        },
      ]

      const expectedTable = [
        {
          head: null,
          rows: [
            [
              {
                classes: 'dpr-section-header',
                colspan: 1,
                html: '<h2 class="govuk-heading-m">First: One, Second: A <span class=\'govuk-caption-m\'>1 result</span></h2>',
              },
            ],
            [
              {
                classes: 'dpr-section-header-spacer-bottom',
                colspan: 1,
                text: '',
              },
            ],
            [
              {
                text: 'Field 1',
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
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
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
            ],
            [
              {
                classes: 'dpr-section-header-spacer',
                colspan: 1,
                text: '',
              },
            ],
            [
              {
                classes: 'dpr-section-header',
                colspan: 1,
                html: '<h2 class="govuk-heading-m">First: One, Second: B <span class=\'govuk-caption-m\'>2 results</span></h2>',
              },
            ],
            [
              {
                classes: 'dpr-section-header-spacer-bottom',
                colspan: 1,
                text: '',
              },
            ],
            [
              {
                text: 'Field 1',
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
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
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
            ],
            [
              {
                classes: 'dpr-section-header-spacer',
                colspan: 1,
                text: '',
              },
            ],
            [
              {
                classes: 'dpr-section-header',
                colspan: 1,
                html: '<h2 class="govuk-heading-m">First: Two, Second: A <span class=\'govuk-caption-m\'>1 result</span></h2>',
              },
            ],
            [
              {
                classes: 'dpr-section-header-spacer-bottom',
                colspan: 1,
                text: '',
              },
            ],
            [
              {
                text: 'Field 1',
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
            ],
            [
              {
                fieldName: 'field1',
                text: 'Value 1',
                format: 'string',
                classes: '',
              },
            ],
            [
              {
                classes: 'dpr-section-header-spacer',
                colspan: 1,
                text: '',
              },
            ],
            [
              {
                classes: 'dpr-section-header',
                colspan: 1,
                html: '<h2 class="govuk-heading-m">First: Two, Second: B <span class=\'govuk-caption-m\'>1 result</span></h2>',
              },
            ],
            [
              {
                classes: 'dpr-section-header-spacer-bottom',
                colspan: 1,
                text: '',
              },
            ],
            [
              {
                text: 'Field 1',
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
            ],
          ],
          rowCount: 5,
          colCount: 1,
        },
      ]

      const dataTable = ReportDataTableUtils.createDataTable(
        definition,
        columns,
        reportData,
        [],
        summariesData,
        reportQuery,
      )

      expect(dataTable).toEqual(expectedTable)
    })

    it('should get the table data for a parent/child table', () => {
      definition = {
        id: 'report-template-examples',
        name: 'Report templates',
        variant: variant26,
      } as unknown as components['schemas']['SingleVariantReportDefinition']

      reportQuery = new ReportQuery({
        fields: definition.variant.specification.fields,
        template: definition.variant.specification.template as Template,
        queryParams: {},
        definitionsPath: 'dataProductDefinitionsPath',
      })

      childData = [
        {
          id: 'report-template-example-parent-child_child',
          data: [
            {
              field1: 'Value 1',
              field2: 'Value 2',
              field3: '2003-02-01T01:00',
              field4: 'Value 4',
              field5: 'Value 5',
              field6: '<a href="#" target="_blank">Value 6</a>',
              field7: '2003-02-01T01:00',
              section1: 'One',
              section2: 'A',
            },
            {
              field1: 'Value 1',
              field2: 'Value 2',
              field3: '2003-02-01T01:00',
              field4: 'Value 4',
              field5: 'Value 5',
              field6: '<a href="#" target="_blank">Value 6</a>',
              field7: '2003-02-01T01:00',
              section1: 'Two',
              section2: 'B',
            },
            {
              field1: 'Value 1',
              field2: 'Value 2',
              field3: '2003-02-01T01:00',
              field4: 'Value 4',
              field5: 'Value 5',
              field6: '<a href="#" target="_blank">Value 6</a>',
              field7: '2003-02-01T01:00',
              section1: 'One',
              section2: 'B',
            },
          ],
        },
      ]

      const expectedTable = [
        {
          colCount: 1,
          head: null,
          rowCount: 5,
          rows: [
            [{ classes: 'govuk-table__header', text: 'Second' }],
            [
              {
                classes: 'dpr-parent-cell',
                fieldName: 'field1',
                format: 'string',
                text: 'Value 1',
              },
            ],
            [
              {
                classes: 'dpr-parent-cell',
                fieldName: 'field1',
                format: 'string',
                text: 'Value 1',
              },
            ],
            [
              {
                classes: 'dpr-parent-cell',
                fieldName: 'field1',
                format: 'string',
                text: 'Value 1',
              },
            ],
            [
              {
                classes: 'dpr-child-report-cell',
                colspan: 1,
                format: 'string',
                html: "<div class='dpr-child-report'><h3 class=\"govuk-heading-s\">Child Report</h3><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Field2</th><th scope='col' class='govuk-table__header'>Field3</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Value 2</td><td class='govuk-table__cell govuk-table__cell--string '>2003-02-01T01:00</td></tr><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Value 2</td><td class='govuk-table__cell govuk-table__cell--string '>2003-02-01T01:00</td></tr></tbody></table></div></div>",
              },
            ],
            [{ classes: 'govuk-table__header', text: 'Second' }],
            [
              {
                classes: 'dpr-parent-cell',
                fieldName: 'field1',
                format: 'string',
                text: 'Value 1',
              },
            ],
            [
              {
                classes: 'dpr-parent-cell',
                fieldName: 'field1',
                format: 'string',
                text: 'Value 1',
              },
            ],
            [
              {
                classes: 'dpr-child-report-cell',
                colspan: 1,
                format: 'string',
                html: "<div class='dpr-child-report'><h3 class=\"govuk-heading-s\">Child Report</h3><div class=\"dpr-child-report_table\"><table class='govuk-table'><thead class='govuk-table__head'><th scope='col' class='govuk-table__header'>Field2</th><th scope='col' class='govuk-table__header'>Field3</th></thead><tbody class='govuk-table__body'><tr class='govuk-table__row'><td class='govuk-table__cell govuk-table__cell--string '>Value 2</td><td class='govuk-table__cell govuk-table__cell--string '>2003-02-01T01:00</td></tr></tbody></table></div></div>",
              },
            ],
          ],
        },
      ]

      const dataTable = ReportDataTableUtils.createDataTable(
        definition,
        columns,
        reportData,
        childData,
        [],
        reportQuery,
      )

      expect(dataTable).toEqual(expectedTable)
    })
  })
})
