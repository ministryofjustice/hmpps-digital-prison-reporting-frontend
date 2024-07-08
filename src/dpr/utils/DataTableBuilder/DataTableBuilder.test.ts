import Dict = NodeJS.Dict
import ReportQuery from '../../types/ReportQuery'
import { components } from '../../types/api'
import { DataTableBuilder } from './DataTableBuilder'

const defaultSpec: components['schemas']['Specification'] = {
  fields: [],
  template: 'list',
  sections: []
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
      head: [{ "text": "Date" }],
      rowCount: 1,
      rows: [
        [
          {
            text: '02/01/00 03:04',
            format: 'string',
            classes: null,
          },
        ],
      ]
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
      head: [{ "text": "Date" }],
      rowCount: 1,
      rows: [
        [
          {
            text: '',
            format: 'string',
            classes: null,
          },
        ],
      ]
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
          classes: null,
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
          classes: null,
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
          classes: null,
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
          classes: null,
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
  const defaultQueryParams = {
    columns: 'date',
  }
  const filterPrefix = 'f.'
  const defaultListRequest: ReportQuery = new ReportQuery({ ...defaultSpec, fields: [defaultField] }, defaultQueryParams, null, filterPrefix)

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
    const mapped = new DataTableBuilder({ ...defaultSpec, fields: [defaultField] })
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
      { ...defaultSpec, fields: [defaultField] },
      {
        ...defaultQueryParams,
        sortColumn: 'date',
      },
      defaultField.name,
      filterPrefix,
    )
    const mapped = new DataTableBuilder({ ...defaultSpec, fields: [defaultField] })
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
      { ...defaultSpec, fields: [defaultField] },
      {
        ...defaultQueryParams,
        sortColumn: 'date',
        sortedAsc: 'false',
      },
      defaultField.name,
      filterPrefix,
    )
    const mapped = new DataTableBuilder({ ...defaultSpec, fields: [defaultField] })
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
