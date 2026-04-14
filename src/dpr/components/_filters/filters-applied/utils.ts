import { components } from '../../../types/api'
import { formatDateOrUnset } from '../../../utils/dateHelper'

/**
 * -------------------------------------------------------------------------------------
 * Types
 * -------------------------------------------------------------------------------------
 */

type FieldDefinition = components['schemas']['FieldDefinition']
type FilterDefinition = components['schemas']['FilterDefinition']

export type AppliedFilterChip = {
  displayName: string
  displayValue: string
  reset: {
    keys: string[]
  }
}

type QueryParams = Record<string, string | string[] | undefined>

/**
 * -------------------------------------------------------------------------------------
 * Public API
 * -------------------------------------------------------------------------------------
 */

export function buildAppliedFilterChips(query: QueryParams, fields: FieldDefinition[]): AppliedFilterChip[] {
  return fields
    .filter((field) => Boolean(field.filter))
    .map((field) => buildChipForField(field, query))
    .filter(Boolean) as AppliedFilterChip[]
}

/**
 * -------------------------------------------------------------------------------------
 * Orchestrator (semantic parity with Selected Filters)
 * -------------------------------------------------------------------------------------
 */

function buildChipForField(field: FieldDefinition, query: QueryParams): AppliedFilterChip | null {
  const filter = field.filter!
  const baseKey = `filters.${field.name}`

  switch (filter.type) {
    case 'daterange':
      return buildDateRangeChip(field, baseKey, query)

    case 'granulardaterange':
      return buildGranularDateRangeChip(field, baseKey, query)

    case 'multiselect':
      return buildMultiSelectChip(field, baseKey, query)

    default:
      return buildSingleValueChip(field, baseKey, query)
  }
}

/**
 * -------------------------------------------------------------------------------------
 * Builders
 * -------------------------------------------------------------------------------------
 */

/**
 * Date range
 * - Renders if either bound exists
 * - Missing bounds rendered as 'unset'
 */
function buildDateRangeChip(field: FieldDefinition, baseKey: string, query: QueryParams): AppliedFilterChip | null {
  const start = query[`${baseKey}.start`] as string | undefined
  const end = query[`${baseKey}.end`] as string | undefined

  if (!start && !end) return null

  return {
    displayName: field.display,
    displayValue: `${formatDateOrUnset(start)} – ${formatDateOrUnset(end)}`,
    reset: {
      keys: [`${baseKey}.start`, `${baseKey}.end`],
    },
  }
}

/**
 * Granular date range
 * - Renders if quick-filter OR either bound exists
 * - Quick-filter takes precedence
 * - Missing values rendered as 'unset'
 */
function buildGranularDateRangeChip(
  field: FieldDefinition,
  baseKey: string,
  query: QueryParams,
): AppliedFilterChip | null {
  const quick = query[`${baseKey}.quick-filter`]
  const granularity = query[`${baseKey}.granularity`]
  const start = query[`${baseKey}.start`] as string | undefined
  const end = query[`${baseKey}.end`] as string | undefined

  if (!quick && !start && !end) return null

  let displayValue: string

  if (quick && quick !== 'None') {
    displayValue = `${humanise(quick)} / ${granularity ?? 'unset'}`
  } else {
    displayValue = `${formatDateOrUnset(start)} – ${formatDateOrUnset(end)}` + ` / ${granularity ?? 'unset'}`
  }

  return {
    displayName: field.display,
    displayValue,
    reset: {
      keys: Object.keys(query).filter((key) => key.startsWith(baseKey)),
    },
  }
}

/**
 * Multiselect
 * - Combined into single chip
 * - Truncated after 3 values
 */
function buildMultiSelectChip(field: FieldDefinition, key: string, query: QueryParams): AppliedFilterChip | null {
  const raw = query[key]
  const values = Array.isArray(raw) ? raw : raw ? [raw] : []

  if (!values.length) return null

  const labels = values.map((value) => getDisplayLabel(field.filter!, value))

  const displayValue =
    labels.length > 3 ? `${labels.slice(0, 3).join(', ')} + ${labels.length - 3} more` : labels.join(', ')

  return {
    displayName: field.display,
    displayValue,
    reset: {
      keys: [key],
    },
  }
}

/**
 * Single value
 * - radio / select / text / autocomplete
 */
function buildSingleValueChip(field: FieldDefinition, key: string, query: QueryParams): AppliedFilterChip | null {
  const value = query[key]
  if (!value) return null

  return {
    displayName: field.display,
    displayValue: getDisplayLabel(field.filter!, String(value)),
    reset: {
      keys: [key],
    },
  }
}

/**
 * -------------------------------------------------------------------------------------
 * Helpers
 * -------------------------------------------------------------------------------------
 */

function getDisplayLabel(filter: FilterDefinition, value: string): string {
  const staticOption = filter.staticOptions?.find((option) => option.name === value)

  return staticOption?.display ?? value
}

function humanise(value: string | string[]): string {
  return String(value).replace(/-/g, ' ')
}
