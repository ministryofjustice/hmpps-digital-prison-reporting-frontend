import Dict = NodeJS.Dict
import ReportQuery from '../../types/ReportQuery'
import { components } from '../../types/api'
import DataTableBuilder from './DataTableBuilder'
import { AsyncSummary } from '../../types/AsyncReport'

const defaultField: components['schemas']['FieldDefinition'] = {
  name: 'date',
  display: 'Date',
  sortable: true,
  defaultsort: false,
  type: 'date',
  mandatory: false,
  visible: true,
  calculated: false,
}
const defaultSpec: components['schemas']['Specification'] = {
  fields: [defaultField],
  template: 'list',
  sections: [],
}

describe('mapData', () => {
  it('Dates with values less than 10 mapped with leading 0', () => {
    const data: Dict<string> = {
      date: '2000-01-02T03:04:05.006Z',
    }
    const field: components['schemas']['FieldDefinition'] = {
      name: 'date',
      display: 'Date',
      sortable: true,
      defaultsort: false,
      type: 'date',
      mandatory: false,
      visible: true,
      calculated: false,
    }
    const mapped = new DataTableBuilder({ ...defaultSpec, fields: [field] })
      .withNoHeaderOptions(['date'])
      .buildTable([data])

    expect(mapped).toEqual({
      colCount: 1,
      head: [{ text: 'Date' }],
      rowCount: 1,
      rows: [
        [
          {
            text: '02/01/00 03:04',
            format: 'string',
            classes: '',
          },
        ],
      ],
    })
  })

  it('Dates with null values mapped to an empty string', () => {
    const data: Dict<string> = {
      date: '',
    }
    const field: components['schemas']['FieldDefinition'] = {
      name: 'date',
      display: 'Date',
      sortable: true,
      defaultsort: false,
      type: 'date',
      mandatory: false,
      visible: true,
      calculated: false,
    }
    const mapped = new DataTableBuilder({ ...defaultSpec, fields: [field] })
      .withNoHeaderOptions(['date'])
      .buildTable([data])

    expect(mapped).toEqual({
      colCount: 1,
      head: [{ text: 'Date' }],
      rowCount: 1,
      rows: [
        [
          {
            text: '',
            format: 'string',
            classes: '',
          },
        ],
      ],
    })
  })

  it('Dates with values greater than 10 mapped without leading 0', () => {
    const data: Dict<string> = {
      date: '2010-11-12T13:14:15.016Z',
    }
    const field: components['schemas']['FieldDefinition'] = {
      name: 'date',
      display: 'Date',
      sortable: true,
      defaultsort: false,
      type: 'date',
      mandatory: false,
      visible: true,
      calculated: false,
    }
    const mapped = new DataTableBuilder({ ...defaultSpec, fields: [field] })
      .withNoHeaderOptions(['date'])
      .buildTable([data])

    expect(mapped.rows).toEqual([
      [
        {
          text: '12/11/10 13:14',
          format: 'string',
          classes: '',
        },
      ],
    ])
  })

  it('Numbers mapped correctly', () => {
    const data: Dict<string> = {
      number: '1234.05',
    }
    const field: components['schemas']['FieldDefinition'] = {
      name: 'number',
      display: 'Number',
      sortable: true,
      defaultsort: false,
      type: 'long',
      mandatory: false,
      visible: true,
      calculated: false,
    }
    const mapped = new DataTableBuilder({ ...defaultSpec, fields: [field] })
      .withNoHeaderOptions(['number'])
      .buildTable([data])

    expect(mapped.rows).toEqual([
      [
        {
          text: '1234.05',
          format: 'numeric',
          classes: '',
        },
      ],
    ])
  })

  it('Calculated dates mapped correctly', () => {
    const data: Dict<string> = {
      date: '12/11/10',
    }
    const field: components['schemas']['FieldDefinition'] = {
      name: 'date',
      display: 'Date',
      sortable: true,
      defaultsort: false,
      type: 'date',
      mandatory: false,
      visible: true,
      calculated: true,
    }
    const mapped = new DataTableBuilder({ ...defaultSpec, fields: [field] })
      .withNoHeaderOptions(['date'])
      .buildTable([data])

    expect(mapped.rows).toEqual([
      [
        {
          text: '12/11/10',
          format: 'string',
          classes: '',
        },
      ],
    ])
  })

  it('Strings mapped correctly', () => {
    const data: Dict<string> = {
      string: '1234.05',
    }
    const fields: components['schemas']['FieldDefinition'] = {
      name: 'string',
      display: 'String',
      sortable: true,
      defaultsort: false,
      type: 'string',
      mandatory: false,
      visible: true,
      calculated: false,
    }
    const mapped = new DataTableBuilder({ ...defaultSpec, fields: [fields] })
      .withNoHeaderOptions(['string'])
      .buildTable([data])

    expect(mapped.rows).toEqual([
      [
        {
          text: '1234.05',
          format: 'string',
          classes: '',
        },
      ],
    ])
  })

  it('Strings with word wrapping configured are mapped correctly', () => {
    const data: Dict<string> = {
      string: '1234.05',
    }
    const fields: components['schemas']['FieldDefinition'] = {
      name: 'string',
      display: 'String',
      sortable: true,
      defaultsort: false,
      type: 'string',
      wordWrap: 'none',
      mandatory: false,
      visible: true,
      calculated: false,
    }
    const mapped = new DataTableBuilder({ ...defaultSpec, fields: [fields] })
      .withNoHeaderOptions(['string'])
      .buildTable([data])

    expect(mapped.rows).toEqual([
      [
        {
          text: '1234.05',
          format: 'string',
          classes: 'data-table-cell-wrap-none',
        },
      ],
    ])
  })
})

describe('mapHeader', () => {
  const defaultQueryParams = {
    columns: 'date',
  }
  const filterPrefix = 'f.'
  const defaultListRequest: ReportQuery = new ReportQuery(
    defaultSpec,
    defaultQueryParams,
    null,
    filterPrefix,
  )

  it('Unsortable field', () => {
    const field = {
      ...defaultField,
      sortable: false,
    }
    const mapped = new DataTableBuilder({ ...defaultSpec, fields: [field] })
      .withHeaderSortOptions(defaultListRequest)
      .buildTable([])

    expect(mapped.head).toEqual([
      {
        text: 'Date',
      },
    ])
  })

  it('Sortable unsorted field', () => {
    const mapped = new DataTableBuilder(defaultSpec)
      .withHeaderSortOptions(defaultListRequest)
      .buildTable([])

    expect(mapped).toEqual({
      colCount: 1,
      head: [
        {
          html:
            '<a ' +
            'data-column="date" ' +
            'class="data-table-header-button data-table-header-button-sort-ascending" ' +
            'href="?selectedPage=1&pageSize=20&sortColumn=date&sortedAsc=false&columns=date">' +
            'Date' +
            '</a>',
        },
      ],
      rowCount: 0,
      rows: [],
    })
  })

  it('Sortable field sorted ascending', () => {
    const reportQuery: ReportQuery = new ReportQuery(
      defaultSpec,
      {
        ...defaultQueryParams,
        sortColumn: 'date',
      },
      defaultField.name,
      filterPrefix,
    )
    const mapped = new DataTableBuilder(defaultSpec)
      .withHeaderSortOptions(reportQuery)
      .buildTable([])

    expect(mapped).toEqual({
      colCount: 1,
      head: [
        {
          html:
            '<a ' +
            'data-column="date" ' +
            'class="data-table-header-button data-table-header-button-sort-ascending" ' +
            'href="?selectedPage=1&pageSize=20&sortColumn=date&sortedAsc=false&columns=date&dataProductDefinitionsPath=date">' +
            'Date' +
            '</a>',
        },
      ],
      rowCount: 0,
      rows: [],
    })
  })

  it('Sortable field sorted descending', () => {
    const reportQuery: ReportQuery = new ReportQuery(
      defaultSpec,
      {
        ...defaultQueryParams,
        sortColumn: 'date',
        sortedAsc: 'false',
      },
      defaultField.name,
      filterPrefix,
    )
    const mapped = new DataTableBuilder(defaultSpec)
      .withHeaderSortOptions(reportQuery)
      .buildTable([])

    expect(mapped).toEqual({
      colCount: 1,
      head: [
        {
          html:
            '<a ' +
            'data-column="date" ' +
            'class="data-table-header-button data-table-header-button-sort-descending" ' +
            'href="?selectedPage=1&pageSize=20&sortColumn=date&sortedAsc=true&columns=date&dataProductDefinitionsPath=date">' +
            'Date' +
            '</a>',
        },
      ],
      rowCount: 0,
      rows: [],
    })
  })
})

describe('withSummary', () => {
  const field: components['schemas']['FieldDefinition'] = {
    name: 'mainField',
    display: 'Main Field',
    sortable: true,
    defaultsort: false,
    type: 'string',
    mandatory: false,
    visible: true,
    calculated: false,
  }
  const summarySpec: components['schemas']['Specification'] = {
    ...defaultSpec,
    fields: [field]
  }
  const headerSummary: Dict<Array<AsyncSummary>> = {
    'table-header': [{
      id: 'test-header-summary',
      template: 'table-header',
      fields: [],
      data: [{
        mainField: 'Header'
      }]
    }]
  }
  const footerSummary: Dict<Array<AsyncSummary>> = {
    'table-footer': [{
      id: 'test-footer-summary',
      template: 'table-header',
      fields: [],
      data: [{
        mainField: 'Footer'
      }]
    }]
  }

  it('Valid header summary', () => {
    const mapped = new DataTableBuilder(summarySpec)
      .withNoHeaderOptions([field.name])
      .withSummaries(headerSummary)
      .buildTable([{mainField: 'Body'}])

    expect(mapped.rows.length).toEqual(2)

    expect(mapped.rows[0][0]).toEqual({
      text: 'Header',
      format: 'string',
      classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header'
    })
    expect(mapped.rows[1][0]).toEqual({
      text: 'Body',
      format: 'string',
      classes: ''
    })
  })

  it('Valid footer summary', () => {
    const mapped = new DataTableBuilder(summarySpec)
      .withNoHeaderOptions([field.name])
      .withSummaries(footerSummary)
      .buildTable([{mainField: 'Body'}])

    expect(mapped.rows.length).toEqual(2)


    expect(mapped.rows[0][0]).toEqual({
      text: 'Body',
      format: 'string',
      classes: ''
    })
    expect(mapped.rows[1][0]).toEqual({
      text: 'Footer',
      format: 'string',
      classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer'
    })
  })

  it('Valid header and footer summary', () => {
    const mapped = new DataTableBuilder(summarySpec)
      .withNoHeaderOptions([field.name])
      .withSummaries({
        ...headerSummary,
        ...footerSummary
      })
      .buildTable([{mainField: 'Body'}])

    expect(mapped.rows.length).toEqual(3)

    expect(mapped.rows[0][0]).toEqual({
      text: 'Header',
      format: 'string',
      classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header'
    })
    expect(mapped.rows[1][0]).toEqual({
      text: 'Body',
      format: 'string',
      classes: ''
    })
    expect(mapped.rows[2][0]).toEqual({
      text: 'Footer',
      format: 'string',
      classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer'
    })
  })

  it('Multiple valid header and footer summaries', () => {
    const summaries: Dict<Array<AsyncSummary>> = {
      'table-header': [
        {
          id: 'test-header-summary-1',
          template: 'table-header',
          fields: [],
          data: [{
            mainField: 'Header 1'
          }]
        },
        {
          id: 'test-header-summary-2',
          template: 'table-header',
          fields: [],
          data: [{
            mainField: 'Header 2'
          }]
        }],
      'table-footer': [
        {
          id: 'test-footer-summary-1',
          template: 'table-header',
          fields: [],
          data: [{
            mainField: 'Footer 1'
          }]
        },
        {
          id: 'test-footer-summary-2',
          template: 'table-header',
          fields: [],
          data: [{
            mainField: 'Footer 2'
          }]
        }
      ]
    }

    const mapped = new DataTableBuilder(summarySpec)
      .withNoHeaderOptions([field.name])
      .withSummaries(summaries)
      .buildTable([{mainField: 'Body'}])

    expect(mapped.rows.length).toEqual(5)

    expect(mapped.rows[0][0]).toEqual({
      text: 'Header 1',
      format: 'string',
      classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header'
    })
    expect(mapped.rows[1][0]).toEqual({
      text: 'Header 2',
      format: 'string',
      classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header'
    })
    expect(mapped.rows[2][0]).toEqual({
      text: 'Body',
      format: 'string',
      classes: ''
    })
    expect(mapped.rows[3][0]).toEqual({
      text: 'Footer 1',
      format: 'string',
      classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer'
    })
    expect(mapped.rows[4][0]).toEqual({
      text: 'Footer 2',
      format: 'string',
      classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-footer'
    })
  })

  it('Invalid header summary', () => {
    const invalidHeaderSummary: Dict<Array<AsyncSummary>> = {
      'table-header': [{
        id: 'test-header-summary',
        template: 'table-header',
        fields: [],
        data: [{
          invalidField: 'Header'
        }]
      }]
    }

    const mapped = new DataTableBuilder(summarySpec)
      .withNoHeaderOptions([field.name])
      .withSummaries(invalidHeaderSummary)
      .buildTable([{mainField: 'Body'}])

    expect(mapped.rows.length).toEqual(2)

    expect(mapped.rows[0][0]).toEqual({
      format: 'string',
      classes: 'dpr-report-summary-cell dpr-report-summary-cell-table-header'
    })
    expect(mapped.rows[1][0]).toEqual({
      text: 'Body',
      format: 'string',
      classes: ''
    })
  })
})
