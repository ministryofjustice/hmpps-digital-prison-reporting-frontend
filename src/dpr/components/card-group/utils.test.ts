import Utils from './utils'
import { components } from '../../types/api'

describe('reportDefinitionsToCards', () => {
  it('Maps correctly', () => {
    const report: components['schemas']['ReportDefinitionSummary'] = {
      id: 'one',
      name: 'Two',
      description: 'Three',
      variants: [],
    }
    const mapped = Utils.reportDefinitionsToCards([report], '/prefix')

    expect(mapped).toEqual([
      {
        text: 'Two',
        href: `/prefix/one`,
        description: 'Three',
      },
    ])
  })
})

describe('variantDefinitionsToCards', () => {
  it('Maps correctly', () => {
    const report: components['schemas']['ReportDefinitionSummary'] = {
      id: 'one',
      name: 'Two',
      description: 'Three',
      variants: [
        {
          id: 'four',
          name: 'Five',
          description: 'Six',
        },
      ],
    }
    const mapped = Utils.variantDefinitionsToCards(report, '/prefix')

    expect(mapped).toEqual([
      {
        text: 'Five',
        href: `/prefix/one/four`,
        description: 'Six',
      },
    ])
  })
})
