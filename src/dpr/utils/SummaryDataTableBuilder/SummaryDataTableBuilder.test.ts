import SummaryDataTableBuilder from './SummaryDataTableBuilder'
import { AsyncSummary } from '../../types/UserReports'

const defaultSummary: AsyncSummary = {
  id: 'default',
  template: 'page-header',
  fields: [
    { name: 'type', display: '', header: true, mergeRows: true },
    { name: 'qty', display: 'Quantity', type: 'long' },
  ],
  data: [
    { type: 'A', qty: '4' },
    { type: 'A', qty: '3' },
    { type: 'A', qty: '2' },
    { type: 'B', qty: '1' },
    { type: 'C', qty: '0' },
    { type: 'C', qty: '-1' },
  ],
}

describe('mapData', () => {
  it('Maps as expected', () => {
    const mapped = new SummaryDataTableBuilder(defaultSummary).buildSummaryTable()

    expect(mapped).toEqual({
      colCount: 2,
      head: [
        {
          text: '',
        },
        {
          text: 'Quantity',
        },
      ],
      rowCount: 6,
      rows: [
        [
          {
            classes: 'govuk-table__header',
            fieldName: 'type',
            format: 'string',
            rowspan: 3,
            text: 'A',
          },
          {
            classes: '',
            fieldName: 'qty',
            format: 'numeric',
            text: '2',
          },
        ],
        [
          {
            classes: '',
            fieldName: 'qty',
            format: 'numeric',
            text: '3',
          },
        ],
        [
          {
            classes: '',
            fieldName: 'qty',
            format: 'numeric',
            text: '4',
          },
        ],
        [
          {
            classes: 'govuk-table__header',
            fieldName: 'type',
            format: 'string',
            text: 'B',
          },
          {
            classes: '',
            fieldName: 'qty',
            format: 'numeric',
            text: '1',
          },
        ],
        [
          {
            classes: 'govuk-table__header',
            fieldName: 'type',
            format: 'string',
            rowspan: 2,
            text: 'C',
          },
          {
            classes: '',
            fieldName: 'qty',
            format: 'numeric',
            text: '-1',
          },
        ],
        [
          {
            classes: '',
            fieldName: 'qty',
            format: 'numeric',
            text: '0',
          },
        ],
      ],
    })
  })
})
