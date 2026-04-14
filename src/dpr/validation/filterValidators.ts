import { z } from 'zod'
import { components } from '../types/api'
import { isValidUiDate, UI_INPUT_FORMATS } from '../utils/dateHelper'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(isSameOrBefore)

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
export const buildDateField = (field: FieldDefinition) => {
  const { filter, display } = field
  if (!filter) throw new Error('Missing filter')

  if (filter.type === 'date') {
    const schema = z.string().min(1, `${display} is required`).refine(isValidUiDate, `${display} must be a valid date`)

    return filter.mandatory ? schema : schema.optional()
  }

  if (filter.type === 'daterange' || filter.type === 'granulardaterange') {
    let base = z.object({
      start: z
        .string()
        .min(1, `${display} start date is required`)
        .refine(isValidUiDate, `${display} start date must be a valid date`),

      end: z
        .string()
        .min(1, `${display} end date is required`)
        .refine(isValidUiDate, `${display} end date must be a valid date`),
    })

    // Cross-field validation: start must be <= end
    base = base.refine(
      ({ start, end }) => {
        const startDate = dayjs(start, [...UI_INPUT_FORMATS], true)
        const endDate = dayjs(end, [...UI_INPUT_FORMATS], true)

        return startDate.isSameOrBefore(endDate)
      },
      {
        message: `${display} end date must be the same as or after the start date`,
        path: ['end'],
      },
    )

    return filter.mandatory ? base : base.optional()
  }

  throw new Error(`Unsupported filter type: ${filter.type}`)
}
