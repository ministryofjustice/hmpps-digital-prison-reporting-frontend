import Utils from './utils'
import { components } from '../../types/api'

describe('reportDefinitionsToCards', () => {
  it('Maps correctly', () => {

    const report: components['schemas']['ReportDefinition'] = {
      id: 'one',
      name: 'Two',
      description: 'Three',
      variants: []
    }
    const mapped = Utils.reportDefinitionsToCards([report], '/prefix')

    expect(mapped).toEqual([{
      text: 'Two',
      href: `/prefix/one`,
      description: 'Three',
    }])
  })
})

describe('variantDefinitionsToCards', () => {
  it('Maps correctly', () => {

    const report: components['schemas']['ReportDefinition'] = {
      id: 'one',
      name: 'Two',
      description: 'Three',
      variants: [{
        id: 'four',
        name: 'Five',
        description: 'Six',
        resourceName: 'Seven',
        specification: {
          template: 'list',
          fields: [],
        },
      }]
    }
    const mapped = Utils.variantDefinitionsToCards(report, '/prefix', 'f')

    expect(mapped).toEqual([{
      text: 'Five',
      href: `/prefix/one/four`,
      description: 'Six',
    }])
  })

  it('Maps default values', () => {

    const report: components['schemas']['ReportDefinition'] = {
      id: 'one',
      name: 'Two',
      description: 'Three',
      variants: [{
        id: 'four',
        name: 'Five',
        description: 'Six',
        resourceName: 'Seven',
        specification: {
          template: 'list',
          fields: [{
            name: 'eight',
            display: 'Nine',
            sortable: true,
            defaultsort: true,
            type: 'string',
            filter: {
              type: 'Radio',
              defaultValue: 'ten'
            }
          }],
        },
      }]
    }
    const mapped = Utils.variantDefinitionsToCards(report, '/prefix', 'f.')

    expect(mapped).toEqual([{
      text: 'Five',
      href: `/prefix/one/four?f.eight=ten`,
      description: 'Six',
    }])
  })

  it('Maps default date values', () => {

    const report: components['schemas']['ReportDefinition'] = {
      id: 'one',
      name: 'Two',
      description: 'Three',
      variants: [{
        id: 'four',
        name: 'Five',
        description: 'Six',
        resourceName: 'Seven',
        specification: {
          template: 'list',
          fields: [{
            name: 'eight',
            display: 'Nine',
            sortable: true,
            defaultsort: true,
            type: 'date',
            filter: {
              type: 'daterange',
              defaultValue: '2023-12-01 - 2023-12-31'
            }
          }],
        },
      }]
    }
    const mapped = Utils.variantDefinitionsToCards(report, '/prefix', 'f.')

    expect(mapped).toEqual([{
      text: 'Five',
      href: `/prefix/one/four?f.eight.start=2023-12-01&f.eight.end=2023-12-31`,
      description: 'Six',
    }])
  })
})
