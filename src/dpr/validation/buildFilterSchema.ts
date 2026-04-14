import { z } from 'zod'
import { components } from '../types/api'
import { getFieldsWithFilters } from '../utils/definitionUtils'
import { buildFilterValidator } from './filterValidators'

type FieldDefinition = components['schemas']['FieldDefinition']

export const buildFilterSchemaFromFields = (fields: FieldDefinition[]) => {
  const shape: Record<string, z.ZodTypeAny> = {}

  getFieldsWithFilters(fields).forEach((field) => {
    shape[field.name] = buildFilterValidator(field)
  })

  return z.object(shape)
}
