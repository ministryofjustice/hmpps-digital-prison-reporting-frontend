import Utils from './utils'
import Dict = NodeJS.Dict
import { FilterType } from './enum'
import { DateRange } from './types'
import ReportQuery from '../../types/ReportQuery'
import { components } from '../../types/api'

const options = [
  {
    name: '1',
    display: 'One',
  },
  {
    name: '2',
    display: 'Two',
  },
]

const selectFieldFormat: Array<components['schemas']['FieldDefinition']> = [
  {
    display: 'Select Field',
    name: 'selectField',
    filter: {
      type: FilterType.select,
      staticOptions: options,
    },
    sortable: true,
    defaultsort: false,
    type: 'string',
  },
]

const radioFieldFormat: Array<components['schemas']['FieldDefinition']> = [
  {
    display: 'Radio Field',
    name: 'radioField',
    filter: {
      type: FilterType.radio,
      staticOptions: options,
    },
    sortable: true,
    defaultsort: false,
    type: 'string',
  },
]

const dateRangeFieldFormat: Array<components['schemas']['FieldDefinition']> = [
  {
    display: 'Date Range Field',
    name: 'dateRangeField',
    filter: {
      type: 'daterange',
    },
    sortable: true,
    defaultsort: false,
    type: 'string',
  },
]

describe('getFilters', () => {
  it('Select filter mapped correctly', () => {
    const filterValues: Dict<string> = {
      selectField: '2',
    }

    const result = Utils.getFilters(selectFieldFormat, filterValues)

    expect(result.length).toEqual(1)
    expect(result[0].name).toEqual(selectFieldFormat[0].name)
    expect(result[0].options[0].value).toEqual(selectFieldFormat[0].filter.staticOptions[0].name)
    expect(result[0].options[0].text).toEqual(selectFieldFormat[0].filter.staticOptions[0].display)
    expect(result[0].options[1].value).toEqual(selectFieldFormat[0].filter.staticOptions[1].name)
    expect(result[0].options[1].text).toEqual(selectFieldFormat[0].filter.staticOptions[1].display)
    expect(result[0].value).toEqual(selectFieldFormat[0].filter.staticOptions[1].name)
  })

  it('Radio filter mapped correctly', () => {
    const filterValues: Dict<string> = {
      radioField: '2',
    }

    const result = Utils.getFilters(radioFieldFormat, filterValues)

    expect(result.length).toEqual(1)
    expect(result[0].name).toEqual(radioFieldFormat[0].name)
    expect(result[0].options[0].value).toEqual(selectFieldFormat[0].filter.staticOptions[0].name)
    expect(result[0].options[0].text).toEqual(selectFieldFormat[0].filter.staticOptions[0].display)
    expect(result[0].options[1].value).toEqual(selectFieldFormat[0].filter.staticOptions[1].name)
    expect(result[0].options[1].text).toEqual(selectFieldFormat[0].filter.staticOptions[1].display)
    expect(result[0].value).toEqual(radioFieldFormat[0].filter.staticOptions[1].name)
  })

  it('Date range filter mapped correctly', () => {
    const filterValues: Dict<string> = {
      'dateRangeField.start': '2001-02-03',
      'dateRangeField.end': '2004-05-06',
    }

    const result = Utils.getFilters(dateRangeFieldFormat, filterValues)

    expect(result.length).toEqual(1)
    expect(result[0].name).toEqual(dateRangeFieldFormat[0].name)
    expect(result[0].options).toBeFalsy()
    expect(result[0].value).toBeTruthy()

    expect(<DateRange>result[0].value).toBeTruthy()
    expect((<DateRange>result[0].value).start).toEqual('2001-02-03')
    expect((<DateRange>result[0].value).end).toEqual('2004-05-06')
  })

  it('No filter mapped correctly', () => {
    const format: Array<components['schemas']['FieldDefinition']> = [
      {
        display: 'No Filter Field',
        name: 'noFilterField',
        sortable: true,
        defaultsort: false,
        type: 'string',
      },
    ]
    const filterValues: Dict<string> = {
      selectField: '2',
    }

    const result = Utils.getFilters(format, filterValues)

    expect(result.length).toEqual(0)
  })
})

const createUrlForParameters = (currentQueryParams: Dict<string>, updateQueryParams: Dict<string>) =>
  JSON.stringify(updateQueryParams)

function mockReportQuery(filterValues: NodeJS.Dict<string>) {
  const reportQuery: ReportQuery = jest.createMockFromModule('../../types/ReportQuery')
  reportQuery.filters = filterValues

  const prefixedFilterValues = {}
  Object.keys(filterValues).forEach((key) => {
    prefixedFilterValues[`filters.${key}`] = filterValues[key]
  })
  reportQuery.toRecordWithFilterPrefix = jest.fn(() => prefixedFilterValues)

  reportQuery.filtersPrefix = 'f.'

  return reportQuery
}

describe('getSelectedFilters', () => {
  it('Select filter mapped correctly', () => {
    const filterValues: Dict<string> = {
      selectField: '2',
    }

    const result = Utils.getSelectedFilters(selectFieldFormat, mockReportQuery(filterValues), createUrlForParameters)

    expect(result.length).toEqual(1)
    expect(result[0].text).toEqual('Select Field: Two')
    expect(result[0].href).toEqual('{"f.selectField":"","selectedPage":"1"}')
  })

  it('Radio filter mapped correctly', () => {
    const filterValues: Dict<string> = {
      radioField: '2',
    }

    const result = Utils.getSelectedFilters(radioFieldFormat, mockReportQuery(filterValues), createUrlForParameters)

    expect(result.length).toEqual(1)
    expect(result[0].text).toEqual('Radio Field: Two')
    expect(result[0].href).toEqual('{"f.radioField":"","selectedPage":"1"}')
  })

  it('Date range filter mapped correctly', () => {
    const filterValues: Dict<string> = {
      'dateRangeField.start': '2001-02-03',
      'dateRangeField.end': '2004-05-06',
    }

    const result = Utils.getSelectedFilters(dateRangeFieldFormat, mockReportQuery(filterValues), createUrlForParameters)

    expect(result.length).toEqual(1)
    expect(result[0].text).toEqual('Date Range Field: 03/02/2001 - 06/05/2004')
    expect(result[0].href).toEqual('{"f.dateRangeField":"","selectedPage":"1"}')
  })

  it('Date range filter with just start date mapped correctly', () => {
    const filterValues: Dict<string> = {
      'dateRangeField.start': '2001-02-03',
    }

    const result = Utils.getSelectedFilters(dateRangeFieldFormat, mockReportQuery(filterValues), createUrlForParameters)

    expect(result.length).toEqual(1)
    expect(result[0].text).toEqual('Date Range Field: From 03/02/2001')
    expect(result[0].href).toEqual('{"f.dateRangeField":"","selectedPage":"1"}')
  })

  it('Date range filter with just end date mapped correctly', () => {
    const filterValues: Dict<string> = {
      'dateRangeField.end': '2004-05-06',
    }

    const result = Utils.getSelectedFilters(dateRangeFieldFormat, mockReportQuery(filterValues), createUrlForParameters)

    expect(result.length).toEqual(1)
    expect(result[0].text).toEqual('Date Range Field: Until 06/05/2004')
    expect(result[0].href).toEqual('{"f.dateRangeField":"","selectedPage":"1"}')
  })
})
