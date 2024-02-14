import { components } from '../../types/api'
import { Column } from './types'
import Utils from './utils'

const fields: Array<components['schemas']['FieldDefinition']> = [
  {
    display: 'Col Value 1',
    name: 'ColValue1',
    sortable: false,
    defaultsort: false,
    type: 'string',
    mandatory: false,
  },
  {
    display: 'Col Value 2',
    name: 'ColValue2',
    sortable: false,
    defaultsort: false,
    type: 'string',
    mandatory: false,
  },
  {
    display: 'Col Value 3',
    name: 'ColValue3',
    sortable: true,
    defaultsort: false,
    type: 'string',
    mandatory: true,
  },
  {
    display: 'Col Value 4',
    name: 'ColValue4',
    sortable: false,
    defaultsort: false,
    type: 'string',
    mandatory: false,
  },
]

const columns: Column[] = [
  {
    text: 'Col Value 1',
    value: 'ColValue1',
    disabled: false,
  },
  {
    text: 'Col Value 2',
    value: 'ColValue2',
    disabled: false,
  },
  {
    text: 'Col Value 3',
    value: 'ColValue3',
    disabled: true,
  },
  {
    text: 'Col Value 4',
    value: 'ColValue4',
    disabled: false,
  },
]

const queryColumns: string[] = ['ColValue1', 'ColValue2', 'ColValue3', 'ColValue4']
const queryColumnNoDisabled: string[] = ['ColValue1', 'ColValue2', 'ColValue4']

describe('getColumns', () => {
  it('mapped the columns correctly', () => {
    const cols = Utils.getColumns(fields)
    expect(cols).toEqual(columns)
  })
})

describe('getSelectedColumns', () => {
  it('mapped the selected columns correctly', () => {
    const selectedColumns = Utils.getSelectedColumns(columns, queryColumns)
    expect(selectedColumns).toEqual(queryColumns)
  })

  it('should always inlcude disabled columns', () => {
    const selectedColumns = Utils.getSelectedColumns(columns, queryColumnNoDisabled)
    expect(selectedColumns).toEqual(queryColumns)
  })
})
