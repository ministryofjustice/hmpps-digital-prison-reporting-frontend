import Utils from './utils'
import Dict = NodeJS.Dict
import ReportQuery from '../../types/ReportQuery'
import { components } from '../../types/api'

describe('mapData', () => {
  it('Dates with values less than 10 mapped with leading 0', () => {
    const data: Dict<string> = {
      date: '2000-01-02T03:04:05.006Z',
    }
    const fields: components['schemas']['FieldDefinition'] = {
      name: 'date',
      display: 'Date',
      sortable: true,
      defaultsort: false,
      type: 'date',
      mandatory: false,
    }
    const mapped = Utils.mapData([data], [fields], ['date'])

    expect(mapped).toEqual([
      [
        {
          text: '02/01/00 03:04',
          format: 'numeric',
          classes: null,
        },
      ],
    ])
  })

  it('Dates with null values mapped to an empty string', () => {
    const data: Dict<string> = {
      date: '',
    }
    const fields: components['schemas']['FieldDefinition'] = {
      name: 'date',
      display: 'Date',
      sortable: true,
      defaultsort: false,
      type: 'date',
      mandatory: false,
    }
    const mapped = Utils.mapData([data], [fields], ['date'])

    expect(mapped).toEqual([
      [
        {
          text: '',
          format: 'numeric',
          classes: null,
        },
      ],
    ])
  })

  it('Dates with values greater than 10 mapped without leading 0', () => {
    const data: Dict<string> = {
      date: '2010-11-12T13:14:15.016Z',
    }
    const fields: components['schemas']['FieldDefinition'] = {
      name: 'date',
      display: 'Date',
      sortable: true,
      defaultsort: false,
      type: 'date',
      mandatory: false,
    }
    const mapped = Utils.mapData([data], [fields], ['date'])

    expect(mapped).toEqual([
      [
        {
          text: '12/11/10 13:14',
          format: 'numeric',
          classes: null,
        },
      ],
    ])
  })

  it('Numbers mapped correctly', () => {
    const data: Dict<string> = {
      number: '1234.05',
    }
    const fields: components['schemas']['FieldDefinition'] = {
      name: 'number',
      display: 'Number',
      sortable: true,
      defaultsort: false,
      type: 'long',
      mandatory: false,
    }
    const mapped = Utils.mapData([data], [fields], ['number'])

    expect(mapped).toEqual([
      [
        {
          text: '1234.05',
          format: 'numeric',
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
    }
    const mapped = Utils.mapData([data], [fields], ['string'])

    expect(mapped).toEqual([
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
      wordWrap: 'None',
      mandatory: false,
    }
    const mapped = Utils.mapData([data], [fields], ['string'])

    expect(mapped).toEqual([
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
  }
  const defaultQueryParams = {
    columns: 'date'
  }
  const filterPrefix = 'f.'
  const defaultListRequest: ReportQuery = new ReportQuery(
    [defaultField],
    defaultQueryParams,
    null,
    filterPrefix,
  )
  const createUrlForParameters: (currentQueryParams: Dict<string>, updateQueryParams: Dict<string>) => string = (
    currentQueryParams: Dict<string>,
    updateQueryParams: Dict<string>,
  ) => JSON.stringify(updateQueryParams).replace(/"/g, '')

  it('Unsortable field', () => {
    const field = {
      ...defaultField,
      sortable: false,
    }
    const mapped = Utils.mapHeader([field], defaultListRequest, createUrlForParameters)

    expect(mapped).toEqual([
      {
        html: '<a data-column="date" class="data-table-header-button">Date</a>',
      },
    ])
  })

  it('Sortable unsorted field', () => {
    const mapped = Utils.mapHeader([defaultField], defaultListRequest, createUrlForParameters)

    expect(mapped).toEqual([
      {
        html:
          '<a ' +
          'data-column="date" ' +
          'aria-sort="none" ' +
          'class="data-table-header-button data-table-header-button-sort-none" ' +
          'href="{sortColumn:date,sortedAsc:true}">' +
          'Date' +
          '</a>',
      },
    ])
  })

  it('Sortable field sorted ascending', () => {
    const reportQuery: ReportQuery = new ReportQuery(
      [defaultField],
      {
        ...defaultQueryParams,
        sortColumn: 'date',
      },
      defaultField.name,
      filterPrefix,
    )
    const mapped = Utils.mapHeader([defaultField], reportQuery, createUrlForParameters)

    expect(mapped).toEqual([
      {
        html:
          '<a ' +
          'data-column="date" ' +
          'aria-sort="ascending" ' +
          'class="data-table-header-button data-table-header-button-sort-ascending" ' +
          'href="{sortColumn:date,sortedAsc:false}">' +
          'Date' +
          '</a>',
      },
    ])
  })

  it('Sortable field sorted descending', () => {
    const reportQuery: ReportQuery = new ReportQuery(
      [defaultField],
      {
        ...defaultQueryParams,
        sortColumn: 'date',
        sortedAsc: 'false',
      },
      defaultField.name,
      filterPrefix,
    )
    const mapped = Utils.mapHeader([defaultField], reportQuery, createUrlForParameters)

    expect(mapped).toEqual([
      {
        html:
          '<a ' +
          'data-column="date" ' +
          'aria-sort="descending" ' +
          'class="data-table-header-button data-table-header-button-sort-descending" ' +
          'href="{sortColumn:date,sortedAsc:true}">' +
          'Date' +
          '</a>',
      },
    ])
  })
})
