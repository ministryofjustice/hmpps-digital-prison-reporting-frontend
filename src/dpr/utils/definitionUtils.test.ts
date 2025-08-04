import DefinitionUtils from './definitionUtils'
import Definitions from '../../../test-app/mocks/mockClients/reports/mockReportDefinition'
import { components } from '../types/api'

describe('DefinitionUtils tests', () => {
  let definitions: components['schemas']['ReportDefinitionSummary'][]

  beforeEach(() => {
    definitions = Definitions.reports
  })

  describe('getCurrentVariantDefinition', () => {
    it('should get the current variant definition from a report summary', () => {
      const definition = DefinitionUtils.getCurrentVariantDefinition(definitions, 'filter-inputs', 'variantId-15')

      expect(definition.name).toEqual('Relative Daterange')
      expect(definition.specification.fields.length).toEqual(1)
    })

    it('should return undefined if no definition', () => {
      const definition = DefinitionUtils.getCurrentVariantDefinition(definitions, 'test-report-2', 'variantId-15')

      expect(definition).toBeUndefined()
    })
  })

  describe('getFieldDisplayName', () => {
    it('should get the specific field name', () => {
      const variant15Definition = DefinitionUtils.getCurrentVariantDefinition(
        definitions,
        'filter-inputs',
        'variantId-15',
      )
      const fieldDisplay = DefinitionUtils.getFieldDisplayName(variant15Definition.specification.fields, 'field1')

      expect(fieldDisplay).toEqual('Field 1')
    })

    it('should return the specific field id if no match', () => {
      const variant15Definition = DefinitionUtils.getCurrentVariantDefinition(
        definitions,
        'filter-inputs',
        'variantId-15',
      )
      const fieldDisplay = DefinitionUtils.getFieldDisplayName(variant15Definition.specification.fields, 'field8')

      expect(fieldDisplay).toEqual('field8')
    })
  })
})
