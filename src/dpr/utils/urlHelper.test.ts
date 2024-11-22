import { Request } from 'express'
import ReportQuery from '../types/ReportQuery'
import Dict = NodeJS.Dict
import createUrlForParameters from './urlHelper'
import { components } from '../types/api'
import { Template } from '../types/Templates'

const defaultFields: Array<components['schemas']['FieldDefinition']> = [
  {
    name: 'direction',
    display: 'Direction',
    sortable: true,
    defaultsort: true,
    filter: {
      type: 'Radio',
      mandatory: false,
    },
    type: 'string',
    mandatory: false,
    visible: true,
    calculated: false,
  },
]

const req = {
  query: {
    selectedPage: '10',
    pageSize: '20',
    sortColumn: '30',
    sortedAsc: 'false',
    'f.direction': 'out',
  },
} as unknown as Request

const defaultSpec: components['schemas']['Specification'] = {
  fields: defaultFields,
  template: 'list',
  sections: [],
}

const defaultReportQuery: ReportQuery = new ReportQuery({
  fields: defaultSpec.fields,
  template: defaultSpec.template as Template,
  queryParams: req.query,
  definitionsPath: 'one',
  filtersPrefix: 'f.',
})

describe('Create URL', () => {
  it('Reset filters', () => {
    const updateQueryParams: Dict<string> = null

    const url = createUrlForParameters(defaultReportQuery.toRecordWithFilterPrefix(), updateQueryParams)

    expect(url).toEqual('?selectedPage=1&pageSize=20&sortColumn=30&sortedAsc=false&dataProductDefinitionsPath=one')
  })

  it('Clear single filter', () => {
    const currentQueryParams: ReportQuery = new ReportQuery({
      fields: defaultSpec.fields,
      template: defaultSpec.template as Template,
      queryParams: {
        ...req.query,
        'f.type': 'jaunt',
      },
      definitionsPath: 'one',
      filtersPrefix: 'f.',
    })
    const updateQueryParams: Dict<string> = {
      'f.direction': '',
    }

    const url = createUrlForParameters(currentQueryParams.toRecordWithFilterPrefix(), updateQueryParams)

    expect(url).toEqual(
      '?selectedPage=1&pageSize=20&sortColumn=30&sortedAsc=false&columns=direction&dataProductDefinitionsPath=one&f.direction=~clear~&f.type=jaunt',
    )
  })

  it('Change page with filters', () => {
    const updateQueryParams: Dict<string> = {
      selectedPage: '11',
    }

    const url = createUrlForParameters(defaultReportQuery.toRecordWithFilterPrefix(), updateQueryParams)

    expect(url).toEqual(
      '?selectedPage=11&pageSize=20&sortColumn=30&sortedAsc=false&columns=direction&dataProductDefinitionsPath=one&f.direction=out',
    )
  })

  it('Change page with column', () => {
    const queryParams = {
      selectedPage: '10',
      pageSize: '20',
      sortColumn: '30',
      sortedAsc: 'false',
      'f.direction': 'out',
      columns: 'direction',
    }

    const reportQuery: ReportQuery = new ReportQuery({
      fields: defaultSpec.fields,
      template: defaultSpec.template as Template,
      queryParams,
      definitionsPath: 'one',
      filtersPrefix: 'f.',
    })

    const updateQueryParams: Dict<string> = {
      selectedPage: '11',
    }

    const url = createUrlForParameters(reportQuery.toRecordWithFilterPrefix(), updateQueryParams)

    expect(url).toEqual(
      '?selectedPage=11&pageSize=20&sortColumn=30&sortedAsc=false&columns=direction&dataProductDefinitionsPath=one&f.direction=out',
    )
  })
})
