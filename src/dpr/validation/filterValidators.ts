import { z } from 'zod'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { components } from '../types/api'
import { isValidUiDate, UI_INPUT_FORMATS } from '../utils/dateHelper'

dayjs.extend(isSameOrBefore)

type FieldDefinition = components['schemas']['FieldDefinition']

export const buildFilterValidator = (field: FieldDefinition): z.ZodTypeAny => {
  if (!field.filter) {
    return z.any()
  }

  switch (field.filter.type) {
    case 'multiselect':
    case 'autocompletemulti':
      return buildMultiSelectField(field)

    case 'date':
      return buildDateField(field)

    case 'daterange':
    case 'granulardaterange':
      return buildDateRangeField(field)

    case 'Radio':
    case 'Select':
    case 'autocomplete':
      return buildSelectField(field)

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

  const validValues = (filter.staticOptions ?? []).map((o) => o.name)

  let arraySchema = z.array(z.string())

  // Valid option check
  arraySchema = arraySchema.refine((values) => values.every((v) => validValues.includes(v)), {
    message: `${display} contains invalid selections`,
  })

  // Mandatory
  if (filter.mandatory) {
    arraySchema = arraySchema.min(1, `${display} Please select at least one`)
  }

  // minSelected
  if (typeof filter.minSelected === 'number') {
    arraySchema = arraySchema.min(filter.minSelected, `${display} Select at least ${filter.minSelected}`)
  }

  // maxSelected
  if (typeof filter.maxSelected === 'number') {
    arraySchema = arraySchema.max(filter.maxSelected, `${display} Select no more than ${filter.maxSelected}`)
  }

  return z.preprocess((value) => {
    if (value == null) return []
    if (Array.isArray(value)) return value

    return value
      .toString()
      .split(',')
      .map((v: string) => v.trim())
      .filter(Boolean) // removes empty strings
  }, arraySchema)
}

/**
 * SELECT FIELDS
 */
const buildSelectField = (field: FieldDefinition) => {
  const { filter, display } = field
  if (!filter) throw new Error('Missing filter')

  const validValues = (filter.staticOptions ?? []).map((o) => o.name)

  let schema = z.string().trim()

  schema = schema.refine((value) => value === 'no-filter' || value === '' || validValues.includes(value), {
    message: `${display} has an invalid selection`,
  })

  if (filter.mandatory) {
    schema = schema.refine((value) => value !== '' && value !== 'no-filter', `${display} is required`)
  }

  return z.preprocess((v) => v ?? '', schema)
}

/**
 * DATE FIELDS
 */
export const buildDateField = (field: FieldDefinition) => {
  const { filter, display } = field
  if (!filter) throw new Error('Missing filter')

  const schema = z.preprocess(
    (v) => (v === '' ? undefined : v),
    z.string().refine(isValidUiDate, `${display} must be a valid date`).optional(),
  )

  return filter.mandatory ? schema.refine((v) => v !== undefined, `${display} is required`) : schema
}

/**
 * DATE RANGE FIELDS
 */
export const buildDateRangeField = (field: FieldDefinition) => {
  const { filter, display } = field
  if (!filter) throw new Error('Missing filter')

  if (filter.type === 'daterange' || filter.type === 'granulardaterange') {
    const isMandatory = filter.mandatory === true

    let base = z.object({
      start: isMandatory
        ? z
            .string()
            .min(1, `${display} start date is required`)
            .refine(isValidUiDate, `${display} start date must be a valid date`)
        : z
            .string()
            .optional()
            .refine((value) => !value || isValidUiDate(value), `${display} start date must be a valid date`),

      end: isMandatory
        ? z
            .string()
            .min(1, `${display} end date is required`)
            .refine(isValidUiDate, `${display} end date must be a valid date`)
        : z
            .string()
            .optional()
            .refine((value) => !value || isValidUiDate(value), `${display} end date must be a valid date`),
    })

    // Cross-field validation:
    // Only enforce ordering when both dates are present
    base = base.refine(
      ({ start, end }) => {
        if (!start || !end) return true

        const startDate = dayjs(start, [...UI_INPUT_FORMATS], true)
        const endDate = dayjs(end, [...UI_INPUT_FORMATS], true)

        return startDate.isSameOrBefore(endDate)
      },
      {
        message: `${display} end date must be the same as or after the start date`,
        path: ['end'],
      },
    )

    return base
  }

  throw new Error(`Unsupported filter type: ${filter.type}`)
}
