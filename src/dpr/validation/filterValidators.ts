import { z } from 'zod'
import { components } from '../types/api'

type FieldDefinition = components['schemas']['FieldDefinition']

export const buildFilterValidator = (field: FieldDefinition): z.ZodTypeAny => {
  if (!field.filter) {
    return z.any()
  }

  switch (field.filter.type) {
    case 'multiselect':
      return buildMultiSelectField(field)

    case 'date':
    case 'daterange':
    case 'granulardaterange':
      return buildDateField(field)

    case 'Radio':
    case 'Select':
    case 'autocomplete':
    case 'text':
    default:
      return buildTextField(field)
  }
}

/**
 * TEXT / STRING FIELDS
 */
const buildTextField = (field: FieldDefinition) => {
  const { filter, display } = field
  if (!filter) throw new Error('Missing filter')

  let stringSchema = z.string().trim()

  if (filter.mandatory) {
    stringSchema = stringSchema.min(1, `${display} is required`)
  }

  if (filter.pattern) {
    const regex = new RegExp(filter.pattern)
    stringSchema = stringSchema.refine((value) => value === '' || regex.test(value), {
      message: `${display} has an invalid format`,
    })
  }

  return z.preprocess((value) => value ?? '', stringSchema)
}

/**
 * MULTI‑SELECT FIELDS
 */
const buildMultiSelectField = (field: FieldDefinition) => {
  const { filter, display } = field
  if (!filter) throw new Error('Missing filter')

  let arraySchema = z.array(z.string())

  if (filter.mandatory) {
    arraySchema = arraySchema.min(1, `${display} Please select at least one`)
  }

  return z.preprocess((value) => {
    if (value == null) return []
    if (Array.isArray(value)) return value
    return [value]
  }, arraySchema)
}

/**
 * DATE / DATE RANGE FIELDS
 */
const buildDateField = (field: FieldDefinition) => {
  const { filter, display } = field
  if (!filter) throw new Error('Missing filter')

  // Date *range* (object form)
  if (filter.type === 'daterange' || filter.type === 'granulardaterange') {
    let base = z.object({
      start: z
        .string()
        .min(1, `${display} start date is required`)
        .refine((v) => !Number.isNaN(Date.parse(v)), `${display} start date must be a valid date`),
      end: z
        .string()
        .min(1, `${display} end date is required`)
        .refine((v) => !Number.isNaN(Date.parse(v)), `${display} end date must be a valid date`),
    })

    // Cross-field validation: start must be <= end
    base = base.refine(
      ({ start, end }) => {
        const startDate = new Date(start)
        const endDate = new Date(end)
        return startDate <= endDate
      },
      {
        message: `${display} end date must be the same as or after the start date`,
        path: ['end'], // attach error to the "end" field
      },
    )

    return filter.mandatory ? base : base.optional()
  }

  // Single date (string form)
  let base = z
    .string()
    .min(1, `${display} is required`)
    .refine((v) => !Number.isNaN(Date.parse(v)), `${display} must be a valid date`)

  return filter.mandatory ? base : base.optional()
}
